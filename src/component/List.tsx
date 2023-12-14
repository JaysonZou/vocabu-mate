"use client";

import { Delete, Flag, Trash2 } from "lucide-react";
import { WordData } from "./DisplayedWord";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface ListProps {
  listData: WordData[];
}

export const List: React.FC<ListProps> = ({ listData }) => {
  const handleDel = (word: string) => {
    const result = fetch("/api/word/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word }),
    });
  };
  return (
    <div className="overflow-x-auto w-3/5">
      <table className="table h-fit">
        {/* head */}
        <thead>
          <tr className="text-sm">
            <th>
              <span>Filter by flags</span>
              <ChooseFlag />
            </th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item) => {
            return (
              <tr key={item.word}>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-lg mb-3 flex justify-start items-center gap-4">
                        {item.word}
                        <ChooseFlag />
                        <Popover>
                          <PopoverTrigger>
                            <Trash2 size={16} />
                          </PopoverTrigger>
                          <PopoverContent>
                            delete this word?
                            <br />
                            <button className="btn btn-outline btn-xs">
                              cancel
                            </button>
                            <button
                              className="btn btn-neutral btn-xs"
                              onClick={() => handleDel(item.word)}
                            >
                              ok
                            </button>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="text-sm opacity-50">{item.sentence}</div>
                      <div>{item.comment}</div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const ChooseFlag = ({ currentColor = "" }) => {
  const colors = ["red", "green", "orange", "pink"];
  return (
    <Popover>
      <PopoverTrigger>
        <Flag size={16} />
      </PopoverTrigger>
      <PopoverContent className="w-auto flex flex-col gap-2 p-1">
        {colors.map((c) => (
          <button key={c} className="btn btn-ghost btn-xs">
            <Flag size={16} color={c} fill={c} />
            {""}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
