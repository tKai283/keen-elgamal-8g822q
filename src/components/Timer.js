import React from "react";

export default function Timer({ timeLeft }) {
  const isWarning = timeLeft <= 10;
  return (
    <div
      style={{
        marginTop: "15px",
        fontSize: isWarning ? "48px" : "24px",
        fontWeight: "bold",
        color: isWarning ? "red" : "black",
        animation: isWarning ? "flash 0.5s infinite" : "none",
      }}
    >
      残り時間: {timeLeft} 秒
      <style>
        {`
          @keyframes flash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}
      </style>
    </div>
  );
}
