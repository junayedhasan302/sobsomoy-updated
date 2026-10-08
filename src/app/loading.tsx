
import React from "react";

const Loading = () => {
  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FC3F33] animate-spin" />
        </div>

        {/* Loading Text */}
        <p className="mt-5 text-gray-600 font-medium">
          খবর লোড হচ্ছে
          <span className="inline-flex ml-1">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce [animation-delay:150ms]">.</span>
            <span className="animate-bounce [animation-delay:300ms]">.</span>
          </span>
        </p>
      </div>
    </main>
  );
};

export default Loading;

