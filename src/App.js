import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Card from "./components/Card";
import CardDetails from "./components/CardDetails";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/cart/:id" element={<CardDetails />} />
      </Routes>
    </div>
  );
}

export default App;
