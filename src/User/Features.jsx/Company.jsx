import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { IoIosArrowDropupCircle } from "react-icons/io";

const Company = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const milestones = [
    {
      year: "2015",
      event:
        "Laxmi ignited its journey in a bustling Mumbai workshop, where a tight-knit team of artisans fused India’s vibrant textile traditions with bold, modern designs, laying the foundation for a fashion revolution rooted in authenticity.",
      icon: "✨",
    },
    {
      year: "2018",
      event:
        "Joyously crossed the milestone of serving over 10,000 customers across India, weaving a tapestry of trust and style with bespoke designs that resonated from urban hubs to rural heartlands.",
      icon: "❤️",
    },
    {
      year: "2020",
      event:
        "Crowned with the Best Emerging Fashion Brand at the National Fashion Awards, celebrated for trailblazing sustainable designs and uplifting artisans, marking Laxmi as a beacon of innovation.",
      icon: "🏆",
    },
    {
      year: "2023",
      event:
        "Soared onto the global stage, launching in the USA, UK, and UAE, sharing Laxmi’s unique blend of heritage and contemporary flair with fashion lovers from London to Dubai.",
      icon: "🌍",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[40rem] sm:h-[44rem] md:h-[40rem] overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-16 mt-10 lg:mt-0">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-left text-gray-800 z-10"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold font-serif mb-4 tracking-tight">
              Laxmi
            </h1>
            <p className="text-md md:text-xl max-w-lg mb-6 text-gray-400">
              Since 2015, Laxmi has woven India’s vibrant heritage into
              breathtaking fashion, blending artisanal craftsmanship with bold,
              contemporary elegance to inspire confidence and individuality
              worldwide.
            </p>
            <a
              href="/shop"
              className="inline-block px-8 py-3 transform hover:scale-105 rounded-2xl font-semibold text-sm sm:text-base bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-600 animate-pulse-slow"
            >
              Discover Our Collection
            </a>
          </motion.div>
          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 h-full flex items-center justify-center "
          >
            <div className="relative w-full h-[18rem] sm:h-[25rem]  md:h-[32rem] cursor-pointer transition-all duration-1000 animate-pulse-slow hover:scale-98 sm:mb-10 ">
              <img
                src="/bg.png"
                alt="Laxmi Fashion Showcase"
                className="w-full h-full object-cover object-top rounded-xl  "
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/30 rounded-xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold font-serif text-gray-800 mb-6">
            Our Story
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Founded in 2015, Laxmi began as a small family venture with a dream
            to redefine fashion. By blending traditional craftsmanship with
            contemporary designs, we deliver affordable, authentic pieces that
            empower individuality. Our mission is to inspire confidence through
            style, guided by our core values of quality, integrity, and
            sustainability.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/women/clothing/mens_kurta"
              className="border px-4 py-2 w-fit rounded-2xl font-semibold font-serif text-sm sm:text-base bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 animate-pulse-slow"
            >
              Shop Now
            </a>
            <a
              href="/contact"
              className="border px-4 py-2 w-fit rounded-2xl font-semibold font-serif text-sm sm:text-base bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 animate-pulse-slow"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </section>

      {/* Team Section with Glassmorphism */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold font-serif text-gray-800 text-center mb-12"
          >
            Meet Our Visionaries
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sajal Tiwari",
                role: "Founder & CEO",
                img: "/lead.jpg",
                bio: "Sajal’s vision fuels Laxmi’s pursuit of excellence in fashion and sustainability.",
              },
              {
                name: "Arjun Patel",
                role: "Lead Designer",
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
                bio: "Arjun crafts designs that marry tradition with modern elegance.",
              },
              {
                name: "Jhoe Rao",
                role: "Operations Manager",
                img: "/OpM.png",
                bio: "Jhoe ensures every order is delivered with precision and care.",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white/30 backdrop-blur-lg rounded-xl shadow-lg p-6 text-center border border-white/20"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold font-serif text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-400 font-serif font-bold">
                  {member.role}
                </p>
                <p className="text-gray-600 mt-2">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section with Diagonal Ribbon Timeline */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 bg-gradient-to-b from-indigo-50 to-purple-50 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold font-serif text-gray-800 text-center mb-8 sm:mb-12"
          >
            Our Journey
          </motion.h2>
          <div className="relative">
            {/* Diagonal Ribbon Timeline */}
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ rotate: index % 2 === 0 ? 3 : -3, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className={`mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-center w-full ${
                  index % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full sm:w-5/12 mb-4 sm:mb-0"></div>
                <div className="w-full sm:w-2/12 flex justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-lg sm:text-xl ring-4 ring-indigo-100">
                    {milestone.icon}
                  </div>
                </div>
                <div className="w-full sm:w-5/12">
                  <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border border-indigo-100">
                    <h3 className="text-base sm:text-lg font-semibold font-serif text-gray-800">
                      {milestone.year}
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
                      {milestone.event}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USP Section with Carousel Effect */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold font-serif text-gray-800 text-center mb-12"
          >
            Why Choose Laxmi
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Lightning-Fast Delivery",
                desc: "Receive your orders in 2-3 days with our express shipping.",
                icon: "🚚",
              },
              {
                title: "Ethical Craftsmanship",
                desc: "We partner with local artisans to ensure fair wages and sustainable practices.",
                icon: "🌿",
              },
              {
                title: "Affordable Luxury",
                desc: "Premium fashion at prices that make style accessible to all.",
                icon: "💸",
              },
            ].map((usp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-100 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{usp.icon}</div>
                <h3 className="text-xl font-semibold font-serif text-gray-800">
                  {usp.title}
                </h3>
                <p className="text-gray-600 mt-2">{usp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-indigo-50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold font-serif text-gray-800 mb-6">
            Sustainability at Heart
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Laxmi, we’re committed to fashion that respects the planet. From
            eco-friendly materials to waste-reducing production, we partner with
            artisans to create a sustainable future while uplifting local
            communities.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block px-8 py-3 hover:bg-indigo-700 transform hover:scale-105 rounded-2xl font-semibold font-serif text-sm sm:text-base bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 animate-pulse-slow"
          >
            Explore Our Impact
          </a>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold font-serif text-gray-800 text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {[
              {
                q: "What is Laxmi’s return policy?",
                a: "We offer a 30-day hassle-free return policy for all unworn items.",
              },
              {
                q: "How do you ensure ethical sourcing?",
                a: "We work directly with artisans, ensuring fair wages and sustainable materials.",
              },
              {
                q: "Do you ship internationally?",
                a: "Yes, we ship to over 50 countries with tracked delivery.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-100 rounded-xl p-4"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left text-lg font-semibold text-gray-800 flex justify-between items-center"
                >
                  {faq.q}
                  <span>{faqOpen === index ? "−" : "+"}</span>
                </button>
                {faqOpen === index && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 mt-2"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold font-serif text-gray-800 mb-6">
            Built with Innovation
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform, powered by Spring Boot, React, Tailwind CSS, and
            MySQL, delivers a seamless, responsive shopping experience across
            all devices.
          </p>
        </motion.div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-16 z-10 right-4 bg-indigo-600 p-2 shadow-lg hover:bg-indigo-700 transform hover:scale-110 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-gray-950 to-gray-700 text-gray-100 cursor-pointer hover:from-gray-800 hover:to-gray-500 transition-all duration-300 animate-pulse-slow"
      >
        <IoIosArrowDropupCircle size={30} />
      </button>
    </div>
  );
};

export default Company;
