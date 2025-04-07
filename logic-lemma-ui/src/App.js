import React, { useState, useEffect } from "react";
import "./styles/index.css";
import Header from "./components/Header";
import HelpSection from "./components/HelpSection";

import Sidebar from "./components/Sidebar";
import ProveLemmaPage from "./components/ProveLemmaPage";
import TranscribeSchemePage from "./components/TranscribeSchemePage";

// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/next";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [page, setPage] = useState("prove-lemma");

  // Load the page from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure code only runs client-side
      const savedPage = localStorage.getItem("currentPage");
      console.log("Loaded page from storage:", savedPage);
      if (savedPage) {
        setPage(savedPage);
      }
    }
  }, []);


  // Save the current page to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Saving page to storage:", page);
      localStorage.setItem("currentPage", page);

    try {
      const res = await fetch("/prove", {
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
  }, [page]);

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-jet-500 text-steel_blue-100" : "bg-white text-black"
      }`}
    >

      <Sidebar page={page} setPage={setPage} darkMode={darkMode} />
      <div className="flex-1 p-6">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setShowEmail={setShowEmail}
        />
        {showEmail && <HelpSection darkMode={darkMode} />}

        {page === "prove-lemma" && <ProveLemmaPage darkMode={darkMode} />}
        {page === "transcribe-scheme" && (
          <TranscribeSchemePage darkMode={darkMode} />
        )}
      </div>
      {/* <Analytics /> */}
      {/* <SpeedInsights /> */}

    </div>
  );
}

export default App;
