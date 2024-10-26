import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

export const dynamic = "force-dynamic";
export const revalidate = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Trading Lab",
  description: "Create Trading Strategies with the Help of AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} style={{ height: "100vh" }}>
      <head />
      <body className={inter.className + " min-h-full"}>
        <Navbar />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
