import { type Config } from 'tailwindcss'

export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      // Ultra-wide monitors and TVs
      uw: { min: '1920px' },
      // desktop
      dk: { min: '1010px', max: '1919px' },
      // tablet
      tb: { min: '512px', max: '1009' },
      // phone
      ph: { min: '320px', max: '511px' },
      // watch
      wt: { max: '319px' },
    },
    extend: {
      backgroundImage: {},
      height: {
        navbar: '100px', // Custom height for the navbar
        'navbar-mobile': '50px',
      },
      width: {
        // section: "83%",
      },
      spacing: {
        navbar: '100px',
        'navbar-mobile': '50px',
      },
    },
  },
  plugins: [],
} satisfies Config & { purge: string[] }
