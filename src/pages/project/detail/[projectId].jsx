//* React
import React, { useEffect, useRef, useState } from "react";
//* Components
import { Loader } from "@/components";

const ProjectDeials = ({ projectId }) => {
  const [data, setData] = useState(null);
  const moreLikeProject = data?.data?.moreLikeProject?.filter(
    (item) => item._id !== projectId
  );

  const imageRef = useRef();
  const imageHeight = imageRef?.current?.height;

  const fetchProject = async () => {
    const res = await fetch(`/api/project/${projectId}`);
    const data = await res.json();
    setData(data);
  };
  useEffect(() => {
    fetchProject();
  }, [projectId]);

  if (!data)
    return <Loader h="120" w="120" color="#6b7280" text="Loading project" />;
  if (data && data?.status === "failed") return <h1>{data?.data?.message}</h1>;

  return <div>ProjectDeials</div>;
};

export default ProjectDeials;

export async function getServerSideProps(context) {
  const projectId = context.params.projectId;

  return {
    props: { projectId },
  };
}
