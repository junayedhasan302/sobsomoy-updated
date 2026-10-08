"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { showToast } from "nextjs-toast-notify";

const SignUpPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      console.log("SIGNUP DATA:", data);
      // Home page e niye jabe after sign up
      showToast.success("Account created successfully!", {
        duration: 4000,
        transition: "bounceInDown",
        position: "top-right",
        icon: "",
        sound: true,
      });
      redirect("/");
    }

    if (error) {
      console.log("SIGNUP ERROR:", error);
      console.log("SIGNUP ERROR JSON:", JSON.stringify(error, null, 2));

      showToast.error(
        error.message || "Something went wrong. Please try again!",
        {
          duration: 4000,
          transition: "swingInverted",
          icon: "",
          position: "top-right",
          sound: true,
        },
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-red-700">সাইন আপ করুন</h2>

      <form onSubmit={onSubmit}>
        <fieldset className="fieldset rounded-box w-md">
          <label className="label">নাম</label>

          <input
            name="name"
            type="text"
            className="input w-md"
            placeholder="Name"
          />

          <label className="label">Image URL</label>

          <input
            name="image"
            type="url"
            className="input w-md"
            placeholder="Image"
          />

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

          <button
            type="submit"
            className="btn btn-neutral mt-4 bg-red-700 text-white"
          >
            সাইন আপ করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;
