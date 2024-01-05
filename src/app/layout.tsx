import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Providers from "@/component/Providers";
import { Metadata } from "next/types";
import { cn } from "@/lib/utils";

const inter = FontSans({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
