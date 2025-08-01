import React, { memo } from "react";
import PropTypes from "prop-types";

const SliderCard = ({ product }) => {
  return (
    <div
      className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group w-full max-w-md mx-auto"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && e.target.click()}
      aria-label={`View ${product.name || "product"} by ${
        product.brand || "Unknown Brand"
      }, priced at $${product.discountedPrice || "N/A"}`}
    >
      {/* Image Section */}
      <div className="h-64 w-full relative">
        <img
          className="object-cover object-top w-full h-full rounded-t-2xl"
          src={product.image || "/placeholder.jpg"}
          alt={product.name || "Product Image"}
          loading="lazy"
          onError={(e) => (e.target.src = "/placeholder.jpg")} // Fallback on image error
        />
        {/* Discount Badge */}
        {product.discountPercent && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.discountPercent} Off
          </span>
        )}
      </div>
      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
          {product.name || "Unknown Product"}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          by {product.brand || "Unknown Brand"}
        </p>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 flex-grow">
          {product.description || "No description available"}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-indigo-600">
            &#8377;{product.discontedprice || "N/A"}
          </span>
          {product.price && (
            <span className="text-sm text-gray-500 line-through">
              &#8377;{product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// PropTypes Validation
SliderCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    brand: PropTypes.string,
    price: PropTypes.string,
    discountedPrice: PropTypes.string,
    discountPercent: PropTypes.string,
  }).isRequired,
};

// Memoize to prevent unnecessary re-renders
export default memo(SliderCard);
