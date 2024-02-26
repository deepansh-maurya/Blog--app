import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { useDatabse } from "../../appwriteBackend/database/databse";
import { useStorage } from "../../appwriteBackend/storage/storage";
export default function Write() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    image: "",
    date: "",
    status: "",
    slug: "",
  });
  const [file, setfile] = useState(null);
  const { createPostImage } = useStorage();
  const { createPost } = useDatabse();
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    console.log("file", file);
    const date = new Date();

    const imageid = await createPostImage(file);
    setFormData((prevData) => ({
      ...prevData,
      image: imageid,
      date: date,
    }));

    // const res = await createPost(formData);
    // console.log(res);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded shadow mt-4">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Image URL:</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={(e) => setfile(e.target.files[0])}
          className="w-full border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded py-2 px-3"
        >
          <option value="technology">Technology</option>
          <option value="science">Science</option>
          <option value="art">Art</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Tags:</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Slug:</label>
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Active:</label>
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleChange}
          className="mr-2"
        />
        <span className="text-gray-700">Is Active</span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Content:</label>
        <Editor
          apiKey="6cbx0irs9jtviit23c1e9dak2ktwvfchhyzuwpkps6pqyhpq"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "image",
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "anchor",
            ],
            toolbar:
              "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          initialValue={formData.content}
          onEditorChange={(content) =>
            setFormData((prevData) => ({ ...prevData, content }))
          }
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Submit
      </button>
    </div>
  );
}
