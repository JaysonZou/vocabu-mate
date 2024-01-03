"use client";
import { SheetFooter, SheetClose } from "@/components/ui/sheet";
import { useFormik } from "formik";
import { DataContext } from "../component/Providers";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useUnauthorizedRedirect from "@/lib/useUnauthorizedRedirect";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const AddNewWord = ({ className }: React.ComponentProps<"form">) => {
  const { wordsList, setWordsList } = useContext(DataContext);
  const handleUnauthorized = useUnauthorizedRedirect();
  const formik = useFormik({
    initialValues: {
      word: "",
      comment: "",
      sentence: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      const result = await fetch("/api/word/modify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setSubmitting(false);

      if (result.ok) {
        toast.success("Successfully add!");
        formik.resetForm();
        setWordsList([...wordsList, values]);
      } else {
        toast.error(result.statusText);
        if (result.status === 401) {
          handleUnauthorized();
        }
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="word">Word</Label>
        <Input
          id="word"
          name="word"
          onChange={formik.handleChange}
          value={formik.values.word}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          name="comment"
          onChange={formik.handleChange}
          value={formik.values.comment}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="sentence">Sentence</Label>
        <Textarea
          id="sentence"
          name="sentence"
          onChange={formik.handleChange}
          value={formik.values.sentence}
        />
      </div>
      <SheetClose asChild>
        <Button type="submit" disabled={formik.isSubmitting}>
          Save Word
        </Button>
      </SheetClose>
    </form>
  );
};

export default AddNewWord;
