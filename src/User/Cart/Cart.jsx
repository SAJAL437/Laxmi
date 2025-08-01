import { useNavigate } from "react-router-dom";
import { getCartItems } from "../../Redux/User/Action/CartAction";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);

  const cartItems = cart.cart?.cartItems || [];

  const handleCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(getCartItems());
    console.log("cartItems:", cartItems);
  }, [dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen lg:px-16 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-6 text-center text-gray-500 text-sm italic">
              Your cart is empty
            </div>
          )}
        </div>

        {/* Price Details */}
        <div className="mt-8 lg:mt-0 lg:sticky lg:top-4 lg:h-fit">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Price Details
            </h3>
            <div className="space-y-4 font-medium text-gray-900 border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span>Price ({cart.cart?.totalItem} items)</span>
                <span className="font-semibold">₹{cart.cart?.totalPrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Discount</span>
                <span className="text-green-600 font-semibold">
                  -₹{cart.cart?.discount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Charge</span>
                <span className="text-green-600 font-semibold">free</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="font-bold text-lg">Total Amount</span>
                <span className="text-green-600 font-bold text-lg">
                  ₹{cart.cart?.totalDiscountedPrice}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="mt-6">
              <Button
                variant="contained"
                onClick={handleCheckout}
                sx={{
                  bgcolor: "#4f46e5",
                  "&:hover": { bgcolor: "#4338ca" },
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 2,
                }}
                className="w-full transition-colors duration-300"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
