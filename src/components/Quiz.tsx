import React, { useMemo, useState } from "react";
import Question from "./Question";
import Results from "./Results";
import type { QuestionType } from "../types";

interface QuizProps {
  questions: QuestionType[];
  onChangeSubject: () => void;
}

const PRESET_COUNTS = [25, 50, 100, 150, 200];

export default function Quiz({ questions, onChangeSubject }: QuizProps) {

  // State to hold the number of questions selected
  const [numQuestions, setNumQuestions] = useState<number | null>(null);

  // Build available options based on total questions
  const availableOptions = PRESET_COUNTS.filter((n) => n <= questions.length);
  if (!availableOptions.includes(questions.length)) {
    availableOptions.push(questions.length);
  }

  // Shuffle and limit the number of questions to numQuestions
  const quizQuestions = useMemo<QuestionType[]>(() => {
    if (numQuestions === null) return [];
    const shuffled = shuffleArray(questions);
    return shuffled.slice(0, numQuestions);
  }, [questions, numQuestions]);

  const [current, setCurrent] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [incorrects, setIncorrects] = useState<
    { question: string; correct: string; selected: string }[]
  >([]);
  const [finished, setFinished] = useState<boolean>(false);

  const handleAnswer = (selected: string) => {
    const q = quizQuestions[current];
    if (selected === q.answer) {
      setScore((prev) => prev + 1);
    } else {
      setIncorrects((prev) => [
        ...prev,
        { question: q.question, correct: q.answer, selected },
      ]);
    }

    const next = current + 1;
    if (next < quizQuestions.length) {
      setCurrent(next);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setNumQuestions(null);
    setCurrent(0);
    setScore(0);
    setIncorrects([]);
    setFinished(false);
  };

  // If not selected yet: show selection UI
  if (numQuestions === null) {
    return (
      <div className="text-center">
        <p className="mb-4">Sélectionnez le nombre de questions :</p>
        <div className="flex flex-wrap justify-center gap-2">
          {availableOptions.map((n) => (
            <button
              key={n}
              onClick={() => setNumQuestions(n)}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return finished ? (
    <Results
      score={score}
      total={quizQuestions.length}
      incorrects={incorrects}
      onRestart={handleRestart}
      onChangeSubject={onChangeSubject}
    />
  ) : (
    <Question
      data={quizQuestions[current]}
      onAnswer={handleAnswer}
      index={current + 1}
      total={quizQuestions.length}
    />
  );
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
