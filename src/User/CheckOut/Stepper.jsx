import React from "react";

const defaultSteps = [
  { label: "Address", step: 1, path: "address" },
  { label: "Order Summary", step: 2, path: "summary" },
  { label: "Payment", step: 3, path: "payment" },
  { label: "Shipping", step: 4, path: "shipping" },
];

const Stepper = ({ steps = defaultSteps, activeStep }) => {
  const progressWidth = `${(100 / (steps.length - 1)) * (activeStep - 1)}%`;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:py-8 sm:px-6">
      <div className="relative flex justify-between before:absolute before:top-1/2 before:left-0 before:h-1 before:w-full before:-translate-y-1/2 before:bg-gray-200">
        {steps.map(({ step, label }) => (
          <div className="relative z-10" key={step}>
            <div
              className={`flex size-10 sm:size-12 items-center justify-center rounded-full border-2 bg-white transition-all duration-300 ease-in-out ${
                activeStep >= step
                  ? "border-gray-600 bg-gray-50"
                  : "border-gray-300"
              }`}
            >
              {activeStep > step ? (
                <span className="text-gray-600 text-lg font-serif sm:text-xl">✔</span>
              ) : (
                <span
                  className={`text-lg sm:text-xl ${
                    activeStep === step ? "text-gray-600 font-serif" : "text-gray-500 font-serif"
                  }`}
                >
                  {step}
                </span>
              )}
            </div>
            <div className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 text-center w-max">
              <span
                className={`text-xs sm:text-sm font-semibold font-serif ${
                  activeStep >= step ? "text-gray-600" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-gray-900 to-gray-400 transition-all duration-300 ease-in-out -translate-y-1/2"
          style={{ width: progressWidth }}
        ></div>
      </div>
    </div>
  );
};

export default Stepper;