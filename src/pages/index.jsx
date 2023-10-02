import { useEffect, useState } from "react";

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

  return <div>Home</div>;
};

export default Home;
