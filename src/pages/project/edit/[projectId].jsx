//* React
import React, { useEffect, useState } from "react";
//* Next
import { useRouter } from "next/router";
//* Next-Auth
import { getSession } from "next-auth/react";
//* Utility Functions
import { getProjectDetails } from "@/utils/functions";

const EditProject = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [projectDetails, setProjectDetails] = useState({});

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setProjectDetails(await getProjectDetails(projectId));
    };
    fetchProjectDetails();
  }, []);

  return <div>EditProject</div>;
};

export default EditProject;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      props: {},
      redirect: { destination: "/" },
    };
  }

  return {
    props: { session },
  };
}
