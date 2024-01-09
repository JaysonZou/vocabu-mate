"use client";
import {
  defaultValueCtx,
  Editor,
  editorViewCtx,
  parserCtx,
  rootCtx,
} from "@milkdown/core";
import type { FC } from "react";
import { forwardRef, useEffect, useImperativeHandle } from "react";

import { Milkdown, useEditor } from "@milkdown/react";
import { commonmark } from "@milkdown/preset-commonmark";
import { nord } from "@milkdown/theme-nord";
import useDebouncedCallback from "beautiful-react-hooks/useDebouncedCallback";
import { insert, replaceAll } from "@milkdown/utils";

import "@milkdown/theme-nord/style.css";

import { listenerCtx, listener } from "@milkdown/plugin-listener";
import { Ctx } from "@milkdown/ctx";
import { Slice } from "prosemirror-model";

export interface EditorProps {
  handleSave: (content: string) => void;
}

export interface EditorRefType {
  setValue: (value: string) => void;
}

const MilkdownEditor = (
  { handleSave }: EditorProps,
  ref: React.Ref<EditorRefType>
) => {
  const onSave = useDebouncedCallback(
    (markdown) => handleSave(markdown),
    [],
    1000
  );
  const { get } = useEditor((root) => {
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, "# Hello");
        ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
          console.log("updated");
          onSave(markdown);
        });
      })
      .config(nord)
      .use(commonmark)
      .use(listener);
  }, []);

  useEffect(() => {
    // setValue(postValue)
  }, []);
  const setValue = (value: string) => {
    get()?.action((ctx: Ctx) => {
      const view = ctx.get(editorViewCtx);
      const parser = ctx.get(parserCtx);
      const doc = parser(value);
      if (!doc) return;
      const state = view.state;
      view.dispatch(
        state.tr.replace(
          0,
          state.doc.content.size,
          new Slice(doc.content, 0, 0)
        )
      );
    });
  };
  useImperativeHandle(ref, () => ({ setValue }));
  return <Milkdown />;
};

export default forwardRef(MilkdownEditor);
