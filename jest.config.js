const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './'
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
};

module.exports = createJestConfig(customJestConfig);
