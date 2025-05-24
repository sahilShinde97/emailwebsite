import React from "react";
import { assets } from "../../assets/assets";

const PersonalHero = () => {
  return (
    <section className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center px-6 md:px-24 py-10">
      {/* Left - Text Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 md:space-y-6">
        <h1 className="text-4xl md:text-7xl font-semibold text-gray-900 leading-tight">
          Vaishnavi Shinde
        </h1>

        <p className="text-2xl md:text-2xl text-gray-700 font-medium">
          Founder | Speaker | Digital Educator
        </p>

        <p className="text-lg md:text-2xl text-gray-500 italic">
          let's learn !
        </p>

        {/* Social Media Icons - Centered */}
        <div className="flex gap-6 justify-center text-gray-700 text-3xl pt-2">
          <a
            href="https://www.instagram.com/digital_vaishnavi.70?igsh=MTZkaTRrdmZlcHg0NA%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram hover:text-pink-600 transition"></i>
          </a>
          <a
            href="https://www.facebook.com/people/Vaishnavi-Shinde/100086596443554/?rdid=141RoySakAB9Vhmm&share_url=https%253A%252F%252Fwww.facebook.com%252Fshare%252F19vVdhRQZK%252F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f hover:text-blue-600 transition"></i>

          </a>
          <a
            href="https://youtube.com/@your_youtube_channel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube hover:text-red-600 transition"></i>
          </a>
        </div>
      </div>

      {/* Right - Image Section */}
      <div className="flex-1 mt-10 md:mt-0 flex justify-center">
        <img
          src={assets.vaishnavi_img0}
          alt="Vaishnavi Shinde"
          className="w-[320px] md:w-[720px] h-auto rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.70)] object-cover"
        />
      </div>
    </section>
  );
};

export default PersonalHero;
