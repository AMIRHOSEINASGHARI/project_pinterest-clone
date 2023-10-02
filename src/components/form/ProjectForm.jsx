//* React
import { useState } from "react";
//* Next
import Image from "next/image";
import { useRouter } from "next/router";
//* React Icons
import { AiOutlineFolderAdd } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
//* Components
import { Button, CustomFilter, FormField, TextList } from "..";
import toast from "react-hot-toast";
//* Constants
import { categories } from "@/constants";
//* Utility Functions
import { createProject, resizeFile } from "@/utils/functions";

const ProjectForm = ({ type }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  //* FORM VALUES
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    websiteUrl: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "create") {
      if (form.image && form.category) {
        setIsSubmitting(true);
        const result = await createProject(form);
        setIsSubmitting(false);
        if (result.status === "success") {
          toast.success(result.message);
          router.push("/");
        } else {
          toast.error(result.message);
        }
      }
    } else if (type === "edit") {
      if (form.image && form.category) {
        setIsSubmitting(true);
        let result = null; //TODO: fetch from api function
        setIsSubmitting(false);
        if (result.status === "success") {
          toast.success(result.message);
          router.push("/");
        } else {
          toast.error(result.message);
        }
      }
    }
  };

  const handleChangeImage = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (!file) return;
    if (!file.type.includes("image/")) return alert("Please an image file!");

    const image = await resizeFile(file);
    setForm({
      ...form,
      image: image,
    });
  };

  const handleChangeInputValue = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="my-5 space-y-10">
      <div className="form-image-container">
        <label className="form-image-label p-3 text-center">
          {!form?.image && (
            <>
              <AiOutlineFolderAdd className="text-4xl text-gray-700" />
              <span>Drag and Drop or tap here to upload a Photo</span>
              <span className="text-purple-600 font-semibold bg-purple-50 py-1 px-3">
                Images less than 10MB
              </span>
            </>
          )}
        </label>
        <input
          type="file"
          required={type === "create"}
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer z-30"
          onChange={handleChangeImage}
        />
        {form?.image && (
          <Image
            className="object-contain"
            src={form?.image}
            fill
            alt="project image"
          />
        )}
      </div>
      {form?.image && (
        <div className="flex items-center justify-center w-full">
          <div
            onClick={() => setForm({ ...form, image: "" })}
            className=" p-4 w-fit rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 transition duration-100 ease-in-out"
          >
            <FiTrash />
          </div>
        </div>
      )}
      <CustomFilter filters={categories} setForm={setForm} form={form} />
      <div className="space-y-5">
        {/* TITLE */}
        <FormField
          inputStyles="form-input-base"
          name="title"
          optional
          focusOn
          type="text"
          inputLabel="Title"
          placeholder="Title"
          formValue={form.title}
          handleChange={handleChangeInputValue}
        />
        {/* DESCRIPTION */}
        <FormField
          inputStyles="form-input-base"
          name="description"
          optional
          type="text"
          inputLabel="Description"
          placeholder="Description"
          formValue={form.description}
          isTextArea
          handleChange={handleChangeInputValue}
        />
        {/* WEBSITE URL */}
        <FormField
          inputStyles="form-input-base"
          name="websiteUrl"
          optional
          type="text"
          inputLabel="Website URL"
          placeholder="https://example.com"
          formValue={form.websiteUrl}
          handleChange={handleChangeInputValue}
        />
        {/* META TITLE */}
        <FormField
          inputStyles="form-input-base"
          name="metaTitle"
          type="text"
          inputLabel="Meta Title"
          placeholder="Meta Title"
          formValue={form.metaTitle}
          handleChange={handleChangeInputValue}
        />
        {/* META DESCRIPTION */}
        <FormField
          inputStyles="form-input-base"
          name="metaDescription"
          isTextArea
          inputLabel="Meta Description"
          placeholder="Meta Description"
          formValue={form.metaDescription}
          handleChange={handleChangeInputValue}
        />
        <TextList
          type="metaKeywords"
          data={form}
          setData={setForm}
          title="Meta Keywords"
        />
      </div>
      <Button
        styles="capitalize bg-purple-600 rounded-lg py-3 px-6 text-purple-50 font-medium"
        type="submit"
        title={
          isSubmitting
            ? `${type === "create" ? "Creating..." : "Editing..."}`
            : `${type === "create" ? "Create" : "Edit"}`
        }
      />
    </form>
  );
};

export default ProjectForm;
