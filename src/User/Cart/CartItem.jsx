import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import {
  deleteCartItem,
  updatecartItem,
} from "../../Redux/User/Action/CartAction";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    const data = {
      cartItemId: item.id,
    };
    dispatch(deleteCartItem(data));
  };

  const handleUpdateItem = (num) => {
    const data = {
      data: { quantity: item.quantity + num },
      cartItemId: item?.id,
    };
    dispatch(updatecartItem(data));
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        {/* Image Section */}
        <div className="relative w-[6rem] h-[6rem] sm:w-[8rem] sm:h-[8rem] lg:w-[10rem] lg:h-[10rem] flex-shrink-0">
          <img
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            src={
              item?.product.imageUrl ||
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
            }
            alt={item?.product.title || "Product image"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-200">
            {item?.product.title || "Product Title"}
          </h3>
          <p className="text-sm text-gray-600">
            Size: {item?.size || "N/A"}, {item?.product.color || "White"}
          </p>
          <p className="text-sm text-gray-600">
            Seller: {item?.product.brand || "Unknown"}
          </p>
          <div className="flex items-center gap-4 text-gray-900">
            <p className="text-lg font-bold">
              ₹{item?.product.discountedPrice || "0"}
            </p>
            <p className="text-sm text-gray-500 line-through">
              ₹{item?.price || "0"}
            </p>
            <p className="text-sm font-semibold text-green-600">
              {item?.product.discountPercent || 0}% Off
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 sm:pt-0">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <IconButton
              onClick={() => handleUpdateItem(-1)}
              disabled={item?.quantity <= 1}
              sx={{
                color: item?.quantity <= 1 ? "gray.300" : "#4f46e5",
                "&:hover": { bgcolor: "gray.100" },
              }}
              className="transition-colors duration-200"
            >
              <RemoveCircleOutline fontSize="medium" />
            </IconButton>
            <span className="px-4 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-900 bg-white">
              {item?.quantity || 1}
            </span>
            <IconButton
              onClick={() => handleUpdateItem(1)}
              sx={{
                color: "#4f46e5",
                "&:hover": { bgcolor: "gray.100" },
              }}
              className="transition-colors duration-200"
            >
              <AddCircleOutline fontSize="medium" />
            </IconButton>
          </div>

          {/* Remove Button */}
          <Button
            sx={{
              color: "#4f46e5",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": { color: "#4338ca", bgcolor: "gray.100" },
            }}
            className="transition-colors duration-200"
            onClick={handleRemoveItem}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
