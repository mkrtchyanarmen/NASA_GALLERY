const { resolve } = require('path');

module.exports = {
  displayName: '@package/metadata',

  moduleNameMapper: {
    '\\/(css)$': 'identity-obj-proxy',
    '\\/css/(.*)$': 'identity-obj-proxy',
    '\\.svg': resolve(__dirname, './jest-setup/svgMock.js'),
    '^.+\\.(png|jpg|gif|ttf|eot)$': resolve(__dirname, './jest-setup/fileMock.js'),
    '^d3-(.*)$': `d3-$1/dist/d3-$1`,
  },

  setupFilesAfterEnv: ['./jest-setup/jestHelpers.js'],

  setupFiles: ['./jest-setup/setupTests.js'],

  transformIgnorePatterns: [resolve(__dirname, './node_modules/(?!deshe-swiper|ssr-window|dom7)')],

  testEnvironment: 'jsdom',
};
