import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Playfair_Display, Lato } from "next/font/google";

/**
 * Load Playfair Display font for headings
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

/**
 * Load Lato font for body text
 */
const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

/**
 * Metadata for the website
 */
export const metadata: Metadata = {
  title: "Syncronata",
  description: "Empowering Learning Through Innovative Solutions",
  icons: {
    icon: "/favicon/favicon.png",
    apple: "/favicon/favicon.png",
  },
};

/**
 * Root layout component
 * @param props - Props including children components
 * @returns Root layout with children
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <head>
        <link rel="icon" href="/favicon/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon/favicon.png" />
      </head>
      <body className="font-sans">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
