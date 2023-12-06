import type { Metadata } from "next";
import { Inter, Pacifico, Roboto } from "next/font/google";
import clsx from "clsx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter"
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto"
});

const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-pacifico"
});

export const metadata: Metadata = {
  title: "Music Shop",
  description: "Unlock Your Musical Journey",
};

const pages: Record<string, `/${string}`> = {
  "Home": "/",
  "Music Instruments": "/music-instruments",
  "Audio Equipment": "/audio-equipment",
  "Learning and Resources": "/learning-and-resources/sheet-music",
  "Contact and Support": "/contact-and-support",
  "Login": "/login"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(roboto.variable, pacifico.variable)}>
        {children}
        <Footer pages={pages} />
      </body>
    </html>
  );
}