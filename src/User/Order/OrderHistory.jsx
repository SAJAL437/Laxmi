import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, orderHistory } from "../../Redux/User/Action/OrderAction";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    dispatch(orderHistory());
  }, [dispatch]);

  const handleDetails = (orderId) => {
    navigate(`/accounts/order-details/${orderId}`);
  };

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
    dispatch(orderHistory());
  };

  // Format date for display
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

  // Toggle expanded state for an order
  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col items-center justify-center space-y-4"
          role="status"
        >
          <div className="relative w-12 h-12 sm:w-16 sm:h-16">
            <div className="absolute inset-0 border-4 border-t-blue-600 border-r-indigo-600 border-b-blue-600 border-l-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-1 border-2 border-t-transparent border-r-transparent border-b-blue-600 border-l-indigo-600 rounded-full animate-spin animation-delay-150 opacity-50 animate-pulse"></div>
          </div>
          <p className="text-sm font-medium text-gray-700">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-red-600 text-lg font-medium">Error: {error}</p>
        <button
          onClick={() => dispatch(orderHistory())}
          className="mt-4 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Retry fetching order history"
        >
          Retry Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold font-serif text-gray-900">Order History</h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No orders found. Start shopping now!
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200"
            aria-label="Shop now"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => {
            // Map orderItems to products
            const products = (order.orderItems || []).map((item) => ({
              name: item.product?.title || "Unknown Product",
              size: item.size || "N/A",
              quantity: item.quantity || 0,
              originalPrice: item.price || 0,
              discountedPrice: item.discountedPrice || 0,
              image: item.product?.imageUrl || "/fallback-image.jpg",
            }));

            const totalQuantity = products.reduce(
              (sum, product) => sum + product.quantity,
              0
            );
            const totalDiscountedPrice = products.reduce(
              (sum, product) =>
                sum + product.discountedPrice * product.quantity,
              0
            );
            const totalOriginalPrice = products.reduce(
              (sum, product) => sum + product.originalPrice * product.quantity,
              0
            );

            return (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleDetails(order.id);
                }}
                key={order.id}
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-row gap-4 shadow-md hover:shadow-xl transition-all duration-300"
                role="article"
                aria-labelledby={`order-${order.id}`}
              >
                {/* Product Images - Horizontal Scroll */}
                <div className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory">
                  {products.map((product, index) => (
                    <img
                      key={`${order.id}-${index}`}
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover object-top rounded-md flex-shrink-0 snap-start transition-transform duration-200 hover:scale-105"
                      loading="lazy"
                    />
                  ))}
                </div>

                {/* Order Details */}
                <div className="flex-1 font-semibold">
                  <p className="text-sm text-gray-600">
                    Total Items: {totalQuantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Ordered: {formatDate(order.orderDate)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-sm text-gray-500 line-through">
                      ₹{totalOriginalPrice.toLocaleString()}
                    </p>
                    <p className="text-base font-bold text-green-600">
                      ₹{totalDiscountedPrice.toLocaleString()}
                    </p>
                  </div>

                  {/* Collapsible Product Details */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(order.id);
                    }}
                    className="mt-2 flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    aria-expanded={expandedOrders[order.id]}
                    aria-controls={`details-${order.id}`}
                  >
                    {expandedOrders[order.id] ? (
                      <>
                        Hide Details <FaChevronUp className="ml-1" />
                      </>
                    ) : (
                      <>
                        Show Details <FaChevronDown className="ml-1" />
                      </>
                    )}
                  </button>
                  {expandedOrders[order.id] && (
                    <div id={`details-${order.id}`} className="mt-2 space-y-2">
                      {products.map((product, index) => (
                        <div
                          key={`${order.id}-${index}`}
                          className="text-sm text-gray-600 border-t pt-2"
                        >
                          <p className="font-medium">{product.name}</p>
                          <p>Size: {product.size}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>
                            Price: ₹{product.discountedPrice.toLocaleString()}{" "}
                            <span className="text-gray-500 line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(order.id);
                    }}
                    className="mt-2 px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label={`Delete order ${order.id}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
