import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Top Section: Brand, Links & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left border-b border-gray-800 pb-8">

          {/* Logo / Brand Name */}
          <div className="space-y-2">
            <Link href="/" className="text-2xl font-bold text-white tracking-wide">
              All time <span className="text-[#FC3F33]">updated</span>
            </Link>
            <p className="text-xs text-gray-400 max-w-sm mx-auto md:mx-0">
              সর্বশেষ ও বস্তুনিষ্ঠ খবরের বিশ্বস্ত প্ল্যাটফর্ম। ২৪ ঘণ্টা সংবাদের সাথে থাকুন।
            </p>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-[#FC3F33] transition-colors">
                প্রচ্ছদ
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#FC3F33] transition-colors">
                আমাদের সম্পর্কে
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-[#FC3F33] transition-colors">
                গোপনীয়তা নীতি
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#FC3F33] transition-colors">
                যোগাযোগ
              </Link>
            </li>
          </ul>

          {/* Developer Contact Info */}
          <div className="text-sm space-y-1.5 md:text-right text-gray-400">
            <p className="font-semibold text-gray-200">যোগাযোগ ও ডেভেলপার:</p>
            <p className="text-xs sm:text-sm">
              📧 Email:{" "}
              <a
                href="mailto:junayedhasan302@gmail.com"
                className="text-gray-300 hover:text-[#FC3F33] transition-colors"
              >
                junayedhasan302@gmail.com
              </a>
            </p>
            <p className="text-xs sm:text-sm">
              💻 GitHub:{" "}
              <a
                href="https://github.com/junayedhasan302"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#FC3F33] transition-colors"
              >
                github.com/junayedhasan302
              </a>
            </p>
          </div>

        </div>

        {/* Bottom Section: Copyright & Credit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} All time updated. সর্বস্বত্ব সংরক্ষিত। API from BBC</p>
          <p className="flex items-center gap-1">
            Developed with <span className="text-red-500">❤️</span> by{" "}
            <a
              href="https://github.com/junayedhasan302"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 font-semibold hover:text-[#FC3F33] transition-colors underline underline-offset-2"
            >
              Junayed Hasan
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;