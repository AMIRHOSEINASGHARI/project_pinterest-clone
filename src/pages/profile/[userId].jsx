//* React
import { useEffect, useState } from "react";
//* Next
import Image from "next/image";
//* Components
import { Loader } from "@/components";

const UserProfile = (props) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${props?.userId}`);
      const data = await res.json();
      setUserData(data);
    };
    fetchUser();
  }, [props?.userId]);

  if (Object.keys(userData).length === 0)
    return (
      <Loader h="120" w="120" color="#6b7280" text="Loading user profile" />
    );

  if (userData?.status === "failed") return <h1>Error!</h1>;

  if (userData?.status === "success") {
    const { avatarUrl, description, email, name, projects, _id } =
      userData?.data?.user;

    return (
      <div>
        <div className="flex flex-col items-center mb-10 lg:mb-36">
          <a href={avatarUrl} download target="_blank">
            <Image
              src={avatarUrl}
              alt={name}
              width={150}
              height={150}
              className="rounded-full"
            />
          </a>
          <div className="w-full">
            {/*   NAME AND EMAIL SECTION   */}
            <div className="my-3">
              <h1 className="uppercase tracking-tight text-center font-bold text-lg md:text-2xl lg:text-4xl">
                {name}
              </h1>
              <h3 className="tracking-tight capitalize text-gray-400 text-center">
                {email.split("@")[0]}
              </h3>
            </div>
            {/*   DESCRIPTION SECTION   */}
            <div className="w-full">
              {description && (
                <div className="w-full flex justify-center">
                  <p className="text-center sm:max-w-[80%] md:max-w-2/3 p-3">
                    {description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default UserProfile;

export async function getServerSideProps(req) {
  return {
    props: { userId: req.query.userId },
  };
}
