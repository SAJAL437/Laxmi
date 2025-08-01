import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Stepper from "./Stepper";
import Address from "../CheckoutStep/Address";
import Summary from "../CheckoutStep/Summary";
import Payment from "../CheckoutStep/Payment";
import Confirmation from "../CheckoutStep/Confirmation";
import Shipping from "../CheckoutStep/Shipping";

const steps = [
  { label: "Address", step: 1, component: Address, path: "address" },
  { label: "Order Summary", step: 2, component: Summary, path: "summary" },
  { label: "Payment", step: 3, component: Payment, path: "payment" },
  {
    label: "Confirmation",
    step: 4,
    component: Confirmation,
    path: "confirmation",
  },
];

const Checkout = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [stepData, setStepData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(1);

  // Extract orderId from URL query parameters
  const query = new URLSearchParams(location.search);
  const orderId = query.get("orderId");

  // Define ActiveComponent based on activeStep
  const ActiveComponent =
    steps.find((s) => s.step === activeStep)?.component || null;

  // Sync activeStep with URL
  useEffect(() => {
    const currentStep = steps.find((s) => s.path === step)?.step || 1;
    setActiveStep(currentStep);
    // Redirect to correct step with orderId if missing
    if (orderId && !location.pathname.includes(steps[currentStep - 1].path)) {
      navigate(`/checkout/${steps[currentStep - 1].path}?orderId=${orderId}`);
    }
    // Redirect to address step if no orderId and not on address step
    if (!orderId && currentStep !== 1) {
      navigate("/checkout/address");
    }
  }, [step, orderId, navigate]);

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <Stepper
          steps={steps}
          setStepData={setStepData}
          setLoading={setLoading}
          setError={setError}
          activeStep={activeStep}
        />
        <div className="mt-8 p-4 sm:p-6">
          {loading && (
            <p className="text-gray-600 text-center text-sm sm:text-base">
              Loading...
            </p>
          )}
          {error && (
            <p className="text-red-600 text-center text-sm sm:text-base">
              {error}
            </p>
          )}
          {!orderId && activeStep !== 1 && (
            <p className="text-red-600 text-center text-sm sm:text-base">
              No order ID provided. Please start from the address step.
            </p>
          )}
          {orderId && ActiveComponent && !loading && !error && (
            <div className="text-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-indigo-600 mb-4">
                {/* {steps.find((s) => s.step === activeStep)?.label} Details */}
              </h2>
              <ActiveComponent
                data={{ ...stepData?.data, id: orderId }}
                step={activeStep}
              />
            </div>
          )}
          {activeStep === 1 && ActiveComponent && !loading && !error && (
            <div className="text-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-indigo-600 mb-4">
                {/* Address Details */}
              </h2>
              <ActiveComponent data={stepData?.data} step={activeStep} />
            </div>
          )}
        </div>
        <div className="mt-6 sm:mt-8 flex justify-between"></div>
      </div>
    </div>
  );
};

export default Checkout;
