const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: "#000",
      white: "#fff",
      transparent: "#00000000",
      codgray: "#1E1E1E",
      curiousblue: "#1E88E5",
      bluecharcoal: "#020820",
      haiti: "#0A1128",
      bluezodiac: "#0D233F",
      slategray: "#64748B",
      gray: "#6F7784",
      green: "#7EE787",
      salmon: "#FF886A",
      success: "#7EE787",
      warn: "#D88100",
      error: "#FF3636",
      clay: "#23283D",
    },
    screens: {
      'sm': "640px",
      'md': "768px",
      'lg': "1024px",
      'xl': "1280px",
      '2xl': "1536px",
    },
    extend: {},
  },
  fontFamily: {
    koc: ['"Clash Grotesk"', "sans-serif"],
  },
  fontSize: {
    xl: [
      "20px",
      {
        lineHeight: "22px",
      },
    ],
  },
  boxShadow: {
    custom1: "0px 0px 24px 0px #0000003D",
    custom2: "-4px 4px 10px 0px #000000",
    custom_header_top_green: "6px 0px 6px 0px #00000073",
  },
  plugins: [],
};
export default config;
