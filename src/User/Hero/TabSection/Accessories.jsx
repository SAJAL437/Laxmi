import React from "react";

const products = [
  {
    id: 1,
    name: "Women Dial Bracelet Style Straps Analogue Watchi",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSYXDIu2RcSb_aodxxQshVywNdowvuJRHf4VgcvAukk8g5Gqb4vQYeuH_9gqXgb80Trcelq-ldZMmipV-soKQg2W54-NP8XdNrE06a_8I-p",
    description:
      "Women Dial & Stainless Steel Bracelet Style Straps Analogue Watch CLSSCDGRN",
    brand: "Carlton London",
    price: 2592,
    discountedPrice: 5400,
    discountPercent: 52,
  },
  {
    id: 2,
    name: "Tan leather Belt",
    image:
      "https://assets.woodland.social/product/images/AGBT0441652A/TAN/AGBT0441652A_041_0.webp",
    description:
      "Spruce up your look with this tan mena leather belt from woodland ",
    brand: "Woodland",
    price: 800,
    discountedPrice: 1395,
    discountPercent: 42,
  },
  {
    id: 3,
    name: "Men's Watch",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQEjMzTufDkX8XdyKemp_3cymy404mXdY7V1mJZBq9e3BvWaCu1e9Obvz9_Ia8sfKdzzE1zB5Cu45zkc45Di-uLSPCzHdEK67CqUhOwBOQ",
    description:
      "Titan Neo Splash Quartz Multifunction Black Dial Stainless Steel Strap Watch for Men",
    brand: "Titan",
    price: 1700,
    discountedPrice: 1399,
    discountPercent: 18,
  },
  {
    id: 4,
    name: "Vincent Chase Polarized",
    image:
      "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-black-blue-full-rim-geometric-vincent-chase-polarized-the-metal-edit-vc-s13122-c2-polarized-sunglasses_vincent-chase-vc-s13122-c2-sunglasses_sunglasses_j_3495_1_1_28july23.jpg",
    description: "Silver Full Rim Geometric",
    brand: "Lenscart",
    price: 1500,
    discountedPrice: 1000,
    discountPercent: 33,
  },
];

const Accessories = () => {
  return (
    <div className="container mx-auto px-4 py-8  ">
      <div className="w-full p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
          Accessories Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Image */}
              <img
                src={product.image}
                className="h-56 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                alt={product.name}
                loading="lazy"
              />

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  Brand: {product.brand}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end items-start p-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-xs mt-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between w-full">
                  <div>
                    <span className="text-xl font-bold text-yellow-400">
                      ₹{product.discountedPrice.toLocaleString()}
                    </span>
                    {product.discountPercent > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-100 line-through">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-red-500 font-semibold bg-red-100 px-2 py-1 rounded">
                          {product.discountPercent}% OFF
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accessories; // Changed to default export
