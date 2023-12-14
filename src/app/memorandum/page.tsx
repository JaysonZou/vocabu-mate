"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

export default function Page() {
  const memosData = [
    {
      name: "Don't get things fucked",
      time: "",
      desc: "asdfasdfasfdasdfasfd",
    },
    {
      name: "Don't shake legs",
      time: "",
      desc: "asfdasdfasdf",
    },
    {
      name: "Don't play cell phone",
      time: "",
      desc: "asdfasdfasfdasdfasfd",
    },

    {
      name: "Be positive",
      time: "",
      desc: "asdfasdfasfdasdfasfd",
    },
  ];
  const [memos, setMemos] = useState(memosData);
  const handleAdd = () => {
    setMemos((prev) => [
      ...prev,
      {
        name: "",
        time: "",
        desc: "",
      },
    ]);
  };
  return (
    <div className="flex flex-col w-1/5 m-auto mt-10">
      <Accordion type="single" collapsible>
        {memos.map((m) => (
          <AccordionItem value={`item-${m.name}`} key={m.name}>
            <AccordionTrigger>{m.name}</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <button className="btn btn-outline mt-20">Add</button>
    </div>
  );
}
