import React from "react";

const products = [
  {
    id: 1,
    name: "Sleeveless",
    image:
      "https://images.meesho.com/images/products/440853522/6aos8_512.avif?width=512",
    description: "New Trendy Stylish look Women Gathered White Dress",
    brand: "Nidhi Enterprice",
    price: 5549,
    discountedPrice: 2449,
    discountPercent: 55,
  },
  {
    id: 2,
    name: "Maxi Dress",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcShS_t5HCtgnK8KidzVwtlK3nJEs0CIpyDX9_2ePK4NKm3rSmUu-eCnIxe6tq5aLTILd_kbbkdFlsGYOtl-fVbyp0xqW2-0JkuovOq5nWZcNq0x1zF_GHNDww",
    description: "Floral Navy Blue Shoulder Straps Maxi Dress",

    brand: "Tokyo Talkies",
    price: 2199,
    discountedPrice: 571,
    discountPercent: 74,
  },
  {
    id: 3,
    name: "Mersin Novo Co-Ord Set",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRZizlUl5pacZzJzSW1Q1KXEbayN6PPzsa-ARW-xxw25n_Ni8jdNGP1Od_dFUOZwGd7zCdK-xVo0N590bBg4d9skuZUwzHaVTTFF-AoYz1w",
    description: "Mersin Novo Co-Ord Sett",
    brand: "House of Fett",
    price: 6499,
    discountedPrice: 6499,
    discountPercent: 0,
  },
  {
    id: 4,
    name: "Skirt",
    image:
      "https://image.hm.com/assets/hm/5f/88/5f885407cd6f4ef31a5b2662eed47c6d491bd4e9.jpg?imwidth=1260",
    description: "Drawstring-detail skirt",
    brand: "H&M",
    price: 1999,
    discountedPrice: 1999,
    discountPercent: 0,
  },
];

const Women = () => {
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

export default Women;
