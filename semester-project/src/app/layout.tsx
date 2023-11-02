import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex justify-center">
          <ul className="flex flex-row justify-around text-lg p-14 gap-9">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/music-instruments">Music Instruments</Link>
            </li>
            <li>
              <Link href="/audio-equipment">Audio Equipment</Link>
            </li>
            <li>
              <Link href="/learning-and-resources/sheet-music">Learning and Resources</Link>
            </li>
            <li>
              <Link href="/contact-and-support">Contact and Support</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
