import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./stories/Navbar";
import ProgressBar from "./stories/ProgressBar";

import Login from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import Starships from "./pages/Starships";
import StarshipDetails from "./pages/StarshipDetails";

import ProtectedRoute from "./utils/ProtectedRoute";
import "./index.css";

function App() {
  const isLoading = useSelector(
    (state) => state.starships.loading || state.starshipDetails.loading
  );

  return (
    <Router>
      <Navbar />

      {isLoading && (
        <div className="flex justify-center mt-4" aria-live="polite">
          <ProgressBar isLoading={isLoading} />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/starships" element={<Starships />} />
          <Route path="/starships/:id" element={<StarshipDetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
