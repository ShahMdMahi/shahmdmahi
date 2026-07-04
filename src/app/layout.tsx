import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Shah Md Mahi - Full Stack Developer",
  description:
    "Full stack developer specializing in TypeScript, Next.js, Node.js, and cloud technologies. Explore my portfolio featuring modern web applications and robust backend systems.",
  keywords: [
    "Full Stack Developer",
    "TypeScript",
    "Next.js",
    "Node.js",
    "React",
    "PostgreSQL",
    "AWS",
  ],
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0f0f1e",
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body className="antialiased font-sans">
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
