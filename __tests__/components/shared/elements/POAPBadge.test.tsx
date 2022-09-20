import { render } from '@testing-library/react';
import 'jest-styled-components';
import { POAPBadge } from '../../../../src/components/shared/elements';

const renderBadge = (isFeatured: boolean, isFeaturedLoading: boolean, showHeart: boolean, poapTokenId?: string,) => {
  return render(
    <POAPBadge
      imgSrc="https://poap.gallery/static/media/test_gitpoap.1b1b1b1b.png"
      href={"https://gitpoap.io"}
      isFeatured={isFeatured}
      isFeaturedLoading={isFeaturedLoading}
      name={"test poap"}
      poapTokenId={poapTokenId}
      showHeart={showHeart}
    />,
  );
};

describe('POAPBadge', () => {
  describe('heart', () => {
    it('renders a POAPBadge without a heart', () => {
      const { container } = renderBadge(false, false, false);
      const poapBadge = container.firstChild;

      expect(poapBadge).toBeInTheDocument();
      expect(poapBadge).toMatchSnapshot();
    });
    it('renders a POAPBadge with a heart', () => {
      const { container } = renderBadge(false, false, true, 'poapTokenId');
      const poapBadge = container.firstChild;

      expect(poapBadge).toBeInTheDocument();
      expect(poapBadge).toMatchSnapshot();
    });
  });
  describe('isFeatured', () => {
    it('renders a POAPBadge with isFeatured = true', () => {
      const { container } = renderBadge(true, false, true, 'poapTokenId');
      const poapBadge = container.firstChild;

      expect(poapBadge).toBeInTheDocument();
      expect(poapBadge).toMatchSnapshot();
    });
    it('renders a POAPBadge with isFeatured = false', () => {
      const { container } = renderBadge(false, false, true, 'poapTokenId');
      const poapBadge = container.firstChild;

      expect(poapBadge).toBeInTheDocument();
      expect(poapBadge).toMatchSnapshot();
    });
  });
  describe('isFeaturedLoading', () => {
    it('renders a POAPBadge with isFeaturedLoading = true', () => {
      const { container } = renderBadge(true, true, true, 'poapTokenId');
      const poapBadge = container.firstChild;

      expect(poapBadge).toBeInTheDocument();
      expect(poapBadge).toMatchSnapshot();
    });
    it('renders a POAPBadge with isFeaturedLoading = false', () => {
      const { container } = renderBadge(true, false, true, 'poapTokenId');
      const poapBadge = container.firstChild;

      expect(poapBadge).toBeInTheDocument();
      expect(poapBadge).toMatchSnapshot();
    });
  });
});
