import NewsCard from "@/components/NewsCard";

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

interface ICategoryNews {
  title: string;
  data: INews[];
}

interface IParams {
  params: Promise<{
    categoryId: string;
  }>;
}

const CategoryNews = async ({ params }: IParams) => {
  const { categoryId } = await params;

  console.log(categoryId);

  // https://news-api-v2.vercel.app/api/category/{categoryId}

  const URL = `https://news-api-v2.vercel.app/api/category/${categoryId}`;
  const res = await fetch(URL);
  const data: ICategoryNews = await res.json();
  const categoryNews: INews[] = data.data;
  console.log(data);

  return (
    <div className="">
      <h1 className="text-2xl font-bold border-b-2 border-red-700 mb-5">
        {data.title}
      </h1>
      <div className="grid grid-cols-3">
        {categoryNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;
