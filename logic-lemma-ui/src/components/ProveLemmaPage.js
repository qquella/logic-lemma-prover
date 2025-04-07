import React, { useState } from "react";
import InputForm from "./InputForm";
import ResponseBox from "./ResponseBox";

const ProveLemmaPage = ({ darkMode }) => {
  const [lemma, setLemma] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5001/prove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lemma: lemma,
          model: "gpt-4o",
          preamble: "(definec ...) ...", // Add your custom preamble if needed
        }),
      });
      const data = await res.json();
      setResponse(data.proof || "Proof generated successfully!");
    } catch (err) {
      setResponse(`Error: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div>
      <InputForm
        lemma={lemma}
        setLemma={setLemma}
        handleSubmit={handleSubmit}
        loading={loading}
        darkMode={darkMode}
      />
      <ResponseBox response={response} darkMode={darkMode} />
    </div>
  );
};

export default ProveLemmaPage;
