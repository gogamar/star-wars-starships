import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUsers, setUsersLoading, setUsersError } from "./redux/usersSlice";
import { setCredentials } from "./redux/authSlice";
import { fetchStarships } from "./redux/starshipsListSlice";

import Navbar from "./stories/Navbar";
import ProgressBar from "./stories/ProgressBar";

import Home from "./pages/Home";
import Starships from "./pages/Starships";
import StarshipDetails from "./pages/StarshipDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./utils/ProtectedRoute";

import "./index.css";

function App() {
  const dispatch = useDispatch();
  // Redux state selectors
  const isLoading = useSelector(
    (state) => state.starships.loading || state.starshipDetails.loading
  );
  const list = useSelector((state) => state.starships.list);
  const user = useSelector((state) => state.auth.user);

  // Fetch users when the app loads
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setUsersLoading(true));
      try {
        const response = await fetch("https://reqres.in/api/users");
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        dispatch(setUsers(data.data));
      } catch (err) {
        dispatch(setUsersError("Failed to fetch users"));
        console.error("Error fetching users:", err);
      } finally {
        dispatch(setUsersLoading(false));
      }
    };
    fetchUsers();
  }, [dispatch]);

  // Get user credentials from localStorage
  useEffect(() => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (userId && token) {
        dispatch(setCredentials({ userId, token }));
      }
    } catch (error) {
      console.error("Error restoring credentials:", error);
    }
  }, [dispatch]);

  // Fetch starships on initial load
  useEffect(() => {
    if (!list.length) {
      dispatch(fetchStarships(null));
    }
  }, [dispatch, list.length]);

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
        <Route
          element={<ProtectedRoute canActivate={user} redirectPath="/login" />}
        >
          <Route path="/starships" element={<Starships />} />
          <Route path="/starships/:id" element={<StarshipDetails />} />
        </Route>
        <Route
          element={<ProtectedRoute canActivate={!user} redirectPath="/" />}
        >
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
