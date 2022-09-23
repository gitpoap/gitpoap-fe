import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { Link } from '../../../../src/components/shared/compounds/Link';

const renderLink = () => {
  return render(
    <Link href={'/test/test-link'} target={'_blank'} rel={'test-rel'}>
      <div>{'test'}</div>
    </Link>,
  );
};

describe('Link', () => {
  it('should render link with href', () => {
    renderLink();

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('href', '/test/test-link');
    expect(link).toHaveAttribute('rel', 'test-rel');
    expect(link).toHaveTextContent('test');
    expect(link).toMatchSnapshot();
  });
});
