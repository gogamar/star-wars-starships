import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./stories/Navbar";
import ProgressBar from "./stories/ProgressBar";

import Home from "./pages/Home";
import Starships from "./pages/Starships";
import StarshipDetails from "./pages/StarshipDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./index.css";

function App() {
  const isLoading = useSelector(
    (state) => state.starships.listStatus === "loading"
  );

  return (
    <Router>
      <Navbar />
      {isLoading && (
        <div className="flex justify-center mt-4">
          <ProgressBar isLoading={isLoading} />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/starships" element={<Starships />} />
        <Route path="/starships/:id" element={<StarshipDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
