import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Contact Section */}
      <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-16 py-10 bg-white">
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 md:space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Drop us a line to get <br /> the conversation <br /> started.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            Please kindly write to us at <br />
            <strong>vaishnavisantoshshinde266@gmail.com</strong> <br />
            or call us on <br />
            <strong>+91 7276310781</strong>
          </p>
          <div className="h-1 w-12 bg-black my-2"></div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 text-2xl text-gray-700">
            <a
              href="https://twitter.com/your_twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter hover:text-blue-500 transition"></i>
            </a>
            <a
              href="https://facebook.com/your_facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f hover:text-blue-700 transition"></i>
            </a>
            <a
              href="mailto:vaishnavi.shinde702@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-envelope hover:text-red-600 transition"></i>
            </a>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:flex w-full md:w-1/2 justify-center">
          <img
            src={assets.coffee}
            alt="Coffee Cup"
            className="w-60 sm:w-72 md:w-[450px] h-auto object-contain animate-float"
          />
        </div>
      </div>

      {/* Testimonials Section - Hidden on Mobile */}
      <div className="hidden md:block pb-14 px-8 md:px-16">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Testimonials</h2>
        <p className="md:text-base text-gray-500 mt-3 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          magni neque in mollitia labore at <br /> inventore sit, corporis alias
          cupiditate!
        </p>
        <div className="grid grid-cols-auto gap-8 mt-14">
          {dummyTestimonial.map((testimonial, index) => (
            <div
              key={index}
              className="text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white"
            >
              <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10 shadow-[0px_4px_15px_0px] shadow-black/5">
                <img
                  className="h-12 w-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <h1 className="text-lg font-medium text-gray-800">{testimonial.name}</h1>
                  <p className="text-gray-800/80">{testimonial.role}</p>
                </div>
              </div>
              <div className="p-5 pb-7">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      className="h-5"
                      src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                      alt="star"
                    />
                  ))}
                </div>
                <p className="text-gray-500 mt-5">{testimonial.feedback}</p>
              </div>
              <a href="#" className="text-blue-500 underline px-5">Read more</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
