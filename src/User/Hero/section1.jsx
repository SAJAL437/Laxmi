import React, { useState, useEffect, useRef } from "react";

const Section1 = () => {
  const images = [
    "https://manyavar.scene7.com/is/image/manyavar/ULB4577_421-BEIGE_101.2319_17-03-2025-18-42:650x900?&dpr=on,2",

    "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRY71cZNW3oodo0uj5KqDx-LiN3_dqax_aXmz831adsI4ywKjZWTU4Cd4gVIAlXmVCEOCpqjGM8GOOztr3LUPJC_9j2GCvSI7mvH6tRGXdqQUZLP5hxQXfg1g",

    "https://manyavar.scene7.com/is/image/manyavar/SB16556_439-INDIGO+BLUE_301.16397_27-05-2024-13-33:283x395?&dpr=on,2",

    "https://manyavar.scene7.com/is/image/manyavar/NMSAS6396_413-PURPLE_301.17136_27-05-2024-16-41:283x395?&dpr=on,2",

    "https://manyavar.scene7.com/is/image/manyavar/SOSK784_301-White_101.30495_05-03-2025-21-08:650x900?&dpr=on,2",

    "https://ramrajcotton.in/cdn/shop/files/Default_bfd460e5-38ba-4f4d-90e0-2f315cdb6930.jpg?v=1724305171&width=1080",

    "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS8M-seVWubjvEC7sF4f5BB9JgrbfxjF4gofcOo8TBjmpuo03qEaBXQrxxJdKNGyr___OSt4x12nltjqiDnXiGjvSmP_P-ayUaYFQ05L70",
  ];
const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbnailOffset, setThumbnailOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const thumbnailRef = useRef(null);

  // Auto-slide effect for thumbnails
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Sync thumbnail slider with current image index
  useEffect(() => {
    const maxVisibleOffset = images.length - 4; // Show 4 thumbnails at a time
    let newOffset = currentImageIndex % images.length;
    if (newOffset < 0) newOffset = 0;
    if (newOffset > maxVisibleOffset) newOffset = maxVisibleOffset;
    setThumbnailOffset(newOffset);
    if (thumbnailRef.current) {
      thumbnailRef.current.style.transition = "none";
      thumbnailRef.current.style.transform = `translateX(-${newOffset * 25}%)`;
      setTimeout(() => {
        thumbnailRef.current.style.transition = "transform 0.5s ease-in-out";
      }, 0);
    }
  }, [currentImageIndex, images.length]);

  // Handle drag/swipe start
  const handleDragStart = (e) => {
    const x = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    setIsDragging(true);
    setStartX(x);
    setDragOffset(thumbnailOffset * 100);
  };

  // Handle drag/swipe move
  const handleDragMove = (e) => {
    if (!isDragging) return;
    const x = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
    const delta = startX - x;
    const newOffset = dragOffset + delta;
    const maxOffset = (images.length * 2 - 4) * 100;
    if (newOffset >= 0 && newOffset <= maxOffset) {
      thumbnailRef.current.style.transform = `translateX(-${
        newOffset / (images.length * 2)
      }%)`;
    }
  };

  // Handle drag/swipe end
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const currentOffset = parseFloat(
      thumbnailRef.current.style.transform.match(
        /translateX\((-?\d+\.?\d*)/
      )?.[1] || 0
    );
    const newOffset = Math.round((currentOffset * images.length * 2) / 100);
    const maxVisibleOffset = images.length - 4;
    let clampedOffset = newOffset % images.length;
    if (clampedOffset < 0) clampedOffset += images.length;
    if (clampedOffset > maxVisibleOffset) clampedOffset = maxVisibleOffset;
    setThumbnailOffset(clampedOffset);
    setCurrentImageIndex(clampedOffset);
    thumbnailRef.current.style.transform = `translateX(-${
      clampedOffset * 25
    }%)`;
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index % images.length);
  };

  // Handle thumbnail slider navigation
  const handleSlide = (direction) => {
    const maxVisibleOffset = images.length - 4;
    let newOffset = thumbnailOffset + direction;
    if (newOffset < 0) newOffset = images.length - 4; // Loop to end
    if (newOffset > maxVisibleOffset) newOffset = 0; // Loop to start
    setThumbnailOffset(newOffset);
    setCurrentImageIndex(newOffset);
  };

  // Handle image load error
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/800?text=Image+Not+Found";
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center m-auto relative top-5 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="pt-10 sm:pt-16 lg:pt-20 w-full lg:w-1/2 lg:pl-10">
        <div>
          <p className="border w-fit px-3 py-1 rounded-full mb-4 border-gray-600 text-gray-600 font-semibold text-xs sm:text-sm bg-gray-50 shadow-sm">
            Trendy Outfit
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 tracking-tight">
            Discover Our Trendy <br /> Outfit for You
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg font-semibold text-gray-600">
            People have been using natural objects, such as tree stumps, rocks,
            and moss, as furniture since the beginning of human civilization.
          </p>
        </div>
        <div className="mt-5">
          <button className="border px-4 py-2 w-fit rounded-2xl font-semibold text-sm sm:text-base bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 animate-pulse-slow">
            Shop Now
          </button>
        </div>
        {/* Thumbnail Slider - Hidden below 425px, visible from 425px to 1024px, visible above 1024px */}
        <div className="relative mt-6 pr-0 sm:pr-5 hidden sm:block lg:block">
          <div className="overflow-hidden">
            <div
              ref={thumbnailRef}
              className="flex transition-transform duration-500 ease-in-out select-none"
              style={{ transform: `translateX(-${thumbnailOffset * 25}%)` }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {[...images, ...images].map((img, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 cursor-pointer mx-1 sm:mx-2 transition-transform duration-200 hover:scale-105 hover:-rotate-3 ${
                    currentImageIndex === index % images.length
                      ? "border-2 border-gradient-to-r from-gray-600 to-gray-400 rounded-xl shadow-glow"
                      : ""
                  } ${isDragging ? "cursor-grabbing" : "cursor-pointer"}`}
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover object-top rounded-xl"
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Arrows - Hidden but functional */}
          <button
            onClick={() => handleSlide(-1)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-0 hover:opacity-70 transition-opacity"
          >
            ←
          </button>
          <button
            onClick={() => handleSlide(1)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-0 hover:opacity-70 transition-opacity"
          >
            →
          </button>
        </div>
      </div>

      {/* Main Image - Visible below 425px and above 1024px, hidden from 425px to 1024px */}
      <div className="p-4 sm:p-6 lg:p-10 w-full lg:w-1/2 block sm:hidden lg:block">
        <div className="w-full sm:max-w-[25rem] h-[24rem] sm:h-[30rem] mx-auto relative overflow-hidden rounded-2xl shadow-2xl border border-gray-200/50 mt-10">
          <img
            src={images[currentImageIndex]}
            alt="Featured Outfit"
            className="w-full h-full object-cover object-top rounded-2xl transition-transform duration-500 transform hover:scale-105"
            style={{ animation: "fadeIn 0.5s" }}
            onError={handleImageError}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .shadow-glow {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(100, 100, 100, 0.3);
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Section1;