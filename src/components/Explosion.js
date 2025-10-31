import React from "react";

export default function Enemy({ visible }) {
  if (!visible) return null;
  return (
    <img
      src="images/slime.png"
      alt="スライム"
      style={{
        position: "fixed",
        bottom: "10%",
        left: "-200px",
        width: "150px",
        height: "auto",
        animation: "enemyMove 8s linear infinite",
      }}
    />
  );
}
