import type { Metadata } from "next";
import { Inter, Pacifico, Roboto } from "next/font/google";
import clsx from "clsx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto"
});

export const metadata: Metadata = {
  title: "Music Shop",
  description: "Unlock Your Musical Journey",
};

const pages: Record<string, `/${string}`> = {
  "Guitars": "/guitars-and-basses",
  "Keys": "/keyboards-and-piano",
  "Drums": "/drums",
  "Orchestra": "/orchestra-instruments",
  "Equipment": "/audio-equipment",
  "Vinyls": "/vinyl-records"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(roboto.variable, "w-full")}>
        <Navbar pages={pages}/>
        {children}
        <Footer pages={pages} />
      </body>
    </html>
  );
}