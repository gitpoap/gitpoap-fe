import { screen } from '@testing-library/react';
import 'jest-styled-components';
import { rem } from 'polished';
import { DarkGray, PrimaryBlue, TextGray, White } from '../../../../src/colors';
import { Button } from '../../../../src/components/shared/elements';
import { customRender } from '../../../../src/lib/testUtils';

describe('Button', () => {
  it('renders a button', () => {
    customRender(<Button>Button</Button>);
    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toHaveTextContent('Button');
    expect(button).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });

  it('renders a button correctly with variant - filled', () => {
    customRender(<Button variant="filled">Button</Button>);
    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toHaveStyle(`background-color: ${PrimaryBlue}`);
    expect(button).toHaveStyle(`color: ${White}`);
    expect(button).toMatchSnapshot();
  });

  it('renders a button correctly with variant - outlined', () => {
    customRender(<Button variant="outline">Button</Button>);
    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toHaveStyle(`background-color: transparent`);
    expect(button).toHaveStyle(`border-color: ${TextGray}`);
    expect(button).toHaveStyle(`border-width: ${rem(2)}`);
    expect(button).toHaveStyle(`color: ${White}`);
    expect(button).toMatchSnapshot();
  });

  it('has the correct styles when disabled', () => {
    customRender(
      <Button disabled variant="filled">
        Button
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Button' });

    expect(button).toBeDisabled();
    expect(button).toMatchSnapshot();

    expect(button).toHaveStyle(`background-color: ${DarkGray}`);
    expect(button).toBeDisabled();
  });
});
