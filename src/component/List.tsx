"use client";

import { Flag } from "lucide-react";
import { WordData } from "./DisplayedWord";

interface ListProps {
  listData: WordData[];
}

export const List: React.FC<ListProps> = ({ listData }) => {
  return (
    <div className="overflow-x-auto">
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
                      <div className="font-bold text-lg mb-3 flex align-middle items-center gap-10">
                        {item.word}
                        <ChooseFlag />
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
    <div className="dropdown ml-10">
      <div tabIndex={0} role="button">
        {currentColor ? (
          <Flag size={16} color={currentColor} fill={currentColor} />
        ) : (
          <Flag size={16} />
        )}
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {colors.map((color) => (
          <li key={color}>
            <a>
              <Flag size={16} color={color} fill={color} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
