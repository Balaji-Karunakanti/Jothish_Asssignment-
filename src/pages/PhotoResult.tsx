import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PhotoResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { image, employee } = location.state || {};

  if (!image) {
    navigate("/list");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        Photo Captured Successfully
      </h1>

      <img src={image} className="w-64 rounded-xl shadow-md" />

      <p className="mt-4 font-semibold">{employee[0]}</p>

      <button
        onClick={() => navigate("/list")}
        className="mt-6 bg-yellow-400 px-6 py-3 rounded-lg"
      >
        Back to List
      </button>
    </div>
  );
};

export default PhotoResult;