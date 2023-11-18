import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'black': "var(--black)",
        'white': "var(--white)",
        'yellow': "var(--yellow)",
        'blue': "var(--blue)",
        'blue-light': "var(--light-blue)",
        'green': "var(--green)",
        'green-light': "var(--light-green)",
        'black-light': "var(--light-black)",
        'yellow-dark': "var(--dark-yellow)",
        'green-dark': "var(--dark-green)",
        'black-dark': "var(--dark-black)",
      },
      boxShadow: {
        'default': "0.3rem 0.3rem 0.3rem rgba(0, 0, 0, 0.15)"
      },
      fontFamily: {
        'fredoka': ['Fredoka', 'sans-serif'],
        'josefin': ['Josefin Sans', 'sans-serif'],
      },

    },
  },
  plugins: [],
} satisfies Config;
