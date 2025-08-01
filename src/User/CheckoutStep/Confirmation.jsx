import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getOrderByID } from "../../Redux/User/Action/OrderAction";
import { getCartItems as fetchCart } from "../../Redux/User/Action/CartAction";

const Confirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { order, loading, error } = useSelector((state) => state.order);

  // Extract orderId from query parameters
  const query = new URLSearchParams(location.search);
  const orderId = query.get("orderId");

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderByID(orderId));
      dispatch(fetchCart());
    }
  }, [dispatch, orderId]);

  const handleContinueShopping = () => {
    navigate("/");
  };
  const handleOrder = () => {
    navigate("/account/orders");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-5xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        Order Confirmed
      </h2>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="ml-3 text-gray-600 text-sm sm:text-base">
            Loading order details...
          </p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-100 border border-red-200 rounded-lg">
          <p className="text-red-500 text-center text-sm sm:text-base">
            Error: {error}
          </p>
        </div>
      )}
      {!orderId && !loading && !error && (
        <p className="text-red-500 text-center text-sm sm:text-base bg-red-50 p-4 rounded-lg mb-4">
          No order ID provided.
        </p>
      )}

      {order && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Thank you for your order!
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Your order (ID: {order.id}) has been successfully placed.
            {order.paymentDetails?.paymentMethod === "Cash on Delivery"
              ? " You will pay upon delivery."
              : " Payment has been processed successfully."}
          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            We’ll send you a confirmation email with the details soon.
          </p>
          <div className="flex justify-center item-center gap-5">
            <button
              onClick={handleContinueShopping}
              className="w-full sm:w-auto sm:min-w-[200px] rounded-md bg-indigo-600 px-6 py-3 text-white text-sm sm:text-base font-medium hover:bg-indigo-700 transition duration-200"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleOrder}
              className="w-full sm:w-auto sm:min-w-[200px] rounded-md bg-indigo-600 px-6 py-3 text-white text-sm sm:text-base font-medium hover:bg-indigo-700 transition duration-200"
            >
              Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Confirmation);
