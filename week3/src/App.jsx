import React from "react";;
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./views/MainPage.jsx";
import GamePage from "./views/GamePage.jsx";
import ResultPage from "./views/ResultPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
