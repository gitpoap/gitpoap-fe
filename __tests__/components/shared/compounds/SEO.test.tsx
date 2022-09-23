import { render } from '@testing-library/react';
import 'jest-styled-components';
import { SEO } from '../../../../src/components/shared/compounds/SEO';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

const renderSEO = () => {
  return render(
    <SEO
      title={'test-title'}
      description={'test-description'}
      image={'/test/test.png'}
      url={'/test/test-link'}
    />,
    {
      container: document.head,
    },
  );
};

describe('SEO', () => {
  it('should render with title, description, image and url', () => {
    const { container, baseElement } = renderSEO();
    const seo = baseElement.parentElement?.firstChild as HTMLHeadElement;
    expect(seo).toMatchSnapshot();

    // const title = screen.getByText('test-title')

    const title = seo.querySelector('title');
    expect(title).toBeInTheDocument();
    expect(title).toMatchSnapshot();

    const metaDescription = seo.querySelector('meta[property="og:description"]');
    expect(metaDescription).toBeInTheDocument();
    expect(metaDescription).toHaveAttribute('content', 'test-description');
    expect(metaDescription).toMatchSnapshot();

    const metaTitle = seo.querySelector('meta[property="og:title"]');
    expect(metaTitle).toBeInTheDocument();
    expect(metaTitle).toHaveAttribute('content', 'test-title');
    expect(metaTitle).toMatchSnapshot();

    const metaUrl = seo.querySelector('meta[property="og:url"]');
    expect(metaUrl).toBeInTheDocument();
    expect(metaUrl).toHaveAttribute('content', '/test/test-link');
    expect(metaUrl).toMatchSnapshot();

    const metaImage = seo.querySelector('meta[property="og:image"]');
    expect(metaImage).toBeInTheDocument();
    expect(metaImage).toHaveAttribute('content', '/test/test.png');
    expect(metaImage).toMatchSnapshot();
  });
});
