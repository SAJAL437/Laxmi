import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmOrder } from "../../Redux/User/Action/OrderAction";
import {
  getCartItems as fetchCart,
  clearCart as clearCartLocally,
} from "../../Redux/User/Action/CartAction";
import { getToken } from "../../Utils/Auth";

const Payment = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:2512"
    : "https://laxmi-server-production-7c6e.up.railway.app";

  // Extract orderId from URL query parameters
  const query = new URLSearchParams(location.search);
  const orderId = query.get("orderId");

  // Log for debugging
  console.log("Payment Component - URL:", location.search);
  console.log("Payment Component - orderId:", orderId);
  const jwt = getToken();
  console.log(
    "JWT Token:",
    jwt ? jwt.substring(0, 20) + "..." : "No JWT found"
  );

  // Payment methods including Cash on Delivery
  const paymentMethods = data?.methods
    ? [...data.methods, "Cash on Delivery"]
    : ["Razorpay", "Cash on Delivery"];

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setError(null);
  };

  const handleConfirmPayment = async () => {
    if (!orderId) {
      setError("No order ID provided. Please go back to the address step.");
      return;
    }
    if (!selectedMethod) {
      setError("Please select a payment method.");
      return;
    }
    if (!jwt) {
      setError("Session expired. Please log in again.");
      console.log("Redirecting to login due to missing JWT");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (selectedMethod === "Cash on Delivery") {
        console.log("Confirming COD for orderId:", orderId);
        await dispatch(confirmOrder({ orderId }));
        dispatch(clearCartLocally());
        await dispatch(fetchCart());
        navigate(`/checkout/confirmation?orderId=${orderId}`);
      } else {
        console.log("Initiating Razorpay payment for orderId:", orderId);
        const response = await fetch(
          `${API_URL}/api/users/payments/${orderId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          console.log("Payment API error response:", errorText);
          throw new Error(
            `Payment API failed: ${response.status} ${errorText}`
          );
        }
        const paymentResponse = await response.json();
        console.log("Payment API response:", paymentResponse);
        if (paymentResponse.payment_link_url) {
          dispatch(clearCartLocally());
          window.location.href = paymentResponse.payment_link_url;
        } else {
          throw new Error("Failed to generate payment link");
        }
      }
    } catch (err) {
      let errorMessage;
      if (err.message.includes("ERR_CONNECTION_REFUSED")) {
        errorMessage =
          "Cannot connect to the server. Please check if the server is running on port 2512.";
      } else if (err.message.includes("401")) {
        errorMessage = "Session expired. Please log in again.";
        console.log("Redirecting to login due to 401 error");
        navigate("/login");
      } else if (err.message.includes("404")) {
        errorMessage =
          "Order not found. Please start the checkout process again.";
        navigate("/checkout/address");
      } else {
        errorMessage = "Failed to process payment. Please try again.";
      }
      setError(errorMessage);
      console.error("Payment Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-5xl">
      <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-800 mb-6 text-center sm:text-left">
        Payment Methods
      </h2>

      {error && (
        <p className="text-red-500 text-center text-sm sm:text-base bg-red-50 p-4 rounded-lg mb-4">
          {error}
        </p>
      )}

      <div className=" p-4 sm:p-6">
        {paymentMethods.length > 0 ? (
          <div className=" w-1/2 flex flex-col ">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className={`w-1/2 rounded-lg p-4 flex border-b mb-3 items-center gap-3 cursor-pointer transition-all duration-200 ${
                  selectedMethod === method
                    ? "border-gray-600 bg-indigo-50 shadow-md"
                    : "border-gray-300 hover:shadow-md"
                }`}
                onClick={() => handleMethodSelect(method)}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={selectedMethod === method}
                  onChange={() => handleMethodSelect(method)}
                  className="h-5 w-5 text-gray-600 focus:ring-gray-500"
                />
                <span className="text-sm sm:text-base font-medium text-gray-800">
                  {method}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm sm:text-base">
            No payment methods available.
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-center sm:justify-end">
        <button
          onClick={handleConfirmPayment}
          disabled={isSubmitting}
          className="w-full sm:w-auto sm:min-w-[200px] rounded-md px-6 py-3 text-sm sm:text-base font-semibold font-serif bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 shadow-lg disabled:bg-gray-300 disabled:text-gray-500 "
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            "Confirm Payment"
          )}
        </button>
      </div>
    </div>
  );
};

export default Payment;
