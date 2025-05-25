/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "course-details-heading-small": ["26px", "36px"],
        "course-details-heading-large": ["36px", "44px"],
        "home-heading-small": ["28px", "34px"],
        "home-heading-large": ["48px", "56px"], // fixed duplicate key
        default: ["15px", "21px"],
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
      },
      spacing: {
        'section-height': '500px',
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
