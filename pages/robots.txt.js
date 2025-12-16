/**
 * Dynamic robots.txt
 * Configure crawler access
 */

function generateRobotsTxt() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://taodandewukong.pro';
    
    return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1

# Allow specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

User-agent: Cốc Cốc
Allow: /`;
}

export default function RobotsTxt() {
    // This should not be called as a React component
    // It's handled via getServerSideProps
    return null;
}

export async function getServerSideProps({ res }) {
    const robotsTxt = generateRobotsTxt();
    
    res.setHeader('Content-Type', 'text/plain');
    res.write(robotsTxt);
    res.end();
    
    return {
        props: {},
    };
}

