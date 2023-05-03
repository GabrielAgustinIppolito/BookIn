module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5A7F40",
          secondary: "#BFE7A1",
          accent: "#DBAF36",
          neutral: "#fed7aa",
          "base-100": "#F6EDD9",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#C0564B",
          fontFamily: {
            'sans': ['Berkshire Swash', "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
          }
        },
      },
    ],
  },
};
