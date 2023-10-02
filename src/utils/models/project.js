//* Mongoose Imports
import { Schema, model, models } from "mongoose";

const projectSchema = new Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  image: { type: String, required: true },
  category: { type: String, required: true },
  websiteUrl: { type: String, default: "" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "PinterestUser" },
  metaTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
  metaKeywords: { type: [String], required: true },
});

const Project = models.Project || model("Project", projectSchema);

export { Project };
