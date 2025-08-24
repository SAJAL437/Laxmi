import React from "react";
import { Route, Routes } from "react-router-dom";
import SideNav from "./SideNav";
import Dashboard from "./Dashboard";
import ProtectedRoute from "../../Utils/ProtectedRoutes";
import ProductList from "./ProductList";
import Orders from "./Orders";
import UserList from "./UserList";
import Revenue from "./Revenue";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
const AdminPanel = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row h-screen bg-gradient-to-br from-gray-200 to-gray-300">
      {/* SideNav - Left Sidebar for sm+ */}
      <div className="hidden sm:block z-10">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-4 overflow-y-auto bg-gray-200 backdrop-blur-lg rounded-2xl  shadow-blue-800/40 shadow-inner m-2 sm:m-3 lg:m-4 transition-all duration-300 sm:ml-20 lg:ml-24">
        <div className="max-w-full sm:max-w-6xl lg:max-w-7xl mx-auto">
          <Routes>
            {/* Default route for /admin */}
            <Route
              index
              element={
                <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="product-list"
              element={
                <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="order-list"
              element={
                <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="user-list"
              element={
                <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="revenue"
              element={
                <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                  <Revenue />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-product"
              element={
                <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                  <AddProduct/>
                </ProtectedRoute>
              }
            />
            <Route
              path="product-list/:productId"
              element={
                <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                  <UpdateProduct/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>

      {/* SideNav - Bottom Nav for mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-gray-300/30 z-50">
        <SideNav isBottomNav={true} />
      </div>
    </div>
  );
};

export default AdminPanel;
