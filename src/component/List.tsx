"use client";

import { FileEdit, Flag, HelpCircle, Trash2 } from "lucide-react";
import { WordData } from "./DisplayedWord";

import { toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
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
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

interface ListProps {
  listData: WordData[];
}

const ICON_SIZE = 18;

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
    <Accordion type="multiple" className="w-2/5">
      {wordsList.map((item) => {
        return (
          <AccordionItem value={item.word} key={item.word}>
            <div className="flex items-center justify-between">
              <span className=" font-semibold text-xl ml-10 mr-20  w-10">
                {item.word}
              </span>
              <div className=" flex gap-2">
                {/* 旗标 */}
                <ChooseFlag />

                {/* 编辑 */}
                <Dialog>
                  <DialogTrigger>
                    <FileEdit size={ICON_SIZE} />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                {/* 删除 */}
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2 size={ICON_SIZE} />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete the word{" "}
                        <span className="badge badge-warning">{item.word}</span>
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
              <AccordionTrigger>
                <HelpCircle size={ICON_SIZE} />
              </AccordionTrigger>
            </div>
            <AccordionContent className="text-sm opacity-50 mb-2">
              {item.comment}
              <div>{item.sentence}</div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export const ChooseFlag = ({ currentColor = "" }) => {
  const colors = ["red", "green", "orange", "pink"];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Flag size={ICON_SIZE} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20">
        {colors.map((c) => (
          <DropdownMenuItem key={c} className="flex justify-center">
            <Flag size={ICON_SIZE} color={c} fill={c} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
