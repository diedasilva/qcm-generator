import React, { useState } from "react";
import Quiz from "./components/Quiz";
import type { QuestionType } from "./types";
import "./App.css";

interface DataSource {
  label: string;
  questions: QuestionType[];
}

// Dynamically import all JSON files from data folder
const modules = import.meta.glob<{
  default: QuestionType[];
}>("./assets/data/*.json", { eager: true });

// Build data sources array from modules
const DATA_SOURCES: DataSource[] = Object.entries(modules).map(
  ([path, module]) => {
    // Extract filename, e.g. "react_questions.json"
    const fileName = path.split("/").pop() || "";
    // Remove extension
    const nameWithoutExt = fileName.replace(/\.json$/, "");
    // Generate label: uppercase first letter, remove suffix
    const label = nameWithoutExt
      .replace(/_questions$/, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      label,
      questions: module.default,
    };
  }
);

export default function App() {
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);

  // Selection screen
  if (!selectedSource) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="p-6 rounded-2xl shadow-lg w-full max-w-xl text-center">
          <h1 className="text-2xl font-bold mb-4">QCM Generator</h1>
          <p className="mb-4">Choisissez un sujet :</p>
          <div className="flex flex-wrap justify-center gap-2">
            {DATA_SOURCES.map((src) => (
              <button
                key={src.label}
                onClick={() => setSelectedSource(src)}
                className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
              >
                {src.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-6 rounded-2xl shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {selectedSource.label} QCM
        </h1>
        <Quiz
          questions={selectedSource.questions}
          onChangeSubject={() => setSelectedSource(null)}
        />
      </div>
    </div>
  );
}
