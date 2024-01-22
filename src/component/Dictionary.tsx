"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface DictRes {
  license: string;
  phonetics: {
    text: string;
    audio: string;
  }[];
  sourceUrls: string;
  word: string;
  meanings: {
    partOfSpeech: string;
    antonyms: string[];
    synonyms: string[];
    definitions: {
      definition: string;
      example?: string;
    }[];
  }[];
}

interface NoFound {
  title: string;
  resolution: string;
  messaege: string;
}

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [res, setRes] = useState<DictRes>();

  const lookUp = async (word: string) => {
    try {
      const res = await fetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
      );

      const data: DictRes[] = await res.json();
      if (data.length) {
        const explanation = data[0];
        setRes(explanation);
      }
    } catch (error) {
      toast.error("ops, Something went wrong.");
    }
  };
  return (
    <>
      <div className="flex w-full items-center space-x-2 justify-center">
        <Input
          type="text"
          placeholder="look up..."
          value={word}
          className="max-w-sm "
          onChange={(e) => setWord(e.target.value)}
        />
        <Button size={"icon"} onClick={() => lookUp(word)}>
          <Search />
        </Button>
      </div>
      <div>
        <div className="font-bold text-lg">{res?.word}</div>
        <div>
          {res?.phonetics.map((item) => {
            return (
              <div key={item.text}>
                {item.text} {item.audio}
              </div>
            );
          })}
        </div>
        <div>
          {res?.meanings.map((item) => {
            return (
              <div className="mb-2 mt-2" key={item.partOfSpeech}>
                <span className=" opacity-50">{item.partOfSpeech}:</span>
                {item.definitions.map((d) => (
                  <div key={d.definition}>
                    Defination:
                    <span> · {d.definition}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
