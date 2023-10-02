//* Next-Auth
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
//* Utility Functions
import { mongoConnect } from "@/utils/functions";
//* Models
import { Project } from "@/utils/models/project";
import { PinterestUser } from "@/utils/models/user";
import { Comment } from "@/utils/models/comment";

export default async function handler(req, res) {
  try {
    await mongoConnect();
  } catch (error) {
    console.log(error);
  }

  const { projectId } = req.query;
  const project = await Project.findById(projectId)
    .populate({
      path: "createdBy",
      model: PinterestUser,
      select: ["_id", "name", "email", "avatarUrl"],
    })
    .populate({
      path: "comments",
      model: Comment,
      populate: { path: "senderId" },
    });
  const user = await PinterestUser.findById(project?.createdBy?._id);
  const session = await getServerSession(req, res, authOptions);

  //* GET
  if (req.method === "GET") {
    try {
      const projects = await Project.find().populate({
        path: "createdBy",
        model: PinterestUser,
        select: ["avatarUrl", "name", "_id"],
      });
      const moreLikeProject = projects.filter(
        (item) => item.category === project.category
      );

      res
        .status(200)
        .json({ status: "success", data: { project, moreLikeProject } });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        data: { message: "Error while fetching project | Server Error" },
      });
    }
  }

  //* DELETE
  if (req.method === "DELETE") {
    //! Authorization check
    if (!session.user.email) {
      res
        .status(403)
        .json({ status: "failed", message: "You are not authorized!" });
    }

    //! who want to delete project?
    if (session.user.email !== user.email) {
      return res.status(403).json({
        status: "failed",
        message: "You are not allowed to delete this project!",
      });
    }

    try {
      const indexOfProject = user.projects.indexOf(projectId);

      await Comment.deleteMany({ projectId: projectId });
      await Project.findByIdAndDelete(projectId);
      user.projects.splice(indexOfProject, 1);
      user.save();

      res.status(200).json({ status: "success" });
    } catch (error) {
      res.status(500).json({ status: "failed" });
    }
  }
}
