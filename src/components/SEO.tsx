import Head from 'next/head';

type SEOProps = {
  title: string;
  description: string;
  image: string;
  url: string;
};

export const SEO = ({ title, description, image, url }: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta key="description" name="description" content={description} />

      {/* <!-- Metadata for link cards --> */}
      <meta key="og:site_name" property="og:site_name" content="GitPOAP " />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:image" property="og:image" content={image} />
      <meta key="og:image:type" property="og:image:type" content="image/png" />
      <meta key="og:image:width" property="og:image:width" content="256" />
      <meta key="og:image:height" property="og:image:height" content="256" />
      <meta key="og:description" property="og:description" content={description} />

      <meta key="twitter:card" property="twitter:card" content="summary" />
      <meta key="twitter:url" property="twitter:url" content={url} />
      <meta key="twitter:title" property="twitter:title" content={title} />
      <meta key="twitter:description" property="twitter:description" content={description} />
      <meta key="twitter:image" property="twitter:image" content={image} />
    </Head>
  );
};
