import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./home.css";
import Footer from "./components/Footer";
import Link from "next/link";
import HamburgerMenu from "./components/HamburgerMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Matjalal",
  description: "food custom and Recomandation",
  icons: {
    icon: "/favicon-16x16.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Jersey+10+Charted&family=Noto+Sans+KR:wght@100..900&display=swap" rel="stylesheet" />

      </head>
      <body className={inter.className}>
        <div className="flex justify-between mx-5 my-5">
          <HamburgerMenu />
          <Link href="/member/login"><img className="size-10" src="/lock-icon.svg" alt="Locker Icon Image" /></Link>
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
