import React from "react";
import { useNavigate } from "react-router-dom";

export default function DraftCard(prop) {
  const data = prop.prop;
  data.id = data.$id;
  console.log(data.id);
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      {/* Image or icon */}
      <div className="h-48 bg-gray-300 bg-cover bg-center"></div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="font-bold text-xl mb-2">{data.title}</h2>

        {/* Content snippet */}
        <p className="text-gray-700 text-base">{data.content}</p>

        {/* Updated at */}
        <p className="text-gray-500 text-sm mt-2">Last updated: {data.date}</p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end p-6">
        <button
          onClick={() => {
            navigate("/editdraftblog", { state: { data } });
          }}
          className="text-purple-500 hover:text-purple-700"
        >
          Edit
        </button>
        <button className="text-red-500 hover:text-red-700 ml-4">Delete</button>
      </div>
    </div>
  );
}
