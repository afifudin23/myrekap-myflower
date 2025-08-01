/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                nunito: ["Nunito", "sans-serif"],
                fredoka: ["Fredoka", "sans-serif"],
            },
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
