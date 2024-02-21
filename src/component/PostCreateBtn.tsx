"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Loader, PlusCircle } from "lucide-react";

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  function generateRandomString(): string {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomString = "";

    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }
  async function onClick() {
    setIsLoading(true);

    const response = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: generateRandomString(),
        content: "to wirte something...",
      }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast.error("Your post was not created. Please try again.");
    }

    const post = await response.json();

    // This forces a cache invalidation.
    router.refresh();
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PlusCircle className="mr-2 h-4 w-4" />
      )}
      New post
    </button>
  );
}
