import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-100 w-full py-6 px-4 text-center mt-10">
      {/* Social Icons */}
      <div className="flex justify-center gap-6 mb-4 text-gray-800 text-2xl">
        <a
          href="https://shorturl.at/7HaoK"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-f hover:text-blue-600 transition duration-200"></i>
        </a>
        <a
          href="https://shorturl.at/8RI33"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram hover:text-pink-500 transition duration-200"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin-in hover:text-blue-700 transition duration-200"></i>
        </a>
        <a
          href="https://t.me/your_telegram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-telegram-plane hover:text-blue-500 transition duration-200"></i>
        </a>
        <a
          href="mailto:vaishnavishinde@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-envelope hover:text-red-600 transition duration-200"></i>
        </a>
      </div>

      {/* Footer Links */}
      <div className="text-sm text-gray-700 flex flex-wrap justify-center gap-4 mb-3">
        <a href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="/terms-of-use" className="hover:underline">
          Terms of Use
        </a>
        <a href="/contact-us" className="hover:underline">
          Contact Us
        </a>
        <a href="/refund-policy" className="hover:underline">
          Refund Policy
        </a>
      </div>

      {/* Copyright */}
      <p className="text-sm text-gray-600">
        © 2025 Vaishnavi. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
