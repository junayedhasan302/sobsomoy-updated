
"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import { useState } from "react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
        {/* Heading */}
        <div className="mb-7 text-center">
          <h2 className="text-3xl font-bold text-[#FC3F33]">
            সাইন আপ করুন
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={onSubmit}>
          <fieldset className="space-y-4">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                নাম
              </label>

              <input
                name="name"
                type="text"
                className="input w-full border-gray-300 focus:border-[#FC3F33] focus:outline-none"
                placeholder="আপনার নাম লিখুন"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Image URL
              </label>

              <input
                name="image"
                type="url"
                className="input w-full border-gray-300 focus:border-[#FC3F33] focus:outline-none"
                placeholder="আপনার ছবির URL দিন"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                ইমেইল
              </label>

              <input
                name="email"
                type="email"
                className="input w-full border-gray-300 focus:border-[#FC3F33] focus:outline-none"
                placeholder="আপনার ইমেইল লিখুন"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input w-full border-gray-300 pr-12 focus:border-[#FC3F33] focus:outline-none"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  required
                />

                {/* Show / Hide Password Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FC3F33]"
                  aria-label={
                    showPassword
                      ? "পাসওয়ার্ড লুকান"
                      : "পাসওয়ার্ড দেখুন"
                  }
                >
                  {showPassword ? (
                    /* Eye Off */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.25 4.5 5.75 6.75 9.75 6.75 1.61 0 3.12-.38 4.45-1.08M6.23 6.23A9.75 9.75 0 0 1 12 5.25c4 0 7.5 2.25 9.75 6.75a10.477 10.477 0 0 1-1.73 3.777M3 3l18 18"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                      />
                    </svg>
                  ) : (
                    /* Eye */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12Z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="btn mt-2 w-full border-none bg-[#FC3F33] text-white hover:bg-[#e83227]"
            >
              সাইন আপ করুন
            </button>
          </fieldset>
        </form>

        {/* Sign In */}
        <p className="mt-6 text-center text-sm text-gray-500">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <a
            href="/signIn"
            className="font-semibold text-[#FC3F33] hover:underline"
          >
            সাইন ইন করুন
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
