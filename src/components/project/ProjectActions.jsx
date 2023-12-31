//* React
import React, { useState } from "react";
//* Next
import { useRouter } from "next/router";
//* Components
import { Button, Loader } from "..";
import toast from "react-hot-toast";
//* Utility Functions
import { deleteProject } from "@/utils/functions";
//* React Icons
import { BiDotsHorizontalRounded, BiLink } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import { FiEdit, FiTrash } from "react-icons/fi";

const ProjectActions = ({ session, data, projectId }) => {
  const router = useRouter();
  const { image } = data?.data?.project;
  const [dots, setDots] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.href;
    window.navigator.clipboard.writeText(url);
    toast.success("Link Coppied");
    setDots(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteProject(projectId);
    setIsDeleting(false);
    console.log(result);
    if (result.status === "success") router.push("/");
  };

  const handleEdit = () => {
    router.push(`/project/edit/${projectId}`);
  };

  return (
    <div className="relative flex items-center gap-2">
      <Button
        type="button"
        styles="project-details-actions-btn"
        handleButton={() => setDots(!dots)}
        title={dots ? <IoMdClose /> : <BiDotsHorizontalRounded />}
      />
      {session?.data?.email === data?.data?.project?.createdBy?.email && (
        <>
          <Button
            type="button"
            title={
              isDeleting ? <Loader h="8" w="8" color="#9ca3af" /> : <FiTrash />
            }
            handleButton={handleDelete}
            styles={`project-details-actions-btn ${isDeleting && "bg-gray-50"}`}
          />
          <Button
            type="button"
            title={<FiEdit />}
            handleButton={handleEdit}
            styles="project-details-actions-btn"
          />
        </>
      )}
      {dots && (
        <div className="rounded-xl bg-white shadow-md z-10 absolute top-0 left-9 gap-0.5 py-2 flex flex-col items-start text- tracking-tight">
          <a
            onClick={() => setDots(false)}
            href={image}
            download
            target="_blank"
            className="w-full text-left px-4 hover:bg-gray-100 transition duration-100 ease-in-out flex items-center py-1"
          >
            <LuDownload className="mr-3" />
            Download
          </a>
          <div className="w-full">
            <Button
              type="button"
              handleButton={handleCopyLink}
              title={
                <>
                  <BiLink className="mr-3" /> Copy link
                </>
              }
              styles="w-full text-left px-4 hover:bg-gray-100 transition duration-100 ease-in-out flex items-center py-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectActions;
