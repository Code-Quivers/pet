import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "E.T. Phone Home",
  description: "Easy Tap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
