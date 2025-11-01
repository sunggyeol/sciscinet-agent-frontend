import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SciSciNet Agent",
  description: "AI-powered research data analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
