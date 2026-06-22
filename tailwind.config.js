/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#208AEF",
        primaryLight: "#DBEAFE",
        background: "#F8FAFC",
        card: "#FFFFFF",
        text: "#0F172A",
        textSecondary: "#64748B",
        border: "#E2E8F0",
        success: "#22C55E",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};
