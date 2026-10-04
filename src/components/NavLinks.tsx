import Link from "next/link";

const NavLinks = async () => {
  const URL = "https://news-api-v2.vercel.app/api/categories";

  const res = await fetch(URL);
  const data = await res.json();
  console.log(data);
  const navs = data.data;

  return (
    <nav className="flex justify-center gap-8 mt-4 pt-3 border-t">
      {navs.map((n, i) => (
        <Link
          key={i}
          href={n.slug}
          className="font-medium hover:text-[#FC3F33] transition-colors"
        >
          {n.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;