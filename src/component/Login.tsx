"use client";
import { Icons } from "@/component/Icons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      word: "",
      comment: "",
      sentence: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      formik.resetForm();
    },
  });

  const loginWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong with your sign in.");
    }
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
      </div>
      <div className="flex flex-col items-center gap-8">
        <form onSubmit={formik.handleSubmit} className="w-full">
          <label
            htmlFor="email"
            className="block text-sm text-gray-500 text-center"
          >
            Enter your email below to create your account
          </label>

          <div className="mt-6 flex flex-col gap-4">
            <Input
              type="email"
              placeholder="you@example.com"
              onChange={formik.handleChange}
              value={formik.values.comment}
            />
            <Button type={"submit"}>Sign In with Email</Button>
          </div>
        </form>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-gray-500 bg-white">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        onClick={loginWithGoogle}
        className="flex justify-center align-middle gap-3 items-center h-10"
      >
        <Icons.Google />
        Google
      </Button>
      <p className="px-8 text-center text-sm text-gray-500">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default Login;
