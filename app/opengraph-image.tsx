import { ImageResponse } from "next/og";

export const alt = "Zonneplaneet Actie voor zonne-energie via sportverenigingen";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#072737",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "12px",
            background: "#E94E12",
          }}
        />
        <p style={{ margin: "40px 0 0", fontSize: "36px" }}>Zonneplaneet Actie</p>
        <p
          style={{
            maxWidth: "900px",
            margin: "32px 0 0",
            fontSize: "72px",
            lineHeight: 1.1,
            fontWeight: 700,
          }}
        >
          Zonne-energie via je sportvereniging
        </p>
      </div>
    ),
    size,
  );
}
