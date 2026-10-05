import Image from "next/image";
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
    <div className="card bg-base-100 border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
      {/* News Image */}
      <figure className="h-48 md:h-52 lg:h-48 w-full overflow-hidden">
        <Image
          height={400}
          width={600}
          src={news.imageUrl}
          alt={news.imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
        />
      </figure>

      {/* News Content */}
      <div className="card-body p-5">
        <p className="text-xs text-red-600 font-bold uppercase tracking-wide">
          {news.category}
        </p>

        <h2 className="card-title text-lg font-bold leading-snug text-gray-800">
          {news.title}
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {news.description}
        </p>

        <small className="text-xs text-gray-500 border-t border-gray-200 pt-3 mt-2">
          প্রকাশিত:{" "}
          {new Date(news.lastPublished).toLocaleString("bn-BD", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </small>
      </div>
    </div>
  );
};

export default NewsCard;
