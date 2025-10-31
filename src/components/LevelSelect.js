import React from "react";

export default function LevelSelect({ onSelect }) {
  const levels = [
    { id: "easy", label: "初級" },
    { id: "normal", label: "中級" },
    { id: "hard", label: "上級" },
    { id: "expert", label: "超級" },
  ];

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>難易度を選んでください</h2>
      {levels.map((lvl) => (
        <button
          key={lvl.id}
          onClick={() => onSelect(lvl.id)}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "8px",
          }}
        >
          {lvl.label}
        </button>
      ))}
    </div>
  );
}
