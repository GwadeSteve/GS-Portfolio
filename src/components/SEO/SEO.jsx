import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
    title,
    description,
    image,
    url,
    article = false,
    keywords = ""
}) => {
    const siteName = "Gwade Steve";
    const fullTitle = `${title} | ${siteName}`;
    const defaultDescription = "Explore Gwade Steve's portfolio showcasing expertise in AI, data science, and innovative software development.";
    const defaultImage = "https://gwadesteve.onrender.com/images/logo192.png";
    const canonicalUrl = url || "https://gwadesteve.onrender.com";

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description || defaultDescription} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={article ? 'article' : 'website'} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content={image || defaultImage} />

            {/* Canonical Link */}
            <link rel="canonical" href={canonicalUrl} />
        </Helmet>
    );
};

export default SEO;
