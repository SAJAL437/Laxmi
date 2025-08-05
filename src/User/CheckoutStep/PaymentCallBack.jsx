import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getCartItems as fetchCart } from "../../Redux/User/Action/CartAction";
import { getToken } from "../../Utils/Auth";

const PaymentCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const location = useLocation();
  const [error, setError] = useState(null);
  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:2512"
      : "https://laxmi-server-production-7c6e.up.railway.app";

  // Extract query parameters
  const query = new URLSearchParams(location.search);
  const paymentId = query.get("razorpay_payment_id");
  const paymentLinkId = query.get("razorpay_payment_link_id");
  const paymentLinkStatus = query.get("razorpay_payment_link_status");
  const signature = query.get("razorpay_signature");

  // Log for debugging
  console.log("PaymentCallback - URL:", location.search);
  console.log("PaymentCallback - orderId (from params):", orderId);
  console.log("PaymentCallback - paymentId:", paymentId);
  console.log("PaymentCallback - paymentLinkId:", paymentLinkId);
  console.log("PaymentCallback - paymentLinkStatus:", paymentLinkStatus);
  console.log("PaymentCallback - signature:", signature);

  useEffect(() => {
    const verifyPayment = async () => {
      // Minimal validation
      if (!orderId || !paymentId) {
        setError("Invalid payment details. Missing orderId or paymentId.");
        console.log("Missing parameters:", { orderId, paymentId });
        return;
      }

      try {
        const jwt = getToken();
        console.log(
          "JWT Token:",
          jwt ? jwt.substring(0, 20) + "..." : "No JWT found"
        );
        if (!jwt) {
          setError("Session expired. Please log in again.");
          console.log("Redirecting to login due to missing JWT");
          navigate("/login");
          return;
        }

        // Call backend to verify payment
        console.log("Calling backend to verify payment with:", {
          paymentId,
          orderId,
        });
        const response = await fetch(
          `${API_URL}/api/users/payments/?razorpay_payment_id=${paymentId}&order_id=${orderId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.log("Payment verification error response:", errorText);
          throw new Error(
            `Payment verification failed: ${response.status} ${errorText}`
          );
        }

        const paymentResponse = await response.json();
        console.log("Payment verification response:", paymentResponse);
        if (paymentResponse.status) {
          console.log(
            "Payment verified successfully, navigating to confirmation"
          );
          // Refetch cart to reflect cleared state
          await dispatch(fetchCart());
          // Navigate to confirmation page
          navigate(`/checkout/confirmation?orderId=${orderId}`);
        } else {
          setError(
            paymentResponse.message ||
              "Payment not confirmed. Please try again."
          );
          console.log("Payment not confirmed:", paymentResponse);
        }
      } catch (err) {
        let errorMessage;
        if (err.message.includes("401")) {
          errorMessage = "Session expired. Please log in again.";
          console.log("Redirecting to login due to 401 error");
          navigate("/login");
        } else if (err.message.includes("404")) {
          errorMessage =
            "Order not found. Please start the checkout process again.";
          console.log("Redirecting to checkout/address due to 404 error");
          navigate("/checkout/address");
        } else {
          errorMessage =
            err.message || "Failed to verify payment. Please try again.";
        }
        setError(errorMessage);
        console.error("PaymentCallback Error:", err);
      }
    };

    verifyPayment();
  }, [dispatch, navigate, orderId, paymentId]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <p className="text-red-500 text-center text-base bg-red-50 p-4 rounded-lg">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <p className="text-gray-600 text-center text-base">
        Verifying payment...
      </p>
    </div>
  );
};

export default PaymentCallback;
