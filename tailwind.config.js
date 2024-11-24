/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "main-blue": "#002561",
        "main-red": "#ed1c23",
        "main-light-blue": "#00afef",
        "kia-main": "#EA0029",
        "kia-sub": "#06141F",
        "samsung-main": "#074CA1",
        "samsung-sub": "#C0C0C0",
        "lg-main": "#a50034",
        "lg-sub": "#000000",
        "doosan-main": "#131230",
        "doosan-sub": "#ED1C24",
        "kt-main": "#000000",
        "kt-sub": "#FF0000",
        "ssg-main": "#ce0e2d",
        "ssg-sub": "#ffb81c",
        "lotte-main": "#D00F31",
        "lotte-sub": "#041E42",
        "hanwha-main": "#FF6600",
        "hanwha-sub": "#020F17",
        "nc-dip-blue": "#071d3d",
        "nc-main": "#1d477d",
        "nc-sub": "#c7a079",
        "kiwoom-main": "#660016",
        "kiwoom-sub": "#ffffff",
      },
      backgroundImage: {
        "ball-park": "url(/ballpark.png)",
      },

      fontFamily: {
        kbo: "KBO-Dia-Gothic_bold",
        s_core: "S-CoreDream-3Light",
        paper_logy: "Paperlogy-8ExtraBold",
      },
    },
  },
  safelist: [
    "text-kia-main",
    "text-kia-sub",
    "text-samsung-main",
    "text-samsung-sub",
    "text-lg-main",
    "text-lg-sub",
    "text-doosan-main",
    "text-doosan-sub",
    "text-kt-main",
    "text-kt-sub",
    "text-ssg-main",
    "text-ssg-sub",
    "text-lotte-main",
    "text-lotte-sub",
    "text-hanwha-main",
    "text-hanwha-sub",
    "text-nc-main",
    "text-nc-sub",
    "text-kiwoom-main",
    "text-kiwoom-sub",
  ],
  plugins: [],
};
