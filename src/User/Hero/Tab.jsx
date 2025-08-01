import React, { useState } from "react";
import All from "./TabSection/All";
import Women from "./TabSection/Women";
import Men from "./TabSection/Men";
import Accessories from "./TabSection/Accessories";
import Brands from "./TabSection/Brand";

export default function Tab() {
  const [value, setValue] = useState("1");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="w-full ">
      {/* ✅ Responsive Tab List */}
      <div className="border-b border-gray-300 overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-4 md:space-x-6 py-2 md:py-4">
          {[
            { label: "All", value: "1" },
            { label: "Womens", value: "2" },
            { label: "Acessories", value: "3" },
            { label: "Men", value: "4" },
            { label: "Brands", value: "5" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleChange(tab.value)}
              className={`text-xs sm:text-sm md:text-base px-3 py-2 rounded-lg transition ${
                value === tab.value
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Tab Content */}
      <div className="py-4 md:py-6">
        {value === "1" && <All />}
        {value === "2" && <Women />}
        {value === "3" && <Accessories/>}
        {value === "4" && <Men />}
        {value === "5" && <Brands />}
      </div>
    </div>
  );
}
