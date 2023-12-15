"use client";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Toaster } from "react-hot-toast";
import { WordData } from "./DisplayedWord";

interface ProvidersProps {
  children: ReactNode;
}

export const DataContext = createContext<{
  wordsList: WordData[];
  setWordsList: Dispatch<SetStateAction<WordData[]>>;
}>({
  wordsList: [],
  setWordsList: () => {},
});

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [wordsList, setWordsList] = useState<WordData[]>([]);
  return (
    <DataContext.Provider value={{ wordsList, setWordsList }}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      {children}
    </DataContext.Provider>
  );
};

export default Providers;
