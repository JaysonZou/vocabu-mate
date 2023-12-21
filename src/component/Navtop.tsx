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

const Navtop = () => {
  return (
    <div className="fixed left-0 top-0 navbar border-b px-44">
      <div className="navbar-start">
        <Image src="/logo.png" alt="logo" width={20} height={20} />
        <div className="ml-2">VocabuMate</div>
        <Link href="/mywords" className="mx-4 hover:underline">
          Words
        </Link>
        <Link href="/review" className="hover:underline">
          Review
        </Link>
      </div>
      <Sheet>
        <div className="navbar-end">
          <SheetTrigger>Open</SheetTrigger>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={() => signOut()}>Logout</a>
              </li>
            </ul>
          </div>
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
      </Sheet>
    </div>
  );
};
export default Navtop;
