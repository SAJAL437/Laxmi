"use client";

import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { Button, Box, Stack, LinearProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Radio, RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../Redux/User/Action/ProductAction";
import {
  addItemtoCart,
  getCartItems,
} from "../../Redux/User/Action/CartAction";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Placeholder for ProductReviewCard (to be implemented)
const ProductReviewCard = () => (
  <div className="border-b py-4">
    <p className="text-sm text-gray-600">Review placeholder</p>
  </div>
);

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product, loading, error } = useSelector(
    (store) => store.productDetails
  );

  useEffect(() => {
    if (productId) {
      dispatch(getProductById({ productId }));
    }
    console.log("productId:", productId);
  }, [productId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const data = {
      productId,
      size: selectedSize.name,
      quantity: 1,
      price: 0,
    };

    dispatch(addItemtoCart(data)).then((result) => {
      if (addItemtoCart.fulfilled.match(result)) {
        // ✅ Cart item successfully added, now fetch updated cart
        dispatch(getCartItems()).then(() => {
          navigate("/cart"); // Navigate only after fresh cart is fetched
        });
      } else {
        alert(result.payload?.message || "Failed to add item to cart");
      }
    });
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen lg:px-16 pt-6">
        <div className="animate-pulse">
          {/* Breadcrumb Placeholder */}
          <nav aria-label="Breadcrumb">
            <div className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 w-4 bg-gray-200"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 w-4 bg-gray-200"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </nav>
          {/* Main Content Placeholder */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
            {/* Image Gallery Placeholder */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem] bg-gray-200"></div>
            </div>
            {/* Product Info Placeholder */}
            <div className="mx-auto lg:col-span-1 max-w-2xl px-4 pb-16 sm:px-6 lg:px-8 lg:max-w-7xl">
              <div className="lg:col-span-2 space-y-2">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-5 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex space-x-5">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex space-x-3">
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </section>
          {/* Reviews Placeholder */}
          <section>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1 space-y-3">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="h-12 bg-gray-200 rounded border-b"></div>
                  ))}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* Similar Products Placeholder */}
          <section className="pt-10">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-5"></div>
            <div className="flex flex-wrap gap-5">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-60 h-80 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="bg-white lg:px-16">
      <div className="pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.category && (
              <>
                <li>
                  <div className="flex items-center">
                    <a
                      href="#"
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {product.category.parentCategory?.parentCategory?.name ||
                        "Men"}
                    </a>
                    <svg
                      fill="currentColor"
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <a
                      href="#"
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {product.category.parentCategory?.name || "Clothing"}
                    </a>
                    <svg
                      fill="currentColor"
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
                <li className="text-sm">
                  <a
                    href="#"
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {product.category.name}
                  </a>
                </li>
              </>
            )}
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto lg:col-span-1 max-w-2xl px-4 pb-16 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                {product.brand}
              </h1>
              <h2 className="text-lg lg:text-lg text-gray-900 opacity-60 pt-1">
                {product.title}
              </h2>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>

              <div className="flex space-x-5 items-center text-md lg:text-lg mt-4 text-gray-900">
                <p className="font-semibold">₹{product.discountedPrice}</p>
                <p className="opacity-50 line-through">₹{product.price}</p>
                <p className="text-green-600 font-semibold">
                  {product.discountPercent}% Off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={product.numRatings ? 3.5 : 0}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-50 text-sm">
                    {product.numRatings} Rating
                  </p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {product.reviews?.length || 0} reviews
                  </p>
                </div>
              </div>

              <form className="mt-10" onSubmit={handleSubmit}>
                {/* Sizes */}
                <div className="mt-10 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes?.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={size.quantity === 0}
                          className={classNames(
                            size.quantity > 0
                              ? "cursor-pointer bg-white text-gray-900 shadow-xs"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.quantity > 0 ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ px: "1rem", py: "0.5rem", bgcolor: "#9155fd" }}
                >
                  Add to Cart
                  <span className="ml-2 text-xs font-medium text-white">
                    <ShoppingCartIcon style={{ fontSize: "20px" }} />
                  </span>
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {[
                      "Hand cut and sewn locally",
                      "Dyed with our proprietary colors",
                      "Pre-washed & pre-shrunk",
                      "Ultra-soft 100% cotton",
                    ].map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rating and reviews */}
        <section>
          <h1 className="font-semibold text-lg pb-4">
            Recent Reviews & Ratings
          </h1>
          <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
            <Stack
              spacing={5}
              direction={{ xs: "column", md: "row" }}
              alignItems="flex-start"
            >
              {/* Review Cards Section */}
              <Box sx={{ flexBasis: { xs: "100%", md: "60%" }, minWidth: 0 }}>
                {product.reviews?.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <ProductReviewCard key={index} review={review} />
                  ))
                ) : (
                  <p>No reviews available</p>
                )}
              </Box>

              {/* Rating Summary Section */}
              <Box
                sx={{
                  flexBasis: { xs: "100%", md: "40%" },
                  borderRadius: "12px",
                  padding: "1.5rem",
                  minWidth: 0,
                }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Product Rating
                </h2>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  className="mb-5"
                >
                  <Rating
                    value={product.numRatings ? 3.5 : 0}
                    precision={0.5}
                    readOnly
                  />
                  <p className="text-sm text-gray-500">
                    {product.numRatings} Ratings
                  </p>
                </Stack>
                <Box className="my-4 space-y-3">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <p className="w-20 text-sm font-medium text-gray-700">
                      Excellent
                    </p>
                    <LinearProgress
                      variant="determinate"
                      value={73}
                      color="success"
                      sx={{
                        flexGrow: 1,
                        height: 4,
                        bgcolor: "#e5e7eb",
                        borderRadius: 4,
                      }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <p className="w-20 text-sm font-medium text-gray-700">
                      Very Good
                    </p>
                    <LinearProgress
                      variant="determinate"
                      value={66}
                      color="success"
                      sx={{
                        flexGrow: 1,
                        height: 4,
                        bgcolor: "#e5e7eb",
                        borderRadius: 4,
                      }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <p className="w-20 text-sm font-medium text-gray-700">
                      Good
                    </p>
                    <LinearProgress
                      variant="determinate"
                      value={47}
                      color="warning"
                      sx={{
                        flexGrow: 1,
                        height: 4,
                        bgcolor: "#e5e7eb",
                        borderRadius: 4,
                      }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <p className="w-20 text-sm font-medium text-gray-700">
                      Average
                    </p>
                    <LinearProgress
                      variant="determinate"
                      value={30}
                      color="warning"
                      sx={{
                        flexGrow: 1,
                        height: 4,
                        bgcolor: "#e5e7eb",
                        borderRadius: 4,
                      }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <p className="w-20 text-sm font-medium text-gray-700">
                      Poor
                    </p>
                    <LinearProgress
                      variant="determinate"
                      value={10}
                      color="error"
                      sx={{
                        flexGrow: 1,
                        height: 4,
                        bgcolor: "#e5e7eb",
                        borderRadius: 4,
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </div>
        </section>

        {/* Similar product */}
        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold text-gray-900">
            Similar product
          </h1>
          <div className="flex flex-wrap space-y-5">
            {/* Placeholder: Fetch similar product */}
            <p>Similar product will be displayed here</p>
          </div>
        </section>
      </div>
    </div>
  );
}