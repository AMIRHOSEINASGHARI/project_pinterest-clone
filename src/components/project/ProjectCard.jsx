//* Next
import Link from "next/link";
import Image from "next/image";
//* Utility Functions
import { shorterText } from "@/utils/functions";
//* React Icons
import { HiOutlineDownload } from "react-icons/hi";

const ProjectCard = (props) => {
  const { websiteUrl, image, _id } = props;

  return (
    <div className="mb-1 sm:mb-2 md:mb-4">
      <div className="group rounded-2xl md:rounded-3xl overflow-hidden bg-gray-100 relative">
        <Link
          href={`/project/detail/${_id}`}
          className="absolute inset-0 cursor-zoom-in bg-black/50 hidden group-hover:flex flex-col p-2 pb-3"
        >
          <a
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            href={image}
            download
            className="project-action-btn absolute top-2 right-2"
          >
            <HiOutlineDownload />
          </a>
          {websiteUrl && (
            <a
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              className="project-action-btn text-xs absolute z-10 bottom-2 left-2"
              href={websiteUrl}
            >
              {shorterText(websiteUrl, 20)}
            </a>
          )}
        </Link>
        <Image
          src={image}
          width={500}
          height={500}
          alt="image"
          className="max-h-[600px] object-cover"
        />
      </div>
    </div>
  );
};

export default ProjectCard;
