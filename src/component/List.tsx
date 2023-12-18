"use client";

import { Delete, Flag, Trash2 } from "lucide-react";
import { WordData } from "./DisplayedWord";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/component/Providers";

interface ListProps {
  listData: WordData[];
}

export const List: React.FC<ListProps> = ({ listData }) => {
  // const [wordsList, setWordsList] = useState(listData);
  const { wordsList, setWordsList } = useContext(DataContext);

  useEffect(() => {
    setWordsList(listData);
  }, [listData, setWordsList]);

  const handleDel = async (word: string) => {
    try {
      await fetch("/api/word/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word }),
      });
      setWordsList((prev) => prev.filter((w) => w.word !== word));
      toast.success("Successfully delete");
    } catch (error) {
      toast.error("Something went wrong. Please try later.");
    }
  };
  return (
    <div className="overflow-x-auto w-1/2">
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
          {wordsList.map((item) => {
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
                          <PopoverContent className="w-auto">
                            <div className="text-center mb-3">
                              Delete the word{" "}
                              <span className="badge badge-warning">
                                {item.word}
                              </span>
                              ?
                            </div>
                            <div className="flex justify-end gap-2">
                              <button className="btn btn-outline btn-xs">
                                cancel
                              </button>
                              <button
                                className="btn btn-neutral btn-xs"
                                onClick={() => handleDel(item.word)}
                              >
                                ok
                              </button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="text-sm opacity-50 mb-2">
                        {item.comment}
                      </div>
                      <div>{item.sentence}</div>
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
