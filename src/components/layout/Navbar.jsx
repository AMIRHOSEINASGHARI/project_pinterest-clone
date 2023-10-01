//* React
import { useState } from "react";
//* Next
import Link from "next/link";
import Image from "next/image";
//* Components
import { Button } from "..";
//* React Icons
import { HiOutlineMenu } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const session = null;

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
        {session ? (
          <div className="flex items-center gap-1">
            <Link
              href="/project/create"
              className="flex items-center justify-center border-2 border-black w-10 h-10 rounded-full"
            >
              <AiOutlinePlus />
            </Link>
            {/* //TODO: Profile Menu Component */}
          </div>
        ) : (
          // TODO: AuthProvider component
          "AuthProvider"
        )}
      </div>
      {/* //TODO: MenuCategory Component */}
    </header>
  );
};

export default Navbar;
