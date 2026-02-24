import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Details from "./pages/Details";
import PhotoResult from "./pages/PhotoResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Employee List */}
        <Route path="/list" element={<List />} />

        {/* Employee Details */}
        <Route path="/details" element={<Details />} />

        {/* Photo Result Page */}
        <Route path="/photo-result" element={<PhotoResult />} />

        {/* Optional: fallback route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;