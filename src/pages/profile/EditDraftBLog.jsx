import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { useBlog } from "../../global/blogcontext";
import { useDatabse } from "../../appwriteBackend/database/databse";
export default function EditDraftBLog() {
  const draft = useLocation();
  console.log(draft);
  const navigate = useNavigate();
  const { createPost, toDelteDRaft } = useDatabse();
  const { username } = useBlog();
  const post = useLocation();
  const data = post.state.props;
  const [postdata, setpostdata] = useState({
    title: draft.state.data.title,
    image: draft.state.data.image,
    category: draft.state.data.category,
    tags: draft.state.data.tags.join(" "),
    slug: draft.state.data.slug,
    status: draft.state.data.status,
    content: draft.state.data.content,
  });
  console.log(postdata);
  const [file, setfile] = useState(null);
  // console.log(post);
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setpostdata((prevData) => ({
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
      setpostdata((prevData) => ({
        ...prevData,
        slug: slug,
      }));
    }
  }
  const handleSubmit = async () => {
    const promise1 = await toDelteDRaft(draft.state.data.id);
    const dataToSent = postdata;
    // console.log("file", file);
    const date = new Date();
    const content = parse(postdata.content);
    console.log(content.props.children);
    const tags = postdata.tags.split(" ");
    console.log(tags);
    // const imageid = await createPostImage(file);
    dataToSent.date = date;
    dataToSent.content = content.props.children;
    dataToSent.tags = tags;
    console.log(dataToSent);
    // const promise = await likeReviewsWIthPosts(dataToSent.slug);
    const res = await createPost(username, dataToSent);
    console.log(res);

    navigate("/profile");
  };
  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded shadow mt-4">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={postdata.title}
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
          value={postdata.category}
          onChange={handleChange}
          className="w-full border rounded py-2 px-3"
        >
          <option value="technology">Technology</option>
          <option value="science">Science</option>
          <option value="art">Art</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Tags:</label>
        <input
          type="text"
          name="tags"
          value={postdata.tags}
          onChange={handleChange}
          className="w-full border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Slug:</label>
        <input
          type="text"
          name="slug"
          value={postdata.slug}
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
          checked={postdata.status}
          onChange={handleChange}
          className="mr-2"
        />
        <span className="text-gray-700">Is Active</span>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Content:</label>
        <Editor
          apiKey="6cbx0irs9jtviit23c1e9dak2ktwvfchhyzuwpkps6pqyhpq"
          initialValue={postdata.content}
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
            setpostdata((prevData) => ({ ...prevData, content }))
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
