//* React
import { useEffect, useState } from "react";
//* Next
import Image from "next/image";
import { useSession } from "next-auth/react";
//* Components
import { Button, FormField, Loader } from "@/components";
//* React Icons
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
//* Utility Functions
import { updateUserProfile } from "@/utils/functions";

const UserProfile = (props) => {
  const session = useSession();
  const [userData, setUserData] = useState({});

  const [userDescription, setUserDescription] = useState("");
  const [activateTyping, setActivateTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${props?.userId}`);
      const data = await res.json();
      setUserData(data);
    };
    fetchUser();
  }, [props?.userId]);

  const changeHandler = (e) => {
    setUserDescription(e.target.value);
  };

  const handleUpdateUserProfile = async (e) => {
    e.preventDefault();
    if (userDescription.length >= 30) {
      setIsSubmitting(true);
      const result = await updateUserProfile(
        userData?.data?.user?._id,
        userDescription,
        session?.data?.id
      );
      setIsSubmitting(false);
      if (result?.status === "success") window.location.reload();
    }
  };

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
              {!description && session?.data?.id === _id && (
                <form
                  onSubmit={handleUpdateUserProfile}
                  className="flex flex-col items-center gap-2"
                >
                  <Button
                    title={
                      <>
                        <span>Tell us more about yourself</span>
                        {activateTyping ? <BsChevronUp /> : <BsChevronDown />}
                      </>
                    }
                    type="button"
                    styles="text-center font-bold flex items-center gap-3 bg-gray-100 rounded-full py-1.5 px-4"
                    handleButton={() => setActivateTyping(!activateTyping)}
                  />
                  {activateTyping && (
                    <div>
                      <FormField
                        inputStyles="bg-gray-100 py-2 px-3 rounded-lg w-[280px] sm:w-[400px] lg:w-[600px] text-gray-600 focus:outline outline-blue-500"
                        placeholder="Up to 30 Characters..."
                        formValue={userDescription}
                        handleChange={changeHandler}
                        type="text"
                        isTextArea
                      />
                    </div>
                  )}
                  {activateTyping && userDescription.length >= 30 && (
                    <Button
                      type="submit"
                      title={isSubmitting ? "Saving..." : "Save"}
                      styles="rounded-full py-1.5 px-4 bg-black text-white tracking-tight font-semibold text-sm mt-2"
                    />
                  )}
                </form>
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
