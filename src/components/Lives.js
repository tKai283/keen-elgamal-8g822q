import React from "react";

export default function Lives({ lives }) {
  console.log("残機:", lives); // ← デバッグ用表示
  const hearts = Array.from({ length: lives }, (_, i) => (
    <span key={i} style={{ fontSize: "1.8rem", margin: "0 2px" }}>
      ❤️
    </span>
  ));
  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      {lives > 0 ? (
        hearts
      ) : (
        <span style={{ color: "red" }}>💀 GAME OVER 💀</span>
      )}
    </div>
  );
}
