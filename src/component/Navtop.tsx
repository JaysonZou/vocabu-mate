"use client";
import { Plus, PlusIcon, PlusSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddNewWord from "./AddNewWord";
import { useState } from "react";
import Translate from "./Translate";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Dictionary from "./Dictionary";

interface NavtopProps {
  user: User;
}

const Navtop: React.FC<NavtopProps> = ({ user }) => {
  const [sheetType, setSheetType] = useState("");
  return (
    <div className="fixed left-0 top-0 h-16 border-b px-44 flex justify-between w-full">
      <Sheet>
        <div className="flex items-center">
          <Image src="/logo.png" alt="logo" width={20} height={20} />
          <div className="ml-2">VocabuMate</div>
          <Link href="/mywords" className="mx-4 hover:underline">
            Words
          </Link>
          <Link href="/review" className="hover:underline mr-4">
            Review
          </Link>
          <SheetTrigger onClick={() => setSheetType("trans")}>
            Translate
          </SheetTrigger>
          <SheetTrigger onClick={() => setSheetType("dict")}>
            Dictionary
          </SheetTrigger>
        </div>
        <div className="flex">
          <SheetTrigger onClick={() => setSheetType("add")}>
            <Button variant={"link"} size={"sm"} className="mr-2">
              New word
            </Button>
          </SheetTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user?.image || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <SheetContent side={"top"}>
          <SheetHeader>
            {/* <SheetTitle>Gather a new word</SheetTitle>
            <SheetDescription>
              Collet a new word to your list here. Click save when you&apos;re
              done.
            </SheetDescription> */}
          </SheetHeader>
          {(() => {
            switch (sheetType) {
              case "add":
                return <AddNewWord />;
              case "trans":
                return <Translate />;
              case "dict":
                return <Dictionary />;
            }
          })()}
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default Navtop;
