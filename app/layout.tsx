import type { Metadata } from "next";
import { SiteFrame } from "@/components/SiteFrame";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "White's Castle",
    template: "%s | White's Castle",
  },
  description:
    "Order pizza, starters, pasta, deals, delivery, and pick-up from White's Castle.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}