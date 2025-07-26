import React from "react";

interface Incorrect {
  question: string;
  correct: string;
  selected: string;
}

interface ResultsProps {
  score: number;
  total: number;
  incorrects: Incorrect[];
  onRestart: () => void;
  onChangeSubject: () => void;
}

export default function Results({
  score,
  total,
  incorrects,
  onRestart,
  onChangeSubject,
}: ResultsProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Résultat</h2>
      <p className="text-lg mb-4">
        Vous avez obtenu {score} / {total}
      </p>
      {incorrects.length > 0 && (
        <div className="mt-4 text-left">
          <h3 className="font-semibold mb-2">Questions incorrectes :</h3>
          <ul className="list-disc ml-6 space-y-1 list-none">
            {incorrects.map((i, idx) => (
              <li key={idx}>
                <strong>Q:</strong> {i.question}
                <br />
                <strong className="text-red-400">Votre réponse:</strong>{" "}
                {i.selected}
                <br />
                <strong className="text-green-400">Bonne réponse:</strong>{" "}
                {i.correct}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={onRestart}
        className="mt-6 px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600"
      >
        Recommencer
      </button>
      <button
        onClick={onChangeSubject}
        className="px-4 py-2 bg-gray-400 rounded-xl hover:bg-gray-500"
      >
        Changer de sujet
      </button>
    </div>
  );
}
