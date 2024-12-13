import React, { useState, useRef } from "react";

// A simple JS version of the transformLogic function:
function transformLogic(code) {
  const logical_ops = { implies: "=>", and: "^", or: "v", equal: "==" };
  const re = /\b(implies|and|or|equal)\b/gi;
  return code
    .replace(re, (match) => logical_ops[match.toLowerCase()] || match)
    .toLowerCase();
}

const TranscribeSchemePage = ({ darkMode }) => {
  const [inputCode, setInputCode] =
    useState(`((IMPLIES (NOT (AND (RATIONALP X) (NATP N)))
          (IMPLIES (AND (RATIONALP X) (NATP N))
                   (EQUAL (NPOW/SLOW X N) (EXPT X N))))
 (IMPLIES
  (AND (AND (RATIONALP X) (NATP N)) (NOT (= N 0))
       (IMPLIES (AND (RATIONALP X) (NATP (+ -1 N)))
                (EQUAL (NPOW/SLOW X (+ -1 N)) (EXPT X (+ -1 N)))))
  (IMPLIES (AND (RATIONALP X) (NATP N)) (EQUAL (NPOW/SLOW X N) (EXPT X N))))
 (IMPLIES (AND (AND (RATIONALP X) (NATP N)) (= N 0))
          (IMPLIES (AND (RATIONALP X) (NATP N))
                   (EQUAL (NPOW/SLOW X N) (EXPT X N)))))`);
  const [transformedCode, setTransformedCode] = useState("");

  // Ref for the transformed code section
  const transformedCodeRef = useRef(null);

  const handleTransform = () => {
    const output = transformLogic(inputCode);
    setTransformedCode(output);
    // Wait for state update, then scroll
    setTimeout(() => {
      if (transformedCodeRef.current) {
        transformedCodeRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">Transcribe Scheme</h2>
      <p className="mb-4">
        This tool takes a block of scheme-like logic code and substitutes
        certain logical keywords (<code>implies</code>, <code>and</code>,{" "}
        <code>or</code>, <code>equal</code>) with symbolic representations (
        <code>={">"}</code>, <code>^</code>, <code>v</code>, <code>==</code>).
      </p>

      <h3 className="text-xl font-semibold mb-2">Example</h3>
      <p className="mb-4">
        For example, the code:
        <pre className="bg-gray-800 p-2 rounded text-white mt-2 whitespace-pre-wrap">
          (IMPLIES (AND (RATIONALP X) (NATP N)) (EQUAL (NPOW/SLOW X N) (EXPT X
          N)))
        </pre>
        would be transformed into:
        <pre className="bg-gray-800 p-2 rounded text-white mt-2 whitespace-pre-wrap">
          (={">"} (^ (rationalp x) (natp n)) (== (npow/slow x n) (expt x n)))
        </pre>
      </p>

      <label htmlFor="codeInput" className="block mb-2 font-semibold">
        Input Code:
      </label>
      <textarea
        id="codeInput"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        className={`w-full h-64 p-2 mb-4 ${
          darkMode ? "bg-jet-400 text-steel_blue-100" : "bg-gray-200 text-black"
        }`}
      ></textarea>

      <button
        onClick={handleTransform}
        className="bg-hot_pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Transform
      </button>

      {transformedCode && (
        <div className="mt-4" ref={transformedCodeRef}>
          <h3 className="text-xl font-semibold mb-2">Transformed Code:</h3>
          <pre className="bg-jet-600 p-2 rounded text-white whitespace-pre-wrap">
            {transformedCode}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TranscribeSchemePage;
