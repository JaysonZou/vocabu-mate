"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Search } from "lucide-react";
import { useState } from "react";

interface DictRes {
  license: string;
  phonetics: string;
  sourceUrls: string;
  word: string;
}

interface NoFound {
  title: string;
  resolution: string;
  messaege: string;
}

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [res, setRes] = useState<DictRes | NoFound>();

  const lookUp = async (word: string) => {
    const res = await fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
    );

    const data = await res.json();
    setRes(data);
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
      <div>{JSON.stringify(res)}</div>
    </>
  );
}
