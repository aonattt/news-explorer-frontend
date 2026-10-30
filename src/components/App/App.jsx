import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<main>News Explorer</main>} />
        <Route path="/saved-news" element={<main>Saved articles</main>} />
      </Routes>
    </div>
  );
}

export default App;
