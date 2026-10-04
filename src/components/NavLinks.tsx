

const NavLinks = async () => {
    const URL = "https://news-api-v2.vercel.app/api/categories";
    const res = await fetch(URL);
    const data = await res.json();
    const navs  = data.data;
    console.log(navs);

    return (
        <div>

        </div>
    );
};

export default NavLinks;