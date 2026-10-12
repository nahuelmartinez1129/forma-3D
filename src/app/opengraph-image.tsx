import { ImageResponse } from "next/og";
import { BRAND } from "@/config/brand";

export const alt = `${BRAND.name} — ${BRAND.slogan}`;
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
          padding: 72,
          background: "#FAFAF7",
          color: "#202329",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -3 }}>FORMA</div>
          <div
            style={{
              display: "flex",
              background: "#5267E8",
              color: "#fff",
              fontSize: 42,
              fontWeight: 800,
              padding: "6px 16px",
              borderRadius: 12,
            }}
          >
            3D
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>Diseño que toma forma.</div>
          <div style={{ fontSize: 32, color: "#5B616B", marginTop: 24 }}>
            Objetos funcionales, decoración y accesorios fabricados en 3D.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24 }}>
          <div style={{ display: "flex", background: "#A6E5CC", padding: "8px 18px", borderRadius: 999 }}>
            {BRAND.descriptor}
          </div>
          <div style={{ color: "#5B616B" }}>Marca ficticia · Demostración de portfolio</div>
        </div>
      </div>
    ),
    size,
  );
}
