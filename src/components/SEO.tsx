import React, { useEffect } from 'react';

// Usage: <SEO title="Page Title" description="Page description for SEO." />
// You can pass unique title/description/keywords/image/url per page or section.

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'ZapsApps',
  description = 'ZapsApps is a student-founded startup specializing in web design, development, branding, and SEO in New York City. We create modern digital solutions with a focus on responsive design and user experience.',
  keywords = [
    'web design NYC',
    'web development New York',
    'website design Manhattan',
    'NYC web design company',
    'New York web developer',
    'branding services NYC',
    'SEO optimization New York',
    'responsive web design',
    'UI/UX design NYC',
    'digital branding',
    'student startup NYC',
    'graphic design services',
    'web design portfolio',
    'Manhattan web developer',
    'affordable web design NYC',
    'professional website development',
    'mobile-friendly websites',
    'modern web applications',
    'ecommerce website development'
  ],
  image = '/og-image.jpg',
  url = 'https://zapsapps.com'
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));

    // Update Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'ZapsApps', 'property');

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@zapsapps');
    updateMetaTag('twitter:creator', '@zapsapps');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Update other SEO tags
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('googlebot', 'index, follow');
    updateMetaTag('theme-color', '#222222');
    updateMetaTag('apple-mobile-web-app-title', 'ZapsApps');
    updateMetaTag('application-name', 'ZapsApps');
    updateMetaTag('msapplication-TileColor', '#222222');

    // Update canonical link
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);

    // Update JSON-LD
    let scriptTag = document.querySelector('#json-ld') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ZapsApps",
      "alternateName": "ZapsApps",
      "description": description,
      "url": url,
      "logo": `${url}/logo.png`,
      "image": image,
      "sameAs": [
        "https://twitter.com/zapsapps",
        "https://instagram.com/zapsapps",
        "https://linkedin.com/company/zapsapps",
        "https://github.com/zapsapps"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Manhattan",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "zapsapps1@gmail.com",
        "telephone": "718-500-7647",
        "areaServed": "Worldwide"
      },
      "knowsAbout": [
        "Web Design",
        "Web Development",
        "Responsive Design",
        "User Experience Design",
        "Branding",
        "SEO Optimization",
        "Graphic Design",
        "Digital Solutions",
        "New York Web Services"
      ]
    });

    // Add preconnect for performance
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdn.jsdelivr.net'
    ];

    preconnectDomains.forEach(domain => {
      let link = document.querySelector(`link[href="${domain}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'preconnect');
        link.setAttribute('href', domain);
        link.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(link);
      }
    });
  }, [title, description, keywords, image, url]);

  const updateMetaTag = (name: string, content: string, attributeName: 'name' | 'property' = 'name') => {
    let metaTag = document.querySelector(`meta[${attributeName}="${name}"]`) as HTMLMetaElement;
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute(attributeName, name);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
  };

  return null;
};

export default SEO; 