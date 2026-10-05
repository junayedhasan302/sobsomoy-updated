
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
  const URL = "https://news-api-v2.vercel.app/api/categories";

  const res = await fetch(URL);
  const data = await res.json();

  console.log(data);

  const navs: INavs[] = data.data;

  // Eikhane মূলপাতা aar সর্বাধিক পঠিত kee baad ditesi filter kore
  const filteredNavs = navs.filter((n) => n.scrapable);

  // JSX / UI
  return (
    <nav className="flex justify-start sm:justify-center gap-4 sm:gap-6 md:gap-8 mt-4 pt-3 border-t overflow-x-auto whitespace-nowrap">
      <Link
        className="font-medium text-sm sm:text-base hover:text-[#FC3F33] transition-colors"
        href={"/"}
      >
        হোম
      </Link>

      {filteredNavs.map((n, i) => (
        <Link
          key={i}
          href={n.slug}
          className="font-medium text-sm sm:text-base hover:text-[#FC3F33] transition-colors"
        >
          {n.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;

