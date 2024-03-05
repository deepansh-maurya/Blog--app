import React from "react";
import { useNavigate } from "react-router-dom";

export default function DraftCard(prop) {
  const data = prop.prop;
  data.id = data.$id;
  console.log(data.id);
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      <div className="h-48 bg-gray-700 bg-cover bg-center"></div>
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2">{data.title}</h2>
        <p className="text-gray-400 text-base">{data.content}</p>
        <p className="text-gray-500 text-sm mt-2">Last updated: {data.date}</p>
      </div>
      <div className="flex items-center justify-end p-6">
        <button
          onClick={() => {
            navigate("/editdraftblog", { state: { data } });
          }}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
        <button className="text-red-500 hover:text-red-700 ml-4">Delete</button>
      </div>
    </div>
  );
}
