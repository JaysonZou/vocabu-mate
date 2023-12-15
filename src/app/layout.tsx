"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navtop from "@/component/Navtop";
import Providers from "@/component/Providers";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import { WordData } from "@/component/DisplayedWord";

const inter = Inter({ subsets: ["latin"] });

export const DataContext = createContext<{
  wordsList: WordData[];
  setWordsList: Dispatch<SetStateAction<WordData[]>>;
}>({
  wordsList: [],
  setWordsList: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wordsList, setWordsList] = useState<WordData[]>([]);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <DataContext.Provider value={{ wordsList, setWordsList }}>
            <Navtop />
            {children}
          </DataContext.Provider>
        </Providers>
      </body>
    </html>
  );
}
