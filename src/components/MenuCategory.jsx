//* Next
import Link from "next/link";
import { useRouter } from "next/router";
//* Next-Auth
import { signOut } from "next-auth/react";
//* Components
import { Button } from ".";
//* React Icons
import { AiFillHome } from "react-icons/ai";
import { PiSignOutBold } from "react-icons/pi";

const MenuCategory = ({ categories, showMenu, setShowMenu, session }) => {
  const router = useRouter();

  const handleSetPathName = (category) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("category", category.toLowerCase());
    const newPathName = `/?${searchParams}`;
    router.push(newPathName);
    setShowMenu(false);
  };
  console.log(router);
  return (
    <>
      <div className="fixed bg-white left-0 top-[79px] pb-24 pt-2 z-30 h-screen flex flex-col justify-between overflow-auto">
        <div>
          <Link
            href="/"
            onClick={() => setShowMenu(false)}
            className="flex items-center hover:bg-gray-200 hover:text-gray-800 text-gray-600 transition duration-100 ease-in-out py-3 pl-5 lg:pl-8 pr-14 lg:pr-20 cursor-pointer"
          >
            <div className="mr-6 text-xl lg:text-3xl">
              <AiFillHome />
            </div>
            <span className="tracking-tight font-bold">All</span>
          </Link>
          {categories.map((item, index) => (
            <div
              onClick={() => handleSetPathName(item.name)}
              key={index}
              className={`${
                item.name.toLowerCase() ===
                  router?.query?.category?.toLowerCase() &&
                "bg-gray-200 text-purple-600"
              } flex items-center hover:bg-gray-200 hover:text-gray-800 text-gray-600 transition duration-100 ease-in-out py-3 pl-5 lg:pl-8 pr-14 lg:pr-20 cursor-pointer`}
            >
              <div className="mr-6 text-xl lg:text-3xl">{item.icon}</div>
              <span className="tracking-tight font-bold">{item.name}</span>
            </div>
          ))}
        </div>
        {session.status === "authenticated" && (
          <Button
            styles="flex items-center font-bold mt-10 text-red-500 py-2 pl-5 lg:pl-8 pr-14 lg:pr-20"
            handleButton={() => signOut()}
            type="button"
            title={
              <>
                <PiSignOutBold className="mr-6 text-xl lg:text-3xl" />
                Sign Out
              </>
            }
          />
        )}
      </div>
      {showMenu && (
        <div className="bg-black/70 backdrop-blur-lg fixed z-[1] inset-0" />
      )}
    </>
  );
};

export default MenuCategory;
