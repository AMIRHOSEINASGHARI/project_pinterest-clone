//* React
import { useState } from "react";
//* Next
import Link from "next/link";
import Image from "next/image";
//* Next-Auth
import { useSession } from "next-auth/react";
//* Components
import { AuthProviders, Button, MenuCategory, ProfileMenu } from "..";
//* React Icons
import { HiOutlineMenu } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
//* Constants
import { categoryFilters } from "@/constants";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const session = useSession();

  return (
    <header>
      <div className="header">
        <div className="flex items-center gap-4">
          <Button
            title={showMenu ? <GrClose /> : <HiOutlineMenu />}
            handleButton={() => setShowMenu(!showMenu)}
            styles="p-2 hover:bg-gray-100 rounded-full text-3xl"
          />
          <Link href="/">
            <Image
              src="/assets/logo-pen.svg"
              alt="logo"
              width={50}
              height={50}
              className="header-logo"
              priority
            />
          </Link>
        </div>
        {session?.status === "authenticated" ? (
          <div className="flex items-center gap-1">
            <Link
              href="/project/create"
              className="flex items-center justify-center border-2 border-black w-10 h-10 rounded-full"
            >
              <AiOutlinePlus />
            </Link>
            <ProfileMenu session={session} />
          </div>
        ) : (
          <AuthProviders />
        )}
      </div>
      {showMenu && (
        <MenuCategory
          categories={categoryFilters}
          session={session}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      )}
    </header>
  );
};

export default Navbar;
