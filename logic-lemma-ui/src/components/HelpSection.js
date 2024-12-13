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
      <br></br>
      Otherwise, check out Prover Checker at:{" "}
      <a
        href="http://checker.atwalter.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-hot_pink-500 hover:text-hot_pink-700"
      >
        checker.atwalter.com
      </a>
    </div>
  );
};

export default HelpSection;
