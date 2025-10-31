import React from "react";

export default function QuestionCount({ onSelect, onBack }) {
  const counts = [7, 10, 16];

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>出題数を選んでください</h2>
      {counts.map((num) => (
        <button
          key={num}
          onClick={() => onSelect(num)}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "8px",
          }}
        >
          {num}問
        </button>
      ))}
      <div>
        <button onClick={onBack} style={{ marginTop: "20px" }}>
          ← 戻る
        </button>
      </div>
    </div>
  );
}
