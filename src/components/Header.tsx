import Image from "next/image";
import logo from "../../public/logo.webp";
import NavLinks from "./NavLinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top Navbar */}
        <div className="flex items-center justify-between">
          {/* Logo + Date */}
          <div className="flex items-center gap-3">
            <Image
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#FC3F33]/20"
              height={50}
              width={50}
              src={logo}
              alt="All time updated"
            />

            <div className="flex flex-col leading-tight">
              <h2 className="font-bold text-lg text-[#FC3F33] tracking-tight">
                All time updated
              </h2>

              <p className="text-sm text-gray-500 mt-1">{date}</p>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex gap-2">
            <button className="btn btn-sm bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400">
              সাইন ইন
            </button>

            <button className="btn btn-sm bg-[#FC3F33] text-white border-none hover:bg-[#e83228] shadow-sm">
              সাইন আপ
            </button>
          </div>
        </div>

        {/* Category Navbar */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <NavLinks />
        </div>
      </div>
    </header>
  );
};

export default Header;
