// mock browser functions
window.scrollTo = () => {};

// localStorage mock
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

// disallow warnings and errors in tests
const consoleError = global.console.error;
const consoleWarning = global.console.warn;

global.console.error = (message, ...rest) => {
  consoleError.apply(this, [message, ...rest]);
  if (message.startsWith("Warning:")) {
    throw new Error(`Unexpected React ${message}`);
  }
};

global.IntersectionObserver = class IntersectionObserver {
  observe() {
    return null;
  }

  disconnect() {
    return null;
  }

  unobserve() {
    return null;
  }
};
global.ResizeObserver = class ResizeObserver {
  observe() {
    return null;
  }

  disconnect() {
    return null;
  }

  unobserve() {
    return null;
  }
};

global.console.warn = (message, ...rest) => {
  consoleWarning.apply(this, [message, ...rest]);

  if (message.startsWith("Warning:")) {
    throw new Error(`Unexpected React ${message}`);
  }
};
