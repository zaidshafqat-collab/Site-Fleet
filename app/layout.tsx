import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
export const metadata: Metadata = {
  title: "Site Fleet — Intelligent operations, in motion",
  description: "Coordinate your sites, people, and equipment from one intelligent operations platform."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Navbar />{children}<Footer /></body></html>;
}
