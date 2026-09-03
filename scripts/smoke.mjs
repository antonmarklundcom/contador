#!/usr/bin/env node
/**
 * Route smoke test (plan.md §5.1.6).
 *
 * Boots the production server and asserts the status of every URL in the live
 * site's inventory (docs/reference/site-scan-2026-09-02.md §2) plus the new
 * routes this rebuild adds. This is the contract that stops a later phase
 * silently dropping a legacy URL and losing its rankings.
 *
 * Run via `npm run verify`.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const PORT = Number(process.env.SMOKE_PORT ?? 4321);
const BASE = `http://127.0.0.1:${PORT}`;
const ROOT = process.cwd();

/** [path, expected status, note] */
const CASES = [
  // ---- legacy URLs that must keep answering 200 (scan §2) --------------
  ["/", 200, "Inicio"],
  ["/servicios/", 200, "Servicios (hub)"],
  ["/marangatu/", 200, "Marangatu"],
  ["/ekuatia/", 200, "Ekuatia"],
  ["/ruc/", 200, "RUC"],
  ["/eas/", 200, "EAS"],
  ["/ire-simple/", 200, "IRE-simple"],
  ["/iva/", 200, "IVA"],
  ["/ips/", 200, "IPS"],
  ["/asesoria/", 200, "Asesoría"],
  ["/auditoria/", 200, "Auditoría (sub-hub)"],
  ["/auditoria-auditoria-impositiva/", 200, "Auditoria Impositiva"],
  ["/auditoria-auditoria-interna/", 200, "Auditoría Interna"],
  ["/auditoria-auditoria-forense/", 200, "Auditoría Forense"],
  ["/nosotros/", 200, "Nosotros"],
  ["/contacto/", 200, "Contacto"],
  ["/blog/", 200, "Blog"],
  ["/precios/", 200, "Precios"],

  // ---- WordPress leftovers that must not be rebuilt (plan.md §5.1.6) ---
  ["/single-service/", 410, "theme demo page"],
  ["/hello-world/", 410, "default WP post"],
  ["/category/uncategorized/", 410, "default WP taxonomy"],
  ["/?page_id=3", 301, "broken privacy link → /privacidad/"],
  ["/wp-sitemap.xml", 301, "WP sitemap → /sitemap.xml"],

  // ---- new routes this rebuild adds -----------------------------------
  ["/contabilidad/", 200, "new service page"],
  ["/irp/", 200, "new service page"],
  ["/herramientas/", 200, "tools hub"],
  ["/privacidad/", 200, "legal"],
  ["/terminos/", 200, "legal"],
  ["/sitemap.xml", 200, "sitemap"],
  ["/robots.txt", 200, "robots"],
];

/** Redirect targets that must be exact, checked via the Location header. */
const REDIRECT_TARGETS = {
  "/?page_id=3": "/privacidad/",
  "/wp-sitemap.xml": "/sitemap.xml",
};

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", shell: false, ...options });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)),
    );
  });
}

async function ensureBuild() {
  if (existsSync(path.join(ROOT, ".next", "BUILD_ID"))) return;
  console.log("· no production build found — running `next build` first\n");
  await run(process.execPath, [path.join(ROOT, "node_modules", "next", "dist", "bin", "next"), "build"]);
}

async function waitForServer(timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(BASE, { redirect: "manual" });
      if (response.status > 0) return;
    } catch {
      // Server not up yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`server did not start on ${BASE} within ${timeoutMs}ms`);
}

async function main() {
  await ensureBuild();

  const server = spawn(
    process.execPath,
    [path.join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "--port", String(PORT)],
    {
      stdio: ["ignore", "pipe", "pipe"],
      // Deliberately no VENDERCRM_API_KEY: the lead endpoint must work in
      // degraded mode (plan.md §1.6).
      env: { ...process.env, NODE_ENV: "production", VENDERCRM_API_KEY: "" },
    },
  );

  let serverLog = "";
  server.stdout.on("data", (chunk) => (serverLog += chunk));
  server.stderr.on("data", (chunk) => (serverLog += chunk));

  const failures = [];

  try {
    await waitForServer();

    for (const [urlPath, expected, note] of CASES) {
      let status = 0;
      let location = null;
      try {
        const response = await fetch(`${BASE}${urlPath}`, { redirect: "manual" });
        status = response.status;
        location = response.headers.get("location");
      } catch (error) {
        failures.push(`${urlPath} — request failed: ${error.message}`);
        console.log(`✗ ${urlPath.padEnd(38)} request failed`);
        continue;
      }

      const target = REDIRECT_TARGETS[urlPath];
      const locationPath = location ? new URL(location, BASE).pathname : null;
      const ok = status === expected && (!target || locationPath === target);

      if (!ok) {
        failures.push(
          `${urlPath} — expected ${expected}${target ? ` → ${target}` : ""}, got ${status}${
            locationPath ? ` → ${locationPath}` : ""
          }`,
        );
      }
      console.log(
        `${ok ? "✓" : "✗"} ${urlPath.padEnd(38)} ${String(status).padEnd(4)} ${note}`,
      );
    }

    // The homepage must render the shell: header wordmark, footer NAP column
    // and — once a WhatsApp number is configured — the floating button.
    const homeHtml = await (await fetch(`${BASE}/`)).text();
    const shellChecks = [
      ["header wordmark", homeHtml.includes("contador.com.py")],
      ["skip link", homeHtml.includes("Saltar al contenido")],
      ["services mega-menu", homeHtml.includes("Soluciones digitales de cumplimiento")],
      ["footer contact column", homeHtml.includes("Contacto")],
      ["ink token", homeHtml.includes("#0F1B2D") || homeHtml.includes("#0f1b2d")],
      ["organization JSON-LD", homeHtml.includes("AccountingService")],
    ];
    if (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) {
      shellChecks.push(["WhatsApp floating button", homeHtml.includes("wa.me/")]);
    }
    for (const [label, ok] of shellChecks) {
      if (!ok) failures.push(`GET / — missing ${label}`);
      console.log(`${ok ? "✓" : "✗"} ${`/ renders ${label}`.padEnd(38)}`);
    }

    // The lead endpoint must answer 200 with no credentials configured.
    const leadResponse = await fetch(`${BASE}/api/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Prueba Automatizada",
        phone: "0981 000 000",
        need: "contabilidad-impuestos",
        message: "Smoke test",
      }),
    });
    const leadBody = await leadResponse.json().catch(() => ({}));
    const leadOk = leadResponse.status === 200 && leadBody.ok === true && leadBody.degraded === true;
    if (!leadOk) {
      failures.push(
        `POST /api/lead — expected 200 {ok:true,degraded:true}, got ${leadResponse.status} ${JSON.stringify(leadBody)}`,
      );
    }
    console.log(
      `${leadOk ? "✓" : "✗"} ${"POST /api/lead (degraded)".padEnd(38)} ${leadResponse.status}`,
    );

    // Invalid payloads must be rejected, not silently forwarded.
    const invalidResponse = await fetch(`${BASE}/api/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "x" }),
    });
    const invalidOk = invalidResponse.status === 422;
    if (!invalidOk) {
      failures.push(`POST /api/lead (invalid) — expected 422, got ${invalidResponse.status}`);
    }
    console.log(
      `${invalidOk ? "✓" : "✗"} ${"POST /api/lead (invalid)".padEnd(38)} ${invalidResponse.status}`,
    );
  } finally {
    server.kill("SIGTERM");
  }

  console.log("");
  if (failures.length > 0) {
    console.error(`${failures.length} route check(s) failed:`);
    for (const failure of failures) console.error(`  · ${failure}`);
    console.error("\n--- server output ---\n" + serverLog.slice(-4000));
    process.exit(1);
  }

  console.log("All route and shell checks passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
