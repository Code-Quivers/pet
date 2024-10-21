"use client";
import "./globals.css";
import LayoutProvider from "@/components/providers/LayoutProvider";
import "rsuite/dist/rsuite-no-reset.min.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" translate="no">
      <body suppressHydrationWarning={true} className={poppins.className}>
        <main>
          <LayoutProvider>{children}</LayoutProvider>
        </main>
      </body>
    </html>
  );
}
