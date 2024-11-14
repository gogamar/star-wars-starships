import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./stories/Navbar";
import ProgressBar from "./stories/ProgressBar";

import Starships from "./pages/Starships";
import StarshipDetails from "./pages/StarshipDetails";

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
        <Route path="/starships" element={<Starships />} />
        <Route path="/starships/:id" element={<StarshipDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
