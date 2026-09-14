import { type Card, ogAlt, ogCard, ogContentType, ogSize } from "@/lib/og";

const card: Card = {
  headline: ["The rest of what", "we make."],
  chips: ["Apps", "Browser extensions", "Web tools"],
};

export const alt = ogAlt(card);
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard(card);
}
