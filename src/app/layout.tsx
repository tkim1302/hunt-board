import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HuntBoard",
  description: "A Powerful Tool To Track Your Job Applications.",
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
