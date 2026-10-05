import NewsCard from "@/components/NewsCard";


const CategoryNews = async({params}) => {
    const {categoryId} = await params;
    console.log(categoryId);
    // https://news-api-v2.vercel.app/api/category/{${categoryId}}
    const URL = `https://news-api-v2.vercel.app/api/category/${categoryId}`;
    const res =  await fetch(URL);
    const data = await res.json();
    const categoryNews = data.data;
    console.log(data);

    return (
        <div className="">
            <h1 className="text-2xl font-bold border-b-2 border-red-700 mb-5">{data.title}</h1>


            <div className="grid grid-cols-3">
                {
                    categoryNews.map(news => <NewsCard key={news.id} news={news} />)
                }
            </div>
        </div>
    );
};

export default CategoryNews;