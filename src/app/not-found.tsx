import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-white">
      <div className="text-center max-w-xl">
        {/* Crying Face */}
        <div className="text-7xl sm:text-8xl mb-6 animate-bounce">
          😢
        </div>

        {/* 404 */}
        <h1 className="text-[100px] sm:text-[140px] leading-none font-black tracking-tight text-[#FC3F33]">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
          খবরটি খুঁজে পাওয়া যায়নি!
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-500 text-base sm:text-lg leading-relaxed">
          দুঃখিত! আপনি যে পাতাটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে,
          পরিবর্তন করা হয়েছে অথবা ঠিকানাটি ভুল।
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full
          bg-[#FC3F33] text-white font-semibold
          hover:bg-[#e7352b] hover:shadow-lg
          transition-all duration-300"
        >
          <span>←</span>
          হোমে ফিরে যান
        </Link>

        {/* Small branding */}
        <p className="mt-8 text-sm text-gray-400">
          সব-সময় আপডেটেড
        </p>
      </div>
    </main>
  );
}