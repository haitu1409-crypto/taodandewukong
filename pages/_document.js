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
                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
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
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

