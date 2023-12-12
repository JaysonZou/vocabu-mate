"use client";
import { Formik } from "formik";

const AddNewWord = () => {
  return (
    <Formik
      initialValues={{ word: "", comment: "", sentence: "" }}
      validate={(values) => {
        const errors: typeof values = {
          word: "",
          comment: "",
          sentence: "",
        };
        if (!values.word) {
          errors.word = "Required";
        }
        if (!values.sentence) {
          errors.sentence = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("asdfasdf");
        // const result = fetch("/api/word/add", {
        //   method: "post",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(values),
        // });
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        handleSubmit,
        /* and other goodies */
      }) => (
        <form
          className="flex flex-col justify-center align-middle max-w-lg m-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor="wordInput" className="form-control w-lg max-w-xs">
            <div className="label">
              <span className="label-text">Word</span>
            </div>
            {errors.word && touched.word && errors.word}
            <input
              id="wordInput"
              type="text"
              className="input input-bordered w-full max-w-xs"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.word}
              name="word"
            />
          </label>

          <label htmlFor="commentInput" className="form-control w-lg max-w-xs">
            <div className="label">
              <span className="label-text">Comment</span>
            </div>
            {errors.comment && touched.comment && errors.comment}
            <textarea
              id="commentInput"
              className="input input-bordered w-full max-w-xs"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.comment}
              name="comment"
            />
          </label>

          <label htmlFor="SentenceInput" className="form-control w-lg max-w-xs">
            <div className="label">
              <span className="label-text">Sentence in use</span>
            </div>
            {errors.sentence && touched.sentence && errors.sentence}
            <textarea
              id="SentenceInput"
              className="textarea textarea-bordered"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.sentence}
              name="sentence"
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn  btn-neutral"
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default AddNewWord;
