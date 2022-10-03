import { render, screen } from '@testing-library/react';
import Admin from '../../../src/pages/admin';

describe('Admin Page', () => {
  it('renders the Admin List', () => {
    const { container } = render(<Admin />);
    const adminPage = container.firstChild;

    const createGitpoapsItems = screen.getAllByText(/Create GitPOAPs/);
    const claimsDashboardItem = screen.getByText(/Claims Dashboard/i);
    const reposDashboardItem = screen.getByText(/Repos Dashboard/i);
    const vitalsDashboardItem = screen.getByText(/Vitals Dashboard/i);

    for (const item of createGitpoapsItems) {
      expect(item).toBeInTheDocument();
    }

    expect(claimsDashboardItem).toBeInTheDocument();
    expect(reposDashboardItem).toBeInTheDocument();
    expect(vitalsDashboardItem).toBeInTheDocument();

    expect(adminPage).toMatchSnapshot();
  });
});
