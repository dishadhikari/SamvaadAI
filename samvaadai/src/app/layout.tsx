import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "SamvaadAI — Every sign deserves to be seen", description: "A multilingual Indian Sign Language learning and communication experience." };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
