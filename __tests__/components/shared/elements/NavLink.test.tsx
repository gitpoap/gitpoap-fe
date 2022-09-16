import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { NavLink } from '../../../../src/components/shared/elements';

describe('NavLink', () => {
  it('renders an NavLink', () => {
    render(<NavLink href="/repos">{'Repos'}</NavLink>);
    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/repos');
    expect(link).toHaveTextContent('Repos');

    expect(link).toBeInTheDocument();
    expect(link).toMatchSnapshot();
  });
});
