"use client";

import {
  ChevronDown,
  FileEdit,
  Flag,
  HelpCircle,
  Search,
  Trash2,
} from "lucide-react";
import { WordData } from "./DisplayedWord";

import { toast } from "react-hot-toast";
import { useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "@/component/Providers";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import WordFormDialog from "./WordFormDialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";

interface ListProps {
  listData: WordData[];
}

const ICON_SIZE = 18;

export const List: React.FC<ListProps> = ({ listData }) => {
  const { wordsList, setWordsList } = useContext(DataContext);
  const [filterFlag, setFilterFlag] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setWordsList(listData);
  }, [listData, setWordsList]);

  const filteredList = useMemo(
    () =>
      wordsList
        .filter((w) => (filterFlag ? w.flag === filterFlag : w))
        .filter((w) => w.word.includes(searchValue)),
    [wordsList, filterFlag, searchValue]
  );

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

  const changeFlagForWord = async (word: string, flag = "") => {
    try {
      await fetch("/api/word/flag", {
        method: "POST",
        body: JSON.stringify({
          word,
          flag,
        }),
      });
      setWordsList((prev) =>
        prev.map((w) => {
          if (w.word === word) {
            w.flag = flag;
          }
          return w;
        })
      );
    } catch (error) {}
  };

  return (
    <div className="flex flex-col w-[420px]">
      <div className="flex items-center border rounded-md py-1">
        <ChooseFlag currentColor={filterFlag} onSelect={setFilterFlag} />
        <Search size={ICON_SIZE} />
        <Input
          className="w-[140px]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {filterFlag}
      </div>
      <Accordion type="multiple">
        {filteredList.map((item) => {
          return (
            <AccordionItem value={item.word} key={item.word}>
              <div className="flex items-center justify-between">
                <span className="flex gap-2 font-semibold text-xl mr-20">
                  <AccordionTrigger>{item.word}</AccordionTrigger>

                  {/* 旗标 */}
                  <ChooseFlag
                    key={item.word}
                    currentColor={item.flag}
                    onSelect={(flag: string) =>
                      changeFlagForWord(item.word, flag)
                    }
                  />
                </span>
                <div className=" flex gap-2">
                  {/* 编辑 */}
                  <WordFormDialog
                    mode="modify"
                    trigger={<FileEdit size={ICON_SIZE} />}
                  ></WordFormDialog>

                  {/* 删除 */}
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash2 size={ICON_SIZE} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete the word{" "}
                          <span className="badge badge-warning">
                            {item.word}
                          </span>
                          ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDel(item.word)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <AccordionContent className="text-sm opacity-50 mb-2">
                {item.comment}
                <div>{item.sentence}</div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export const ChooseFlag = ({ currentColor = "", onSelect }: any) => {
  const colors = ["red", "green", "orange", "pink", "blue", "yellow"];
  const flagIcon = currentColor ? (
    <Flag size={ICON_SIZE} color={currentColor} fill={currentColor} />
  ) : (
    <Flag size={ICON_SIZE} />
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} size={"icon"}>
          {flagIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20">
        {colors.map((c) => (
          <DropdownMenuItem
            key={c}
            className="flex justify-start text-neutral-500"
            onClick={() => onSelect(c)}
          >
            <Flag size={ICON_SIZE} color={c} fill={c} className="mr-2" />{" "}
            {c.toString().toUpperCase()}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center" onClick={() => onSelect("")}>
          清除旗标
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
