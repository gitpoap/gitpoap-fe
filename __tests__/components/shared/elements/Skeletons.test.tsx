import { render } from '@testing-library/react';
import 'jest-styled-components';
import {
  BaseSkeleton,
  POAPBadgeSkeleton,
  ProfileImageSkeleton,
  TextSkeleton,
} from '../../../../src/components/shared/elements';

describe('Skeletons', () => {
  describe('BaseSkeleton', () => {
    it('renders a BaseSkeleton', () => {
      const { container } = render(<BaseSkeleton />);
      const skeleton = container.firstChild;

      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toMatchSnapshot();
    });
  });

  describe('POAPBadgeSkeleton', () => {
    it('renders a POAPBadgeSkeleton', () => {
      const { container } = render(<POAPBadgeSkeleton />);
      const skeleton = container.firstChild;

      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toMatchSnapshot();
    });
  });

  describe('ProfileImageSkeleton', () => {
    it('renders a ProfileImageSkeleton', () => {
      const { container } = render(<ProfileImageSkeleton />);
      const skeleton = container.firstChild;

      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toMatchSnapshot();
    });
  });

  describe('TextSkeleton', () => {
    it('renders a TextSkeleton', () => {
      const { container } = render(<TextSkeleton />);
      const skeleton = container.firstChild;

      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toMatchSnapshot();
    });
  });
});
