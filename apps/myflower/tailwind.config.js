/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                baloo: ["Baloo 2", "cursive"],
                fredoka: ["Fredoka", "cursive"],
                nunito: ["Nunito", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
                roboto: ["Roboto Mono", "monospace"],
            },
        },
    },
    plugins: [],
};
