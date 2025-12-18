/**
 * Custom Document
 * Thêm các meta tags và links vào <head> và <body>
 */

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://taodandewukong.pro';
    const targetUrl = process.env.NEXT_PUBLIC_TARGET_URL || 'https://ketquamn.com';

    return (
        <Html lang="vi">
            <Head>
                {/* Preload LCP Image - Logo */}
                <link 
                    rel="preload" 
                    href="/logoketquamn.png" 
                    as="image" 
                    fetchpriority="high"
                />
                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                
                {/* DNS Prefetch và Preconnect */}
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href={targetUrl} />
                <link rel="preconnect" href={targetUrl} />
                
                {/* Manifest */}
                <link rel="manifest" href="/manifest.json" />
                
                {/* ✅ 2025 SEO: Additional meta tags */}
                <meta name="generator" content="Next.js" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                
                {/* ✅ 2025 SEO: Performance optimization */}
                <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                
                {/* ✅ PERFORMANCE: Optimize font loading - defer non-critical CSS */}
                <link 
                    rel="preload"
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"
                    as="style"
                    onLoad="this.onload=null;this.rel='stylesheet'"
                />
                <noscript>
                    <link 
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap" 
                        rel="stylesheet"
                    />
                </noscript>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

