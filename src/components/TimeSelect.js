import React from "react";

export default function TimeSelect({ onSelect, onBack }) {
  const times = [30, 15];

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>制限時間を選んでください</h2>
      {times.map((t) => (
        <button
          key={t}
          onClick={() => onSelect(t)}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "18px",
            borderRadius: "8px",
          }}
        >
          {t} 秒
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
