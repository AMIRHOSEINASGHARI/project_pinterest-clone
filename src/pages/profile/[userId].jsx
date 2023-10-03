//* React
import { useEffect, useState } from "react";

const User = (props) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${props?.userId}`);
      const data = await res.json();
      setUserData(data);
    };
    fetchUser();
  }, [props?.userId]);

  return <div>Profile</div>;
};

export default User;

export async function getServerSideProps(req) {
  return {
    props: { userId: req.query.userId },
  };
}
