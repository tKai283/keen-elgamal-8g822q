import React from "react";

export default function Result({ message }) {
  if (!message) return null;

  return (
    <p
      style={{
        fontSize: "24px",
        marginTop: "20px",
        color: message.includes("正解")
          ? "green"
          : message.includes("おしい")
          ? "orange"
          : "red",
      }}
    >
      {message}
    </p>
  );
}
