import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../Utils/Auth";

const Login = () => {
  const [formData, setFormData] = useState({
    contact: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.contact.trim()) {
      newErrors.contact = "Email or Phone is required";
    } else if (
      !/^\S+@\S+\.\S+$/.test(formData.contact) &&
      !/^\+?\d{10,15}$/.test(formData.contact.replace(/\D/g, ""))
    ) {
      newErrors.contact = "Invalid email or phone number";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    const newErrors = { ...errors };
    if (name === "contact") {
      if (!value.trim()) newErrors.contact = "Email or Phone is required";
      else if (
        !/^\S+@\S+\.\S+$/.test(value) &&
        !/^\+?\d{10,15}$/.test(value.replace(/\D/g, ""))
      ) {
        newErrors.contact = "Invalid email or phone number";
      } else delete newErrors.contact;
    }
    if (name === "password") {
      if (!value) newErrors.password = "Password is required";
      else delete newErrors.password;
    }
    setErrors(newErrors);
  };

  const BaseURL =
    import.meta.env.MODE === "development"
      ? "http://localhost:2512"
      : "laxmi-server-production-7c6e.up.railway.app";

  // const BaseURL = "http://localhost:2512";

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${BaseURL}/auth/signin`, {
        contact: formData.contact,
        password: formData.password,
      });

      if (response.data.token) {
        saveToken(response.data.token); // Save login token
        console.log("Login token saved:", response.data.token);
      }
      setMessage(response.data.message || "Login successful!");
      setTimeout(() => {
        navigate("/"); // Redirect to dashboard or desired route
      }, 1000);
    } catch (err) {
      let errorMsg = "Login failed";
      if (err.code === "ERR_NETWORK") {
        errorMsg =
          "Cannot connect to the server. Please ensure the backend is running.";
      } else if (err.response) {
        errorMsg = err.response.data.message || err.response.statusText;
      } else {
        errorMsg = err.message;
      }
      setError(errorMsg);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coral-100 to-teal-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-coral-600 dark:text-coral-400 mb-6">
          Welcome Back
        </h1>
        {message && (
          <p className="mb-4 text-green-600 dark:text-green-400 text-center font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="mb-4 text-red-600 dark:text-red-400 text-center font-medium">
            {error}
          </p>
        )}
        <div className="space-y-6">
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email or Phone
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              placeholder="Enter email or phone"
              value={formData.contact}
              onChange={handleChange}
              required
              disabled={loading}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-transform duration-300 disabled:opacity-50"
              aria-invalid={errors.contact ? "true" : "false"}
              aria-describedby={errors.contact ? "contact-error" : undefined}
            />
            {errors.contact && (
              <p
                id="contact-error"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.contact}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-transform duration-300 disabled:opacity-50"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7 1.275-4.057 5.065-7 9.543-7 1.927 0 3.74.693 5.332 1.293M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p
                id="password-error"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.password}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-gradient-to-r from-coral-600 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-teal-600 hover:to-coral-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center group"
            aria-busy={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing In...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2 group-hover:animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Sign In
              </>
            )}
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-coral-600 hover:underline dark:text-coral-400 font-medium"
            >
              Sign Up
            </a>
          </p>
          <p className="mt-2">
            <a
              href="#"
              className="text-teal-600 hover:underline dark:text-teal-400 font-medium"
            >
              Back to Shop
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
