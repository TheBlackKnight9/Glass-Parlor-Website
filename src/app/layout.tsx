import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GLOSS STUDIO — Nails • Beauty • Makeup | Luxury Atelier Shimla",
  description: "A world-class luxury beauty atelier, editorial fashion magazine, and premium wellness sanctuary in New Shimla. Experience bespoke nails, skin therapy, and high-fashion makeup styling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body className="bg-luxury-pearl text-luxury-obsidian font-sans selection:bg-luxury-rose selection:text-luxury-plum min-h-full">
        {children}
      </body>
    </html>
  );
}
