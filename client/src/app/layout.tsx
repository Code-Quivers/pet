import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import Providers from "@/utils/provider";
import { InternetDisconnectedMessage } from "@/components/Alert/InternetDisconnectMessage";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "E.T. Phone Home",
  description: "Easy Tap",
  authors: [
    {
      name: "CODEQUIVERS",
      url: "codequivers.com",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={poppins.className}>
        <InternetDisconnectedMessage />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
