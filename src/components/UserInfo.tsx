"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();

  console.log("Session:", session);
  console.log("Pending:", isPending);

  const handleSignOut = async () => {
    await authClient.signOut();
  };
  return (
    <div>
      {isPending ? (
        <p>Loading...</p>
      ) : session?.user ? (
        <div className="flex flex-col items-center">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img
                alt="Tailwind-CSS-Avatar-component"
                src={session.user?.image as string}
              />
            </div>
          </div>
          <p>{session.user.name}</p>
          {/* <p>{session.user.email}</p> */}

          <button onClick={handleSignOut} className="btn btn-xs btn-error">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href={"/SignIn"}>
            <button className="btn btn-xs bg-white border-gray-300 text-gray-700">
              সাইন ইন
            </button>
          </Link>

          <Link href={'/signUp'}>
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
