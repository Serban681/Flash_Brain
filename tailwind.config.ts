import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'black': "var(--black)",
        'white': "var(--white)",
        'blue': "var(--blue)",
        'blue-light': "var(--light-blue)",
        'green': "var(--green)",
        'green-light': "var(--light-green)",
        'black-light': "var(--light-black)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        fredoka: ["var(--font-fredoka)", ...fontFamily.sans],
        josefin: ["var(--font-josefin)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
