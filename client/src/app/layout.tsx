import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import Providers from "@/utils/provider";
import Script from "next/script";
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
    <html lang="en">
      <>
        <Script
          id="tawk"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/65e4b9599131ed19d97440f8/1ho2n8215';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
          }}
        />
        <body className={nunito.className}>
          <InternetDisconnectedMessage />
          <Providers>{children}</Providers>
        </body>
      </>
    </html>
  );
}
