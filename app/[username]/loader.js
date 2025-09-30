import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
