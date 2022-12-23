jest.mock('@amplitude/analytics-browser', () => {
  const amplitude = {
    init: jest.fn(),
    logEvent: jest.fn(),
    set: jest.fn(),
    setUserId: jest.fn(),
    setGroup: jest.fn(),
    setMaxQueryStringLength: jest.fn(),
    track: jest.fn(),
    Identify: jest.fn(),
    identify: jest.fn(),
    reset: jest.fn(),
  };

  return amplitude;
});

export {};
