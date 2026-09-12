import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Med Minder — medication reminders that arrive on time, even offline. Free on iPhone and Android.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const icon = await readFile(join(process.cwd(), "public", "app-icon.png"));
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 76,
          background: "linear-gradient(135deg, #EFF3FF 0%, #DCE6FF 40%, #E4F8F5 72%, #F1E8FF 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={iconSrc} width={92} height={92} alt="" style={{ borderRadius: 24 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700, color: "#10131C" }}>Med Minder</div>
            <div style={{ fontSize: 24, color: "#5A6072" }}>by BitLion, LLC</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -2.5,
              lineHeight: 1.02,
              color: "#10131C",
            }}
          >
            Never miss a dose.
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -2.5,
              lineHeight: 1.02,
              color: "#2740B4",
            }}
          >
            Even off the grid.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              background: "#2740B4",
              color: "#EFF3FF",
              padding: "14px 26px",
              borderRadius: 999,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Free · no subscription
          </div>
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.72)",
              color: "#10131C",
              padding: "14px 26px",
              borderRadius: 999,
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            Reminders work offline
          </div>
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.72)",
              color: "#10131C",
              padding: "14px 26px",
              borderRadius: 999,
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            iPhone · Android
          </div>
        </div>
      </div>
    ),
    size,
  );
}
