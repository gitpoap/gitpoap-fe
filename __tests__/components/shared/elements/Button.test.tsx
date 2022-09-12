import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { rem } from 'polished';
import { DarkGray, PrimaryBlue, TextGray } from '../../../../src/colors';
import { Button } from '../../../../src/components/shared/elements';

describe('Button', () => {
  it('renders a button', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toHaveTextContent('Button');
    expect(button).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });

  it('renders a button correctly with variant - filled', () => {
    render(<Button variant="filled">Button</Button>);
    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toHaveStyleRule('background-color', PrimaryBlue);
    expect(button).toHaveStyleRule('border', 'none');
    expect(button).toHaveStyleRule('color', 'white');
    expect(button).toMatchSnapshot();
  });

  it('renders a button correctly with variant - outlined', () => {
    render(<Button variant="outline">Button</Button>);
    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toHaveStyleRule('background-color', 'transparent');
    expect(button).toHaveStyleRule('border', `${rem(2)} solid ${TextGray}`);
    expect(button).toHaveStyleRule('color', 'white');
    expect(button).toMatchSnapshot();
  });

  it('has the correct styles when disabled', () => {
    render(
      <Button disabled variant="filled">
        Button
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toBeDisabled();
    expect(button).toMatchSnapshot();

    expect(button).toHaveStyleRule('background-color', DarkGray, {
      modifier: '&:disabled',
    });
  });

  test('onClick works as intended', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Button</Button>);
    const button = screen.getByRole('button', {
      name: 'Button',
    });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
