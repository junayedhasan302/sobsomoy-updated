import Image from "next/image";

import logo from "../../public/AllTimeUpdatedLogo.png";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Top Navbar */}
        <div className="flex items-center justify-between">
          {/* Logo + Date */}
          <div className="flex flex-col items-center">
            <Image
              src={logo}
              alt="All time updated"
              width={300}
              height={80}
              className="w-32 sm:w-36 lg:w-40 h-auto object-contain"
              priority
            />

            <p className="hidden sm:block text-xs text-gray-500">{date}</p>
          </div>

          {/* Auth Buttons */}
          <UserInfo/>
        </div>
        <div className="relative my-8 flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute bg-white px-3 flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-widest border border-gray-200 rounded-full py-0.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FC3F33] animate-pulse"></span>
            <span>All time updated</span>
          </div>
        </div>
        {/* Category Navbar */}
        <div>
          <NavLinks />
        </div>
      </div>
    </header>
  );
};

export default Header;
