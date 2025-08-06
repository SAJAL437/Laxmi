import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
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
              Connect with Laxmi
            </h1>
            <p className="text-lg md:text-xl max-w-lg mb-6 text-gray-400 drop-shadow-md">
              Reach out to our team for inquiries, styling advice, or to explore our exclusive collections. Let’s bring your fashion vision to life.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact-form"
              className="inline-block px-8 py-3 rounded-full font-semibold text-sm sm:text-base bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 shadow-lg"
              aria-label="Contact us now"
            >
              Contact Now
            </motion.a>
          </motion.div>
          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 h-[30rem] md:h-[35rem] flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <img
                src="/contact.png"
                alt="Laxmi Fashion Contact"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-indigo-900/40 rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-indigo-100 to-purple-100 relative overflow-hidden" id="contact-form">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529771-835f59fc5efe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 text-center mb-12 drop-shadow-md"
          >
            Contact Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-purple-200/50"
            >
              <h3 className="text-xl font-semibold font-serif text-indigo-900 mb-4">
                Send Us a Message
              </h3>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4 p-3 bg-green-100/80 text-green-700 rounded-xl text-center"
                >
                  Message sent successfully! We’ll get back to you soon.
                </motion.div>
              )}
              <div className="space-y-4">
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className={`w-full p-3 rounded-xl border ${errors.name ? "border-red-400" : "border-indigo-200"} focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 bg-white/50 transition-all duration-300`}
                    aria-label="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className={`w-full p-3 rounded-xl border ${errors.email ? "border-red-400" : "border-indigo-200"} focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 bg-white/50 transition-all duration-300`}
                    aria-label="Your email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="relative">
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows="5"
                    className={`w-full p-3 rounded-xl border ${errors.message ? "border-red-400" : "border-indigo-200"} focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 bg-white/50 transition-all duration-300`}
                    aria-label="Your message"
                  ></motion.textarea>
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="w-full px-4 py-2 rounded-full font-semibold text-sm bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 shadow-md relative overflow-hidden"
                  aria-label="Submit contact form"
                >
                  <span className="relative z-10">Submit</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, x: "-50%", y: "-50%" }}
                    whileHover={{ scale: 3 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </motion.div>
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-purple-200/50"
            >
              <h3 className="text-xl font-semibold font-serif text-indigo-900 mb-4">
                Our Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-800"><MdEmail size={25} /></span>
                  <p className="text-gray-600">
                    support@laxmifashion.com
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard("support@laxmifashion.com")}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                    aria-label="Copy email address"
                  >
                  </motion.button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600"><FaPhoneAlt size={25} /></span>
                  <p className="text-gray-600">+91 800 123 4567</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard("+91 800 123 4567")}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                    aria-label="Copy phone number"
                  >
                  </motion.button>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600"><FaLocationDot size={25} /></span>
                  <p className="text-gray-600">
                    Laxmi Style Studio, 456 Connaught Place, New Delhi, DL
                  </p>
                </div>
              </div>
              <div className="mt-6 flex gap-6 justify-center">
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  href="https://twitter.com/laxmifashion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 text-2xl bg-white/20 rounded-full p-2"
                  aria-label="Follow us on Twitter"
                >
                  <GrInstagram/>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  href="https://instagram.com/laxmifashion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 text-2xl bg-white/20 rounded-full p-2"
                  aria-label="Follow us on Instagram"
                >
                  <FaFacebookSquare/>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  href="https://facebook.com/laxmifashion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 text-2xl bg-white/20 rounded-full p-2"
                  aria-label="Follow us on Facebook"
                >
                  <FaTwitter/>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;