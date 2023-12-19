"use client";
import { SheetFooter, SheetClose } from "@/components/ui/sheet";
import { useFormik } from "formik";
import { DataContext } from "../component/Providers";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const AddNewWord = () => {
  const { wordsList, setWordsList } = useContext(DataContext);
  const formik = useFormik({
    initialValues: {
      word: "",
      comment: "",
      sentence: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      const result = fetch("/api/word/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setSubmitting(false);
      setWordsList([...wordsList, values]);
      toast.success("new word gathered!");
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="word" className="text-right text-sm font-medium">
            Word
          </label>
          <input
            id="word"
            name="word"
            className="input input-bordered col-span-3"
            onChange={formik.handleChange}
            value={formik.values.word}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label
            htmlFor="comment"
            className="self-start text-right text-sm font-medium"
          >
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            className="textarea textarea-bordered col-span-3"
            onChange={formik.handleChange}
            value={formik.values.comment}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label
            htmlFor="sentence"
            className="self-start text-right text-sm font-medium"
          >
            Sentence
          </label>
          <textarea
            id="sentence"
            name="sentence"
            className="textarea textarea-bordered col-span-3"
            onChange={formik.handleChange}
            value={formik.values.sentence}
          />
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit" disabled={formik.isSubmitting}>
            Save Word
          </Button>
        </SheetClose>
      </SheetFooter>
    </form>
  );
};

export default AddNewWord;
