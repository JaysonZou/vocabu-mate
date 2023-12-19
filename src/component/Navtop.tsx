"use client";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddNewWord from "./AddNewWord";

const Navtop = () => {
  return (
    <Sheet>
      <div className="sticky left-0 top-0 navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/WordList">Words</Link>
              </li>
              <li>
                <Link href="/review">Review</Link>
              </li>
              <li>
                <Link href="/notes">Notes</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <SheetTrigger>Open</SheetTrigger>
        </div>

        <SheetContent side={"top"}>
          <SheetHeader>
            <SheetTitle>Gather a new word</SheetTitle>
            <SheetDescription>
              Collet a new word to your list here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <AddNewWord />
        </SheetContent>
      </div>
    </Sheet>
  );
};
export default Navtop;
