// src/App.js
import React, { useState } from "react";
import ComicForm from "./components/ComicForm";
import ComicPanel from "./components/ComicPanel";
import "./App.css";

function App() {
  const [comicPanels, setComicPanels] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to call the text-to-image API
  const generateComic = async (panelTexts) => {
    try {
      setError("");
      setLoading(true);
      setComicPanels([]);

      // Call the API for each panel text
      const panels = await Promise.all(
        panelTexts.map(async (text) => {
          if (!text.trim()) return null; // Skip empty strings

          const response = await fetch(
            "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
            {
              method: "POST",
              headers: {
                Accept: "image/png",
                Authorization:
                  "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", // Replace with your actual API key
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ inputs: text }),
            },
          );

          if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
          }

          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          return imageUrl;
        }),
      );

      setComicPanels(panels.filter((url) => url)); // Filtering out any null values
    } catch (error) {
      setError(
        "Failed to generate comic. Please see the console for more information.",
      );
      console.error("Error details:", error.message);

      if (error.response) {
        console.error("API response error:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Comic Strip Generator</h1>
      <ComicForm onSubmit={generateComic} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="comic-panel-container">
        {comicPanels.map((imageUrl, index) => (
          <ComicPanel key={index} imageUrl={imageUrl} />
        ))}
      </div>
    </div>
  );
}

export default App;
