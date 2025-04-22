import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import MemberDetail from "./components/MemberDetail"; // Importere den nye profilsiden
import "./styles/Layout.scss";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team/:slug" element={<MemberDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
