import { Inter } from "next/font/google";
import "./globals.css";
import "./home.css";
import Footer from './components/Footer.tsx';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
