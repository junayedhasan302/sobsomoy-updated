import Link from "next/link";

interface INavs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  // Api theke data ana + fetch kora
  const URL =
    "https://news-api-v2.vercel.app/api/categories";

  let navs: INavs[] = [];

  try {
    const res = await fetch(URL, { cache: "no-store" });
    const data = await res.json();

    navs = data.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  // Eikhane mul pata aar sorbadhik pothito ke baad diye filter kora
  const filteredNavs = Array.isArray(navs)
    ? navs.filter((n) => n.scrapable)
    : [];

  // JSX / UI
  return (
    <nav className="flex justify-start sm:justify-center gap-4 sm:gap-6 md:gap-8 mt-4 pt-2 overflow-x-auto whitespace-nowrap pb-1">

      {/* Home link */}
      <Link
        href="/"
        className="group relative font-bold sm:text-base hover:text-[#FC3F33] transition-colors text-2xl py-1"
      >
        হোম

        {/* Hover korle animated underline ashbe */}
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FC3F33] transition-all duration-300 ease-in-out group-hover:w-full" />
      </Link>

      {/* Dynamic category links */}
      {filteredNavs.map((n) => (
        <Link
          key={n.slug}
          href={`/category/${n.slug}`}
          className="group relative font-bold text-sm sm:text-base hover:text-[#FC3F33] transition-colors py-1"
        >
          {n.title}

          {/* Hover korle animated underline ashbe */}
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FC3F33] transition-all duration-300 ease-in-out group-hover:w-full" />
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;