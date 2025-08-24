import React, { useEffect, useState } from "react";
import { MdDelete, MdRefresh } from "react-icons/md";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Avatar, AvatarGroup } from "@mui/material";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  deleteOrder,
  updateOrderStatus,
} from "../../Redux/Admin/Action";

// Order status options
const OrderStatus = [
  { id: 1, name: "PENDING" },
  { id: 2, name: "CONFIRMED" },
  { id: 3, name: "CANCELED" },
  { id: 4, name: "SHIPPED" },
  { id: 5, name: "DELIVERED" },
];

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, successMessage } = useSelector(
    (store) => store.AllOrders
  );
  const [orderStatuses, setOrderStatuses] = useState({});
  const [deletingOrderId, setDeletingOrderId] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    dispatch(allOrders()).then(
      (result) => {
        console.log("Fetched Orders (useEffect):", result.payload);
        const initStatuses = {};
        const ordersArray = Array.isArray(result.payload)
          ? result.payload
          : result.payload.content || [];
        ordersArray.forEach((order) => {
          initStatuses[order.id] = { name: order.orderStatus };
        });
        setOrderStatuses(initStatuses);
      },
      (err) => console.error("Fetch error:", err)
    );
  }, [dispatch, successMessage]);

  useEffect(() => {
    console.log("Current orders state:", orders);
  }, [orders]);

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setDeletingOrderId(orderId);
      dispatch(deleteOrder({ orderId })).then(
        () => setDeletingOrderId(null),
        (err) => {
          console.error("Delete error:", err);
          setDeletingOrderId(null);
        }
      );
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    const currentOrder = orders.find((o) => o.id === orderId);
    setOrderStatuses((prev) => ({ ...prev, [orderId]: newStatus }));
    setUpdatingOrderId(orderId);
    dispatch(updateOrderStatus({ orderId, status: newStatus.name })).then(
      () => setUpdatingOrderId(null),
      (err) => {
        console.error("Status update error:", err);
        setUpdatingOrderId(null);
        // Revert to previous status on failure
        setOrderStatuses((prev) => ({
          ...prev,
          [orderId]: { name: currentOrder.orderStatus },
        }));
      }
    );
  };

  const handleRefresh = () => {
    dispatch(allOrders());
  };

  if (loading && !deletingOrderId && !updatingOrderId) {
    return (
      <div className="flex flex-col min-h-screen bg-transparent">
        <div className="flex z-10 flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-3 rounded-xl shadow-inner shadow-gray-800/40 sticky top-0 bg-black/10 backdrop-blur-lg">
          <h2 className="font-bold font-serif text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4 sm:mb-0">
            Orders
          </h2>
        </div>
        <div className="flex justify-center items-center mt-20 bg-transparent">
          <div className="text-center text-gray-700 text-sm sm:text-base font-semibold flex items-center gap-2">
            <span className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500"></span>
            Loading Orders...
          </div>
        </div>
      </div>
    );
  }

  if (error && !deletingOrderId && !updatingOrderId) {
    return (
      <div className="flex flex-col min-h-screen bg-transparent">
        <div className="flex z-10 flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-3 rounded-xl shadow-inner shadow-gray-800/40 sticky top-0 bg-black/10 backdrop-blur-lg">
          <h2 className="font-bold font-serif text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4 sm:mb-0">
            Orders
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center mt-8 px-4">
          <div className="bg-white border border-red-200 rounded-xl shadow-md p-6 max-w-md w-full text-center">
            <IoAlertCircleOutline className="text-red-600 text-4xl mx-auto mb-2" />
            <p className="text-red-600 text-lg font-medium">Error: {error}</p>
            <button
              onClick={handleRefresh}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MdRefresh size={20} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-transparent">
        <div className="flex z-10 flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-3 rounded-xl shadow-inner shadow-gray-800/40 sticky top-0 bg-black/10 backdrop-blur-lg">
          <h2 className="font-bold font-serif text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4 sm:mb-0">
            Orders
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center mt-8 px-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 max-w-md w-full text-center">
            <IoAlertCircleOutline className="text-gray-600 text-4xl mx-auto mb-2" />
            <p className="text-gray-600 text-lg font-medium">No orders found</p>
            <p className="text-gray-500 text-sm mt-2">
              There are currently no orders to display. Check back later or
              refresh.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-transparent">
      <div className="flex z-10 flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-3 rounded-xl shadow-inner shadow-gray-800/40 sticky top-0 bg-black/10 backdrop-blur-lg">
        <h2 className="font-semibold font-serif text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4 sm:mb-0">
          Orders
        </h2>
      </div>

      {(successMessage || error) && (
        <div className="px-4 pt-4">
          {successMessage && (
            <p className="text-green-600 text-center">{successMessage}</p>
          )}
          {error && <p className="text-red-600 text-center">{error}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5 px-4 ">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-3"
          >
            <div className="relative overflow-hidden rounded-xl mb-4">
              <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                {order.orderItems.map((item) => (
                  <Avatar
                    key={item.id}
                    alt={item.product.title}
                    src={item.product.imageUrl}
                    sx={{ width: 50, height: 50 }}
                  />
                ))}
              </AvatarGroup>
            </div>

            <div className="flex flex-col justify-between flex-grow font-medium">
              <div>
                <p className="text-sm text-gray-600">
                  Ordered: {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Payment: {order?.paymentDetails?.paymentMethod}
                </p>
                <p className="text-sm text-gray-600">
                  Total Items: {order.totalItem}
                </p>
              </div>

              <div className="mt-2">
                <Listbox
                  value={orderStatuses[order.id] || { name: order.orderStatus }}
                  onChange={(newStatus) =>
                    handleStatusChange(order.id, newStatus)
                  }
                >
                  <div className="relative">
                    <ListboxButton
                      className="w-full cursor-pointer rounded-md text-left text-gray-600 font-semibold font-serif sm:text-sm outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:opacity-50"
                      disabled={
                        deletingOrderId === order.id ||
                        updatingOrderId === order.id
                      }
                    >
                      <span className="flex items-center justify-between">
                        <span className="truncate">
                          {orderStatuses[order.id]?.name || order.orderStatus}
                        </span>
                        {updatingOrderId === order.id ? (
                          <span className="animate-spin">⌛</span>
                        ) : (
                          <ChevronUpDownIcon
                            className="w-6 h-6 p-1 bg-gray-700 hover:bg-gray-500 transition duration-500 ease-in-out rounded-full text-gray-100"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </ListboxButton>

                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base border border-gray-300 shadow-lg outline-none focus:outline-none sm:text-sm">
                      {OrderStatus.map((status) => (
                        <ListboxOption
                          key={status.id}
                          value={status}
                          className="cursor-pointer py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-md"
                        >
                          {status.name}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-sm font-bold">
                    ₹{order.totalDiscountedPrice}
                  </span>
                  <span className="text-red-600 text-sm line-through">
                    ₹{order.totalPrice}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="text-gray-700 cursor-pointer hover:text-gray-500 p-1 rounded-lg transition-colors"
                  aria-label="Delete order"
                  disabled={
                    deletingOrderId === order.id || updatingOrderId === order.id
                  }
                >
                  {deletingOrderId === order.id ? (
                    <span className="animate-spin">⌛</span>
                  ) : (
                    <MdDelete size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
