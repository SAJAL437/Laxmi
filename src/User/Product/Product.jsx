import { useCallback, useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
} from "@headlessui/react";
import { MdSort } from "react-icons/md";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Button,
  IconButton,
} from "@mui/material";
import { filters, singleFilter } from "./FilterData";
import ProductCard from "./ProductCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/User/Action/ProductAction";

const sortOptions = [
  { name: "Price: Low to High", value: "price_low" },
  { name: "Price: High to Low", value: "price_high" },
];

export default function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const { levelThree } = useParams();
  const dispatch = useDispatch();
  const param = useParams();
  const { products, totalPages, totalElements, loading } = useSelector(
    (store) => store.products
  );

  const searchParams = new URLSearchParams(location.search);
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const price = searchParams.get("price");
  const sortValue = searchParams.get("sort");
  const pageNumber = parseInt(searchParams.get("pageNumber")) || 1;
  const discount = searchParams.get("discount");
  const stock = searchParams.get("stock");

  const debouncedNavigate = useCallback(
    (query) => {
      navigate(`?${query}`);
    },
    [navigate]
  );

  const handlePaginationChange = (value) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("pageNumber", value);
    navigate(`?${newParams.toString()}`);
  };

  const handleSort = (sortValue) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("sort", sortValue);
    newParams.set("pageNumber", 1); // Reset to page 1 when sorting
    navigate(`?${newParams.toString()}`);
  };

  const handleFilterChange = (value, sectionId) => {
    const newParams = new URLSearchParams(location.search);
    const current = newParams.get(sectionId)?.split(",") || [];
    const isSelected = current.includes(value);

    const updated = isSelected
      ? current.filter((item) => item !== value)
      : [...current, value];

    if (updated.length === 0) {
      newParams.delete(sectionId);
    } else {
      newParams.set(sectionId, updated.join(","));
    }

    newParams.set("pageNumber", 1); // Reset to page 1
    debouncedNavigate(newParams.toString());
  };

  const handleRadioFilterChange = (e, sectionId) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set(sectionId, e.target.value);
    newParams.set("pageNumber", 1); // Reset to page 1
    debouncedNavigate(newParams.toString());
  };

  const handleClearFilters = () => {
    navigate(location.pathname); // Clear query params
  };

  useEffect(() => {
    const [minPrice, maxPrice] = price
      ? price.split("-").map(Number)
      : [0, 100000];

    const data = {
      category: param.lavelThree, // ✅ based on URL
      color: colorValue ? colorValue.split(",") : [],
      size: sizeValue ? sizeValue.split(",") : [],
      minPrice,
      maxPrice,
      minDiscount: discount ? Number(discount) : 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber - 1,
      pageSize: 10,
      stock: stock || "all",
    };

    dispatch(fetchProducts(data));
  }, [
    param.lavelThree, // ✅ important
    colorValue,
    sizeValue,
    price,
    discount,
    sortValue,
    pageNumber,
    stock,
    dispatch,
  ]);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="animate-pulse">
            {/* Header Placeholder */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
            {/* Layout Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
              {/* Filters Placeholder */}
              <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-4 sm:p-6 max-h-[90vh]">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="h-10 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
              {/* Product Grid Placeholder */}
              <div className="lg:col-span-4">
                <div className="flex flex-wrap justify-center items-center mb-4 gap-8 py-5">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="w-60 h-80 bg-gray-200 rounded-xl"
                    ></div>
                  ))}
                </div>
                {/* Pagination Placeholder */}
                <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <div className="h-10 w-20 bg-gray-200 rounded-2xl"></div>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="h-10 w-10 bg-gray-200 rounded-full"
                      ></div>
                    ))}
                  </div>
                  <div className="h-10 w-20 bg-gray-200 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {levelThree ? `Category: ${levelThree}` : "All Products"}
          </h1>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg shadow-sm transition">
              <MdSort className="h-5 w-5" />
              Sort
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <Menu.Item key={option.value}>
                    {({ active }) => (
                      <button
                        onClick={() => handleSort(option.value)}
                        className={`w-full px-4 py-2 text-left text-sm font-medium ${
                          sortValue === option.value
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-gray-700 hover:bg-gray-50"
                        } transition`}
                      >
                        {option.name}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Menu>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Filters */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Filters
            </h2>
            <form className="space-y-4 sm:space-y-6 ">
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className="!border-indigo-500 !text-indigo-600 hover:!bg-indigo-50"
                onClick={handleClearFilters}
              >
                Clear All Filters
              </Button>

              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-b border-gray-200 py-2 mt-6"
                >
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full justify-between items-center text-sm font-medium text-gray-900 hover:text-indigo-600 transition">
                        <span>{section.name}</span>
                        {open ? (
                          <MinusIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <PlusIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </DisclosureButton>
                      <DisclosurePanel className="pt-3 space-y-2">
                        {section.options.map((option, idx) => (
                          <label
                            key={option.value}
                            htmlFor={`filter-${section.id}-${idx}`}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              onChange={() =>
                                handleFilterChange(option.value, section.id)
                              }
                              checked={searchParams
                                .get(section.id)
                                ?.split(",")
                                .includes(option.value)}
                              id={`filter-${section.id}-${idx}`}
                              name={`${section.id}[]`}
                              className="rounded-sm border border-gray-300 checked:border-indigo-600 checked:bg-indigo-600"
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}

              {singleFilter.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-b border-gray-200 py-2 "
                >
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full justify-between items-center text-sm font-medium text-gray-900 hover:text-indigo-600 transition">
                        <span>{section.name}</span>
                        {open ? (
                          <MinusIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <PlusIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </DisclosureButton>
                      <DisclosurePanel className="pt-3">
                        <FormControl component="fieldset">
                          <RadioGroup
                            value={
                              searchParams.get(section.id) ||
                              section.options[0]?.value
                            }
                            name={`radio-buttons-${section.id}`}
                            onChange={(e) =>
                              handleRadioFilterChange(e, section.id)
                            }
                          >
                            {section.options.map((option, idx) => (
                              <FormControlLabel
                                key={idx}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-4">
            <div className="flex flex-wrap justify-center items-center mb-4 gap-8 py-5 rounded-md">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="text-gray-600 col-span-full text-center">
                  No products found.
                </p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                {/* Prev Button */}
                <div
                  className={`flex items-center justify-between px-3 py-2 rounded-2xl cursor-pointer transition duration-300 hover:bg-gray-500 hover:text-white ${
                    pageNumber === 1 ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={() => handlePaginationChange(pageNumber - 1)}
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 mr-1" />{" "}
                  Prev
                </div>

                {/* Page Numbers */}
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

                {/* Next Button */}
                <div
                  className={`flex items-center justify-center px-3 py-2 rounded-2xl cursor-pointer transition duration-300 hover:bg-gray-500 hover:text-white ${
                    pageNumber === totalPages
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  onClick={() => handlePaginationChange(pageNumber + 1)}
                >
                  Next{" "}
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4 ml-1" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}