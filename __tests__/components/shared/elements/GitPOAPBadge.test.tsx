import 'jest-styled-components';
import { GitPOAPBadge, Sizes } from '../../../../src/components/shared/elements';
import { Level } from '../../../../src/types';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

const renderBadge = (size: Sizes, level?: Level, href?: string) => {
  return renderWithTheme(
    <GitPOAPBadge
      size={size}
      level={level}
      href={href}
      imgUrl="https://poap.gallery/static/media/test_gitpoap.1b1b1b1b.png"
      altText="test_gitpoap"
    />,
  );
};

describe('GitPOAPBadge', () => {
  describe('href', () => {
    it('renders an GitPOAPBadge without href', () => {
      const { container } = renderBadge('md');
      const badge = container.firstChild;

      expect(badge).not.toHaveAttribute('href');
      expect(badge).toBeInTheDocument();
      expect(badge).toMatchSnapshot();
    });

    it('renders correct with href', () => {
      const { container } = renderBadge('md', undefined, '/repos');
      const badge = container.firstChild;

      expect(badge).toHaveAttribute('href', '/repos');
      expect(badge).toBeInTheDocument();
      expect(badge).toMatchSnapshot();
    });
  });

  describe('size', () => {
    it('renders correctly for size = xxxs', () => {
      const { container } = renderBadge('xxxs');
      const badge = container.firstChild;

      expect(badge).toBeInTheDocument();
      expect(badge).toMatchSnapshot();
    });
    it('renders correctly for size = xxs', () => {
      const { container } = renderBadge('xxs');
      const badge = container.firstChild;

      expect(badge).toBeInTheDocument();
      expect(badge).toMatchSnapshot();
    });
    it('renders correctly for size = xs', () => {
      const { container } = renderBadge('xs');
      const badge = container.firstChild;

      expect(badge).toBeInTheDocument();
      expect(badge).toMatchSnapshot();
    });
    it('renders correctly for size = sm', () => {
      const { container } = renderBadge('sm');
      const badge = container.firstChild;

      expect(badge).toBeInTheDocument();
      expect(badge).toMatchSnapshot();
    });
    it('renders correctly for size = md', () => {
      const { container } = renderBadge('md');
      const badge = container.firstChild;

      expect(badge).toBeInTheDocument();
      expect(badge).toMatchSnapshot();
    });
    it('renders correctly for size = lg', () => {
      const { container } = renderBadge('lg');
      const badge = container.firstChild;

      expect(badge).toBeInTheDocument();
      expect(badge).toMatchSnapshot();
    });
  });

  describe('level', () => {
    it('renders correctly for level = bronze', () => {
      const { container } = renderBadge('md', 'bronze');
      const badge = container.firstChild;

      expect(badge).toBeInTheDocument();
      expect(badge).toMatchSnapshot();
    });
    it('renders correctly for level = silver', () => {
      const { container } = renderBadge('md', 'silver');
      const badge = container.firstChild;

      expect(badge).toBeInTheDocument();
      expect(badge).toMatchSnapshot();
    });
    it('renders correctly for level = gold', () => {
      const { container } = renderBadge('md', 'gold');
      const badge = container.firstChild;

      expect(badge).toBeInTheDocument();
      expect(badge).toMatchSnapshot();
    });
  });
});
