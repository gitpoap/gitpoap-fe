// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import '__mocks__/external/amplitude';
import '__mocks__/external/privy';

/* Mock out the slack client for ALL tests */
jest.mock('__mocks__/external/amplitude');
jest.mock('__mocks__/external/privy');
