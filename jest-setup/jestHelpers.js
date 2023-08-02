import '@testing-library/jest-dom/extend-expect';

global.fetch = () => {
  throw new Error('Fetch Unavailable');
};

beforeEach(() => {
  jest.clearAllMocks();
});
