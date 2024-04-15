import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import Providers from "@/utils/provider";
import { InternetDisconnectedMessage } from "@/components/Alert/InternetDisconnectMessage";
 
const nunito = Nunito({
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
    <html lang="en" suppressHydrationWarning={true}>
        <body className={nunito.className}>
          <InternetDisconnectedMessage />
          <Providers>{children}</Providers>
        </body>
    </html>
  );
}
