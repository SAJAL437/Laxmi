import React from "react";

const products = [
  {
    id: 1,
    name: "Geometric Casual Shirt",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSanf0YEYvQE-PubW8rWKETdfGGmsuKKVbryDOm5F3Mtp21HbsXn64xkNrvyPZONzDMx_NVBVitMmmaMqWif5Gs9bU-lTiKfoG4zHBtJOK3JdVfw4PPXLySSg&usqp=CAc",
    description:
      "Multicoloured geometric printed opaque casual shirt with a Cuban collar, button placket, short regular sleeves, and curved hem.",
    brand: "Campus Sutra",
    price: 1999,
    discountedPrice: 659,
    discountPercent: 67,
  },
  {
    id: 2,
    name: "Pancha Set",
    image:
      "https://manyavar.scene7.com/is/image/manyavar/SOSK714-302-Cream.36725_17-11-2023-14-12:283x395?&dpr=on,2",
    description:
      "Bright Cream Zari Boarderd Traditional South Indian Pancha Set",
    brand: "Manyavar",
    price: 1999,
    discountedPrice: 1999,
    discountPercent: 0,
  },
  {
    id: 3,
    name: "Kurta Set",
    image:
      "https://manyavar.scene7.com/is/image/manyavar/SDES1012_317-Light+Mid+Green_101.8768_29-08-2024-09-23:650x900?&dpr=on,2",
    description: "Soft Green Floral, Design Mandarin Patterned Kurta Set",
    brand: "Manyavar",
    price: 1700,
    discountedPrice: 1399,
    discountPercent: 18,
  },
  {
    id: 4,
    name: "Luxurious Suit",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQEuhQhARZhSGZYsQ7h0Xz3WK5S_RBoNly5RekesaX-i1BuU6dzX7YUUDlZZahBCaA9R09zeLbVmxKfDE7k1z0C04tjmz7K_mE-t0P7i7LaBXu1uafm0dGy",
    description: "Men's Self Design Mandarin Collar Two-Piece Suit",
    brand: "Peter England",
    price: 11999,
    discountedPrice: 9999,
    discountPercent: 21,
  },
];

const Men = () => {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="w-full p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
          Premium Collection
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
                className="h-56 w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
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
                <div className="mt-4 flex items-center justify-between">
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

export default Men;
