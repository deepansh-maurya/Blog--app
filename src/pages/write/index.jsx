import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { useDatabse } from "../../appwriteBackend/database/databse";
import { useStorage } from "../../appwriteBackend/storage/storage";
import { useBlog } from "../../global/blogcontext";
import parse from "html-react-parser";
export default function Write() {
  const { username } = useBlog();
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
  const { createPost, likeReviewsWIthPosts } = useDatabse();
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name == "title") {
      let val = event.target.value;
      let slug = "";
      for (let i = 0; i < val.length; i++) {
        if (val[i] == " ") {
          slug = slug + "-";
        } else {
          slug = slug + val[i];
        }
      }
      setFormData((prevData) => ({
        ...prevData,
        slug: slug,
      }));
    }
  };

  const handleSubmit = async () => {
    const dataToSent = formData;
    console.log("file", file);
    const date = new Date();
    const content = parse(formData.content);
    console.log(content.props.children);
    // const imageid = await createPostImage(file);
    dataToSent.date = date;
    dataToSent.content = content.props.children;
    console.log(dataToSent);
    const promise = await likeReviewsWIthPosts(dataToSent.slug);
    const res = await createPost(username, dataToSent);
    setFormData({
      title: "",
      content: "",
      category: "",
      tags: "",
      image: "",
      date: "",
      status: "",
      slug: "",
    });
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
          readOnly
          // onChange={handleChange}
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
          initialValue={formData.content}
          init={{
            height: 500,
            menubar: false,
            plugins: [
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
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
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
