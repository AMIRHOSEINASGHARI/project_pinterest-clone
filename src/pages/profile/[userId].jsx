//* React
import { useEffect, useState } from "react";
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

    return <div>Profile</div>;
  }
};

export default UserProfile;

export async function getServerSideProps(req) {
  return {
    props: { userId: req.query.userId },
  };
}
