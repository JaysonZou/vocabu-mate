"use client";

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
      <ul className="list-disc">
        {memos.map((m) => (
          <li value={`item-${m.name}`} key={m.name}>
            {m.name}
            <br />
            {m.desc}
          </li>
        ))}
      </ul>
      <button className="btn btn-outline mt-20">Add</button>
    </div>
  );
}
