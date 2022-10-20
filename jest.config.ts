import { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  /* Provide the path to your Next.js app to load next.config.js and .env files in your test environment */
  dir: './',
});

const namespacesToTransform = ['preact', '@ensdomains', 'multiformats', '@walletconnect'];

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
const customJestConfig: Config = {
  verbose: true,
  rootDir: './',
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  /* Add more setup options before each test is run */
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  /* if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work */
  moduleDirectories: ['node_modules', '<rootDir>/'],
  /* test any .test file in any `__tests__` directory, ignore cypress .spec files */
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+test.[jt]s?(x)'],
  transformIgnorePatterns: [`node_modules/(?!(${namespacesToTransform.join('|')})/)`],
  clearMocks: true,
  testPathIgnorePatterns: ['/.next/', '/node_modules/', '/__tests__/__utils__/'],
};

/*
 * createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
 * module.exports = createJestConfig(customJestConfig);
 */
const asyncConfig = createJestConfig(customJestConfig);

module.exports = async () => {
  const config = await asyncConfig();
  /*
   * IMPORTANT: next/jest ignores node_modules and allows to add more ignore patterns, but
   * we need to override them fully to whitelist some node_modules.
   * See: https://github.com/vercel/next.js/blob/canary/packages/next/build/jest/jest.ts
   */
  config.transformIgnorePatterns = customJestConfig.transformIgnorePatterns;

  return config;
};
