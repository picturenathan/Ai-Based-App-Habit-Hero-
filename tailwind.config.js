/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind which files to scan for class names
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // App brand colors
        brand: {
          bg: "#0f0f23",        // deep navy background
          card: "#1a1a35",      // card background
          accent: "#7c3aed",    // purple accent
          gold: "#f59e0b",      // XP gold
        },
        // Category colors
        chores: {
          DEFAULT: "#f59e0b",   // amber
          bg: "#1f1500",
          light: "#fef3c7",
        },
        fitness: {
          DEFAULT: "#22c55e",   // green
          bg: "#001a0d",
          light: "#dcfce7",
        },
        learning: {
          DEFAULT: "#3b82f6",   // blue
          bg: "#000d1f",
          light: "#dbeafe",
        },
        selfcare: {
          DEFAULT: "#ec4899",   // pink
          bg: "#1f0011",
          light: "#fce7f3",
        },
      },
    },
  },
  plugins: [],
};
