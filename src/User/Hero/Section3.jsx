import React from "react";

const Section3 = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center pl-5 sm:pl-0">
          <div className="relative w-full max-w-[22rem] sm:max-w-[28rem] h-[25rem] sm:h-[30rem] overflow-hidden rounded-3xl shadow-xlborder border-gray-100/50 transition-all duration-300 hover:shadow-2xl">
            <img
              src="https://clothsvilla.com/cdn/shop/products/2_bb2ef485-c042-4346-a543-e7f6d1195aa6_500x500.jpg?v=1697355458"
              alt="Featured Outfit"
              className="w-full h-full object-cover object-top rounded-3xl transition-transform duration-500 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl" />
          </div>
          <div className="w-1/2 flex justiy-center items-center mx-auto my-4 ">
            <hr className=" w-40  " />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left mt-16 sm:mt-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Pioneering Innovation <br /> and Elegance
          </h1>
          <p className="mt-4 text-base sm:text-md text-gray-600 font-medium max-w-md mx-auto lg:mx-0">
            Cotton is the cornerstone of global fashion, offering unparalleled
            versatility, durability, and comfort in every design.
          </p>
          <div className="mt-8 flex flex-row gap-4 justify-center lg:justify-start">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcYpzC45hm-5UQI8ITZjR3gyGVnfDi5GnWdQ&s"
              alt="Outfit Detail"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl shadow-md object-cover object-top transition-transform duration-300 hover:scale-105"
            />
            <img
              src="https://www.samyakk.com/blog/wp-content/uploads/2025/04/Kiara-Advanis-Outfits.jpg"
              alt="Outfit Preview"
              className="w-28 h-28 sm:w-32 sm:h-25 rounded-2xl shadow-md object-cover object-top transition-transform duration-300 hover:scale-105 mt-14 sm:mt-7"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
