import React from "react";

export default function WaitScreen({
  level,
  questionCount,
  timeLimit,
  onStart,
  onBack,
}) {
  // 難易度を日本語で表示
  const levelLabel =
    {
      easy: "初級",
      normal: "中級",
      hard: "上級",
      expert: "超級",
    }[level] || "不明";

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>準備はいいですか？</h2>
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        以下の設定でクイズを開始します：
      </p>

      <div
        style={{
          margin: "30px auto",
          padding: "20px",
          border: "2px solid #444",
          borderRadius: "12px",
          width: "60%",
          backgroundColor: "#f9f9f9",
          fontSize: "20px",
          textAlign: "left",
        }}
      >
        <p>
          🔹 難易度：<strong>{levelLabel}</strong>
        </p>
        <p>
          🔹 出題数：<strong>{questionCount}問</strong>
        </p>
        <p>
          🔹 制限時間：<strong>{timeLimit}秒</strong>
        </p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <button
          onClick={onStart}
          style={{
            fontSize: "22px",
            padding: "12px 35px",
            borderRadius: "10px",
            background: "linear-gradient(90deg, #4facfe, #00f2fe)",
            color: "white",
            fontWeight: "bold",
            marginRight: "20px",
          }}
        >
          ▶ スタート！
        </button>

        <button
          onClick={onBack}
          style={{
            fontSize: "18px",
            padding: "10px 25px",
            borderRadius: "8px",
            backgroundColor: "#ddd",
          }}
        >
          ← 戻る
        </button>
      </div>
    </div>
  );
}
