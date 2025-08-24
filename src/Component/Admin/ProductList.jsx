import React, { useCallback, useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { FaFilter } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchAllProducts } from "../../Redux/Admin/Action";
import { MdDelete } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const ProductList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, totalPages, loading, error } = useSelector(
    (store) => store.Allproducts
  );

  const searchParams = new URLSearchParams(location.search);
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const price = searchParams.get("price");
  const sortValue = searchParams.get("sort");
  const pageNumber = parseInt(searchParams.get("pageNumber")) || 1;
  const discount = searchParams.get("discount");
  const stock = searchParams.get("stock");
  const category = searchParams.get("category");

  useEffect(() => {
    const [minPrice, maxPrice] = price
      ? price.split("-").map(Number)
      : [undefined, undefined];

    const data = {
      category: category || undefined, // Omit category to fetch all products
      color: colorValue ? colorValue.split(",") : [],
      size: sizeValue ? sizeValue.split(",") : [],
      minPrice,
      maxPrice,
      minDiscount: discount ? Number(discount) : undefined,
      sort: sortValue || "price_low",
      pageNumber: pageNumber - 1,
      pageSize: 20, // Match action's default
      stock: stock || "all",
    };

    // Remove undefined values
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    console.log("Dispatching fetchAllProducts with data:", filteredData);
    dispatch(fetchAllProducts(filteredData)).then(
      (result) => console.log("Fetch success:", result.payload),
      (err) => console.error("Fetch error:", err.message, err)
    );
  }, [
    category,
    colorValue,
    sizeValue,
    price,
    discount,
    sortValue,
    pageNumber,
    stock,
    dispatch,
  ]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct({ productId })).then(
      () => console.log(`Deleted product with ID: ${productId}`),
      (err) => console.error("Delete error:", err.message, err)
    );
  };

  const handlePaginationChange = (value) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("pageNumber", value);
    navigate(`?${newParams.toString()}`);
  };

  const debouncedNavigate = useCallback(
    (query) => {
      navigate(`?${query}`);
    },
    [navigate]
  );

  //   const newParams = new URLSearchParams(location.search);
  //   const current = newParams.get(sectionId)?.split(",") || [];
  //   const isSelected = current.includes(value);

  //   const updated = isSelected
  //     ? current.filter((item) => item !== value)
  //     : [...current, value];

  //   if (updated.length === 0) {
  //     newParams.delete(sectionId);
  //   } else {
  //     newParams.set(sectionId, updated.join(","));
  //   }

  //   newParams.set("pageNumber", 1);
  //   debouncedNavigate(newParams.toString());
  // };

  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock search handler
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Mock filter handler
  const handleFilter = (filter) => {
    console.log("Applying filter:", filter);
    const newParams = new URLSearchParams(location.search);
    if (filter === "Price: Low to High") {
      newParams.set("sort", "price_low");
    } else if (filter === "Price: High to Low") {
      newParams.set("sort", "price_high");
    } else if (filter === "Newest") {
      newParams.set("sort", "newest");
    }
    newParams.set("pageNumber", 1);
    debouncedNavigate(newParams.toString());
    setIsFilterOpen(false);
  };

  // Debug: Log Redux state
  console.log("Redux state:", { products, totalPages, loading, error });

  return (
    <div className="bg-transparent">
      <div className="flex z-10 flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-3 rounded-xl shadow-inner shadow-gray-800/40 sticky top-0 bg-black/10 backdrop-blur-lg">
        <h2 className="font-semibold font-serif text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4 sm:mb-0">
          Products
        </h2>

        <div className="flex items-center w-full mx-2 sm:mx-4">
          <form
            onSubmit={handleSearch}
            className="flex w-full items-center bg-white text-gray-600 rounded-full shadow-md p-1"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 text-gray-700 bg-transparent rounded-full focus:outline-none transition-all duration-300 placeholder:font-serif text-sm sm:text-base"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
              aria-label="Search"
            >
              <ImSearch className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center bg-gray-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
            aria-label="Toggle filter menu"
          >
            <FaFilter className="w-4 h-4 mr-2" />
            Filter
          </button>
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20">
              <ul className="py-2">
                {["Price: Low to High", "Price: High to Low"].map((filter) => (
                  <li
                    key={filter}
                    onClick={() => handleFilter(filter)}
                    onKeyDown={(e) => e.key === "Enter" && handleFilter(filter)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-200"
                    role="menuitem"
                    tabIndex={0}
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-5 px-4">
        {loading ? (
          <div className="col-span-full flex flex-col justify-center items-center py-20">
            <div className="flex items-center gap-2 text-center text-gray-700 text-sm sm:text-base font-semibold">
              <span className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500"></span>
              Loading Products...
            </div>
          </div>
        ) : error ? (
          <p className="text-red-600 col-span-full text-center">
            Error: {error}
          </p>
        ) : products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-3"
            >
              <div className="relative w-full h-44 overflow-hidden rounded-xl">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  className="w-full h-full object-cover object-top"
                  alt={product.title || "Product image"}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-between flex-grow mt-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-sm font-bold">
                      ₹{product.discountedPrice}
                    </span>
                    <span className="text-red-600 text-sm line-through">
                      ₹{product.price}
                    </span>
                  </div>

                  <div>
                    <button
                      onClick={() => navigate(`product-list/${product.id}`)}
                      className="text-xs cursor-pointer text-gray-900  py-1 rounded-lg transition-colors"
                      aria-label={`Edit product ${product.title}`}
                    >
                      <RiEditCircleFill size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-xs cursor-pointer text-gray-900 px-2 py-1 rounded-lg transition-colors"
                      aria-label={`Delete product ${product.title}`}
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full text-center">
            No products found. The database may be empty or the query parameters
            may be filtering out all products. Check the console for details.
          </p>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <div
            className={`flex items-center justify-between px-3 py-2 rounded-2xl cursor-pointer transition duration-300 hover:bg-gray-500 hover:text-white ${
              pageNumber === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => handlePaginationChange(pageNumber - 1)}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 mr-1" /> Prev
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isActive = page === pageNumber;
              return (
                <div
                  key={page}
                  className={`px-4 py-2 rounded-full cursor-pointer transition duration-300 ${
                    isActive
                      ? "bg-gray-950 text-white"
                      : "bg-gray-200 text-black hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => handlePaginationChange(page)}
                >
                  {page}
                </div>
              );
            })}
          </div>
          <div
            className={`flex items-center justify-center px-3 py-2 rounded-2xl cursor-pointer transition duration-300 hover:bg-gray-500 hover:text-white ${
              pageNumber === totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => handlePaginationChange(pageNumber + 1)}
          >
            Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4 ml-1" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
