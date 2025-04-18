import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ImageProvider } from "./context/ImageContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// export const metadata: Metadata = {
//   title: "",
//   description: "Generated by create next app",
// };
export const metadata: Metadata = {
  title: "Resources and Insights",
  description:
    "The latest industry news, interviews, technologies, and resources.",
  // icons: {
  //   icon: '/favicon.ico',
  // },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ImageProvider>
          <main className="min-h-screen overflow-x-hidden">{children}</main>
        </ImageProvider>
      </body>
    </html>
  );
}
