import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "HuntBoard",
  description: "A Powerful Tool To Track Your Job Applications.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mode = (await cookies()).get("mode")?.value;

  return (
    <html lang="en" className={mode}>
      <body className="dark:bg-gray-800">{children}</body>
    </html>
  );
}
