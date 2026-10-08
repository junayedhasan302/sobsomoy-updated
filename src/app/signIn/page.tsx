'use client'

import { authClient } from "@/lib/auth-client";
import { success } from "better-auth";
import toast from "react-hot-toast";


const SignInPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Sign in successfully!")
      // console.log("SIGNIN DATA:", data);
      // Home page e niye jabe after sign up
      // redirect("/");
    }

    if (error) {
      // console.log("SIGNIN ERROR:", error);
      toast.error(error.message)
    }
  };




  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-red-700">সাইন ইন</h2>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset rounded-box w-md ">
          <label className="label">ইমেইল</label>
          <input
            name="email"
            type="email"
            className="input w-md"
            placeholder="Email"
          />

          <label className="label">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            className="input w-md"
            placeholder="Password"
          />

          <button className="btn btn-neutral mt-4 bg-red-700 text-white ">
            সাইন ইন করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;
