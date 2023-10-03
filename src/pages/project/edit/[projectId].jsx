//* React
import React, { useEffect, useState } from "react";
//* Next
import { useRouter } from "next/router";
import Link from "next/link";
//* Next-Auth
import { getSession } from "next-auth/react";
//* Utility Functions
import { getProjectDetails } from "@/utils/functions";
//* Components
import { Loader, Modal, ProjectForm } from "@/components";
//* React Icons
import { FiAlertTriangle } from "react-icons/fi";

const EditProject = ({ session }) => {
  const router = useRouter();
  const { projectId } = router.query;
  const [project, setProject] = useState({});

  const createdByID = project?.data?.project?.createdBy?._id;

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setProject(await getProjectDetails(projectId));
    };
    fetchProjectDetails();
  }, []);

  if (Object.keys(project).length === 0)
    return (
      <Loader h="120" w="120" color="#6b7280" text="Fetching Project Data" />
    );

  if (project?.status !== "success") return <h1>Error!</h1>;

  if (createdByID !== session?.id)
    return (
      <div className="text-center p-3 mt-28 flex flex-col items-center">
        <FiAlertTriangle className="text-6xl text-red-500 mb-2" />
        <h1 className="text-2xl lg:text-3xl font-black mb-8">
          You can't edit this project
        </h1>
        <Link
          href="/project/create"
          className="border-purple-500 border-2 font-black bg-purple-50 hover:bg-purple-100 transition duration-100 ease-in-out text-purple-600 py-2 px-6 rounded-3xl"
        >
          Create your own
        </Link>
      </div>
    );

  return (
    <Modal>
      <h1 className="text-4xl font-black">Edit Project</h1>
      <ProjectForm type="edit" projectDetails={project?.data?.project} />
    </Modal>
  );
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
