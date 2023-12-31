//* React
import React, { useEffect, useRef, useState } from "react";
//* Next
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
//* Next-Auth
import { useSession } from "next-auth/react";
//* Components
import {
  Button,
  CommentsSection,
  CreatedBySection,
  Loader,
  MasonryLayout,
  ProjectActions,
  PublishComment,
} from "@/components";
//* React Icons
import { FaLongArrowAltLeft } from "react-icons/fa";
//* Utility functions
import { shorterText } from "@/utils/functions";

const ProjectDeials = ({ projectId }) => {
  const router = useRouter();
  const session = useSession();
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

  const goPrevPage = (e) => {
    e.stopPropagation();
    router.back();
  };

  if (!data)
    return <Loader h="120" w="120" color="#6b7280" text="Loading project" />;
  if (data && data?.status === "failed") return <h1>{data?.data?.message}</h1>;

  if (data && data.status === "success") {
    const { project } = data.data;
    const { category, description, image, title, websiteUrl, comments } =
      project;

    return (
      <div className="pb-3">
        <Head>
          <title>{title || "Project"}</title>
          <meta
            name="description"
            content={description || "Project Description"}
          />
        </Head>
        <Button
          handleButton={goPrevPage}
          styles="bg-gray-300 h-12 w-12 text-black shadow-lg flex items-center justify-center rounded-full fixed z-10 top-22 left-3 lg:left-8"
          title={<FaLongArrowAltLeft />}
        />
        <div className="flex items-center justify-center">
          <div className="rounded-3xl cursor-default flex flex-col lg:flex-row overflow-hidden min-w-[280px] lg:w-[950px] shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            <div>
              <Image
                ref={imageRef}
                src={image}
                alt={title}
                width={500}
                height={500}
                className="object-contain w-full"
              />
            </div>
            <div className="p-5 px-3 sm:p-8 lg:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between bg-white py-2">
                  <ProjectActions
                    session={session}
                    data={data}
                    projectId={projectId}
                  />
                  <div className="bg-gray-100 text-xs rounded-full py-1.5 px-5">
                    {category}
                  </div>
                </div>
                <div
                  className="overflow-y-auto"
                  style={{ maxHeight: imageHeight }}
                >
                  {websiteUrl && (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      className="underline text-blue-600 text-xs"
                    >
                      {shorterText(websiteUrl, 25)}
                    </a>
                  )}
                  <div className="flex flex-col gap-5 mt-3 mb-8">
                    <h1 className="font-bold text-2xl tracking-tight">
                      {title}
                    </h1>
                    {description && (
                      <p className="text-xs tracking-tight">{description}</p>
                    )}
                  </div>
                  <CreatedBySection data={data} />
                  <CommentsSection comments={comments} />
                </div>
              </div>
              {session?.status === "authenticated" && (
                <PublishComment
                  fetchProject={fetchProject}
                  session={session}
                  projectId={projectId}
                />
              )}
            </div>
          </div>
        </div>
        {data?.data?.moreLikeProject.length > 0 && (
          <div onClick={(e) => e.stopPropagation()}>
            <h1 className="text-center font-medium tracking-tight mt-12 mb-4">
              More on this category{" "}
              <span className="font-bold text-lg">'{category}'</span>
            </h1>
            <MasonryLayout projects={moreLikeProject} />
          </div>
        )}
      </div>
    );
  } else {
    return <h1>Error</h1>;
  }
};

export default ProjectDeials;

export async function getServerSideProps(context) {
  const projectId = context.params.projectId;

  return {
    props: { projectId },
  };
}
