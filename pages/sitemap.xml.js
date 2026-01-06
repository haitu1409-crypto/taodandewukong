/**
 * Dynamic Sitemap Generator
 * Tạo sitemap.xml động cho SEO - Bao gồm tất cả bài viết tin tức
 */

function generateSiteMap(articles = []) {
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
            url: '/tin-tuc',
            changefreq: 'daily',
            priority: '0.9',
            lastmod: currentDate,
        },
        {
            url: '/dan-de-bat-tu',
            changefreq: 'weekly',
            priority: '0.9',
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

    // Format date for sitemap (YYYY-MM-DD)
    const formatDate = (dateString) => {
        if (!dateString) return currentDate;
        try {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        } catch (e) {
            return currentDate;
        }
    };

    // Escape XML special characters
    const escapeXml = (str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };

    // Generate URLs for articles
    const articleUrls = articles.map((article) => {
        if (!article.slug) return ''; // Skip articles without slug
        
        const lastmod = formatDate(article.updatedAt || article.publishedAt);
        const priority = article.featured || article.category === 'trending' ? '0.9' : '0.7';
        const changefreq = 'weekly'; // Articles are updated weekly typically
        
        // Escape slug for URL
        const escapedSlug = escapeXml(article.slug);
        
        let imageTag = '';
        if (article.featuredImage?.url) {
            const imageUrl = article.featuredImage.url.startsWith('http') 
                ? article.featuredImage.url 
                : `${siteUrl}${article.featuredImage.url.startsWith('/') ? article.featuredImage.url : '/' + article.featuredImage.url}`;
            const escapedImageUrl = escapeXml(imageUrl);
            const escapedTitle = escapeXml(article.title || '');
            imageTag = `\n    <image:image>
      <image:loc>${escapedImageUrl}</image:loc>
      <image:title>${escapedTitle}</image:title>
    </image:image>`;
        }

        return `  <url>
    <loc>${siteUrl}/tin-tuc/${escapedSlug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <mobile:mobile/>${imageTag}
  </url>`;
    }).filter(url => url !== ''); // Remove empty entries

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
${articleUrls.join('\n')}
</urlset>`;

    return sitemap;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    let articles = [];

    try {
        // Fetch all articles from API
        // Use a high limit to get all articles, or implement pagination if needed
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(`${apiUrl}/api/articles?limit=10000&sort=-publishedAt`, {
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (response.ok) {
            const result = await response.json();
            if (result.success && result.data?.articles) {
                articles = result.data.articles;
                console.log(`✅ Fetched ${articles.length} articles for sitemap`);
            }
        } else {
            console.warn(`⚠️ API returned ${response.status} when fetching articles for sitemap`);
        }
    } catch (error) {
        // Log error but continue with static pages only
        console.error('❌ Error fetching articles for sitemap:', error.message);
        // Continue with static pages only - don't fail the sitemap generation
    }

    // Generate the XML sitemap with static pages and articles
    const sitemap = generateSiteMap(articles);

    res.setHeader('Content-Type', 'text/xml');
    // Cache for 6 hours (articles may be added frequently)
    res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;
