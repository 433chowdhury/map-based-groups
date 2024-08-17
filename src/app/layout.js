import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Map Based Groups",
  description: "Groups information using Google Map",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={twMerge("text-gray-700", inter.className)}>{children}</body>
    </html>
  );
}
