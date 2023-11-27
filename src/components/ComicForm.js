// src/components/ComicForm.js
import React, { useState } from "react";

function ComicForm({ onSubmit }) {
  const [inputs, setInputs] = useState(Array(10).fill(""));

  const handleChange = (index) => (event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input, index) => (
        <div key={index}>
          <label>Panel {index + 1}:</label>
          <input
            type="text"
            value={input}
            onChange={handleChange(index)}
            required
          />
        </div>
      ))}
      <div className="form-button-wrapper">
        <button type="submit" className="generate-button">
          Generate Comic
        </button>
      </div>
    </form>
  );
}

export default ComicForm;

