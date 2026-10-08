import Image from "next/image";
import Link from "next/link";
import React from "react";

interface INews {
  id: string;
  title: string;
  description: string;
  link: string[];
  imageUrl: string[];
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string | null;
  lastPublished: string | null;
  source: string;
}

const NewsCard = ({ news }: { news: INews }) => {
  return (
    <Link href={`/news/${news.id}`} className="block w-full h-full p-4">
      <div className="w-full h-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between group">

        {/* News Image */}
        <figure className="h-48 sm:h-52 w-full overflow-hidden relative bg-gray-100 flex-shrink-0">
          <Image
            height={400}
            width={600}
            src={news.imageUrl as unknown as string}
            alt={news.imageAlt || news.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </figure>

        {/* News Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3">
          <div className="space-y-2">

            {/* Category */}
            <p className="text-xs text-red-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block"></span>
              {news.category}
            </p>

            {/* Title */}
            <h2 className="text-base sm:text-lg font-bold leading-snug text-gray-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
              {news.title}
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
              {news.description}
            </p>
          </div>

          {/* Published Date */}
          <small className="text-xs text-gray-500 border-t border-gray-100 pt-3 mt-2 block font-medium">
            প্রকাশিত:{" "}
            {news.lastPublished
              ? new Date(news.lastPublished).toLocaleString("bn-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "সাম্প্রতিক"}
          </small>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;