import { configureStore } from "@reduxjs/toolkit";
import UserProfile from "./User/Reducer/UserProfile";
import productReducer from "./User/Reducer/productReducer";
import productDetailsReducer from "./User/Reducer/productDetails";
import CartReducer from "./User/Reducer/CartReducer";
import OrderReducer from "./User/Reducer/OrderReducer";
import AdminProductReducer from "./Admin/Reducer/AdminProductReducer";
import AdminOrderReducer from "./Admin/Reducer/AdminOrderReducer";
import AdminUserReducer from "./Admin/Reducer/AdminUserReducer";
const store = configureStore({
  reducer: {
    user: UserProfile,
    products: productReducer,
    productDetails: productDetailsReducer,
    cart: CartReducer,
    order: OrderReducer,
    Allproducts: AdminProductReducer,
    AllOrders: AdminOrderReducer,
    UserList: AdminUserReducer,
  },
});

export default store;
