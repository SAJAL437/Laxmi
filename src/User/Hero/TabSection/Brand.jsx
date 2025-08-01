import React from "react";

// Fallback image URL (a generic placeholder)
const fallbackImage =
  "https://via.placeholder.com/150x150.png?text=Logo+Not+Found";

const brands = [
  {
    id: 1,
    name: "Manyavar",
    logo: "https://scontent.fdel3-4.fna.fbcdn.net/v/t39.30808-6/342486369_529436586063459_2602512907277574807_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=grhKu4m1IHAQ7kNvwHkiWD5&_nc_oc=AdnzndW794I6gMsRGQCtSlfVxYYVuOKFIU9qAKXvGysy1BVuRZ-mM8n0F6i-pE3g5p6bMpIWFqv3PqObHfBgkvrI&_nc_zt=23&_nc_ht=scontent.fdel3-4.fna&_nc_gid=OQYUiDoK85U1pZyUnN7n_A&oh=00_AfSW1Ici8XkW8gDaydRBHVDPXV9z6qEm4Z53k-G-QAxoqA&oe=6891B745",
    description:
      "Manyavar is India's leading brand for ethnic wear, offering exquisite sherwanis, lehengas, and traditional attire for men and women, blending heritage with modern style.",
    website: "https://www.manyavar.com/",
  },
  {
    id: 2,
    name: "Peter England",
    logo: "https://images.seeklogo.com/logo-png/30/2/peter-england-logo-png_seeklogo-304313.png",
    description:
      "Peter England, part of Aditya Birla Fashion, is a trusted name in men's formal and casual clothing, known for its quality and sophisticated designs.",
    website: "https://www.peterengland.com/",
  },
  {
    id: 3,
    name: "Redtape",
    logo: "https://images.seeklogo.com/logo-png/30/1/red-tape-logo-png_seeklogo-304782.png",
    description:
      "Redtape is a premier Indian fashion brand offering stylish footwear, apparel, and accessories for men, women, and children, with a focus on modern trends.",
    website: "https://redtape.com/",
  },
  {
    id: 4,
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/800px-Adidas_Logo.svg.png",
    description:
      "Adidas, a global leader in sportswear, designs innovative athletic shoes, apparel, and accessories, driven by the mission to change lives through sport.",
    website: "https://www.adidas.co.in/",
  },
];

const Brands = () => {
  const handleImageError = (e, brandName) => {
    console.warn(`Failed to load logo for ${brandName}: ${e.target.src}`);
    e.target.src = fallbackImage;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
          Featured Brands
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="relative group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Logo */}
              <img
                src={brand.logo}
                className="h-56 w-full object-contain object-center p-6 bg-gray-100 transition-transform duration-300 group-hover:scale-105"
                alt={`${brand.name} logo`}
                loading="lazy"
                onError={(e) => handleImageError(e, brand.name)}
              />

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {brand.name}
                </h3>
                <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                  {brand.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
