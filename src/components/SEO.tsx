import React from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';
interface Prop {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  keywords?: [string];
}

export const SEO = ({
  title,
  description,
  image,
  pathname,
  children,
  keywords,
}: Prop) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    ogImage: defaultImage,
    siteUrl,
    keywords: defaultKeywords,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`,
    url: `${siteUrl}${pathname || ``}`,
    keywords: keywords ? keywords.join(`, `) : defaultKeywords.join(`, `),
  };
  return (
    <>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta property="fb:app_id" content="293772252484025" />
      <meta name="apple-mobile-web-app-title" content="Gautam Naik" />
      <meta name="application-name" content="Gautam Naik" />
      <meta name="msapplication-TileColor" content="#4BACFE" />
      <meta name="revisit-after" content="1 days" />
      <meta name="author" content="Gautam Naik" />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="Gautam Naik" />
      <meta property="og:url" content={seo.url} />

      <meta name="robots" content="all" />
      <meta name="googlebot" content="all" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="gautamnaik.com" />
      <meta property="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {children}
    </>
  );
};

export default SEO;
