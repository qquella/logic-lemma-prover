import React from "react";

const Sidebar = ({ page, setPage, darkMode }) => {
  return (
    <div
      className={`w-64 border-r p-4 ${
        darkMode ? "border-gray-700" : "border-black"
      }`}
    >
      <nav className="space-y-2">
        <button
          onClick={() => setPage("prove-lemma")}
          className={`block w-full text-left px-4 py-2 rounded 
            ${
              page === "prove-lemma"
                ? "bg-blue-500 text-white"
                : "text-pink-400 hover:bg-blue-700 hover:text-white"
            }`}
        >
          Prove Lemma
        </button>
        <button
          onClick={() => setPage("transcribe-scheme")}
          className={`block w-full text-left px-4 py-2 rounded
            ${
              page === "transcribe-scheme"
                ? "bg-blue-500 text-white"
                : "text-pink-400 hover:bg-blue-700 hover:text-white"
            }`}
        >
          Transcribe Scheme
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
