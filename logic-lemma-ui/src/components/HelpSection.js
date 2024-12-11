import React from "react";

const HelpSection = ({ darkMode }) => {
  return (
    <div
      className={`mb-6 p-4 rounded-md shadow-md ${
        darkMode
          ? "bg-jet-400 text-steel_blue-100"
          : "bg-gray-100 text-black border border-black"
      }`}
    >
      For assistance, contact Quella at:{" "}
      <a
        href="wang.zhenj@northeastern.edu"
        className="underline text-hot_pink-500 hover:text-hot_pink-700"
      >
        support@logiclemmaprover.com
      </a>
    </div>
  );
};

export default HelpSection;