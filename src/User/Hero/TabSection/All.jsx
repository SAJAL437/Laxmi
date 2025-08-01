import { useState, useMemo } from "react";
import AliceCarousel from "react-alice-carousel";
import { Design } from "./Design"; // Ensure this is correctly imported
import SliderCard from "./SliderCard";
import "react-alice-carousel/lib/alice-carousel.css"; // Import carousel styles

const All = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  //   const categories = ["All", ...new Set(Design.map((item) => item.category))];

  const responsive = {
    0: { items: 1 },
    640: { items: 2 },
    1024: { items: 3 },
    1280: { items: 4 },
  };

  //   Filter designs by category
  const filteredDesigns = useMemo(() => {
    return selectedCategory === "All"
      ? Design
      : Design.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Generate carousel items
  const items = useMemo(() => {
    return Array.isArray(filteredDesigns) && filteredDesigns.length > 0 ? (
      filteredDesigns.map((item, index) => (
        <div
          key={item.id}
          className="px-4 py-5 transition-transform duration-300 hover:scale-105"
          aria-current={index === activeIndex ? "true" : "false"}
        >
          <SliderCard product={item} />
        </div>
      ))
    ) : (
      <div className="text-center text-gray-500 py-10">
        No designs available
      </div>
    );
  }, [filteredDesigns, activeIndex]);

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  return (
    <section className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-xl">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Trendy deals</h2>
      </header>
      <div className="relative">
        <AliceCarousel
          items={items}
          responsive={responsive}
          activeIndex={activeIndex}
          autoPlay
          autoPlayInterval={2000}
          infinite
          disableButtonsControls
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          stagePadding={{ paddingLeft: 30, paddingRight: 30 }}
          aria-label="Popular designs carousel"
        />
      </div>
    </section>
  );
};

export default All;
