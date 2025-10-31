// LoadingScreen.jsx
import React from "react";

export default function LoadingScreen({ message = "終了しています..." }) {
  return (
    <>
      <style>
        {`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes blinkBorder {
          0%, 100% {
            box-shadow: 0 0 20px 5px #f8b400;
            border-color: #f8b400;
          }
          50% {
            box-shadow: 0 0 5px 1px rgba(248,180,0,0.5);
            border-color: rgba(248,180,0,0.5);
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
      </style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "rgba(0,0,0,0.85)",
          color: "white",
          border: "3px solid #f8b400",
          borderRadius: "20px",
          width: "70%",
          margin: "80px auto",
          textAlign: "center",
          animation: "slideDown 0.6s ease-out, blinkBorder 2s infinite",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "6px solid rgba(255,255,255,0.2)",
            borderTopColor: "#f8b400",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "25px",
          }}
        ></div>
        <h2>{message}</h2>
        <p>少々お待ちください</p>
      </div>
    </>
  );
}
