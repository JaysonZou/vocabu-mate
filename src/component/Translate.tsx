"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

interface SearchParamType {
  from: string;
  to: string;
  q: string;
}

export default function Translate() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [transRes, setTransRes] = useState("");

  const search = async (q?: string, to = "zh") => {
    if (!q) return;

    const param: SearchParamType = {
      from: "auto",
      to,
      q,
    };
    try {
      const res = await fetch("/api/word/trans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
      });
      const { trans_result } = await res.json();
      console.log(trans_result);

      setTransRes(trans_result[0].dst);
    } catch (error) {}
  };
  return (
    <>
      <Card>
        <CardContent className="flex">
          <Textarea ref={ref} placeholder="键入翻译" />
          <div className="flex">
            翻译为：
            <Select
              onValueChange={(value) => search(ref.current?.value, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">En</SelectItem>
                <SelectItem value="zh">Zh</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Textarea value={transRes} />
        </CardContent>
      </Card>
    </>
  );
}
