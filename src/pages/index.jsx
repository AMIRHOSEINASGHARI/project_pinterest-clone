//* React
import { useEffect, useState } from "react";
//* Components
import { Loader, MasonryLayout } from "@/components";

const Home = ({ query }) => {
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/project/get-all");
      const data = await res.json();

      const filterData = data?.data?.filter(
        (project) =>
          project.category.toLowerCase() === query?.category?.toLowerCase()
      );

      if (query?.category && filterData.length !== 0) {
        setProjects(filterData);
      } else if (query?.category && filterData.length === 0) {
        setProjects([]);
      } else {
        setProjects(data?.data);
      }
    };

    fetchProjects();
  }, [query]);

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
    return <MasonryLayout projects={projects} />;
  }
};

export default Home;

export async function getServerSideProps(context) {
  return {
    props: { query: context.query },
  };
}
