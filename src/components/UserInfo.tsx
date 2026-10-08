"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();

  console.log("Session:", session);
  console.log("Pending:", isPending);
  const user = session?.user;
  
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {isPending ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="flex flex-col items-center gap-3">
          <div className="avatar">
            <div className="w-11 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
              <img
                alt="Tailwind-CSS-Avatar-component"
                src={session.user?.image as string}
              />
            </div>
          </div>

          <p className="text-sm font-semibold text-base-content">
            Welcome, {user.name}
          </p>

          <button onClick={handleSignOut} className="btn btn-xs btn-error px-4">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href={"/signIn"}>
            <button className="btn btn-xs bg-white border-gray-300 text-gray-700">
              সাইন ইন
            </button>
          </Link>

          <Link href={"/signUp"}>
            <button className="btn btn-xs bg-[#FC3F33] text-white border-none">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
