"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

interface SearchParamType {
  from: string;
  to: string;
  q: string;
}

export default function Translate() {
  const ref = useRef<HTMLInputElement>(null);

  const search = async (q?: string) => {
    if (!q) return;

    const param: SearchParamType = {
      from: "auto",
      to: "zh",
      q,
    };
    try {
      await fetch("/api/word/trans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
      });
    } catch (error) {}
  };
  return (
    <>
      <Card>
        <CardContent>
          <Input ref={ref} placeholder="键入翻译"></Input>
          <Button onClick={() => search(ref.current?.value)}>Translate</Button>
        </CardContent>
      </Card>
    </>
  );
}
