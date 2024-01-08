"use client";
import { cn } from "@/lib/utils";
import { MilkdownEditor } from "./Editor";
import { useState, useEffect } from "react";
import { MilkdownProvider } from "@milkdown/react";

export default function PostArea({ data }: { data: Post[] }) {
  const [isClient, setIsClient] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="flex gap-4 min-h-[400px]">
      <nav className="grid items-start gap-2 border-r min-w-[160px]">
        {data.map((item) => {
          return (
            item.title && (
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <span>{item.title}</span>
              </span>
            )
          );
        })}
      </nav>
      {isClient && (
        <MilkdownProvider>
          <MilkdownEditor />
        </MilkdownProvider>
      )}
    </div>
  );
}
