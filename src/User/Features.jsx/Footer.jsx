import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            <Link to="/">
              <span className="sr-only">Your Company</span>
              <img
                alt="Your Company Logo"
                src="/logo-Footer.png"
                className="h-12 sm:h-14 w-auto "
              />
            </Link>
          </h2>
          <p className="text-sm leading-relaxed">
            Empowering lives through fashion and technology. Discover your
            unique style with us.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Help Center
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="#"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MyBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
