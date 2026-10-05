import Link from "next/link";

interface IMostRead {
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

const MostRead = async () => {
  const URL = "https://news-api-v2.vercel.app/api/news/most-read";
  const res = await fetch(URL);
  const data = await res.json();
  const mostReadData: IMostRead[] = data.data;
  console.log("Most Read,", mostReadData);

  return (
    <div className="card p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
      <h1 className="text-red-800 font-bold text-xl mb-3 border-b border-red-100 pb-2">
        সর্বাধিক পঠিত
      </h1>

      <div className="grid">
        {mostReadData.map((mrNews, i) => {
          return (
            <div
              key={mrNews.id}
              className="group flex gap-3 py-3 border-b border-gray-200 last:border-b-0"
            >
              {/* Index */}
              <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 font-bold text-sm group-hover:bg-red-700 group-hover:text-white transition-colors duration-300">
                {i + 1}
              </div>

              {/* News Title */}
              <h2 className="font-semibold text-sm leading-relaxed text-gray-700 group-hover:text-red-700 transition-colors duration-300 cursor-pointer">
                <Link href={`/news/${mrNews.id}`}>{mrNews.title}</Link>
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MostRead;
