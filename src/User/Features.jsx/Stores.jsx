import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { IoIosArrowDropupCircle } from "react-icons/io";

const Stores = () => {
  const stores = [
    {
      name: "Laxmi Fashion Hub - Mumbai",
      address: "123 Marine Drive, Mumbai, MH",
      timings: "10:00 AM - 8:00 PM",
      contact: "+91 98765 43210",
      mapLink: "https://maps.google.com/?q=Marine+Drive,Mumbai",
      img: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      hasStock: true,
      hasDelivery: true,
    },
    {
      name: "Laxmi Style Studio - Delhi",
      address: "456 Connaught Place, New Delhi, DL",
      timings: "10:00 AM - 9:00 PM",
      contact: "+91 87654 32109",
      mapLink: "https://maps.google.com/?q=Connaught+Place,Delhi",
      img: "/store.png",
      hasStock: true,
      hasDelivery: false,
    },
    {
      name: "Laxmi Boutique - Bangalore",
      address: "789 MG Road, Bangalore, KA",
      timings: "11:00 AM - 8:00 PM",
      contact: "+91 76543 21098",
      mapLink: "https://maps.google.com/?q=MG+Road,Bangalore",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      hasStock: false,
      hasDelivery: true,
    },
  ];

  return (
    <div className="min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[40rem] overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-left text-gray-900 z-10"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-md font-serif">
              Discover Our Stores
            </h1>
            <p className="text-lg md:text-xl max-w-lg mb-6 drop-shadow-md text-gray-400">
              Step into Laxmi’s world, where heritage meets haute couture. Visit our boutiques for an unforgettable fashion experience.
            </p>
            <a
              href="/stores"
              className="inline-block px-8 py-3 rounded-full font-semibold text-sm sm:text-base bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
              aria-label="Explore our stores"
            >
              Explore Stores
            </a>
          </motion.div>
          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 h-[30rem] md:h-[38rem] flex items-center justify-center "
          >
            <div className="relative w-full h-full">
              <img
                src="/store.png"
                alt="Laxmi Store Showcase"
                className="w-full h-full object-cover object-top rounded-2xl "
                
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-indigo-900/40 rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Store Cards Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 text-center mb-12 drop-shadow-md"
          >
            Our Stores
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stores.map((store, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? 2 : -2 }}
                whileInView={{ opacity: 9, y: 0, rotate: 0 }}
                whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-indigo-200/50 hover:shadow-2xl hover:border-purple-300 transition-all group relative overflow-hidden cursor-pointer"
              >
                <img
                  src={store.img}
                  alt={store.name}
                  loading="lazy"
                  className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-98 transition-transform duration-500"
                />
                <h3 className="text-xl font-semibold text-indigo-900">
                  {store.name}
                </h3>
                <p className="text-gray-600 flex items-center gap-2 mt-2">
                  <span className="text-purple-600">📍</span> {store.address}
                </p>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <span className="text-purple-600">🕐</span> {store.timings}
                </p>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <span className="text-purple-600">☎️</span> {store.contact}
                </p>
                <div className="flex gap-3 mt-3">
                  {store.hasStock && (
                    <span className="text-green-600 text-sm font-medium bg-green-100/80 px-3 py-1 rounded-full shadow-sm">
                      ✅ In Stock
                    </span>
                  )}
                  {store.hasDelivery && (
                    <span className="text-blue-600 text-sm font-medium bg-blue-100/80 px-3 py-1 rounded-full shadow-sm">
                      🚚 Delivery
                    </span>
                  )}
                </div>
                
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-indigo-100 to-purple-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529771-835f59fc5efe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-200/50 p-8 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-6 drop-shadow-md">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Curious about our collections or store experiences? Connect with our team to dive into the artistry of Laxmi fashion.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            className="mt-8 inline-block px-8 py-3 rounded-full font-semibold text-sm sm:text-base bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 shadow-lg animate-pulse-slow"
            aria-label="Contact us"
          >
            Contact Us
          </motion.a>
        </motion.div>
      </section>

      

      {/* Back to Top Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-16 right-4 p-3 rounded-full bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 shadow-lg"
        aria-label="Scroll to top"
      >
        <IoIosArrowDropupCircle size={30} />
      </motion.button>
    </div>
  );
};

export default Stores;