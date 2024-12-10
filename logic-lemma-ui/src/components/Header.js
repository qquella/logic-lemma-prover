import React from "react";

const Header = ({ darkMode, setDarkMode, setShowEmail }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Logic Lemma Prover</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition bg-steel_blue-500 text-white hover:bg-steel_blue-700"
        >
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
        <button
          onClick={() => setShowEmail((prev) => !prev)}
          className="px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition bg-hot_pink-500 text-white hover:bg-hot_pink-700"
        >
          Need Help?
        </button>
      </div>
    </div>
  );
};

export default Header;
