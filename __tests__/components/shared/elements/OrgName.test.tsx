import { render } from '@testing-library/react';
import 'jest-styled-components';
import { OrgName } from '../../../../src/components/shared/elements';

describe('OrgName', () => {
  it('renders a OrgName', () => {
    const { container } = render(<OrgName />);
    const orgName = container.firstChild;

    expect(orgName).toBeInTheDocument();
    expect(orgName).toMatchSnapshot();
  });
});
