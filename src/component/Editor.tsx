"use client";
import { defaultValueCtx, Editor, rootCtx } from "@milkdown/core";
import type { FC } from "react";

import { Milkdown, useEditor } from "@milkdown/react";
import { commonmark } from "@milkdown/preset-commonmark";
import { nord } from "@milkdown/theme-nord";

import "@milkdown/theme-nord/style.css";

import { listenerCtx, listener } from "@milkdown/plugin-listener";

const markdown = `# Milkdown Next Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Next**.`;

export const MilkdownEditor: FC = () => {
  useEditor((root) => {
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, markdown);
        ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
          console.log("markdownUpdated to=", markdown, "\nprev=", prevMarkdown);
          // setContent(markdown);
        });
      })
      .config(nord)
      .use(commonmark)
      .use(listener);
  }, []);

  return <Milkdown />;
};
