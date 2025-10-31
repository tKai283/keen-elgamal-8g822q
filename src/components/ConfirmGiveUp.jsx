// ConfirmGiveUp.jsx
import React, { useEffect, useState } from "react";

export default function ConfirmGiveUp({ onConfirm }) {
  const [closing, setClosing] = useState(false);

  const handleChoice = (choice) => {
    if (choice === "no") {
      setClosing(true);
      setTimeout(() => onConfirm(choice), 600); // アニメ終了後に戻す
    } else {
      onConfirm(choice);
    }
  };

  return (
    <>
      <style>
        {`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUpExit {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-60px); }
        }

        @keyframes blinkBorder {
          0%, 100% { box-shadow: 0 0 20px 5px #f8b400; border-color: #f8b400; }
          50% { box-shadow: 0 0 5px 1px rgba(248,180,0,0.5); border-color: rgba(248,180,0,0.5); }
        }
      `}
      </style>

      <div
        style={{
          textAlign: "center",
          padding: "60px",
          background: "rgba(0, 0, 0, 0.85)",
          border: "3px solid #f8b400",
          borderRadius: "15px",
          width: "70%",
          margin: "100px auto",
          color: "white",
          animation: `${
            closing ? "slideUpExit" : "slideDown"
          } 0.6s ease-out, blinkBorder 2s infinite`,
        }}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "25px" }}>
          ⚠ あきらめますか？
        </h2>

        <button
          onClick={() => handleChoice("yes")}
          style={{
            fontSize: "20px",
            margin: "10px",
            padding: "10px 20px",
            background: "linear-gradient(90deg, #ff5e62, #ff9966)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          あきらめる
        </button>

        <button
          onClick={() => handleChoice("no")}
          style={{
            fontSize: "20px",
            margin: "10px",
            padding: "10px 20px",
            background: "#444",
            color: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          つづける
        </button>
      </div>
    </>
  );
}
