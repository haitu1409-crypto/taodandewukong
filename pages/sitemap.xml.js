/**
 * Dynamic XML Sitemap
 * Generate sitemap for SEO - TỐI ĐA HÓA
 */

import { SITE_URL, TARGET_URL, LOTTERY_TOOLS } from '../config/seoConfig';

function generateSitemap() {
    const siteUrl = SITE_URL;
    const currentDate = new Date().toISOString();
    
    // Main pages
    const pages = [
        {
            url: siteUrl,
            changefreq: 'daily',
            priority: '1.0',
            lastmod: currentDate,
        },
    ];
    
    // Add all lottery tools pages to sitemap for better indexing
    LOTTERY_TOOLS.forEach(tool => {
        pages.push({
            url: tool.url, // Full URL from config
            changefreq: 'daily',
            priority: '0.9',
            lastmod: currentDate,
        });
    });
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${pages
    .map(
        (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

    return sitemap;
}

export default function Sitemap() {
    // This should not be called as a React component
    // It's handled via getServerSideProps
    return null;
}

export async function getServerSideProps({ res }) {
    const sitemap = generateSitemap();
    
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.write(sitemap);
    res.end();
    
    return {
        props: {},
    };
}

