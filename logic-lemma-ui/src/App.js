import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark as syntaxStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

function App() {
  const [lemma, setLemma] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setResponse("");
    try {
      const res = await axios.post(
        "http://localhost:5001/prove",
        {
          lemma: lemma,
          model: "gpt-4o",
          preamble: "(definec ...) ...", // Add your custom preamble here
        },
        {
          headers: { "Content-Type": "application/json" }, // Ensure JSON content
        }
      );
      setResponse(res.data.proof || "Proof generated successfully!");
    } catch (err) {
      setResponse("Error: " + err.response?.data?.error || err.message);
    }
    setLoading(false);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-jet-500 text-steel_blue-100" : "bg-white text-black"
      } p-6`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Logic Lemma Prover</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 text-sm font-semibold rounded-lg shadow-md transition bg-steel_blue-500 text-white hover:bg-steel_blue-700"
        >
          Switch to {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

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

      <div>
        <h2 className="text-xl font-bold mb-4">Response:</h2>
        <div
          className={`p-4 rounded-md shadow-sm overflow-auto ${
            darkMode
              ? "bg-jet-600 text-steel_blue-100"
              : "bg-white text-black border border-black"
          }`}
          style={{ minHeight: "300px", maxHeight: "600px", resize: "both" }}
        >
          {response ? (
            <ReactMarkdown
              children={response}
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={syntaxStyle}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className={`p-1 rounded ${
                        darkMode
                          ? "bg-jet-400 text-steel_blue-100"
                          : "bg-gray-200 text-black"
                      }`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                p({ children }) {
                  const containsLatex = /\$.*?\$/g.test(children);
                  if (containsLatex) {
                    const latex = children.replace(/\$/g, "").trim();
                    return <BlockMath>{latex}</BlockMath>;
                  }
                  return <p>{children}</p>;
                },
                inlineMath({ value }) {
                  return <InlineMath>{value}</InlineMath>;
                },
                math({ value }) {
                  return <BlockMath>{value}</BlockMath>;
                },
              }}
            />
          ) : (
            <span className="text-gray-400">No response yet</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
