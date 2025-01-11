/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}', "!./node_modules/'*/*"],
  theme: {
    extend: {
      backgroundImage: {
        sky: "url('../images/sky-background.jpg')",
      },
    },
  },
  plugins: [],
};
