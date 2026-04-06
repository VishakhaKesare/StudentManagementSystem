import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Students from "./pages/Students";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/students" element={<Students />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;