import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/** Default OG card — ink band, amber mark, wordmark. 1b tokens only. */
export const runtime = "nodejs";
export const alt = "Contador.com.py — estudio contable en Asunción, Paraguay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0F1B2D",
          color: "#FFFFFF",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#F2B62B" }} />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {site.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            maxWidth: 900,
          }}
        >
          Contabilidad, impuestos y nómina para pymes en Paraguay.
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#F2B62B" }}>
          Contadores públicos matriculados · Asunción
        </div>
      </div>
    ),
    size,
  );
}
