//* Utility Functions
import { mongoConnect } from "@/utils/functions";
//* Models
import { Project } from "@/utils/models/project";

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
}
