import React from "react";

const Section4 = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight text-center mb-12 max-w-3xl mx-auto">
        Woven with Exquisite <br /> Craftsmanship
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-[26rem] sm:max-w-[32rem] h-[32rem] sm:h-[38rem] overflow-hidden rounded-3xl shadow-2xl border border-gray-100/30 cursor-pointer transition-all duration-500 hover:shadow-3xl group">
            <img
              src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSEVH0NQ_OjG0n04HPE6rlukaqNkHtBCfIYsRw0i9SFGrsLrzCJyInItQXkQIExf30pizmWL84TYAoUNnZuhR1LtDMSBs6plTD5bPS5P6n4"
              alt="Fashion Showcase"
              className="w-full h-full object-cover object-top rounded-3xl transition-all duration-700 ease-out group-hover:scale-105 group-hover:-rotate-1 group-hover:brightness-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl transition-all duration-500 group-hover:bg-gradient-to-t group-hover:from-indigo-500/20 group-hover:to-transparent" />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative w-full max-w-[26rem] sm:max-w-[32rem] h-[20rem] sm:h-[24rem] mx-auto overflow-hidden rounded-3xl shadow-2xl border border-gray-100/30 transition-all duration-500 hover:shadow-3xl group">
            <img
              src="https://i.pinimg.com/1200x/39/44/99/3944998bbc6aa5bd72fa04957b726050.jpg"
              alt="Fashion Highlight"
              className="w-full h-full object-cover object-top rounded-3xl transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1 group-hover:brightness-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl transition-all duration-500 group-hover:bg-gradient-to-t group-hover:from-indigo-500/20 group-hover:to-transparent" />
          </div>
          <div
            className="relative w-full max-w-[26rem] sm:max-w-[32rem] h-[12rem] sm:h-[14rem] mx-auto rounded-3xl    p-6 flex flex-col justify-center text-center transition-all duration-500  hover:-translate-y-1 group"
            style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
          >
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 tracking-tight group-hover:scale-105 transition-transform duration-300">
              Artisanal Excellence
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mt-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              Experience the fusion of tradition and innovation in every thread.
            </p>
          </div>
        </div>
      </div>

      {/* Keyframes for Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Section4;
