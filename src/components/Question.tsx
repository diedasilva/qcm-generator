import React, { useMemo } from "react";
import type { QuestionType } from "../types";

interface QuestionProps {
  data: QuestionType;
  onAnswer: (choice: string) => void;
  index: number;
  total: number;
}

function shuffleOptions(options: string[]): string[] {
  return options
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function Question({
  data,
  onAnswer,
  index,
  total,
}: QuestionProps) {
  const options = useMemo(() => shuffleOptions(data.options), [data.options]);
  return (
    <div>
      <p className="mb-2 text-gray-600">Question {index} / {total}</p>
      <h2 className="text-xl font-semibold mb-4">{data.question}</h2>
      <div className="space-y-2">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onAnswer(opt)}
            className="block w-full text-left p-2 border rounded-xl hover:bg-gray-50"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
