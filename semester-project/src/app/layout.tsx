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
  title: "GString | Music Shop",
  description: "Unlock Your Musical Journey",
};

const pages: Record<string, `/${string}`> = {
  "Guitars": "/guitars",
  "Keys": "/keys",
  "Drums": "/drums",
  "Orchestra": "/orchestra",
  "Equipment": "/equipment",
  "Vinyls": "/vinyls"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(roboto.variable, "font-roboto w-full h-full m-0 p-0 overflow-x-hidden")}>
        <Navbar pages={pages}/>
        {children}
        <Footer pages={pages} />
      </body>
    </html>
  );
}