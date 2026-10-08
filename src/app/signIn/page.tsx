"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";


const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
    }

    if (error) {
      toast.error(error.message ?? "Sign in failed");
    }
  };

  const handleGoogleSignIn = async () => {
    // const data = await authClient.signIn.social({
    await authClient.signIn.social({
      provider: "google",
    });

    // console.log(data);
  };
  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
    // const data = await authClient.signIn.social({
      provider: "github",
    });

    // console.log(data);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
        {/* Heading */}
        <div className="mb-7 text-center">
          <h2 className="text-3xl font-bold text-[#FC3F33]">সাইন ইন করুন</h2>

          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>
        {/* Email & Password Form */}
        <form onSubmit={onSubmit}>
          <fieldset className="space-y-4">
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
                required
              />
            </div>

            {/* Password */}
{/* Password */}
<div>
  <div className="mb-1.5 flex items-center justify-between">
    <label className="text-sm font-medium text-gray-700">
      পাসওয়ার্ড
    </label>
  </div>

  <div className="relative">
    <input
      name="password"
      type={showPassword ? "text" : "password"}
      className="input w-full border-gray-300 pr-12 focus:border-[#FC3F33] focus:outline-none"
      placeholder="আপনার পাসওয়ার্ড লিখুন"
      required
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FC3F33]"
      aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
    >
      {showPassword ? (
        // Eye Off
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
        // Eye
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

            {/* Sign In Button */}
            <button
              type="submit"
              className="btn w-full border-none bg-[#FC3F33] text-white hover:bg-[#e83227]"
            >
              সাইন ইন করুন
            </button>
          </fieldset>
        </form>
        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200"></div>

          <span className="text-xs text-gray-400">অথবা</span>

          <div className="h-px flex-1 bg-gray-200"></div>
        </div>
        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white font-medium text-gray-700 transition hover:bg-gray-50 hover:shadow-sm"
        >
          {/* Google Logo */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26z"
            />
            <path
              fill="#34A853"
              d="M12 21.99c2.63 0 4.84-.87 6.45-2.5l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.99z"
            />
            <path
              fill="#FBBC05"
              d="M6.54 13.93A5.86 5.86 0 0 1 6.23 12c0-.67.12-1.32.31-1.93V7.54H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.46l3.24-2.53z"
            />
            <path
              fill="#EA4335"
              d="M12 6.04c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.05 14.63 2 12 2a9.75 9.75 0 0 0-8.7 5.54l3.24 2.53C7.31 7.76 9.46 6.04 12 6.04z"
            />
          </svg>
          Google দিয়ে সাইন ইন করুন
        </button>

        {/* GitHub Sign In */}
        <button
          onClick={handleGithubSignIn}
          className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white font-medium text-gray-700 transition hover:bg-gray-50 hover:shadow-sm mt-2"
        >
          {/* GitHub Logo */}
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.2 9.2 0 0 1 12 7.14c.85 0 1.7.12 2.49.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
          </svg>
          Github দিয়ে সাইন ইন করুন
        </button>

        {/* Sign Up */}
        <p className="mt-6 text-center text-sm text-gray-500">
          এখনো কোনো অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signUp"
            className="font-semibold text-[#FC3F33] hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
