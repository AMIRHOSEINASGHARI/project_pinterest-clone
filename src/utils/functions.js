import mongoose from "mongoose";

export async function mongoConnect() {
  mongoose.set("strictQuery", true);

  if (mongoose.connections[0].readyState) {
    console.log("Already Connected");
    return;
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB");
}
