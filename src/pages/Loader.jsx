// src/components/Loader.jsx
import React from "react";

const Loader = ({ size = 18, color = "#00b894" }) => {
    const spinnerStyle = {
        width: size,
        height: size,
        border: `2px solid ${color}40`,
        borderTop: `2px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 0.4s linear infinite",
    };

    return <div style={spinnerStyle}></div>;
};

// inject spin animation once
if (!document.getElementById("spin-keyframes")) {
    const style = document.createElement("style");
    style.id = "spin-keyframes";
    style.innerHTML = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
    document.head.appendChild(style);
}

export default Loader;
