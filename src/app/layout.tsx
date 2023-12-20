import { Inter } from "next/font/google";
import "./globals.css";
import Navtop from "@/component/Navtop";
import Providers from "@/component/Providers";
import { Metadata } from "next/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VocabuMate",
  description: "Manage your words easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={(inter.className, "h-screen")}>
        <Providers>
          <Navtop />
          <div className="body-content">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
