"use client";

import { List } from "../../component/List";

const WordList = () => {
  const words = require("../../../public/fake.json");
  return (
    <main className="flex justify-center">
      <List listData={words} />
    </main>
  );
};

export default WordList;
