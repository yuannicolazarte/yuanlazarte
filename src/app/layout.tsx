import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yuan Lazarte",
  description: "Graphic design and video editing portfolio.",
  icons: {
    icon: "/images/profile.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
