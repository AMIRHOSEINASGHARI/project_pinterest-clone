//* Masonry
import Masonry from "react-masonry-css";
//* Constants
import { breackPointsObject } from "@/constants";
//* Components
import { ProjectCard } from "..";

const MasonryLayout = ({ projects }) => {
  return (
    <Masonry
      className="flex justify-center gap-1 sm:gap-2 md:gap-4 p-1 lg:p-5"
      breakpointCols={breackPointsObject}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          websiteUrl={project.websiteUrl}
          image={project.image}
          _id={project._id}
        />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
