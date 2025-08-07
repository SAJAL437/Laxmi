import React from "react";
import { BsBoxFill } from "react-icons/bs";
import { GrShieldSecurity } from "react-icons/gr";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const Account = () => {
  const cardData = [
    {
      icon: <FaUser size={40} className="text-gray-500" />,
      title: "Profile",
      description: "User Profile and Settings",
      to:"/account/profile",
    },
    {
      icon: <BsBoxFill size={40} className="text-yellow-800" />,
      title: "Your Orders",
      description: "Track and manage your orders",
      to:"/account/orders",
    },
    {
      icon: <GrShieldSecurity size={40} className="text-green-500" />,
      title: "Login and Security",
      description: "Edit your details and manage profile",
      to:"/account/security",
    },
    {
      icon: <MdLocationPin size={40} className="text-red-500" />,
      title: "Address",
      description: "Manage your addresses",
      to:"/account/address",
    },
    {
      icon: <TfiHeadphoneAlt  size={40} className="text-blue-500" />,
      title: "Contact us",
      description: "Contact and Servcies",
      to:"/account/contactandservices",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-serif text-gray-900 mb-8 text-center sm:text-left">
          Your Account 
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <Link
              to={card.to}
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 
                        hover:shadow-xl transition-shadow duration-300 
                        flex flex-col sm:flex-row items-center sm:items-start gap-4
                        cursor-pointer hover:bg-gray-50"
              role="button"
              tabIndex={0}
              aria-label={`Manage ${card.title}`}
            >
              <div className="flex-shrink-0">{card.icon}</div>
              <div>
                <h2 className="text-xl font-semibold font-serif text-gray-900">
                  {card.title}
                </h2>
                <p className="text-gray-600 mt-1">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;