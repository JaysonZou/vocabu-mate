"use client";

import { HTMLAttributes } from "react";
import { WordData } from "../app/DisplayWord/page";

interface ListProps {
  listData: WordData[];
}
export const aList: React.FC<ListProps> = ({ listData }) => {
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

export const List: React.FC<ListProps> = ({ listData }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-sm">
            <th>Word</th>
            <th>comment</th>
            <th>Sentence</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item) => {
            return (
              <tr key={item.word}>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold font-serif text-sm">
                        {item.word}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-lg font-serif">
                    {item.comment}
                  </span>
                </td>
                <td className="font-serif">{item.sentence}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
