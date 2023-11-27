// src/components/ComicPanel.js
import React from "react";

function ComicPanel({ imageUrl }) {
  return (
    <div>
      <img
        src={imageUrl}
        alt="Comic Panel"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}

export default ComicPanel;
