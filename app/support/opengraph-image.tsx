import { type Card, ogAlt, ogCard, ogContentType, ogSize } from "@/lib/og";

const card: Card = {
  headline: ["Stuck on something?", "Get a person."],
  chips: ["Email support", "Answers to the common ones", "No ticket queue"],
};

export const alt = ogAlt(card);
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard(card);
}
