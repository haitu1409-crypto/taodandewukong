/**
 * Dynamic Sitemap Generator
 * Tạo sitemap.xml động cho SEO
 */

function generateSiteMap() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://taodandewukong.pro';
    const currentDate = new Date().toISOString().split('T')[0];

    const staticPages = [
        {
            url: '',
            changefreq: 'daily',
            priority: '1.0',
            lastmod: currentDate,
        },
        {
            url: '/chinh-sach-bao-mat',
            changefreq: 'monthly',
            priority: '0.8',
            lastmod: currentDate,
        },
        {
            url: '/lien-he',
            changefreq: 'monthly',
            priority: '0.8',
            lastmod: currentDate,
        },
        {
            url: '/ve-chung-toi',
            changefreq: 'monthly',
            priority: '0.8',
            lastmod: currentDate,
        },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${staticPages
    .map((page) => {
        return `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <mobile:mobile/>
  </url>`;
    })
    .join('\n')}
</urlset>`;

    return sitemap;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // Generate the XML sitemap with the blog data
    const sitemap = generateSiteMap();

    res.setHeader('Content-Type', 'text/xml');
    // Cache for 1 day
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;
