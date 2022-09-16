import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { Input } from '../../../../src/components/shared/elements';

describe('Input', () => {
  it('renders an Input', async () => {
    const spy = jest.fn();

    const { container } = render(<Input onChange={spy} value="" placeholder="placeholder text" />);
    const inputWrapper = container.firstChild;
    expect(inputWrapper).toMatchSnapshot();

    const input = screen.getByRole('textbox');
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'placeholder text');

    await userEvent.type(screen.getByRole('textbox'), 'test-value');
    expect(spy).toHaveBeenCalled();
  });
});
