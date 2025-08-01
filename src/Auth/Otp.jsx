import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { saveToken, getUserRoles } from "../Utils/Auth"; // Adjust the import path as needed

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contact: location.state?.contact || "", // Pre-fill from Register
    otp: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Validate contact on mount if pre-filled
    if (formData.contact) {
      const newErrors = { ...errors };
      if (!formData.contact.trim()) {
        newErrors.contact = "Email or Phone is required";
      } else if (
        !/^\S+@\S+\.\S+$/.test(formData.contact) &&
        !/^\+?\d{10,15}$/.test(formData.contact.replace(/\D/g, ""))
      ) {
        newErrors.contact = "Invalid email or phone number";
      } else {
        delete newErrors.contact;
      }
      setErrors(newErrors);
    }
  }, []);

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
    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = "OTP must be a 6-digit number";
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
    if (name === "otp") {
      if (!value.trim()) newErrors.otp = "OTP is required";
      else if (!/^\d{6}$/.test(value))
        newErrors.otp = "OTP must be a 6-digit number";
      else delete newErrors.otp;
    }
    setErrors(newErrors);
  };

  const BaseURL = "http://localhost:2512";

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${BaseURL}/auth/verify-otp`,
        {},
        {
          params: {
            contact: formData.contact,
            otp: formData.otp,
          },
        }
      );

      // Check if response contains token and save it
      if (response.data.token) {
        saveToken(response.data.token);
        console.log("Token saved to localStorage:", response.data.token);

        // Get user roles from the token
        const roles = getUserRoles();
        console.log("User roles:", roles);

        // Navigate based on role
        if (roles.includes("ROLE_ADMIN")) {
          navigate("/role_admin");
        } else if (roles.includes("ROLE_USER")) {
          navigate("/");
        } else {
          navigate("/"); // Fallback if no recognized role
          setError("No valid role found in token");
        }
      } else {
        console.warn("No token received in response:", response.data);
        setError("No token received from server");
      }

      setMessage(
        response.data.message || "OTP verified successfully! Welcome to the shop."
      );
    } catch (err) {
      let errorMsg = "OTP verification failed";
      if (err.code === "ERR_NETWORK") {
        errorMsg =
          "Cannot connect to the server. Please ensure the backend is running.";
      } else if (err.response) {
        if (err.response.status === 403) {
          errorMsg = "Access forbidden: Please check server configuration.";
        } else {
          errorMsg = err.response.data.message || "Invalid OTP or contact";
        }
      } else {
        errorMsg = err.message;
      }
      setError(errorMsg);
      console.error("Error:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!formData.contact.trim() || errors.contact) {
      setErrors((prev) => ({
        ...prev,
        contact: !formData.contact.trim()
          ? "Email or Phone is required"
          : "Invalid email or phone number",
      }));
      return;
    }
    setMessage("");
    setError("");
    setResendLoading(true);

    try {
      const response = await axios.post(`${BaseURL}/auth/resend-otp`, {
        contact: formData.contact,
      });
      setMessage(
        response.data?.message ||
          "OTP resent successfully! Check your email or phone."
      );
    } catch (err) {
      let errorMsg = "Failed to resend OTP";
      if (err.code === "ERR_NETWORK") {
        errorMsg =
          "Cannot connect to the server. Please ensure the backend is running.";
      } else if (err.response) {
        errorMsg = err.response.data?.message || err.response.statusText;
      } else {
        errorMsg = err.message;
      }
      setError(errorMsg);
      console.error("Error:", err);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-coral-100 to-teal-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-coral-600 dark:text-coral-400 mb-6">
          Verify Your OTP
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
              disabled={loading || resendLoading}
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
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              OTP Code
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={formData.otp}
              onChange={handleChange}
              required
              disabled={loading || resendLoading}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-transform duration-300 disabled:opacity-50"
              maxLength="6"
              inputMode="numeric"
              aria-invalid={errors.otp ? "true" : "false"}
              aria-describedby={errors.otp ? "otp-error" : undefined}
            />
            {errors.otp && (
              <p
                id="otp-error"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.otp}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleVerifyOTP}
            disabled={loading || resendLoading}
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
                Verifying...
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Verify OTP
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={loading || resendLoading}
            className="w-full bg-transparent border border-coral-600 text-coral-600 dark:text-coral-400 dark:border-coral-400 font-semibold py-2 rounded-lg hover:bg-coral-100 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-50"
            aria-busy={resendLoading}
          >
            {resendLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 inline-block"
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
                Resending...
              </>
            ) : (
              "Resend OTP"
            )}
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            By verifying, you agree to our{" "}
            <a
              href="#"
              className="text-coral-600 hover:underline dark:text-coral-400"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-coral-600 hover:underline dark:text-coral-400"
            >
              Privacy Policy
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

export default VerifyOTP;