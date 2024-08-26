/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "Lic-Blue":"#00417c",
        "Lic-Yellow":"#f9d74b"
      },
      outlineColor:{
        "Lic-Yellow":"#f9d74b",
        "Lic-Blue":"#00417c"
      }
    },
  },
  plugins: [],
}
