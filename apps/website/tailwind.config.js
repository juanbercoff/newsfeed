module.exports = {
  content: [
    'apps/website/pages/**/*.{js,ts,jsx,tsx}',
    'apps/website/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
    },
  },
  plugins: [],
};
