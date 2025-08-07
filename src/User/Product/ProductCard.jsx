import { MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer w-full max-w-[180px]"
    >
      {/* Image Section */}
      <div className="relative w-full h-40 overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl || "https://via.placeholder.com/150"}
          alt={product.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-indigo-50"
          aria-label="Quick view"
        >
          <svg
            className="h-3 w-3 text-gray-600 hover:text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.75 0c0 1.657-4.5 7.5-9.75 7.5S2.25 13.657 2.25 12s4.5-7.5 9.75-7.5S21.75 10.343 21.75 12z"
            />
          </svg>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
          {product.brand}
        </p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-base font-semibold text-gray-900">
            ₹{product.discountedPrice}
            {product.discountPercent > 0 && (
              <span className="text-xs text-gray-500 line-through ml-1">
                ₹{product.price}
              </span>
            )}
          </p>
          <button
            onClick={(e) => e.stopPropagation()}
            className="  text-gradient-to-r from-gray-950 to-gray-700  cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 shadow-lg"
            aria-label="Add to cart"
          >
            <MdShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Discount Badge */}
      {product.discountPercent > 0 && (
        <div className="absolute top-1 left-1  text-[10px] font-medium px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 shadow-lg">
          {product.discountPercent}% Off
        </div>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    brand: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    discountedPrice: PropTypes.number,
    discountPercent: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
