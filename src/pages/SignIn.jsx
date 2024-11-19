import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetError } from "../redux/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [feedback, setFeedback] = useState({ email: "", password: "" });

  const { user, loading, error } = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname || "/";

  // Generic field validator
  const validators = {
    email: (value) =>
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
        ? ""
        : "Invalid email format.",
    password: (value) => (value.length > 0 ? "" : "Password cannot be empty."),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFeedback((prev) => ({ ...prev, [name]: "" })); // Clear feedback
    dispatch(resetError());
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMessage = validators[name](value);
    setFeedback((prev) => ({
      ...prev,
      [name]: errorMessage || "Looks good!",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validators.email(formData.email);
    const passwordError = validators.password(formData.password);

    if (emailError || passwordError) {
      setFeedback({ email: emailError, password: passwordError });
      return;
    }

    dispatch(loginUser(formData.email, formData.password, navigate, from));
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Reserved space for general error messages */}
        <div className="h-6 my-5">
          {error && (
            <p
              className="my-4 text-center text-sm text-red-500"
              aria-live="polite"
            >
              {error}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="" noValidate>
          {["email", "password"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-white"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <div className="my-2">
                <input
                  id={field}
                  name={field}
                  type={field === "password" ? "password" : "email"}
                  value={formData[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm px-2"
                />
              </div>
              {/* Reserved space for field-specific feedback */}
              <div className="h-6">
                {feedback[field] && (
                  <p
                    className={`text-sm ${
                      feedback[field] === "Looks good!"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {feedback[field]}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-400"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-400">
          Not a member?{" "}
          <a
            href="/signup"
            className="font-semibold text-yellow-400 hover:text-yellow-300"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
