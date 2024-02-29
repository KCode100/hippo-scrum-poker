import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "secondary-color": "var(--secondary-color)",
        "hippo-brand-grey": "var(--hippo-brand-grey)",
        "hippo-brand-green": "var(--hippo-brand-green)",
        "hippo-brand-navy": "var(--hippo-brand-navy)",
        "hippo-brand-purple": "var(--hippo-brand-purple)",
        "hippo-brand-light-green": "var(--hippo-brand-light-green)",
        "hippo-brand-light-blue": "var(--hippo-brand-light-blue)",
        "hippo-brand-pink": "var(--hippo-brand-pink)",
        "hippo-brand-yellow": "var(--hippo-brand-yellow)",
      },
    },
  },
  plugins: [],
};
export default config;
