//* Next-Auth
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
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

  //* GET
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

  //* PATCH
  if (req.method === "PATCH") {
    try {
      const { description, authorizedUserId } = req.body;
      const session = await getServerSession(req, res, authOptions);
      const authorizedUser = await PinterestUser.findOne({
        _id: authorizedUserId,
      });

      if (session?.user?.email !== authorizedUser.email) {
        return res.status(403).json({
          status: "failed",
          data: {
            message:
              "You are not allowed to update this user information? WHO ARE YOU?😐😐😐",
          },
        });
      }

      authorizedUser.description = description;
      authorizedUser.save();

      res.status(200).json({
        status: "success",
        data: { message: "Your information updated" },
      });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        data: { message: "Update Failed | Server Error", error },
      });
    }
  }
}
