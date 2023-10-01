//* Mongoose Imports
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatarUrl: { type: String, default: "" },
  description: { type: String, default: "" },
  role: { type: String, default: "USER" },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project", default: [] }],
});

const PinterestUser =
  models.PinterestUser || model("PinterestUser", userSchema);

export { PinterestUser };
