import Link from "next/link";
import MarqueeText from "react-marquee-text";

import "react-marquee-text/dist/styles.css";

interface IHeadNews {
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

const Marquee = async () => {
  const URL = "https://news-api-v2.vercel.app/api/news?limit=10";

  const res = await fetch(URL);
  const data = await res.json();

  const headlines: IHeadNews[] = data.data;
  console.log(headlines);
  return (
    <div className="sticky top-0 z-50 w-full bg-red-700 mb-5">
      <div className="max-w-7xl mx-auto flex">
        {/* Latest Label */}
        <div className="bg-red-800 p-3 text-white font-semibold shadow-md px-4">
          সর্বশেষ
        </div>
        {/* <Link href={`/news/${firstNews.id}`} */}
        {/* Marquee Area */}
        <div className="relative flex-1 overflow-hidden">
          <MarqueeText
            duration={10}
            pauseOnHover={false}
            direction="right"
            className="py-1 text-white whitespace-nowrap"
          >
            {headlines.map((h) => (
              <Link href={`/news/${h.id}`} key={h.id}>
                <span>
                  {h.title}
                  <span className="mx-6 text-red-200">•</span>
                </span>
              </Link>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
