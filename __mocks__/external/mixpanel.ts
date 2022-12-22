jest.mock('mixpanel-browser', () => {
  const mixpanel = {
    init: jest.fn(),
    register: jest.fn(),
    track: jest.fn(),
    track_links: jest.fn(),
  };

  return mixpanel;
});

export {};
