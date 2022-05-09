import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyle";
import MainPage from "./views/MainPage";
import GamePage from "./views/GamePage";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
