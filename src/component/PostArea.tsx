"use client";
import { cn } from "@/lib/utils";
import MilkdownEditor, { EditorRefType } from "./Editor";
import { useState, useEffect, useRef } from "react";
import { MilkdownProvider } from "@milkdown/react";
import Link from "next/link";
import { Circle } from "lucide-react";

export default function PostArea({ data }: { data: Post[] }) {
  const [isClient, setIsClient] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>(data[0]);
  const [currentPostContent, setCurrentPostContent] = useState("");
  const editorRef = useRef<EditorRefType>(null);
  const [loading, setLoading] = useState(false);

  const handleEditorSave = async (content: string) => {
    await fetch("/api/posts/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentPost.id,
        content,
      }),
    });
  };

  const getEditorContent = async (id: string) => {
    setLoading(true);
    const response = await fetch("/api/posts/find", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    const data = await response.text();
    console.log("data =>>>", data);
    editorRef.current?.setValue(data);
    // setCurrentPostContent(await response.text());
    setLoading(false);
  };
  useEffect(() => {
    getEditorContent(currentPost.id);
  }, [currentPost]);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setIsClient(true);
  }, []);
  return loading ? (
    <Circle />
  ) : (
    <>
      <div className="flex gap-4 min-h-[400px]">
        <nav className="flex flex-col items-start gap-2 border-r min-w-[160px]">
          {data.map((item) => {
            return (
              item.title && (
                <a
                  key={item.id}
                  className={cn(
                    `w-full flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:cursor-pointer ${
                      item.id === currentPost.id ? "bg-accent" : ""
                    }`
                  )}
                  onClick={() => setCurrentPost(item)}
                >
                  <span>{item.title}</span>
                </a>
              )
            );
          })}
        </nav>
        {isClient && (
          <div id="milkdown-container" className="milkdown flex-1">
            {/* milkdown 的容器元素 */}
            <MilkdownProvider>
              <MilkdownEditor ref={editorRef} handleSave={handleEditorSave} />
            </MilkdownProvider>
          </div>
        )}
      </div>
    </>
  );
}
