import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import "./home.css";
import Footer from "./components/Footer";
import Link from "next/link";
import HamburgerMenu from "./components/HamburgerMenu";
import Navbar from "./components/navbar";
import ReactQueryProviders from "./utils/ReactQueryProviders";

const noto_sans = Noto_Sans_KR({ subsets: ["latin"] });

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
            <body className={noto_sans.className}>
                <ReactQueryProviders>
                    <Navbar />
                    <div className="min-h-screen">{children}</div>
                    <Footer />
                </ReactQueryProviders>
            </body>
        </html>
    );
}
