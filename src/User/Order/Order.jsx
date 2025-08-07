import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderByID,
  orderHistory,
} from "../../Redux/User/Action/OrderAction";
import TrackStepper from "./Traking";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const { order, loading, error } = useSelector((state) => state.order);
  const [orderHistoryList, setOrderHistoryList] = useState([]);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderByID(orderId));
    } else {
      console.error("No order ID provided in URL");
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await dispatch(
          orderHistory({ page: 0, size: 100 })
        ).unwrap();
        setOrderHistoryList(result);
      } catch (err) {
        console.error("Failed to fetch order history", err);
      }
    };
    fetchHistory();
  }, [dispatch]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const handleViewAllOrders = () => {
    navigate("/account/orders");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 h-40 bg-gray-200 rounded-xl"></div>
              <div className="h-60 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600 text-lg font-medium">Error: {error}</p>
          <button
            onClick={() => dispatch(getOrderByID(orderId))}
            className="mt-4 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Retry fetching order details"
          >
            Retry Now
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 text-lg">Order not found.</p>
          <button
            onClick={handleViewAllOrders}
            className="mt-4 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="View all orders"
          >
            View All Orders
          </button>
        </div>
      </div>
    );
  }

  const products = (order.orderItems || []).map((item) => ({
    name: item.product?.title || "Unknown Product",
    size: item.size || "N/A",
    quantity: item.quantity || 0,
    originalPrice: item.price || 0,
    discountedPrice: item.discountedPrice || 0,
    image: item.product?.imageUrl || "/fallback-image.jpg",
  }));

  const totalDiscountedPrice = products.reduce(
    (sum, product) => sum + product.discountedPrice * product.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Order Summary Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 mb-8 hover:shadow-xl transition-all duration-300 hover:border-blue-300">
          <h2 className="text-2xl font-bold font-serif text-gray-900 mb-6">
            Order Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-serif">
            <div>
              <p className="text-sm font-medium text-gray-600">Order Placed</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(order.orderDate)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-lg font-semibold text-gray-900">
                ₹{totalDiscountedPrice.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Ship To</p>
              <p className="text-lg font-semibold text-gray-900">
                {order.shippingAddress?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Order ID</p>
              <p className="text-lg font-semibold text-gray-900">#{order.id}</p>
            </div>
          </div>
        </div>

        {/* Order Tracking and History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tracking Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold font-serif text-gray-900 mb-6">
              Order Tracking
            </h2>
            <TrackStepper orderStatus={order.orderStatus} />
          </div>

          {/* Order History */}
          <div>
            <h2 className="text-2xl font-bold font-serif text-gray-900 mb-6">
              Order History
            </h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {orderHistoryList.map((ord) => (
                <div
                  key={ord.id}
                  className="border p-4 rounded-md shadow-sm bg-white"
                >
                  <p className="font-semibold">#{ord.id}</p>
                  <p className="text-gray-700">Status: {ord.orderStatus}</p>
                  <p className="text-gray-700">
                    Date: {formatDate(ord.orderDate)}
                  </p>
                  <p className="text-gray-700">
                    Total: ₹{ord.totalDiscountedPrice?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={handleViewAllOrders}
              className="w-full mt-4 px-4 py-2 text-sm font-semibold font-serif bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 shadow-lg   rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="View all orders"
            >
              View All Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
