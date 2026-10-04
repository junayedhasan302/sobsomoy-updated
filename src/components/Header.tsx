import Image from "next/image";
import React from "react";
import logo from "../../public/logo.webp";
import NavLinks from "./NavLinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex max-w-7xl mx-auto items-center justify-between px-4 py-3">
        {/* Logo + Text */}
        <div className="flex items-center gap-3">
          <Image
            className="w-10 h-10"
            height={50}
            width={50}
            src={logo}
            alt="All time updated"
          />

          <div className="flex flex-col">
            <h2 className="font-bold text-[#FC3F33]">All time updated</h2>
            <p className="text-sm text-gray-600">{date}</p>
          </div>
        </div>

        {/* Sign in / Sign up */}
        <div className="flex gap-2">
          <button className="btn btn-sm">সাইন ইন</button>

          <button className="btn btn-sm bg-[#FC3F33] text-white border-none hover:bg-[#e83228]">
            সাইন আপ
          </button>
        </div>
        <NavLinks/>
      </div>
    </header>
  );
};

export default Header;
