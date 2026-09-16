import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B4DA2",
          borderRadius: "50%",
          border: "2px solid #FFFFFF",
          boxShadow: "0 0 0 1px #062863",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FFFFFF",
            borderRadius: "50%",
            color: "#0B4DA2",
            fontSize: 10,
            fontWeight: 900,
            fontFamily: "sans-serif",
            letterSpacing: -0.5,
          }}
        >
          SAAF
        </div>
      </div>
    ),
    { ...size }
  );
}
