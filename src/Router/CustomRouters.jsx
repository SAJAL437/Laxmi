import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../User/Features.jsx/Navbar";
import Product from "../User/Product/Product";
import ProductDetails from "../User/ProductDetails/ProductDetails";
import Cart from "../User/Cart/Cart";
import Checkout from "../User/CheckOut/Checkout";
import PaymentCallback from "../User/CheckoutStep/PaymentCallBack";
import Order from "../User/Order/Order";
import Account from "../User/UserAccount/Account";
import Profile from "../User/UserAccount/Profile";
import Security from "../User/UserAccount/Security";
import ContactAndServices from "../User/UserAccount/ContactAndServices";
import OrderHistory from "../User/Order/OrderHistory";

const CustomRouters = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/:lavelOne/:lavelTwo/:lavelThree" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        {/* move in protected route */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/:step" element={<Checkout />} />
        <Route path="/payment/:orderId" element={<PaymentCallback />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/orders" element={<OrderHistory />} />
        <Route path="accounts/order-details/:orderId" element={<Order />} />
        <Route path="/account/security" element={<Security />} />
        <Route path="/account/address" element={<Order />} />
        <Route
          path="/account/contactandservices"
          element={<ContactAndServices />}
        />
      </Routes>
    </div>
  );
};

export default CustomRouters;
