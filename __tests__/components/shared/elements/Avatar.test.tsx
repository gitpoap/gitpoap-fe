import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Avatar } from '../../../../src/components/shared/elements';

describe('Avatar', () => {
  it('renders an Avatar - default img tag', () => {
    const { container } = render(<Avatar src="https://test.com/image.png" useDefaultImageTag />);
    const avatar = container.firstChild;
    const avatarImg = container.querySelector('img');

    expect(avatar).toBeInTheDocument();
    expect(avatar).toMatchSnapshot();
    /* expect avatar image to have src attribute */
    expect(avatarImg).toHaveAttribute('src', 'https://test.com/image.png');
  });

  it('renders an Avatar - Next Image', () => {
    const { container } = render(<Avatar src="https://test.com/image.png" />);
    const avatar = container.firstChild;

    expect(avatar).toBeInTheDocument();
    expect(avatar).toMatchSnapshot();
  });
});
