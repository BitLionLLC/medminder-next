import { type Card, ogAlt, ogCard, ogContentType, ogSize } from "@/lib/og";

const card: Card = {
  headline: ["Your medications", "stay yours."],
  chips: ["Never sold", "Works signed out", "Delete it all in-app"],
};

export const alt = ogAlt(card);
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard(card);
}
