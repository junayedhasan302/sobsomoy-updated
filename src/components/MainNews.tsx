import Image from "next/image";

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
  firstPublished: string;
  lastPublished: string;
  source: string;
}

const MainNews = ({ news }: { news: INews[] }) => {
  const [firstNews, ...otherNews] = news;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Main News */}
      <div className="card bg-base-100 col-span-1 md:col-span-2 shadow-sm">
        <figure className="h-64 md:h-auto overflow-hidden">
          <Image
            height={600}
            width={700}
            src={firstNews.imageUrl}
            alt={firstNews.imageAlt}
            className="h-full w-full object-cover"
          />
        </figure>

        <div className="card-body">
          <p className="text-sm text-red-700 font-bold">
            {firstNews.category}
          </p>

          <h2 className="card-title">
            {firstNews.title}
          </h2>

          <p>{firstNews.description}</p>

          {/* Last Published */}
          <small className="text-gray-500">
            প্রকাশিত:{" "}
            {new Date(firstNews.lastPublished).toLocaleString("bn-BD", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </small>
        </div>
      </div>

      {/* Other News */}
      <div className="col-span-1 space-y-3">
        {otherNews.slice(0, 4).map((oNews) => (
          <div
            key={oNews.id}
            className="card bg-base-100 p-5 border border-gray-200 shadow-sm"
          >
            <p className="text-sm text-red-700 font-bold">
              {oNews.category}
            </p>

            <h3 className="font-semibold text-sm">
              {oNews.title}
            </h3>

            <p className="text-xs text-gray-500 mt-2">
              {oNews.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainNews;

