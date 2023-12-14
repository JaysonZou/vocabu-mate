"use client";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

const Navtop = () => {
  return (
    <div className="navbar bg-base-100 border-b">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
              <Link href="/singleReview">SingleReview</Link>
            </li>
            <li>
              <Link href="/memorandum">Memo</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <label htmlFor="my-drawer" className="btn drawer-button">
          <PlusSquare />
          Collect New Word
        </label>
      </div>
    </div>
  );
};
export default Navtop;
