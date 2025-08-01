import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getOrderByID } from "../../Redux/User/Action/OrderAction";
import AddressCard from "./AddressCard";

const Summary = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { order, loading, error } = useSelector((state) => state.order);

  // Extract orderId from URL query parameters
  const query = new URLSearchParams(location.search);
  const orderId = query.get("orderId");

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderByID(orderId));
    } else {
      console.error("No order ID provided in URL");
    }
  }, [dispatch, orderId]);

  const handleProceedToPayment = () => {
    if (orderId) {
      navigate(`/checkout/payment?orderId=${orderId}`);
    } else {
      console.error("Cannot proceed to payment: No order ID");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-5xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Order Summary
      </h2>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="ml-3 text-gray-600 text-sm sm:text-base">Loading order details...</p>
        </div>
      )}
      {error && (
        <p className="text-red-500 text-center text-sm sm:text-base bg-red-50 p-4 rounded-lg">
          Error: {error}
        </p>
      )}
      {!orderId && !loading && !error && (
        <p className="text-red-500 text-center text-sm sm:text-base bg-red-50 p-4 rounded-lg">
          No order ID provided.
        </p>
      )}

      {order && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Shipping Address
            </h3>
            {order.shippingAddress ? (
              <AddressCard address={order.shippingAddress} />
            ) : (
              <p className="text-gray-600 text-sm sm:text-base">
                No shipping address found.
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Order Items
            </h3>
            {order.orderItems?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {item.product.title}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Size: {item.size}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500 line-through">
                        ₹{item.price}
                      </p>
                      <p className="text-green-600 font-bold text-sm sm:text-base">
                        ₹{item.discountedPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm sm:text-base">No items found.</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Pricing Summary
            </h3>
            <div className="space-y-2 text-sm sm:text-base">
              <p className="flex justify-between">
                <span>Total Items:</span>
                <strong>{order.totalItem ?? 0}</strong>
              </p>
              <p className="flex justify-between">
                <span>Total Price:</span>
                <span className="line-through text-gray-500">
                  ₹{order.totalPrice ?? 0}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Total Discounted Price:</span>
                <strong className="text-green-600">
                  ₹{order.totalDiscountedPrice ?? 0}
                </strong>
              </p>
              <p className="flex justify-between text-sm text-gray-500">
                <span>You saved:</span>
                <span>₹{order.discount ?? 0}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleProceedToPayment}
            className="mt-4 w-full sm:w-auto sm:min-w-[200px] rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition duration-200"
            disabled={loading || !orderId}
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Summary;