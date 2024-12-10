import React from "react";

const InputForm = ({ lemma, setLemma, handleSubmit, loading, darkMode }) => {
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        rows="6"
        className={`w-full p-4 text-lg font-mono rounded-md shadow-sm border focus:outline-none focus:ring-2 resize-y ${
          darkMode
            ? "bg-jet-400 text-steel_blue-100 border-steel_blue-600"
            : "bg-white text-black border-black"
        }`}
        placeholder="Enter your lemma here..."
        value={lemma}
        onChange={(e) => setLemma(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-4 px-6 py-2 text-lg font-semibold rounded-lg shadow-md transition bg-hot_pink-500 text-white hover:bg-pumpkin-700"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default InputForm;
