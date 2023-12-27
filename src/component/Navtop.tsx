"use client";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navtop = () => {
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
        </div>
        <div className="flex">
          <SheetTrigger onClick={() => setSheetType("add")}>Open</SheetTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>User</AvatarFallback>
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
          {sheetType === "add" ? <AddNewWord /> : <Translate />}
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default Navtop;
