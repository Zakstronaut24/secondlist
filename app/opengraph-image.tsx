import { ImageResponse } from "next/og";

export const alt = "Seconda - Marketplace Barang Bekas Komunitas Lokal";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #0f766e 50%, #0d9488 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Decorative Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(255, 255, 255, 0.15)",
            padding: "10px 24px",
            borderRadius: "9999px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#6ee7b7" }}>
            📍 Pasar Komunitas Lokal Jabodetabek
          </span>
        </div>

        {/* Brand Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "900",
            letterSpacing: "-0.03em",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span
            style={{
              background: "linear-gradient(to right, #34d399, #5eead4, #fbbf24)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Seconda
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "34px",
            fontWeight: "700",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.3,
            color: "#f1f5f9",
            marginBottom: "20px",
          }}
        >
          Temukan Barang Bekas Berkualitas di Dekatmu. Lebih Murah, Lebih Cepat, Siap COD.
        </div>

        {/* Categories Chips */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            marginTop: "16px",
          }}
        >
          {["Gadget & HP", "Pakaian", "Perabot", "Sepeda & Hobi", "Elektronik"].map(
            (cat) => (
              <div
                key={cat}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  padding: "8px 18px",
                  borderRadius: "14px",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#e2e8f0",
                }}
              >
                {cat}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
