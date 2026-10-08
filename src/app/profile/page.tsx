
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

const ProfilePage = () => {
  // Accessing User
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Image preview state
  const [showImagePreview, setShowImagePreview] = useState(false);

  console.log(user);

  // Session loading
  if (isPending) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  // If user is not logged in
  if (!user) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            You are not logged in.
          </p>

          <Link
            href="/signIn"
            className="mt-2 inline-block text-sm font-semibold text-[#FC3F33] hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Profile */}
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
          {/* Top Section */}
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <button
              type="button"
              onClick={() => setShowImagePreview(true)}
              className="h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[#FC3F33]/20 transition hover:ring-[#FC3F33]/50"
              aria-label="View profile picture"
            >
              <img
                src={user.image || "/default-avatar.png"}
                alt={user.name || "User Avatar"}
                className="h-full w-full cursor-pointer object-cover transition duration-300 hover:scale-110"
              />
            </button>

            {/* User Basic Info */}
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base font-bold text-gray-800">
                {user.name}
              </h1>

              <p className="truncate text-sm text-gray-500">
                {user.email}
              </p>

              {/* Verification */}
              {user.emailVerified ? (
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-green-600">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                    ✓
                  </span>
                  Verified
                </span>
              ) : (
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-red-500">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    !
                  </span>
                  Not Verified
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-gray-100" />

          {/* Updated At */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Last updated</span>

            <span className="font-medium text-gray-600">
              {new Date(user.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Back Home */}
          <Link
            href="/"
            className="mt-4 block rounded-lg border border-gray-200 py-2 text-center text-sm font-semibold text-gray-600 transition hover:border-[#FC3F33] hover:bg-[#FC3F33] hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Full Screen Image Preview */}
      {showImagePreview && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setShowImagePreview(false)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setShowImagePreview(false)}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
            aria-label="Close image preview"
          >
            ×
          </button>

          {/* Website Max Width */}
          <div
            className="relative flex w-full max-w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl shadow-2xl">
              <img
                src={user.image || "/default-avatar.png"}
                alt={user.name || "User Avatar"}
                className="block max-h-[90vh] max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
