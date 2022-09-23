import { render, screen, fireEvent } from '@testing-library/react';
// import { fireEvent } from '@testing-library/user-event';
import 'jest-styled-components';
import { FeedbackButton } from '../../../../src/components/shared/compounds/FeedbackButton';

const renderFeedbackButton = (href: string) => {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  return render(<FeedbackButton href={href} />);
};

describe('FeedbackButton', () => {
  it('should render with href', () => {
    const { container } = renderFeedbackButton('/tet/test-link');

    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/tet/test-link');
    expect(link).toMatchSnapshot();
  });

  it('should render "Give Feedback" button on MouseEnter', () => {
    const { container } = renderFeedbackButton('/tet/test-link');

    const target = container.firstChild;
    // fireEvent(link, new MouseEvent('mouseenter', {
    //   bubbles: false,
    //   cancelable: false
    // }));
    expect(target).toBeInTheDocument();
    target && fireEvent.mouseEnter(target);

    const dropdown = screen.getByText('Give Feedback');
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toMatchSnapshot();
  });
});
