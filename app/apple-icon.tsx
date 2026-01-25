import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6366f1",
          borderRadius: "37px",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 32 32"
          fill="none"
        >
          {/* Connection lines */}
          <path
            d="M8 8 L8 16 M8 16 L20 16 M8 16 L8 24"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Nodes */}
          <circle cx="8" cy="8" r="3" fill="white" />
          <circle cx="8" cy="16" r="3" fill="white" />
          <circle cx="20" cy="16" r="3" fill="white" />
          <circle cx="8" cy="24" r="3" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
