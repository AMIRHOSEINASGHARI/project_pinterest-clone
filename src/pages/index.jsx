//* React
import { useEffect, useState } from "react";
//* Components
import { Loader } from "@/components";

const Home = () => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/project/get-all");
      const data = await res.json();

      setProjects(data?.data);
    };

    fetchProjects();
  }, []);

  if (projects === null) {
    return (
      <Loader
        h="120"
        w="120"
        color="#6b7280"
        text="We are adding new ideas to your feed"
      />
    );
  } else if (projects.length === 0) {
    return <h1 className="text-center text-3xl mt-24">No Pins!</h1>;
  } else if (projects.length !== 0) {
    return <div>Home</div>;
  }
};

export default Home;
