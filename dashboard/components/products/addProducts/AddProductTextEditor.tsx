"use client";
import { useState } from "react";
import ReactQuill from "react-quill";
import { Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const AddProductTextEditor = ({ register, control }) => {
  const [value, setText] = useState("");

  const onChange = (value) => {
    setText(value);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        {
          font: ["sans-serif", "monospace"],
        },
      ],
      [{ size: ["small", true, "large", "huge"] }],
      ["clean"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "link",
    "image",
    "indent",
    "list",
    "bullet",
    "size",
    "clean",
    "font",
  ];
  return (
    <div className="w-full">
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <ReactQuill
            // {...register("description")}
            // {...field}
            theme="snow"
            value={field.value}
            onChange={field.onChange}
            placeholder="Describe your product..."
          />
        )}
      />
    </div>
  );
};

export default AddProductTextEditor;
