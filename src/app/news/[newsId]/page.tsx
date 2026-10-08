import Image from "next/image";
import Link from "next/link";

interface BodyBlock {
  type: "text" | "subheading" | "image";
  text?: string;
  url?: string;
  caption?: string;
  altText?: string;
  copyrightHolder?: string;
}

const NewsDetails = async ({ params }: { params: { newsId: string } }) => {
  const { newsId } = await params;
  const URL = `https://news-api-v2.vercel.app/api/article/${newsId}`;

  const res = await fetch(URL, { cache: "no-store" });
  const responseData = await res.json();
  console.log(responseData);

  if (!responseData?.success || !responseData?.data) {
    return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-white">
        <div className="text-center max-w-xl">
          {/* Crying Face */}
          <div className="text-7xl sm:text-8xl mb-6 animate-bounce">😢</div>

          {/* 404 */}
          <h1 className="text-[100px] sm:text-[140px] leading-none font-black tracking-tight text-[#FC3F33]">
            404
          </h1>

          {/* Title */}
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
            খবরটি খুঁজে পাওয়া যায়নি!
          </h2>

          {/* Description */}
          <p className="mt-3 text-gray-500 text-base sm:text-lg leading-relaxed">
            দুঃখিত! আপনি যে পাতাটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে,
            পরিবর্তন করা হয়েছে অথবা ঠিকানাটি ভুল।
          </p>

          {/* Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full
          bg-[#FC3F33] text-white font-semibold
          hover:bg-[#e7352b] hover:shadow-lg
          transition-all duration-300"
          >
            <span>←</span>
            হোমে ফিরে যান
          </Link>

          {/* Small branding */}
          <p className="mt-8 text-sm text-gray-400">সব-সময় আপডেটেড</p>
        </div>
      </main>
    );
  }

  const news = responseData.data;

  //১. body এর মধ্যে প্রথম যে ছবিটি পাওয়া যাবে তা বের করা
  const firstBodyImage = news.body?.find(
    (block: BodyBlock) => block.type === "image",
  );

  // ২. ফিচার্ড ইমেজ হিসেবে দেখানোর জন্য ছবি নির্বাচন (body-এর প্রথম ছবি অগ্রাধিকার পাবে, ক্যাপশন সহ)
  const featuredImageUrl = news.imageUrl || firstBodyImage?.url;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* ট্যাগসমূহ */}
      {news.tags && news.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {news.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* শিরোনাম */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
        {news.title}
      </h1>

      {/* বাইলাইন ও প্রকাশের তারিখ */}
      <div className="flex flex-wrap items-center justify-between border-y border-gray-200 py-3 text-sm text-gray-600">
        {news.byline && news.byline.length > 0 && (
          <div>
            <span className="font-semibold">{news.byline[0].name}</span>
            {news.byline[0].role && <span> • {news.byline[0].role}</span>}
          </div>
        )}
        {news.firstPublished && (
          <div>
            {new Date(news.firstPublished).toLocaleDateString("bn-BD", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        )}
      </div>

      {/* মূল ফিচার্ড ইমেজ (ক্যাপশন সহ) */}
      {featuredImageUrl && (
        <figure className="space-y-2">
          <div className="relative w-full h-[300px] md:h-[450px] rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={featuredImageUrl}
              alt={news.title || "News Image"}
              fill
              className="object-cover"
              priority
            />
          </div>
          {firstBodyImage?.caption && (
            <figcaption className="text-sm text-gray-500 italic text-center">
              {firstBodyImage.caption}{" "}
              {firstBodyImage.copyrightHolder &&
                `(${firstBodyImage.copyrightHolder})`}
            </figcaption>
          )}
        </figure>
      )}

      {/* বডি কনটেন্ট রেন্ডারিং */}
      <div className="space-y-6 text-gray-800 leading-relaxed text-lg">
        {news.body && news.body.length > 0 ? (
          news.body.map((block: BodyBlock, index: number) => {
            // প্যারাগ্রাফ
            if (block.type === "text" && block.text) {
              return (
                <p key={index} className="whitespace-pre-line">
                  {block.text}
                </p>
              );
            }

            // সাবহেডিং
            if (block.type === "subheading" && block.text) {
              return (
                <h2
                  key={index}
                  className="text-2xl font-bold text-gray-900 mt-8 mb-2 border-l-4 border-red-700 pl-3"
                >
                  {block.text}
                </h2>
              );
            }

            // ইমেজের ক্ষেত্রে: যদি এটি প্রথম ছবি হয় (যা উপরে অলরেডি ফিচার্ড ইমেজ হিসেবে রেন্ডার করা হয়েছে), তবে স্কিপ করবে
            if (block.type === "image" && block.url) {
              if (block === firstBodyImage) {
                return null;
              }

              return (
                <figure key={index} className="my-6 space-y-2">
                  <div className="relative w-full h-[250px] md:h-[400px] rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={block.url}
                      alt={block.altText || block.caption || "Article Image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="text-sm text-gray-500 text-center italic">
                      {block.caption}{" "}
                      {block.copyrightHolder && `(${block.copyrightHolder})`}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return null;
          })
        ) : (
          <p className="whitespace-pre-line">{news.text}</p>
        )}
      </div>

      {/* সোর্স লিঙ্ক */}
      {news.sourceUrl && (
        <div className="pt-6 border-t border-gray-200 text-sm text-gray-500">
          মূল উৎস:{" "}
          <a
            href={news.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-700 hover:underline font-medium"
          >
            {news.source || "BBC Bangla"}
          </a>
        </div>
      )}
    </article>
  );
};

export default NewsDetails;
