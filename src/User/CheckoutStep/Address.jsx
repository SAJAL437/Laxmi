import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../Redux/User/Action/Action";
import { createOrder } from "../../Redux/User/Action/OrderAction";
import AddressCard from "./AddressCard";

const Address = ({ data, step }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile: user, loading, error } = useSelector((state) => state.user);
  const { order } = useSelector((state) => state.order);
  const [formData, setFormData] = useState({
    name: "",
    geolocation: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });
  const [localError, setLocalError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAuth = !!localStorage.getItem("jwt");

  useEffect(() => {
    if (isAuth && !user?.data?.id) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuth, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLocalError(null);

    try {
      const result = await dispatch(createOrder(formData));
      await dispatch(getProfile()); // Refresh user.data.address
      const orderId = result.payload?.id;
      setFormData({
        name: "",
        geolocation: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
      });
      if (orderId) {
        navigate(`/checkout/summary?orderId=${orderId}`);
      } else {
        setLocalError("Failed to retrieve order ID.");
      }
    } catch (err) {
      setLocalError(err.message || "Failed to save address.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigate = async (addressId) => {
    setIsSubmitting(true);
    setLocalError(null);

    try {
      // Find the selected address from user.address
      const selectedAddress = user?.address?.find((addr) => addr.id === addressId);
      if (!selectedAddress) {
        throw new Error("Selected address not found.");
      }

      // Create an order with the selected address
      const orderData = {
        name: selectedAddress.name,
        geolocation: selectedAddress.geolocation,
        streetAddress: selectedAddress.streetAddress,
        city: selectedAddress.city,
        state: selectedAddress.state,
        zipCode: selectedAddress.zipCode,
        phone: selectedAddress.phone,
      };

      const result = await dispatch(createOrder(orderData));
      const orderId = result.payload?.id;

      if (orderId) {
        navigate(`/checkout/summary?orderId=${orderId}`);
      } else {
        setLocalError("Failed to retrieve order ID.");
      }
    } catch (err) {
      setLocalError(err.message || "Failed to create order with selected address.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center items-start mx-auto w-full max-w-5xl">
      {/* Address Details */}
      <div className="flex justify-center items-start w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <div className="text-sm sm:text-base text-gray-700 w-full">
          <h3 className="text-base sm:text-lg font-bold font-serif text-gray-600 mb-4">
            Address Information
          </h3>
          {loading && (
            <p className="text-gray-600 text-center text-sm">Loading...</p>
          )}
          {(error || localError) && (
            <p className="text-red-600 text-center text-sm">
              {error || localError}
            </p>
          )}
          {user?.address?.length > 0 ? (
            <div className="space-y-4 max-h-[200px] overflow-y-auto scroll-smooth">
              {user.address.map((addr, index) => (
                <div
                  key={addr.id || index}
                  className="border p-3 rounded-md shadow-sm bg-gray-50"
                >
                  <AddressCard address={addr} />
                  <button
                    onClick={() => handleNavigate(addr.id)}
                    disabled={isSubmitting}
                    className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm sm:text-base font-semibold hover:bg-indigo-700 bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer  font-serif hover:from-gray-800 hover:to-gray-500 transition-all duration-300 shadow-lg"
                  >
                    {isSubmitting ? "Processing..." : "Proceed to Summary"}
                  </button>
                </div>
              ))}
            </div>
          ) : data ? (
            <div className="space-y-2">
              <AddressCard address={data} />
              <button
                onClick={() => handleNavigate(data.id)}
                disabled={isSubmitting}
                className="mt-2 w-full rounded-md  px-4 py-2 text-sm sm:text-base font-semibold bg-indigo-600 bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 font-serif hover:to-gray-500 transition-all duration-300 shadow-lg   "
              >
                {isSubmitting ? "Processing..." : "Proceed to Summary"}
              </button>
            </div>
          ) : (
            !loading &&
            !error && (
              <p className="text-center text-sm">No address data available.</p>
            )
          )}
        </div>
      </div>

      {/* Address Form */}
      <div className="flex justify-center items-center w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <h3 className="text-base sm:text-lg font-bold font-serif text-gray-600 mb-4">
            Enter Address
          </h3>
          {[
            { id: "name", label: "Name" },
            { id: "geolocation", label: "Geolocation (lat,lng)" },
            { id: "streetAddress", label: "Street Address" },
            { id: "city", label: "City" },
            { id: "state", label: "State" },
            { id: "zipCode", label: "ZIP Code" },
            { id: "phone", label: "Phone", type: "tel" },
          ].map(({ id, label, type = "text" }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleInputChange}
                required={id !== "geolocation"}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm sm:text-base font-semibold hover:bg-indigo-700 bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 font-serif shadow-lg "
          >
            {isSubmitting ? "Saving..." : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;