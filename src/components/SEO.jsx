import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, type = 'website' }) => {
  // Default values
  const defaultTitle = 'Rafi Hermawan - Cloud Computing & Backend Developer';
  const defaultDescription = 'Portfolio of Rafi Hermawan, a Cloud Computing specialist and Backend Developer with expertise in Google Cloud Platform, Java, and modern web technologies.';
  const defaultImage = '/Meta.png';
  const siteUrl = 'https://your-portfolio-domain.vercel.app';
  
  // Use provided values or defaults
  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = `${siteUrl}${image || defaultImage}`;
  const seoUrl = `${siteUrl}${url || ''}`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={seoImage} />
    </Helmet>
  );
};

export default SEO; 