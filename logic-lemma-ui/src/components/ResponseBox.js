import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark as syntaxStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import { InlineMath, BlockMath } from "react-katex";

const ResponseBox = ({ response, darkMode }) => {
  return (
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
  );
};

export default ResponseBox;
