import React from "react";
import Tab from "./Tab";

const Section2 = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center items-center m-auto relative top-5 px-4 sm:px-6 lg:px-4 max-w-7xl">
        <div className="pt-10 sm:pt-16 lg:pt-20 w-full lg:w-1/2 lg:pl-8">
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 tracking-tight mb-4">
            Our popular <br /> products
          </h2>
        </div>

        <div className=" sm:p-6 lg:p-10 w-full lg:w-1/2 mb-5 sm:mb-0">
          <p className="text-sm sm:text-base md:text-md font-semibold  text-gray-600 sm:mt-16">
            Major devlopments include the economic predominance of agriculture,
            exploitation of the peasantry, slow inter-regional communication,
            the importance
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center m-auto relative top-5 px-4 sm:px-6 lg:px-4 max-w-7xl">
        <Tab />
      </div>
    </div>
  );
};

export default Section2;
