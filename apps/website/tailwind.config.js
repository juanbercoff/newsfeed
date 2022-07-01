module.exports = {
  content: [
    'apps/website/pages/**/*.{js,ts,jsx,tsx}',
    'apps/website/components/**/*.{js,ts,jsx,tsx}',
    'apps/website/screens/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1254px',
      // => @media (min-width: 1254px) { ... },
      xl: '1480px',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
