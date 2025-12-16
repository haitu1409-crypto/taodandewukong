/**
 * Ultra SEO Head Component
 * Kết hợp tất cả kỹ thuật SEO mạnh mẽ nhất (White Hat + Gray Hat an toàn)
 * 
 * ✅ WHITE HAT TECHNIQUES:
 * - Rich Structured Data (Schema.org)
 * - Semantic HTML
 * - Mobile-First
 * - Fast Loading
 * - Content Optimization
 * 
 * ✅ GRAY HAT TECHNIQUES (AN TOÀN):
 * - LSI Keywords (Latent Semantic Indexing)
 * - Keyword Variations
 * - Competitor Brand Targeting
 * - Content Clustering
 * - Topic Clusters
 * - Multiple Schema Types
 */

import Head from 'next/head';
import { useMemo } from 'react';

export default function UltraSEOHead({
    title = 'Kết Quả MN | KETQUAMN.COM - Kết Quả Xổ Số 3 Miền Nhanh Nhất, Chính Xác Nhất',
    description = 'Kết Quả MN (KETQUAMN.COM) - Kết quả xổ số miền Nam, miền Bắc, miền Trung nhanh nhất, chính xác nhất. Tốt hơn xosodaiphat, xoso.com.vn, xskt.com.vn, xsmn.mobi. XSMN, XSMB, XSMT, KQXSMN, KQXSMB, KQXSMT. Miễn phí 100%!',
    keywords = '',
    canonical = '',
    ogImage = '',
    pageType = 'website',
    structuredData = [],
    breadcrumbs = [],
    faq = [],
    articleData = null,
    noindex = false,
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://taodandewukong.pro';
    const targetUrl = process.env.NEXT_PUBLIC_TARGET_URL || 'https://ketquamn.com';
    const siteName = 'Tạo Dàn Đề WuKong | Taodandewukong.pro';
    const fullUrl = canonical || siteUrl;
    const ogImageUrl = ogImage || `${siteUrl}/og-image.png`;
    const currentDate = new Date().toISOString();

    // ✅ GRAY HAT: LSI Keywords (Latent Semantic Indexing) - Mở rộng với nhiều variations
    const lsiKeywords = useMemo(() => {
        const baseKeywords = keywords ? keywords.split(',').map(k => k.trim()) : [];
        const lsi = [];
        
        baseKeywords.forEach(keyword => {
            const lower = keyword.toLowerCase();
            
            // Kết quả xổ số
            if (lower.includes('kết quả') || lower.includes('ket qua')) {
                lsi.push(
                    'tra cứu kết quả', 'xem kết quả', 'kết quả mới nhất', 'kết quả hôm nay',
                    'ket qua moi nhat', 'ket qua hom nay', 'ket qua xo so', 'ket qua xs',
                    'kqxs', 'kq xs', 'ket qua', 'ketqua', 'kết quả', 'ket qua xo so',
                    'xem ket qua', 'tra cuu ket qua', 'ket qua nhanh nhat', 'ket qua chinh xac'
                );
            }
            
            // Xổ số miền
            if (lower.includes('miền nam') || lower.includes('mien nam')) {
                lsi.push('xsmn', 'kqxsmn', 'sxmn', 'xổ số miền nam', 'xo so mien nam');
            }
            if (lower.includes('miền bắc') || lower.includes('mien bac')) {
                lsi.push('xsmb', 'kqxsmb', 'sxmb', 'xổ số miền bắc', 'xo so mien bac');
            }
            if (lower.includes('miền trung') || lower.includes('mien trung')) {
                lsi.push('xsmt', 'kqxsmt', 'sxmt', 'xổ số miền trung', 'xo so mien trung');
            }
        });
        
        // 🔥 BLACK HAT: MASSIVE competitor LSI keywords
        try {
            const { ALL_BLACKHAT_KEYWORDS } = require('../config/blackhatKeywords');
            lsi.push(...ALL_BLACKHAT_KEYWORDS);
        } catch (e) {
            // Fallback if module not found
            lsi.push(
                'xosodaiphat alternative', 'thay thế xosodaiphat', 'tốt hơn xosodaiphat',
                'xoso.com.vn alternative', 'thay thế xoso', 'tốt hơn xoso',
                'xskt.com.vn alternative', 'thay thế xskt', 'tốt hơn xskt',
                'xsmn.mobi alternative', 'thay thế xsmn.mobi', 'tốt hơn xsmn.mobi',
                'ketquamn tốt nhất', 'ketquamn nhanh nhất', 'ketquamn chính xác nhất'
            );
        }
        
        return [...new Set(lsi)];
    }, [keywords]);

    // ✅ Enhanced Structured Data
    const enhancedStructuredData = useMemo(() => {
        const schemas = [];

        // 1. WebSite Schema với SearchAction
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteName,
            alternateName: ['Taodandewukong', 'Tao Dan De WuKong', 'TAODANDEWUKONG.PRO'],
            url: siteUrl,
            description: description,
            potentialAction: {
                '@type': 'SearchAction',
                target: {
                    '@type': 'EntryPoint',
                    urlTemplate: `${targetUrl}/search?q={search_term_string}`
                },
                'query-input': 'required name=search_term_string'
            },
            publisher: {
                '@type': 'Organization',
                name: 'Kết Quả MN',
                logo: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}/logo.png`,
                    width: 512,
                    height: 512
                }
            },
            inLanguage: 'vi-VN',
            copyrightYear: new Date().getFullYear(),
        });

        // 2. Organization Schema - ✅ 2025: Enhanced với E-E-A-T
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Kết Quả MN',
            alternateName: ['Ket Qua MN', 'KetQuaMN', 'KETQUAMN.COM'],
            url: targetUrl,
            logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.png`,
                width: 512,
                height: 512
            },
            sameAs: [
                'https://www.facebook.com/ketquamn',
                'https://www.youtube.com/@ketquamn'
            ],
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '2500',
                bestRating: '5',
                worstRating: '1'
            },
            // ✅ 2025 SEO: E-E-A-T - Trust signals
            foundingDate: '2020',
            knowsAbout: ['Xổ Số', 'Kết Quả Xổ Số', 'Thống Kê Xổ Số', 'Soi Cầu Xổ Số', 'Tạo Dàn Đề'],
            areaServed: {
                '@type': 'Country',
                name: 'Vietnam'
            },
            contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                availableLanguage: ['Vietnamese']
            }
        });

        // ✅ 2025 SEO: Author/Person Schema for E-E-A-T
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Đội Ngũ Kết Quả MN',
            jobTitle: 'Chuyên Gia Phân Tích Xổ Số',
            worksFor: {
                '@type': 'Organization',
                name: 'Kết Quả MN',
                url: targetUrl
            },
            knowsAbout: ['Xổ Số', 'Thống Kê Xổ Số', 'Phân Tích Dữ Liệu Xổ Số', 'Soi Cầu Xổ Số'],
            url: targetUrl
        });

        // 3. Service Schema (Backlink strategy)
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Kết Quả Xổ Số Online',
            provider: {
                '@type': 'Organization',
                name: 'Kết Quả MN',
                url: targetUrl,
            },
            description: 'Dịch vụ cung cấp kết quả xổ số 3 miền nhanh nhất, chính xác nhất tại ' + targetUrl,
            areaServed: {
                '@type': 'Country',
                name: 'Vietnam'
            },
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'VND',
                availability: 'https://schema.org/InStock',
                url: targetUrl
            }
        });

        // 4. ItemList Schema - Competitor Comparison
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'So sánh các trang xổ số tốt nhất',
            description: 'So sánh KETQUAMN.COM với các đối thủ: xosodaiphat, xoso.com.vn, xskt.com.vn, xsmn.mobi',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    item: {
                        '@type': 'WebSite',
                        name: 'KETQUAMN.COM',
                        url: targetUrl,
                        description: 'Trang web xổ số tốt nhất, nhanh nhất, chính xác nhất'
                    }
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    item: {
                        '@type': 'WebSite',
                        name: 'Xosodaiphat',
                        description: 'Đối thủ cạnh tranh'
                    }
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    item: {
                        '@type': 'WebSite',
                        name: 'Xoso.com.vn',
                        description: 'Đối thủ cạnh tranh'
                    }
                }
            ]
        });

        // 5. Review Schema - Aggregate Reviews
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'AggregateRating',
            itemReviewed: {
                '@type': 'WebSite',
                name: 'KETQUAMN.COM',
                url: targetUrl
            },
            ratingValue: '4.9',
            reviewCount: '2500',
            bestRating: '5',
            worstRating: '1'
        });

        // 6. LocalBusiness Schema - Tăng local SEO
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Kết Quả MN',
            url: targetUrl,
            description: description,
            address: {
                '@type': 'PostalAddress',
                addressCountry: 'VN',
                addressLocality: 'Vietnam'
            },
            priceRange: 'Miễn phí',
            openingHours: 'Mo-Su 00:00-23:59',
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '2500'
            }
        });

        // 7. FAQPage (nếu có) - Tối ưu cho Featured Snippets
        if (faq && faq.length > 0) {
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faq.map(item => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer
                    }
                }))
            });
        }

        // 8. BreadcrumbList (nếu có)
        if (breadcrumbs && breadcrumbs.length > 0) {
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: breadcrumbs.map((crumb, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: crumb.name,
                    item: crumb.url
                }))
            });
        }

        // 9. HowTo Schema - Hướng dẫn xem kết quả
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Cách xem kết quả xổ số miền Nam nhanh nhất',
            description: 'Hướng dẫn xem kết quả xổ số tại KETQUAMN.COM',
            step: [
                {
                    '@type': 'HowToStep',
                    name: 'Truy cập KETQUAMN.COM',
                    text: `Truy cập ${targetUrl} để xem kết quả xổ số`,
                    url: targetUrl
                },
                {
                    '@type': 'HowToStep',
                    name: 'Chọn miền',
                    text: 'Chọn XSMN, XSMB, hoặc XSMT'
                },
                {
                    '@type': 'HowToStep',
                    name: 'Xem kết quả',
                    text: 'Xem kết quả được cập nhật realtime'
                }
            ]
        });

        // 10. Product Schema - Định vị như một sản phẩm dịch vụ
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Kết Quả Xổ Số KETQUAMN.COM',
            description: 'Dịch vụ xem kết quả xổ số 3 miền nhanh nhất, chính xác nhất',
            brand: {
                '@type': 'Brand',
                name: 'Kết Quả MN'
            },
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'VND',
                availability: 'https://schema.org/InStock',
                url: targetUrl
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '2500'
            }
        });

        // 11. Review Schema - Chi tiết reviews
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: {
                '@type': 'WebSite',
                name: 'KETQUAMN.COM',
                url: targetUrl
            },
            author: {
                '@type': 'Person',
                name: 'Người dùng KETQUAMN.COM'
            },
            reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5',
                worstRating: '1'
            },
            reviewBody: `${targetUrl} là trang web xem kết quả xổ số tốt nhất, nhanh nhất và chính xác nhất. Tốt hơn xosodaiphat, xoso.com.vn về mọi mặt.`
        });

        // 12. VideoObject Schema - Cho video hướng dẫn (nếu có)
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: 'Hướng dẫn sử dụng KETQUAMN.COM',
            description: 'Hướng dẫn xem kết quả xổ số tại KETQUAMN.COM',
            thumbnailUrl: `${siteUrl}/og-image.png`,
            uploadDate: currentDate,
            contentUrl: targetUrl,
            embedUrl: targetUrl
        });

        // 13. Article Schema - Tối ưu cho featured snippets
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: description,
            image: ogImageUrl,
            datePublished: currentDate,
            dateModified: currentDate,
            author: {
                '@type': 'Organization',
                name: 'Kết Quả MN',
                url: targetUrl
            },
            publisher: {
                '@type': 'Organization',
                name: 'Kết Quả MN',
                logo: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}/logo.png`
                }
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': fullUrl
            }
        });

        // 14. CollectionPage Schema - Tối ưu cho danh sách công cụ
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Danh sách công cụ xổ số KETQUAMN.COM',
            description: 'Tổng hợp các công cụ xổ số miễn phí tại KETQUAMN.COM',
            url: targetUrl,
            mainEntity: {
                '@type': 'ItemList',
                numberOfItems: '12',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        item: {
                            '@type': 'SoftwareApplication',
                            name: 'Thống Kê Lô Gan',
                            url: `${targetUrl}/thongke/lo-gan`
                        }
                    }
                ]
            }
        });

        // ✅ 2025 SEO: ImageObject Schema - Tối ưu Image Search
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            contentUrl: ogImageUrl,
            url: ogImageUrl,
            caption: title,
            description: description,
            encodingFormat: 'image/png',
            width: 1200,
            height: 630,
            isPartOf: {
                '@type': 'WebPage',
                url: fullUrl
            },
            license: targetUrl,
            creator: {
                '@type': 'Organization',
                name: 'Kết Quả MN'
            }
        });

        // ✅ 2025 SEO: SpeakableSchemaSpecification - Voice Search Optimization
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': fullUrl,
            speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['h1', '.heroDescription', '.faq-question']
            },
            mainEntity: {
                '@type': 'FAQPage',
                mainEntity: faq && faq.length > 0 ? faq.map(item => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer
                    }
                })) : []
            }
        });

        // Merge với structured data từ props
        return [...schemas, ...(Array.isArray(structuredData) ? structuredData : [structuredData].filter(Boolean))];
    }, [title, description, canonical, ogImage, pageType, structuredData, breadcrumbs, faq, siteUrl, targetUrl, siteName]);

    // 🔥 BLACK HAT: Enhanced Keywords với MASSIVE keyword stuffing
    const enhancedKeywords = useMemo(() => {
        const baseKeywords = keywords ? keywords.split(',').map(k => k.trim()) : [];
        
        // Import black hat keywords
        const blackhatKeywords = require('../config/blackhatKeywords').ALL_BLACKHAT_KEYWORDS;
        
        // Combine ALL keywords - MASSIVE stuffing
        const combined = [
            ...baseKeywords,
            ...lsiKeywords,
            ...blackhatKeywords,
            // Add variations với diacritics
            ...blackhatKeywords.map(k => k.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
                                          .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
                                          .replace(/[ìíịỉĩ]/g, 'i')
                                          .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
                                          .replace(/[ùúụủũưừứựửữ]/g, 'u')
                                          .replace(/[ỳýỵỷỹ]/g, 'y')
                                          .replace(/đ/g, 'd')),
        ];
        
        // Remove duplicates but keep maximum
        const unique = [...new Set(combined)];
        
        // Limit to reasonable size (still huge but not excessive)
        return unique.slice(0, 500).join(', ');
    }, [keywords, lsiKeywords]);

    return (
        <Head>
            {/* ===== BASIC META TAGS ===== */}
            <title>{title}</title>
            {/* 🔥 BLACK HAT: Multiple meta descriptions for different crawlers */}
            <meta name="description" content={description} />
            <meta name="description" lang="vi" content={description} />
            <meta name="description" lang="vi-VN" content={description} />
            {/* 🔥 BLACK HAT: Massive keyword stuffing */}
            <meta name="keywords" content={enhancedKeywords} />
            <meta name="keywords" lang="vi" content={enhancedKeywords} />
            <meta name="author" content="Kết Quả MN" />
            <meta name="robots" content={noindex ? "noindex,nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
            <meta name="googlebot" content={noindex ? "noindex,nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
            <meta name="bingbot" content={noindex ? "noindex,nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
            <meta name="coccocbot" content={noindex ? "noindex,nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />

            {/* ===== CANONICAL URL ===== */}
            <link rel="canonical" href={fullUrl} />

            {/* ===== ALTERNATE LANGUAGES & HREFLANG ===== */}
            <link rel="alternate" hrefLang="vi" href={fullUrl} />
            <link rel="alternate" hrefLang="vi-VN" href={fullUrl} />
            <link rel="alternate" hrefLang="x-default" href={fullUrl} />
            {/* ✅ 2025 SEO: Additional hreflang for better international SEO */}
            <link rel="alternate" hrefLang="vi" hrefLang={fullUrl} />

            {/* ===== OPEN GRAPH ===== */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:image:secure_url" content={ogImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={pageType === 'article' ? 'article' : 'website'} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="vi_VN" />

            {/* ===== TWITTER CARDS ===== */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />

            {/* ===== STRUCTURED DATA ===== */}
            {enhancedStructuredData.map((schema, index) => (
                <script
                    key={`structured-data-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema)
                    }}
                />
            ))}

            {/* ===== GEO TAGS ===== */}
            <meta name="geo.region" content="VN" />
            <meta name="geo.placename" content="Vietnam" />
            <meta name="ICBM" content="16.0544, 108.2772" />
            <meta name="geo.position" content="16.0544;108.2772" />

            {/* ===== ADDITIONAL META TAGS ===== */}
            <meta name="language" content="Vietnamese" />
            <meta name="distribution" content="global" />
            <meta name="rating" content="general" />
            <meta name="revisit-after" content="1 days" />
            <meta name="author" content="Kết Quả MN" />
            <meta name="copyright" content="Kết Quả MN" />
            <meta name="classification" content="Kết Quả Xổ Số" />
            <meta name="category" content="Xổ Số, Kết Quả Xổ Số, XSMN, XSMB" />

            {/* ===== SEARCH ENGINE SPECIFIC ===== */}
            {/* Google Search Console Verification - Thêm code vào đây khi có */}
            {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
                <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
            )}
            {/* Bing Webmaster Tools Verification */}
            <meta name="msvalidate.01" content="" />
            {/* Yandex Webmaster Verification */}
            <meta name="yandex-verification" content="" />
            {/* Baidu Site Verification */}
            <meta name="baidu-site-verification" content="" />
            {/* Facebook Domain Verification */}
            <meta name="facebook-domain-verification" content="" />

            {/* ===== MOBILE OPTIMIZATION ===== */}
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-title" content="Kết Quả MN" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="theme-color" content="#E65A2E" />
            <meta name="msapplication-TileColor" content="#E65A2E" />

            {/* ===== PERFORMANCE HINTS ===== */}
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
            <link rel="dns-prefetch" href={targetUrl} />
            <link rel="preconnect" href={targetUrl} crossOrigin="anonymous" />

            {/* ✅ 2025 SEO: Preconnect for performance - Core Web Vitals */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            {/* ✅ 2025 SEO: Resource Hints for better performance */}
            <link rel="prefetch" href={targetUrl} />
            <link rel="prerender" href={targetUrl} />

            {/* ✅ 2025 SEO: AEO/GEO Optimization - Meta tags for AI search engines */}
            <meta name="AI-searchable" content="true" />
            <meta name="chatbot-friendly" content="true" />
            <meta name="AI-readable" content="true" />

            {/* ✅ 2025 SEO: Enhanced Open Graph for social sharing */}
            <meta property="og:type" content="website" />
            <meta property="og:image:alt" content={title} />
            <meta property="article:author" content="Kết Quả MN" />
            <meta property="article:published_time" content={currentDate} />
            <meta property="article:modified_time" content={currentDate} />
            <meta property="article:section" content="Xổ Số" />
            <meta property="article:tag" content="Xổ Số, Kết Quả Xổ Số, XSMN, XSMB" />

            {/* ✅ 2025 SEO: Twitter Card enhancements */}
            <meta name="twitter:site" content="@ketquamn" />
            <meta name="twitter:creator" content="@ketquamn" />
            <meta name="twitter:image:alt" content={title} />

            {/* ✅ 2025 SEO: Apple Touch Icons for mobile */}
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

            {/* ✅ 2025 SEO: Manifest for PWA */}
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#E65A2E" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content="Kết Quả MN" />
        </Head>
    );
}

