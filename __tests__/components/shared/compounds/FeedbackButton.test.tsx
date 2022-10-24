import { screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { FeedbackButton } from '../../../../src/components/shared/compounds/FeedbackButton';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

const renderFeedbackButton = (href: string) => {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  return renderWithTheme(<FeedbackButton href={href} />);
};

describe('FeedbackButton', () => {
  it('should render with href', () => {
    const { container } = renderFeedbackButton('/test/test-link');

    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test/test-link');
    expect(link).toMatchSnapshot();
  });

  it('should render "Give Feedback" button on MouseEnter', () => {
    const { container } = renderFeedbackButton('/test/test-link');

    const target = container.firstChild;
    expect(target).toBeInTheDocument();
    target && fireEvent.mouseEnter(target);

    const dropdown = screen.getByText('Give Feedback');
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toMatchSnapshot();
  });
});
