import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import SpaceBackground from "@/components/space-background";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Abhishek Bam - Web Developer & Aspiring UI/UX Designer",
  description:
    "Portfolio of Abhishek Bam, a passionate Web Developer with a keen interest in UI/UX design. Explore my projects and skills.",
  keywords: ["Web Developer", "UI/UX Designer", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Abhishek Bam" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.abhishekbam.com",
    title: "Abhishek Bam - Web Developer & Aspiring UI/UX Designer",
    description:
      "Portfolio of Abhishek Bam, a passionate Web Developer with a keen interest in UI/UX design. Explore my projects and skills.",
    images: [
      {
        url: "https://www.abhishekbam.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abhishek Bam Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} space-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SpaceBackground />
          <Header />
          <main className="min-h-screen relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
