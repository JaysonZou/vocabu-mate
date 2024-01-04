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
import { MainNavItem } from "@/types/config";

interface NavtopProps {
  user: User;
  items?: MainNavItem[];
}

const Navtop: React.FC<NavtopProps> = ({ user, items }) => {
  const [sheetType, setSheetType] = useState("");
  return (
    <div className="fixed left-0 top-0 h-16 border-b px-44 flex justify-between w-full">
      <Sheet>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Image src="/logo.png" alt="logo" width={20} height={20} />
            <div className="ml-2">VocabuMate</div>
          </div>
          <Link href="/mywords" className="hover:underline">
            Words
          </Link>
          <Link href="/review" className="hover:underline ">
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
            New word
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
            <SheetTitle>
              {(() => {
                switch (sheetType) {
                  case "add":
                    return "Add word";
                  case "trans":
                    return "Translate";
                  case "dict":
                    return "Dictionary";
                }
              })()}
            </SheetTitle>
            <SheetDescription>
              {(() => {
                switch (sheetType) {
                  case "add":
                    return "Add a new word to your list";
                  case "trans":
                    return "Translate api is used by Baidu";
                  case "dict":
                    return "en-en dictionary";
                }
              })()}
            </SheetDescription>
          </SheetHeader>
          <div className="pt-4 pb-8 w-[400px] m-auto">
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
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default Navtop;

/**
 * "use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "@/components/mobile-nav"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  )
}
 */
