// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const { i18n } = require('./next-i18next.config.js');
const path = require('path');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com'],
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localePath: path.resolve('./public/locales'),
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/feed',
        permanent: true,
      },
    ];
  },
};

module.exports = withNx(nextConfig);
