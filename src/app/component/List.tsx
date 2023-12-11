"use client";

import { HTMLAttributes } from "react";
import { WordData } from "../DisplayWord/page";

interface ListProps {
  listData: WordData[];
}
export const List: React.FC<ListProps> = ({ listData }) => {
  return (
    <div className="flex flex-col">
      {listData.map((item, index) => {
        return <ListCard key={index} wordData={item} className="join-item" />;
      })}
    </div>
  );
};

interface ListCardProps extends HTMLAttributes<HTMLDivElement> {
  wordData: WordData;
}
export const ListCard: React.FC<ListCardProps> = ({ wordData }) => {
  return (
    <div className="rounded-md w-full mb-4 py-2 px-4 border-b">
      <h2 className="card-title">{wordData.word}</h2>
      <p>{wordData.sentence}</p>
      <p>{wordData.comment}</p>
    </div>
  );
};
