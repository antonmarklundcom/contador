import { NextResponse, type NextRequest } from "next/server";

/**
 * WordPress leftovers that must not be rebuilt and must not 301 anywhere
 * (plan.md §5.1.6): they held demo content, so 410 Gone tells Google to drop
 * them instead of keeping them queued as soft-404s.
 *
 * A 410 needs a real status code, which App Router pages cannot set — hence
 * middleware rather than a route.
 */
const GONE_PATHS = new Set([
  "/single-service",
  "/hello-world",
  "/category/uncategorized",
]);

const GONE_HTML = `<!doctype html>
<html lang="es-PY">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Esta página ya no existe | Contador.com.py</title>
<style>
  :root { color-scheme: light }
  body { margin:0; background:#fff; color:#0F1B2D; font-family: ui-sans-serif, system-ui, sans-serif; }
  main { max-width: 640px; margin: 0 auto; padding: 96px 24px; }
  h1 { font-size: 34px; letter-spacing: -.03em; margin: 0 0 16px; }
  p { color:#5B6779; line-height:1.6; margin:0 0 28px; }
  ul { list-style:none; padding:0; margin:0; display:flex; flex-wrap:wrap; gap:12px; }
  a { display:inline-block; border-radius:999px; padding:12px 20px; text-decoration:none; font-weight:600; }
  a.primary { background:#F2B62B; color:#0F1B2D; }
  a.secondary { border:1px solid #CBD2DD; color:#0F1B2D; }
</style>
</head>
<body>
<main>
  <h1>Esta página ya no existe</h1>
  <p>El contenido fue retirado durante el rediseño del sitio. Puede continuar desde aquí.</p>
  <ul>
    <li><a class="primary" href="/">Inicio</a></li>
    <li><a class="secondary" href="/servicios/">Servicios</a></li>
    <li><a class="secondary" href="/contacto/">Contacto</a></li>
  </ul>
</main>
</body>
</html>`;

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, "");

  if (GONE_PATHS.has(path)) {
    return new NextResponse(GONE_HTML, {
      status: 410,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/single-service",
    "/single-service/",
    "/hello-world",
    "/hello-world/",
    "/category/uncategorized",
    "/category/uncategorized/",
  ],
};
