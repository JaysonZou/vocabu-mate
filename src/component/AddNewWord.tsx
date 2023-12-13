"use client";
import { useFormik } from "formik";

const AddNewWord = () => {
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
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="word">Word</label>
      <input
        id="word"
        name="word"
        type="text"
        className="input input-bordered w-full max-w-xs"
        onChange={formik.handleChange}
        value={formik.values.word}
      />

      <label htmlFor="comment">Comment</label>
      <textarea
        id="comment"
        name="comment"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        onChange={formik.handleChange}
        value={formik.values.comment}
      />

      <label htmlFor="sentence">Sentence</label>
      <textarea
        id="sentence"
        name="sentence"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        onChange={formik.handleChange}
        value={formik.values.sentence}
      />

      <button
        type="submit"
        className="btn btn-neutral"
        disabled={formik.isSubmitting}
      >
        Submit
      </button>
    </form>
  );
};

export default AddNewWord;
