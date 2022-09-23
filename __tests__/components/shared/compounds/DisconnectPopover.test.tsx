import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { DisconnectPopover } from '../../../../src/components/shared/compounds/DisconnectPopover';

const target = <button>{'target-button'}</button>;
const icon = <img src="/test/test.png" />;

const renderDisconnectPopover = (isOpen: boolean) => {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  return render(
    <DisconnectPopover
      isOpen={isOpen}
      setIsOpen={() => {}}
      target={target}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      handleOnClick={() => {}}
      onClose={() => {}}
      icon={icon}
      buttonText={'dropdown-button'}
      isHovering={false}
    />,
  );
};

describe('DisconnectPopover', () => {
  it('should render target', () => {
    renderDisconnectPopover(false);

    const targetButton = screen.getByRole('button', { name: 'target-button' });
    expect(targetButton).toBeInTheDocument();
    expect(targetButton).toHaveTextContent('target-button');
    expect(targetButton).toMatchSnapshot();
  });

  it('should render dropdown', () => {
    renderDisconnectPopover(true);

    const dropdownButton = screen.getByRole('button', { name: 'dropdown-button' });
    expect(dropdownButton).toBeInTheDocument();
    expect(dropdownButton).toHaveTextContent('dropdown-button');
    expect(dropdownButton).toMatchSnapshot();
  });
});
