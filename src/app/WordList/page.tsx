"use client";

import { List } from "../component/List";

const WordList = () => {
  const words = [
    {
      word: "Hello",
      sentence: "Say hello to you",
      comment: "你好",
    },
    {
      word: "Bees",
      sentence: "Say Bees to you",
      comment: "蜜蜂",
    },
    {
      word: "transaction",
      sentence: "Say Bees to you",
      comment: "事物",
    },
  ];
  return (
    <main className="flex justify-center">
      <List listData={words} />
    </main>
  );
};

export default WordList;
