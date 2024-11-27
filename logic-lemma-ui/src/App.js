import React, { useState } from "react";
import "./styles/index.css";
import Header from "./components/Header";
import HelpSection from "./components/HelpSection";
import InputForm from "./components/InputForm";
import ResponseBox from "./components/ResponseBox";

function App() {
  const [lemma, setLemma] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showEmail, setShowEmail] = useState(false);

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
          preamble: "(definec ...) ...", // Add your custom preamble here
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
    <div
      className={`min-h-screen ${
        darkMode ? "bg-jet-500 text-steel_blue-100" : "bg-white text-black"
      } p-6`}
    >
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowEmail={setShowEmail}
      />
      {showEmail && <HelpSection darkMode={darkMode} />}
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
}

export default App;
