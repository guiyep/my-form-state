const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias['@mfs-lib'] = path.resolve(__dirname, '../src/lib');
  config.resolve.alias['@mfs-react'] = path.resolve(__dirname, '../src/react');
  config.resolve.alias['@mfs-react-redux'] = path.resolve(__dirname, '../src/react-redux');
  config.resolve.alias['@mfs-redux'] = path.resolve(__dirname, '../src/redux');
  config.resolve.alias['@mfs-registry'] = path.resolve(__dirname, '../src/registry');
  config.resolve.alias['@mfs-core'] = path.resolve(__dirname, '../src/core');
  return config;
};
