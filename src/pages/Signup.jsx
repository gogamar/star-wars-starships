import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing a specific slice of the state
  const users = useSelector((state) => state.users.users);

  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(signupUser({ email, password }))
        .unwrap()
        .then(() => {
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.error("Signup failed:", err);
          alert("Failed to sign up. Please try again.");
        });
    },
    [dispatch, email, password, navigate]
  );

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              {/* Since reqres only allows predefined emails to be registered... */}
              <select
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm px-2"
              >
                {/* Default placeholder option */}
                <option value="" disabled>
                  Select an email
                </option>

                {/* Map through users and create an option for each email */}
                {users.map((user) => (
                  <option key={user.id} value={user.email}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm px-2"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <p
            className="mt-4 text-center text-sm text-red-500"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        {/* Redirect to Login */}
        <p className="mt-10 text-center text-sm text-gray-400">
          Already a member?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
