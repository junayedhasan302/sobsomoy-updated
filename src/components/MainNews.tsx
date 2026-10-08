import Image from "next/image";
import Link from "next/link";

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

const MainNews = ({ news }: { news: INews[] }) => {
  if (!news || news.length === 0) return null;

  const [firstNews, ...otherNews] = news;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Main Big News */}
      <div className="col-span-1 md:col-span-2">
        <Link href={`/news/${firstNews.id}`} className="block h-full">
          <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full border border-gray-100 rounded-xl overflow-hidden">
            <figure className="h-64 md:h-80 w-full overflow-hidden relative">
              <Image
                height={600}
                width={700}
                src={
                  Array.isArray(firstNews.imageUrl)
                    ? firstNews.imageUrl[0]
                    : (firstNews.imageUrl as unknown as string)
                }
                alt={firstNews.imageAlt || firstNews.title}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </figure>

            <div className="card-body p-5">
              <p className="text-sm text-red-700 font-bold">
                {firstNews.category}
              </p>

              <h2 className="card-title text-xl font-bold">
                {firstNews.title}
              </h2>

              <p className="text-gray-600 line-clamp-3">
                {firstNews.description}
              </p>

              {/* Last Published */}
              <small className="text-gray-500 mt-2 block">
                প্রকাশিত:{" "}
                {firstNews.lastPublished
                  ? new Date(firstNews.lastPublished).toLocaleString("bn-BD", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "সাম্প্রতিক"}
              </small>
            </div>
          </div>
        </Link>
      </div>

      {/* Side / Other News List */}
      <div className="col-span-1 space-y-3">
        {otherNews.slice(0, 4).map((oNews) => (
          <Link key={oNews.id} href={`/news/${oNews.id}`} className="block">
            <div className="card bg-base-100 p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-200">
              <p className="text-xs text-red-700 font-bold uppercase tracking-wide">
                {oNews.category}
              </p>

              <h3 className="font-semibold text-sm text-gray-800 hover:text-red-600 transition-colors mt-1 line-clamp-2">
                {oNews.title}
              </h3>

              <p className="text-xs text-gray-500 mt-2 flex justify-between items-center">
                <span>{oNews.source}</span>
                <small className="text-gray-500 mt-2 block">
                  প্রকাশিত:{" "}
                  {firstNews.lastPublished
                    ? new Date(firstNews.lastPublished).toLocaleString(
                        "bn-BD",
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        },
                      )
                    : "সাম্প্রতিক"}
                </small>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
