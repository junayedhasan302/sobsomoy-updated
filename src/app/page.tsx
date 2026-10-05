import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

interface IOtherSections {
  title: string;
  curationId: string;
  articles: {
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
  }[];
}

export default async function Home() {
  const URL = "https://news-api-v2.vercel.app/api/news/sections";
  const res = await fetch(URL);
  const data = await res.json();
  const sections: IOtherSections[] = data.data;
  const mainNews = sections[0].articles;
  const otherSections: IOtherSections[] = sections.slice(1);

  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-3 ">
        {/* News Section */}
        <div className="col-span-1 md:col-span-2">
          <MainNews news={mainNews} />

          <div className="grid gap-5 mt-5">
            {otherSections.map((os) => {
              return (
                <div
                  key={os.curationId}
                  className="pb-3"
                >
                  <h1 className="font-bold text-2xl text-red-600">
                    {os.title}
                  </h1>

                  <hr className="mb-2 border-0 border-t-2 border-red-600" />

                  {/* News Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {os.articles.map((news) => {
                      return <NewsCard key={news.id} news={news} />;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Most Read Section */}
        <div className=" col-span-1">
          <MostRead/>
        </div>
      </div>
    </div>
  );
}

