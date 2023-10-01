//* React Imports
import { useState } from "react";
//* Next Imports
import Image from "next/image";
//* React Icons Imports
import { AiOutlineFolderAdd } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
//* Components Import
import { Button, CustomFilter, FormField } from "..";
//* Constants Import
import { categories } from "@/constants";
//* Utility Functions Import

const ProjectForm = ({ type }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  //TODO: create a POST request API
  const handleSubmit = async () => {};

  //TODO: a function that displays image in client and automatically resize it
  const handleChangeImage = () => {};

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
