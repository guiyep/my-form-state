module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss|sss|style)$': '<rootDir>/node_modules/jest-css-modules',
    '^@mfs-lib(.*)$': '<rootDir>/src/lib$1',
    '^@mfs-react': '<rootDir>/src/react',
    '^@mfs-react-redux': '<rootDir>/src/react-redux',
    '^@mfs-redux': '<rootDir>/src/redux',
    '^@mfs-registry': '<rootDir>/src/registry',
    '^@mfs-core': '<rootDir>/src/core',
  },
};
