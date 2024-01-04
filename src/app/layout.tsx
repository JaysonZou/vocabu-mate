import { Inter } from "next/font/google";
import "./globals.css";
import Navtop from "@/component/Navtop";
import Providers from "@/component/Providers";
import { Metadata } from "next/types";
import { getCurrentUser } from "@/lib/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VocabuMate",
  description: "Manage your words easily",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
