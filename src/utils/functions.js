//* Mongoose
import mongoose from "mongoose";
//* File Resizer
import FileResizer from "react-image-file-resizer";

export async function mongoConnect() {
  mongoose.set("strictQuery", true);

  if (mongoose.connections[0].readyState) {
    console.log("Already Connected");
    return;
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to DB");
}

export const shorterText = (text, maxCharacter) => {
  if (String(text).length > maxCharacter) {
    return `${text.substring(0, maxCharacter)}...`;
  } else {
    return text;
  }
};

export async function createProject(form) {
  const res = await fetch("/api/project/create", {
    method: "POST",
    body: JSON.stringify(form),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
}

export const deleteProject = async (projectId) => {
  const res = await fetch(`/api/project/${projectId}`, {
    method: "DELETE",
    headers: { "Content-Type": "applicaiton/json" },
  });
  const data = await res.json();
  return data;
};

export const resizeFile = (file) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      1000,
      1000,
      "JPEG",
      50,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export const cloudinaryOptions = {
  use_filename: true,
  unique_filename: true,
  overwrite: true,
  transformation: [
    {
      width: 1000,
      crop: "scale",
    },
  ],
};
