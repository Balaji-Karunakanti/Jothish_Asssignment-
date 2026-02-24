import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;