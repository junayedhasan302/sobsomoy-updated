import Image from "next/image";

const MainNews = ({ news }) => {
  const [firstNews, ...otherNews] = news;

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* Main News */}
      <div className="card bg-base-100 col-span-2 shadow-sm">
        <figure>
          <Image
            height={600}
            width={700}
            src={firstNews.imageUrl}
            alt={firstNews.title}
            className="w-full"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{firstNews.title}</h2>
          <p>{firstNews.description}</p>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Other News */}
      <div className="space-y-3">
        {otherNews.slice(0,5).map((oNews) => (
          <div
            key={oNews.id}
            className="card bg-base-100 p-4 border border-gray-200 shadow-sm"
          >
            <h3 className="font-semibold text-sm">{oNews.title}</h3>

            <p className="text-xs text-gray-500 mt-2">{oNews.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
