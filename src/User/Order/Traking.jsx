// src/components/TrackStepper.jsx
import React, { memo } from "react";
import { stepsData } from "./data";

const CheckSVG = memo(() => (
  <svg
    width="13"
    height="11"
    viewBox="0 0 13 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.0964 0.390037L3.93638 7.30004L2.03638 5.27004C1.68638 4.94004 1.13638 4.92004 0.736381 5.20004C0.346381 5.49004 0.236381 6.00004 0.476381 6.41004L2.72638 10.07C2.94638 10.41 3.32638 10.62 3.75638 10.62C4.16638 10.62 4.55638 10.41 4.77638 10.07C5.13638 9.60004 12.0064 1.41004 12.0064 1.41004C12.9064 0.490037 11.8164 -0.319963 11.0964 0.380037V0.390037Z"
      fill="white"
    />
  </svg>
));

const Step = memo(({ step, isLast }) => {
  const { title, content, active, completed } = step;

  return (
    <div className="flex gap-4 sm:gap-6">
      <div className="flex flex-col items-center min-w-[40px]">
        <div
          className={`${
            active ? "bg-gray-100" : "bg-transparent"
          } rounded-full p-1 transition-all duration-300`}
        >
          {completed ? (
            <div className="flex size-6 items-center justify-center rounded-full bg-black">
              <CheckSVG />
            </div>
          ) : (
            <div
              className={`size-6 rounded-full border-8 ${
                active ? "border-blue-500" : "border-gray-300"
              } transition-all duration-300`}
            />
          )}
        </div>
        {!isLast && (
          <div
            className={`flex-1 border-l-2 ${
              completed ? "border-blue-500" : "border-gray-300"
            } transition-all duration-300`}
          />
        )}
      </div>
      <div className="pb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-600">{content}</p>
      </div>
    </div>
  );
});

const TrackStepper = ({ orderStatus }) => {
  const statusOrder = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"];
  const currentStatusIndex = statusOrder.indexOf(orderStatus?.toUpperCase());

  const steps = stepsData.map((step) => {
    const stepStatusIndex = statusOrder.indexOf(step.status?.toUpperCase());
    return {
      ...step,
      active: stepStatusIndex === currentStatusIndex,
      completed: stepStatusIndex < currentStatusIndex,
    };
  });

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="flex flex-col rounded-2xl bg-white shadow-lg p-6 sm:p-8 font-sans">
        {steps.map((step, index) => (
          <Step key={index} step={step} isLast={index === steps.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default TrackStepper;
