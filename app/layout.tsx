import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "./ClientLayout";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ACED — Pseudonymous Peer Tutoring",
  description: "XRPL-verified peer tutoring marketplace for Nigerian university students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${inter.variable} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
