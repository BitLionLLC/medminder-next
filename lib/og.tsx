import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/* 1200×630 is the size Facebook, LinkedIn, X, Slack and iMessage all crop a
   large share card to. Every card on the site uses it so none of them letterbox. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/* The logo is on every card and never varies by request, so read it once at
   module scope — the cards are prerendered at build time. */
const iconData = await readFile(join(process.cwd(), "public", "app-icon.png"));
const iconSrc = `data:image/png;base64,${iconData.toString("base64")}`;

const ink = "#10131C";
const accent = "#2740B4";
const muted = "#5A6072";

export type Card = {
  /** Two lines. The second is set in the accent colour. */
  headline: [string, string];
  /** Short claims along the bottom. The first is filled, the rest glass. */
  chips: string[];
};

/** Alt text for a card, so the share preview still says something when the
    image itself fails to load or is read aloud. */
export function ogAlt({ headline, chips }: Card) {
  return `${site.name} — ${headline.join(" ")} ${chips.join(" · ")}.`;
}

export function ogCard({ headline, chips }: Card) {
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
          background:
            "linear-gradient(135deg, #EFF3FF 0%, #DCE6FF 40%, #E4F8F5 72%, #F1E8FF 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* next/image has no place here — satori rasterises plain HTML, and the
              source is an inlined data URI rather than something to optimise. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconSrc} width={92} height={92} alt="" style={{ borderRadius: 24 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700, color: ink }}>{site.name}</div>
            <div style={{ fontSize: 24, color: muted }}>{`by ${site.developer}`}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {headline.map((line, i) => (
            <div
              key={line}
              style={{
                fontSize: 84,
                fontWeight: 800,
                letterSpacing: -2.5,
                lineHeight: 1.02,
                color: i === 0 ? ink : accent,
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {chips.map((chip, i) => (
            <div
              key={chip}
              style={{
                display: "flex",
                background: i === 0 ? accent : "rgba(255,255,255,0.72)",
                color: i === 0 ? "#EFF3FF" : ink,
                padding: "14px 26px",
                borderRadius: 999,
                fontSize: 26,
                fontWeight: i === 0 ? 700 : 600,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    ogSize,
  );
}
