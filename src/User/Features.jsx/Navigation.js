export const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "/",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "/",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", id: "top", to: `{women/clothing/tops}` },
            { name: "Dresses", to: "#" },
            { name: "Pants", to: "#" },
            { name: "Denim", to: "#" },
            { name: "Sweaters", to: "#" },
            { name: "T-Shirts", to: "#" },
            { name: "Jackets", to: "#" },
            { name: "Activewear", to: "#" },
            { name: "Browse All", to: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", to: "#" },
            { name: "Wallets", to: "#" },
            { name: "Bags", to: "#" },
            { name: "Sunglasses", to: "#" },
            { name: "Hats", to: "#" },
            { name: "Belts", to: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", to: "#" },
            { name: "My Way", to: "#" },
            { name: "Re-Arranged", to: "#" },
            { name: "Counterfeit", to: "#" },
            { name: "Significant Other", to: "#" },
          ],
        },
      ],
    },

    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            {
              name: "mens_kurta",
              id: "mens_kurta",
              to: `{men/clothing/mens_kurta}`,
            },
            { name: "Shirts", to: "#" },
            { name: "Pants", to: "#" },
            { name: "Sweaters", to: "#" },
            { name: "T-Shirts", to: "#" },
            { name: "Jackets", to: "#" },
            { name: "Activewear", to: "#" },
            { name: "Browse All", to: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", to: "#" },
            { name: "Wallets", to: "#" },
            { name: "Bags", to: "#" },
            { name: "Sunglasses", to: "#" },
            { name: "Hats", to: "#" },
            { name: "Belts", to: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", to: "#" },
            { name: "Counterfeit", to: "#" },
            { name: "Full Nelson", to: "#" },
            { name: "My Way", to: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", to: "#" },
    { name: "Stores", to: "#" },
  ],
  role: [{ name: "AdminDasboard", to: "#" }],
};
