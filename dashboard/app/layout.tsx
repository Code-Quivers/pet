"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import LayoutProvider from "@/components/providers/LayoutProvider";

import "rsuite/dist/rsuite-no-reset.min.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main>
          <LayoutProvider>{children}</LayoutProvider>
        </main>
      </body>
    </html>
  );
}
