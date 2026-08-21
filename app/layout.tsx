import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SellKit — E-commerce Growth Tools",
  description:
    "Smart tools for e-commerce sellers: pricing, profit, ROAS and marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
