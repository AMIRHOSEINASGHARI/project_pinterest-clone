//* Utility Functions
import { mongoConnect } from "@/utils/functions";
//* Models
import { PinterestUser } from "@/utils/models/user";
import { Project } from "@/utils/models/project";

export default async function handler(req, res) {
  try {
    await mongoConnect();
  } catch (error) {
    console.log(error);
  }

  if (req.method === "GET") {
    const { userId } = req.query;
    const user = await PinterestUser.findOne({ _id: userId }).populate({
      path: "projects",
      model: Project,
      select: ["image", "title"],
    });

    if (user) {
      return res
        .status(200)
        .json({ status: "success", data: { user, message: "OK" } });
    } else {
      return res
        .status(404)
        .json({ status: "failed", data: { message: "User Not Found" } });
    }
  }
}
