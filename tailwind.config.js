/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-60': 'repeat( auto-fit, minmax(15rem, 1fr) )',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/line-clamp')],
};
