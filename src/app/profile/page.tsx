
"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

const ProfilePage = () => {
  /*
   * ============================================================
   * 01. SESSION & USER
   * ============================================================
   *
   * এই অংশের কাজ:
   * → বর্তমানে logged-in user-এর information নেওয়া।
   *
   * Connection:
   * → এই `user` object-এর data নিচের Profile UI-তে দেখানো হচ্ছে।
   * ============================================================
   */

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  /*
   * ============================================================
   * 02. PROFILE IMAGE PREVIEW STATE
   * ============================================================
   *
   * এই state-এর কাজ:
   * → Profile image-এ click করলে full-screen preview দেখানো।
   *
   * Connection:
   * → `showImagePreview`
   *      ↓
   * → Profile image button-এর onClick
   *      ↓
   * → Full-screen image preview
   * ============================================================
   */

  const [showImagePreview, setShowImagePreview] = useState(false);

  /*
   * ============================================================
   * 03. EDIT PROFILE STATE
   * ============================================================
   *
   * এই state-এর কাজ:
   * → Edit Profile form কখন দেখাবে/লুকাবে সেটা control করা।
   *
   * false → শুধু Basic Profile Information দেখাবে
   * true  → Edit Profile form দেখাবে
   *
   * Connection:
   * → `isEditing`
   *      ↓
   * → Edit Profile button
   *      ↓
   * → Edit Profile form
   * ============================================================
   */

  const [isEditing, setIsEditing] = useState(false);

  /*
   * ============================================================
   * 04. UPDATE PROFILE FORM STATES
   * ============================================================
   *
   * এই states-গুলো Edit Profile form-এর input values ধরে রাখে।
   *
   * Connection:
   * → name  → Name input
   * → email → Email input
   * → image → Image URL input
   *
   * পরে `handleUpdateProfile()` function এই values ব্যবহার করে
   * profile update করবে।
   * ============================================================
   */

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  /*
   * ============================================================
   * 05. UPDATE LOADING STATE
   * ============================================================
   *
   * Profile update হওয়ার সময় button disable করা এবং
   * "আপডেট হচ্ছে..." text দেখানোর জন্য এই state ব্যবহার হচ্ছে।
   *
   * Connection:
   * → `isUpdating`
   *      ↓
   * → Update button disabled
   *      ↓
   * → Loading text
   * ============================================================
   */

  const [isUpdating, setIsUpdating] = useState(false);

  console.log(user);

  /*
   * ============================================================
   * 06. SESSION LOADING
   * ============================================================
   *
   * যতক্ষণ session information load হচ্ছে,
   * ততক্ষণ loading message দেখানো হবে।
   * ============================================================
   */

  if (isPending) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  /*
   * ============================================================
   * 07. USER NOT LOGGED IN
   * ============================================================
   *
   * যদি কোনো logged-in user না থাকে,
   * তাহলে profile page-এর পরিবর্তে login করার option দেখানো হবে।
   * ============================================================
   */

  if (!user) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            আপনি লগইন করা নেই।
            <Link href={"./signIn"}>
            </Link>
          </p>

          <Link
            href="/signIn"
            className="mt-2 inline-block text-sm font-semibold text-[#FC3F33] hover:underline"
          >
            লগইন করুন
          </Link>
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * 08. UPDATE PROFILE FUNCTION
   * ============================================================
   *
   * এই function-এর কাজ:
   * → Edit Profile form submit হলে user information update করা।
   *
   * Connection:
   * → Name input
   * → Image input
   *        ↓
   * → `name` / `image` state
   *        ↓
   * → `handleUpdateProfile()`
   *        ↓
   * → `authClient.updateUser()`
   *        ↓
   * → Success / Error Toast
   *
   * NOTE:
   * Email state বর্তমানে রাখা হয়েছে তোমার existing UI অনুযায়ী,
   * কিন্তু `updateUser()`-এ email পাঠানো হচ্ছে না।
   * ============================================================
   */

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      /*
       * Profile update শুরু হয়েছে
       */
      setIsUpdating(true);

      /*
       * শুধুমাত্র যে information দেওয়া হয়েছে
       * সেটাই update করার জন্য object তৈরি করছি।
       */

      const updatedData: {
        name?: string;
        image?: string;
      } = {};

      /*
       * নতুন Name থাকলে update করার data-তে যোগ করছি।
       */

      if (name.trim()) {
        updatedData.name = name.trim();
      }

      /*
       * নতুন Image URL থাকলে update করার data-তে যোগ করছি।
       */

      if (image.trim()) {
        updatedData.image = image.trim();
      }

      /*
       * Better Auth-এর updateUser function দিয়ে
       * profile information update করছি।
       */

      const { data, error } = await authClient.updateUser(updatedData);

      /*
       * Update fail করলে error toast দেখানো হবে।
       */

      if (error) {
        console.log("UPDATE PROFILE ERROR:", error);

        toast.error("প্রোফাইল আপডেট করা যায়নি।");

        return;
      }

      /*
       * Update successful হলে console-এ updated data দেখানো হবে।
       */

      console.log("PROFILE UPDATED:", data);

      /*
       * Update successful হওয়ার পরে input fields clear করছি।
       */

      setName("");
      setEmail("");
      setImage("");

      /*
       * Edit mode বন্ধ করে আবার Basic Profile view-তে নিয়ে যাচ্ছি।
       *
       * Connection:
       * → Successful Update
       *      ↓
       * → `setIsEditing(false)`
       *      ↓
       * → Basic Profile Information
       */

      setIsEditing(false);

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      console.log("UPDATE PROFILE ERROR:", error);

      toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      /*
       * Update শেষ হলে loading state বন্ধ করছি।
       */

      setIsUpdating(false);
    }
  };

  /*
   * ============================================================
   * 09. PROFILE PAGE UI
   * ============================================================
   *
   * UI structure:
   *
   * Profile Card
   *    │
   *    ├── Basic Profile Information
   *    │
   *    ├── Last Updated
   *    │
   *    ├── Back Home
   *    │
   *    ├── Edit Profile Button
   *    │
   *    └── Edit Profile Form
   *          └── Only visible when `isEditing === true`
   *
   * ============================================================
   */

  return (
    <>
      {/* ==========================================================
          10. MAIN PROFILE CARD
          ========================================================== */}

      <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">

          {/* ======================================================
              11. BASIC PROFILE INFORMATION
              ====================================================== */}

          <div className="flex items-center gap-4">

            {/* ----------------------------------------------------
                11.1 Profile Image
                ---------------------------------------------------- */}

            <button
              type="button"
              onClick={() => setShowImagePreview(true)}
              className="h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[#FC3F33]/20 transition hover:ring-[#FC3F33]/50"
              aria-label="প্রোফাইল ছবি দেখুন"
            >
              <img
                src={user.image || "/default-avatar.png"}
                alt={user.name || "User Avatar"}
                className="h-full w-full cursor-pointer object-cover transition duration-300 hover:scale-110"
              />
            </button>

            {/* ----------------------------------------------------
                11.2 User Basic Information
                ---------------------------------------------------- */}

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base font-bold text-gray-800">
                {user.name}
              </h1>

              <p className="truncate text-sm text-gray-500">
                {user.email}
              </p>

              {/* --------------------------------------------------
                  Email Verification Status
                  -------------------------------------------------- */}

              {user.emailVerified ? (
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-green-600">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                    ✓
                  </span>

                  ভেরিফাইড
                </span>
              ) : (
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-red-500">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    !
                  </span>

                  ভেরিফাইড নয়
                </span>
              )}
            </div>
          </div>

          {/* ======================================================
              12. DIVIDER
              ====================================================== */}

          <div className="my-4 h-px bg-gray-100" />

          {/* ======================================================
              13. LAST UPDATED INFORMATION
              ====================================================== */}

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">
              সর্বশেষ আপডেট
            </span>

            <span className="font-medium text-gray-600">
              {new Date(user.updatedAt).toLocaleDateString(
                "bn-BD",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}
            </span>
          </div>

          {/* ======================================================
              14. BACK TO HOME BUTTON
              ====================================================== */}

          <Link
            href="/"
            className="mt-4 block rounded-lg border border-gray-200 py-2 text-center text-sm font-semibold text-gray-600 transition hover:border-[#FC3F33] hover:bg-[#FC3F33] hover:text-white"
          >
            হোমে ফিরে যান
          </Link>

          {/* ======================================================
              15. EDIT PROFILE TOGGLE BUTTON
              ======================================================

              এই button-এর মাধ্যমে `isEditing` state পরিবর্তন হচ্ছে।

              false → Edit Profile
              true  → এডিট বন্ধ করুন

              Connection:
              Button
                 ↓
              setIsEditing()
                 ↓
              Edit Profile Form show/hide
              ====================================================== */}

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="mt-3 w-full rounded-lg border border-[#FC3F33] py-2 text-sm font-semibold text-[#FC3F33] transition hover:bg-[#FC3F33] hover:text-white"
          >
            {isEditing ? "এডিট বন্ধ করুন" : "Edit Profile"}
          </button>

          {/* ======================================================
              16. EDIT PROFILE SECTION
              ======================================================

              IMPORTANT:
              `isEditing` true হলেই শুধু এই section render হবে।

              Connection:
              → Edit Profile button
              → `isEditing`
              → এই form
              ====================================================== */}

          {isEditing && (
            <>
              {/* --------------------------------------------------
                  Divider
                  -------------------------------------------------- */}

              <div className="my-5 h-px bg-gray-100" />

              <div>
                {/* ------------------------------------------------
                    16.1 Section Title
                    ------------------------------------------------ */}

                <h2 className="mb-3 text-sm font-bold text-gray-800">
                  প্রোফাইল আপডেট করুন
                </h2>

                {/* ------------------------------------------------
                    16.2 Update Profile Form

                    Form submit
                         ↓
                    handleUpdateProfile()
                         ↓
                    authClient.updateUser()
                    ------------------------------------------------ */}

                <form
                  onSubmit={handleUpdateProfile}
                  className="space-y-3"
                >
                  {/* ==================================================
                      17. NAME INPUT
                      ================================================== */}

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-xs font-medium text-gray-600"
                    >
                      নাম
                    </label>

                    <input
                      id="name"
                      type="text"
                      placeholder={user.name || "নতুন নাম লিখুন"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-[#FC3F33]"
                    />
                  </div>

                  {/* ==================================================
                      18. EMAIL INPUT
                      ================================================== */}

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-xs font-medium text-gray-600"
                    >
                      ইমেইল
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder={user.email || "নতুন ইমেইল লিখুন"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-[#FC3F33]"
                    />
                  </div>

                  {/* ==================================================
                      19. PROFILE IMAGE URL INPUT
                      ================================================== */}

                  <div>
                    <label
                      htmlFor="image"
                      className="mb-1 block text-xs font-medium text-gray-600"
                    >
                      প্রোফাইল ছবির লিংক
                    </label>

                    <input
                      id="image"
                      type="url"
                      placeholder="নতুন ছবির URL দিন"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-[#FC3F33]"
                    />
                  </div>

                  {/* ==================================================
                      20. UPDATE BUTTON
                      ==================================================

                      `isUpdating` state-এর সাথে এই button connected।

                      false → প্রোফাইল আপডেট করুন
                      true  → আপডেট হচ্ছে...
                      ================================================== */}

                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full rounded-lg bg-[#FC3F33] py-2 text-sm font-semibold text-white transition hover:bg-[#e7352b] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isUpdating
                      ? "আপডেট হচ্ছে..."
                      : "প্রোফাইল আপডেট করুন"}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ==========================================================
          21. FULL SCREEN PROFILE IMAGE PREVIEW
          ==========================================================

          `showImagePreview === true` হলেই এই modal দেখাবে।

          Connection:
          → Profile Image click
          → setShowImagePreview(true)
          → Full Screen Preview

          Close:
          → setShowImagePreview(false)
          ========================================================== */}

      {showImagePreview && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setShowImagePreview(false)}
        >
          {/* ------------------------------------------------------
              21.1 Close Button
              ------------------------------------------------------ */}

          <button
            type="button"
            onClick={() => setShowImagePreview(false)}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
            aria-label="ছবি বন্ধ করুন"
          >
            ×
          </button>

          {/* ------------------------------------------------------
              21.2 Full Screen Image
              ------------------------------------------------------ */}

          <div
            className="flex h-[50vh] w-[50vw] items-center justify-center overflow-hidden rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={user.image || "/default-avatar.png"}
              alt={user.name || "User Avatar"}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
