import React from "react";
import "./Squares.css";

export default function Squares({
  direction = "diagonal", // 'right' | 'left' | 'up' | 'down' | 'diagonal'
  speed = 15, // pixels per second
  squareSize = 40, // grid cell size in px
  borderColor = "#999",
  opacity = 0.2,
  lineWidth = 1,
  className = "",
}) {
  const duration = Math.max(0.0001, squareSize / Math.max(1, speed));
  const dirToAnim =
    {
      right: "scroll-right",
      left: "scroll-left",
      up: "scroll-up",
      down: "scroll-down",
      diagonal: "scroll-diagonal",
    }[direction] || "scroll-right";

  const style = {
    "--size": `${squareSize}px`,
    "--color": borderColor,
    "--opacity": opacity,
    "--duration": `${duration}s`,
    "--line": `${lineWidth}px`,
  };

  return (
    <div
      className={`squares-bg ${className}`}
      style={style}
      data-anim={dirToAnim}
    />
  );
}
