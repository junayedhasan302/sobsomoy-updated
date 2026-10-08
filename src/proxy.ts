import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "./lib/auth";
import { headers } from "next/headers";

// User login করা আছে কিনা check করার জন্য proxy function
export async function proxy(request: NextRequest) {
  // বর্তমান request-এর headers নেওয়া হচ্ছে
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Session থেকে logged-in user বের করা হচ্ছে
  const user = session?.user;

  // Console-এ session information দেখা হচ্ছে
  console.log(session);

  // User login করা না থাকলে signIn page-এ পাঠিয়ে দেওয়া হবে
  if (!user) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }
}

// কোন কোন route-এ proxy কাজ করবে সেটা নির্ধারণ করা হচ্ছে
export const config = {
  matcher: ["/profile", "/news/:path"],
};
