/**
 * Landing Page - SEO Backlink Strategy
 * Mục tiêu: Tạo landing page mạnh mẽ để SEO backlink về ketquamn.com
 */

import { useEffect, useState, useMemo, useCallback } from 'react';
import UltraSEOHead from '../components/UltraSEOHead';
import TableDateKQXS from '../components/TableDateKQXS';
import { SEO_CONFIG, FAQ_DATA, BACKLINK_CONTENT, LOTTERY_TOOLS, TARGET_URL } from '../config/seoConfig';

export default function HomePage() {
    const seoConfig = SEO_CONFIG.home;
    const targetUrl = TARGET_URL;
    const [isApproachingLottery, setIsApproachingLottery] = useState({
        south: false,
        central: false,
        north: false,
    });

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Kiểm tra thời gian xổ số để áp dụng animation cho backlinks
    useEffect(() => {
        const checkLotteryTime = () => {
            const now = new Date();
            const vietnamFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Ho_Chi_Minh',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            const parts = vietnamFormatter.formatToParts(now);
            const currentHour = parseInt(parts.find(p => p.type === 'hour').value);
            const currentMinute = parseInt(parts.find(p => p.type === 'minute').value);
            const currentTime = currentHour * 60 + currentMinute;

            // Thời gian xổ số
            const southStart = 16 * 60 + 15; // 16:15
            const southEnd = 16 * 60 + 45; // 16:45
            const southPrep = southStart - 30; // 15:45

            const centralStart = 17 * 60 + 15; // 17:15
            const centralEnd = 17 * 60 + 45; // 17:45
            const centralPrep = centralStart - 30; // 16:45

            const northStart = 18 * 60 + 15; // 18:15
            const northEnd = 18 * 60 + 45; // 18:45
            const northPrep = northStart - 30; // 17:45

            setIsApproachingLottery({
                south: currentTime >= southPrep && currentTime <= southEnd,
                central: currentTime >= centralPrep && currentTime <= centralEnd,
                north: currentTime >= northPrep && currentTime <= northEnd,
            });
        };

        checkLotteryTime();
        const interval = setInterval(checkLotteryTime, 60000); // Cập nhật mỗi phút
        return () => clearInterval(interval);
    }, []);

    // ✅ PERFORMANCE: Memoize helper function với useCallback
    const shouldAnimateLink = useCallback((url) => {
        if (!url) return false;
        if (url.includes('ket-qua-xo-so-mien-nam')) return isApproachingLottery.south;
        if (url.includes('ket-qua-xo-so-mien-bac')) return isApproachingLottery.north;
        if (url.includes('ket-qua-xo-so-mien-trung')) return isApproachingLottery.central;
        return false;
    }, [isApproachingLottery.south, isApproachingLottery.north, isApproachingLottery.central]);

    // ✅ PERFORMANCE: Memoize style function với useCallback
    const getAnimatedLinkStyle = useCallback((baseStyle, url) => {
        if (!shouldAnimateLink(url)) return baseStyle;
        // Kiểm tra nếu là text link (backlink) - không có backgroundColor trong baseStyle
        const isTextLink = !baseStyle.backgroundColor && !baseStyle.background;
        if (isTextLink) {
            return {
                ...baseStyle,
                animation: 'colorPulse 1.5s ease-in-out infinite',
                backgroundColor: '#E65A2E',
                color: '#ffffff',
                padding: '2px 6px',
                borderRadius: '4px',
                textDecoration: 'none',
                boxShadow: '0 0 10px rgba(230, 90, 46, 0.5), 0 0 20px rgba(230, 90, 46, 0.3)',
            };
        }
        // Nếu là button/link có background
        return {
            ...baseStyle,
            animation: 'colorPulse 1.5s ease-in-out infinite',
            boxShadow: '0 0 10px rgba(230, 90, 46, 0.5), 0 0 20px rgba(230, 90, 46, 0.3)',
        };
    }, [shouldAnimateLink]);

    return (
        <>
            {/* CSS Animation cho backlinks */}
            <style jsx>{`
                @keyframes colorPulse {
                    0%, 100% {
                        background-color: #E65A2E;
                        box-shadow: 0 0 10px rgba(230, 90, 46, 0.5), 0 0 20px rgba(230, 90, 46, 0.3);
                    }
                    50% {
                        background-color: #FF8C42;
                        box-shadow: 0 0 15px rgba(255, 140, 66, 0.7), 0 0 30px rgba(255, 140, 66, 0.4);
                    }
                }
            `}</style>
            <UltraSEOHead
                title={seoConfig.title}
                description={seoConfig.description}
                keywords={seoConfig.keywords}
                canonical={seoConfig.canonical}
                ogImage={seoConfig.ogImage}
                pageType="website"
                faq={FAQ_DATA}
                structuredData={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Trang chủ',
                                item: seoConfig.canonical
                            }
                        ]
                    },
                    // SoftwareApplication Schema for Tools
                    {
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: 'Công Cụ Xổ Số KETQUAMN.COM',
                        applicationCategory: 'GameApplication',
                        operatingSystem: 'Web Browser',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'VND'
                        },
                        aggregateRating: {
                            '@type': 'AggregateRating',
                            ratingValue: '4.9',
                            reviewCount: '2500'
                        },
                        featureList: LOTTERY_TOOLS.map(tool => tool.name).join(', ')
                    },
                    // ItemList Schema for Tools
                    {
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        name: 'Danh Sách Công Cụ Xổ Số',
                        description: 'Các công cụ xổ số chuyên nghiệp tại KETQUAMN.COM',
                        itemListElement: LOTTERY_TOOLS.map((tool, index) => ({
                            '@type': 'ListItem',
                            position: index + 1,
                            item: {
                                '@type': 'SoftwareApplication',
                                name: tool.name,
                                url: tool.url,
                                description: tool.description,
                                applicationCategory: 'GameApplication',
                                offers: {
                                    '@type': 'Offer',
                                    price: '0',
                                    priceCurrency: 'VND'
                                }
                            }
                        }))
                    }
                ]}
            />

            <div style={styles.container}>
                {/* Hero Section */}
                <section style={styles.hero}>
                    <div style={styles.heroContent}>
                        {/* Logo */}
                        <div style={styles.logoContainer}>
                            <img 
                                src="/logoketquamn.png" 
                                alt="KETQUAMN.COM - Kết Quả Xổ Số Miền Nam" 
                                style={styles.logo}
                                loading="eager"
                            />
                        </div>
                        {/* H1 chính - rút gọn */}
                        <h1 style={styles.heroTitle}>
                            Kết Quả Xổ Số Miền Nam - XSMN, XSMB Nhanh Nhất | KETQUAMN.COM
                        </h1>
                        {/* 🔥 SEO: Hidden H1 với đầy đủ keywords cho SEO */}
                        <h1 style={styles.hiddenH1}>
                            Kết Quả Xổ Số Miền Nam - XSMN, XSMB Nhanh Nhất, Chính Xác Nhất | KETQUAMN.COM Tốt Hơn Xosodaiphat, Xoso.com.vn, Xskt.com.vn, Xsmn.mobi, Ketqua04, Xosominhngoc. Xosodaiphat Thay Thế, Xoso.com.vn Alternative, Xskt.com.vn Thay Thế, Xsmn.mobi Alternative, Ketqua04 Thay Thế - KETQUAMN.COM Tốt Nhất
                        </h1>
                        <p style={styles.heroDescription}>
                            <strong>KETQUAMN.COM</strong> - Kết quả xổ số 3 miền nhanh nhất ⚡
                            <br />
                            <span style={{fontSize: '0.9em', opacity: 0.95}}>
                                <a 
                                    href={`${targetUrl}/thongke/lo-gan`} 
                                    style={{color: '#fff', textDecoration: 'underline', opacity: 0.9, transition: 'all 0.2s ease', cursor: 'pointer'}} 
                                    onMouseEnter={(e) => {
                                        e.target.style.opacity = '1';
                                        e.target.style.color = '#ffffff';
                                        e.target.style.textDecoration = 'underline';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.opacity = '0.9';
                                        e.target.style.color = '#fff';
                                    }}
                                    rel="nofollow"
                                >
                                    Thống kê lô gan
                                </a> • Miễn phí 100%
                            </span>
                        </p>
                        {/* 🔥 SEO: Hidden text với đầy đủ keywords */}
                        <div style={styles.seoHiddenText}>
                            KETQUAMN.COM - Kết quả xổ số miền Nam, miền Bắc, miền Trung nhanh nhất, chính xác nhất. Tốt hơn xosodaiphat, xoso.com.vn, xskt.com.vn, xsmn.mobi, ketqua04, xosominhngoc về mọi mặt. XSMN, XSMB, XSMT, KQXSMN, KQXSMB cập nhật realtime. Thống kê lô gan, soi cầu AI, tạo dàn đề miễn phí 100%. Xosodaiphat alternative, xosodaiphat thay thế, thay thế xosodaiphat, tốt hơn xosodaiphat. Xoso.com.vn alternative, xoso thay thế, thay thế xoso.com.vn, tốt hơn xoso.com.vn. Xskt.com.vn alternative, xskt thay thế, thay thế xskt.com.vn, tốt hơn xskt.com.vn. Xsmn.mobi alternative, xsmn.mobi thay thế, thay thế xsmn.mobi, tốt hơn xsmn.mobi. Ketqua04.net alternative, ketqua04 thay thế, thay thế ketqua04, tốt hơn ketqua04. Xosominhngoc alternative, xosominhngoc thay thế, thay thế xosominhngoc, tốt hơn xosominhngoc.
                        </div>
                        <div style={styles.ctaContainer}>
                            {BACKLINK_CONTENT.ctaButtons.map((cta, index) => (
                                <a
                                    key={index}
                                    href={cta.url}
                                    style={styles.ctaButton}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#3a3a3a';
                                        e.currentTarget.style.borderColor = '#E65A2E';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#333333';
                                        e.currentTarget.style.borderColor = '#E65A2E';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                    rel="nofollow"
                                >
                                    {cta.text}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Table Date KQXS Component */}
                <section style={styles.tableSection}>
                    <TableDateKQXS />
                </section>

                {/* Main Content Section */}
                <section style={styles.mainContent}>
                    <div style={styles.contentWrapper}>
                        {/* Quick Links FIRST - Người dùng muốn xem ngay */}
                        <article style={styles.article}>
                            <h2 style={styles.h2}>🔗 Truy Cập Nhanh</h2>
                            <div style={styles.quickLinksGrid}>
                                <a 
                                    href={`${targetUrl}/ket-qua-xo-so-mien-nam`} 
                                    style={getAnimatedLinkStyle(styles.quickLink, `${targetUrl}/ket-qua-xo-so-mien-nam`)} 
                                    onMouseEnter={(e) => {
                                        if (!shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-nam`)) {
                                            e.currentTarget.style.backgroundColor = '#3a3a3a';
                                        }
                                        e.currentTarget.style.borderColor = '#E65A2E';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.animation = 'none';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-nam`)) {
                                            e.currentTarget.style.backgroundColor = '#333333';
                                        }
                                        e.currentTarget.style.borderColor = shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-nam`) ? '#E65A2E' : 'rgba(255,255,255,0.1)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        if (shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-nam`)) {
                                            e.currentTarget.style.animation = 'colorPulse 1.5s ease-in-out infinite';
                                        }
                                    }}
                                    rel="nofollow"
                                >
                                    <div style={styles.quickLinkIcon}>📋</div>
                                    <div style={styles.quickLinkText}>XSMN</div>
                                </a>
                                <a 
                                    href={`${targetUrl}/ket-qua-xo-so-mien-bac`} 
                                    style={getAnimatedLinkStyle(styles.quickLink, `${targetUrl}/ket-qua-xo-so-mien-bac`)} 
                                    onMouseEnter={(e) => {
                                        if (!shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-bac`)) {
                                            e.currentTarget.style.backgroundColor = '#3a3a3a';
                                        }
                                        e.currentTarget.style.borderColor = '#E65A2E';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.animation = 'none';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-bac`)) {
                                            e.currentTarget.style.backgroundColor = '#333333';
                                        }
                                        e.currentTarget.style.borderColor = shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-bac`) ? '#E65A2E' : 'rgba(255,255,255,0.1)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        if (shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-bac`)) {
                                            e.currentTarget.style.animation = 'colorPulse 1.5s ease-in-out infinite';
                                        }
                                    }}
                                    rel="nofollow"
                                >
                                    <div style={styles.quickLinkIcon}>📋</div>
                                    <div style={styles.quickLinkText}>XSMB</div>
                                </a>
                                <a 
                                    href={`${targetUrl}/thongke/lo-gan`} 
                                    style={styles.quickLink} 
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#3a3a3a';
                                        e.currentTarget.style.borderColor = '#E65A2E';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#333333';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                    rel="nofollow"
                                >
                                    <div style={styles.quickLinkIcon}>📊</div>
                                    <div style={styles.quickLinkText}>Lô Gan</div>
                                </a>
                                <a 
                                    href={`${targetUrl}/soi-cau-mien-bac-ai`} 
                                    style={styles.quickLink} 
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#3a3a3a';
                                        e.currentTarget.style.borderColor = '#E65A2E';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#333333';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                    rel="nofollow"
                                >
                                    <div style={styles.quickLinkIcon}>🔮</div>
                                    <div style={styles.quickLinkText}>Soi Cầu</div>
                                </a>
                            </div>
                        </article>

                        {/* Top Tools Only - Những công cụ quan trọng nhất */}
                        <article style={styles.article}>
                            <h2 style={styles.h2}>🛠️ Công Cụ Xổ Số</h2>
                            <div style={styles.toolsCompactGrid}>
                                {LOTTERY_TOOLS.slice(0, 6).map((tool, index) => (
                                    <a 
                                        key={index} 
                                        href={tool.url} 
                                        style={styles.toolCompactCard}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#3a3a3a';
                                            e.currentTarget.style.borderColor = '#E65A2E';
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#333333';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                        rel="nofollow"
                                        title={tool.name}
                                    >
                                        <div style={styles.toolCompactIcon}>
                                            {index < 2 ? '🎯' : index < 5 ? '🔮' : '📊'}
                                        </div>
                                        <div style={styles.toolCompactTitle}>{tool.name.split(' - ')[0]}</div>
                                    </a>
                                ))}
                            </div>
                            {/* Thêm backlink về thống kê lô gan */}
                            <div style={styles.importantLink}>
                                <a 
                                    href={`${targetUrl}/thongke/lo-gan`} 
                                    style={styles.importantLinkBtn}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#3a3a3a';
                                        e.currentTarget.style.borderColor = '#E65A2E';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#333333';
                                        e.currentTarget.style.borderColor = '#E65A2E';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
                                    }}
                                    rel="nofollow"
                                >
                                    📊 Xem Thống Kê Lô Gan →
                                </a>
                            </div>
                        </article>

                        {/* FAQ - Only 3 most important */}
                        <article style={styles.article}>
                            <h2 style={styles.h2}>❓ FAQ</h2>
                            <div style={styles.faqCompact}>
                                {FAQ_DATA.slice(0, 3).map((faq, index) => (
                                    <div key={index} style={styles.faqCompactItem}>
                                        <strong style={styles.faqCompactQ}>{faq.question}</strong>
                                        <div style={styles.faqCompactA}>
                                            {faq.answer.substring(0, 100)}... 
                                            {faq.question.includes('lô gan') && (
                                                <> <a 
                                                    href={`${targetUrl}/thongke/lo-gan`} 
                                                    style={{...styles.backlink, color: '#b0b0b0'}} 
                                                    onMouseEnter={(e) => e.target.style.borderBottomColor = '#E65A2E'}
                                                    onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}
                                                    rel="nofollow"
                                                >
                                                    Xem thống kê lô gan
                                                </a></>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </article>

                        {/* Final CTA - Compact với nhiều backlinks */}
                        <section style={styles.finalCta}>
                            <a
                                href={targetUrl}
                                style={styles.primaryCtaButton}
                                rel="nofollow"
                            >
                                ⚡ Vào KETQUAMN.COM Ngay →
                            </a>
                            <div style={styles.ctaSubtextCompact}>
                                Tốt nhất • Nhanh nhất • Miễn phí 100%
                            </div>
                            {/* Thêm contextual backlinks */}
                            <div style={styles.contextualLinks}>
                                <p style={styles.contextualText}>
                                    Xem <a 
                                        href={`${targetUrl}/thongke/lo-gan`} 
                                        style={styles.backlink} 
                                        onMouseEnter={(e) => {
                                            e.target.style.color = '#ffffff';
                                            e.target.style.borderBottomColor = '#E65A2E';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = '#b0b0b0';
                                            e.target.style.borderBottomColor = 'transparent';
                                        }}
                                        rel="nofollow"
                                    >
                                        thống kê lô gan miền Bắc
                                    </a>, 
                                    <a 
                                        href={`${targetUrl}/ket-qua-xo-so-mien-nam`} 
                                        style={getAnimatedLinkStyle(styles.backlink, `${targetUrl}/ket-qua-xo-so-mien-nam`)} 
                                        onMouseEnter={(e) => {
                                            e.target.style.color = '#ffffff';
                                            e.target.style.borderBottomColor = '#E65A2E';
                                            e.target.style.animation = 'none';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-nam`) ? '#ffffff' : '#b0b0b0';
                                            e.target.style.borderBottomColor = shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-nam`) ? '#E65A2E' : 'transparent';
                                            if (shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-nam`)) {
                                                e.target.style.animation = 'colorPulse 1.5s ease-in-out infinite';
                                                e.target.style.padding = '2px 4px';
                                                e.target.style.borderRadius = '4px';
                                                e.target.style.backgroundColor = '#E65A2E';
                                            }
                                        }}
                                        rel="nofollow"
                                    >
                                        {' '}kết quả XSMN
                                    </a>, 
                                    <a 
                                        href={`${targetUrl}/ket-qua-xo-so-mien-bac`} 
                                        style={getAnimatedLinkStyle(styles.backlink, `${targetUrl}/ket-qua-xo-so-mien-bac`)} 
                                        onMouseEnter={(e) => {
                                            e.target.style.color = '#ffffff';
                                            e.target.style.borderBottomColor = '#E65A2E';
                                            e.target.style.animation = 'none';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-bac`) ? '#ffffff' : '#b0b0b0';
                                            e.target.style.borderBottomColor = shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-bac`) ? '#E65A2E' : 'transparent';
                                            if (shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-bac`)) {
                                                e.target.style.animation = 'colorPulse 1.5s ease-in-out infinite';
                                                e.target.style.padding = '2px 4px';
                                                e.target.style.borderRadius = '4px';
                                                e.target.style.backgroundColor = '#E65A2E';
                                            }
                                        }}
                                        rel="nofollow"
                                    >
                                        {' '}kết quả XSMB
                                    </a> 
                                    {' '}và <a 
                                        href={targetUrl} 
                                        style={styles.backlink} 
                                        onMouseEnter={(e) => {
                                            e.target.style.color = '#ffffff';
                                            e.target.style.borderBottomColor = '#E65A2E';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = '#b0b0b0';
                                            e.target.style.borderBottomColor = 'transparent';
                                        }}
                                        rel="nofollow"
                                    >
                                        nhiều công cụ khác tại KETQUAMN.COM
                                    </a>
                                </p>
                            </div>
                        </section>
                    </div>
                </section>

                {/* Footer - Compact với nhiều backlinks */}
                <footer style={styles.footer}>
                    <p style={styles.footerText}>
                        <a 
                            href={targetUrl} 
                            style={{...styles.backlink, color: '#b0b0b0'}} 
                            onMouseEnter={(e) => {
                                e.target.style.textDecoration = 'underline';
                                e.target.style.borderBottomColor = '#E65A2E';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.textDecoration = 'underline';
                                e.target.style.borderBottomColor = 'transparent';
                            }}
                            rel="nofollow"
                        >
                            KETQUAMN.COM
                        </a>
                        {' - Kết quả xổ số nhanh nhất • Miễn phí 100%'}
                    </p>
                    <div style={styles.footerLinks}>
                        <a 
                            href={`${targetUrl}/thongke/lo-gan`} 
                            style={styles.footerLink}
                            onMouseEnter={(e) => {
                                e.target.style.textDecoration = 'underline';
                                e.target.style.borderBottomColor = '#E65A2E';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.textDecoration = 'none';
                                e.target.style.borderBottomColor = 'transparent';
                            }}
                            rel="nofollow"
                        >
                            Thống kê lô gan
                        </a>
                        <span style={{color: 'rgba(255,255,255,0.3)', margin: '0 2px'}}>•</span>
                        <a 
                            href={`${targetUrl}/ket-qua-xo-so-mien-nam`} 
                            style={getAnimatedLinkStyle(styles.footerLink, `${targetUrl}/ket-qua-xo-so-mien-nam`)}
                            onMouseEnter={(e) => {
                                e.target.style.textDecoration = 'underline';
                                e.target.style.borderBottomColor = '#E65A2E';
                                e.target.style.animation = 'none';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.textDecoration = shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-nam`) ? 'underline' : 'none';
                                e.target.style.borderBottomColor = shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-nam`) ? '#E65A2E' : 'transparent';
                                if (shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-nam`)) {
                                    e.target.style.animation = 'colorPulse 1.5s ease-in-out infinite';
                                    e.target.style.padding = '2px 4px';
                                    e.target.style.borderRadius = '4px';
                                }
                            }}
                            rel="nofollow"
                        >
                            XSMN
                        </a>
                        <span style={{color: 'rgba(255,255,255,0.3)', margin: '0 2px'}}>•</span>
                        <a 
                            href={`${targetUrl}/ket-qua-xo-so-mien-bac`} 
                            style={getAnimatedLinkStyle(styles.footerLink, `${targetUrl}/ket-qua-xo-so-mien-bac`)}
                            onMouseEnter={(e) => {
                                e.target.style.textDecoration = 'underline';
                                e.target.style.borderBottomColor = '#E65A2E';
                                e.target.style.animation = 'none';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.textDecoration = shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-bac`) ? 'underline' : 'none';
                                e.target.style.borderBottomColor = shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-bac`) ? '#E65A2E' : 'transparent';
                                if (shouldAnimateLink(`${targetUrl}/ket-qua-xo-so-mien-bac`)) {
                                    e.target.style.animation = 'colorPulse 1.5s ease-in-out infinite';
                                    e.target.style.padding = '2px 4px';
                                    e.target.style.borderRadius = '4px';
                                }
                            }}
                            rel="nofollow"
                        >
                            XSMB
                        </a>
                        <span style={{color: 'rgba(255,255,255,0.3)', margin: '0 2px'}}>•</span>
                        <a 
                            href={targetUrl} 
                            style={styles.footerLink}
                            onMouseEnter={(e) => {
                                e.target.style.textDecoration = 'underline';
                                e.target.style.borderBottomColor = '#E65A2E';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.textDecoration = 'none';
                                e.target.style.borderBottomColor = 'transparent';
                            }}
                            rel="nofollow"
                        >
                            Trang chủ
                        </a>
                    </div>
                </footer>
                
                {/* 🔥 BLACK HAT: Hidden/Semi-visible keyword content */}
                <div style={styles.hiddenKeywords}>
                    {/* Keywords for search engines - visible to bots, hidden to users */}
                    <div style={styles.keywordCloud}>
                        KETQUAMN.COM, ketquamn, kết quả xổ số miền nam, ket qua xo so mien nam, xsmn, xsmb, 
                        ketquamn tốt hơn xosodaiphat, ketquamn tốt hơn xoso.com.vn, ketquamn tốt hơn xskt.com.vn, 
                        ketquamn tốt hơn xsmn.mobi, ketquamn tốt hơn ketqua04, ketquamn tốt hơn xosominhngoc,
                        xosodaiphat alternative, xosodaiphat thay thế, thay thế xosodaiphat, tốt hơn xosodaiphat,
                        xoso.com.vn alternative, xoso thay thế, thay thế xoso.com.vn, tốt hơn xoso.com.vn,
                        xskt.com.vn alternative, xskt thay thế, thay thế xskt.com.vn, tốt hơn xskt.com.vn,
                        xsmn.mobi alternative, xsmn.mobi thay thế, thay thế xsmn.mobi, tốt hơn xsmn.mobi,
                        ketqua04.net alternative, ketqua04 thay thế, thay thế ketqua04, tốt hơn ketqua04,
                        xosominhngoc alternative, xosominhngoc thay thế, thay thế xosominhngoc, tốt hơn xosominhngoc,
                        trang xổ số nào tốt nhất, web xổ số nào tốt nhất, kết quả xổ số nào tốt nhất,
                        xem xổ số ở đâu tốt nhất, trang xổ số nhanh nhất, web xổ số chính xác nhất,
                        kết quả xổ số hôm nay, ket qua xo so hom nay, xsmn hôm nay, xsmb hôm nay,
                        thống kê lô gan, thống kê xổ số, soi cầu miền bắc, tạo dàn đề,
                        {targetUrl}/thongke/lo-gan, {targetUrl}/ket-qua-xo-so-mien-nam, {targetUrl}/ket-qua-xo-so-mien-bac
                    </div>
                </div>
            </div>
        </>
    );
}

// Styles - Optimized for Mobile & Visual - Color Palette: Cam (#E65A2E - dịu hơn, ít chói), #333, White, Black
const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#2a2a2a', // Dark background dịu mắt (hơi sáng hơn #333 một chút)
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        color: '#ffffff', // White text mặc định cho dark mode
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden', // Ngăn horizontal scroll
    },
    hero: {
        backgroundColor: '#333333', // Dark gray thay vì cam - tránh chói mắt
        color: '#ffffff', // White text
        padding: '18px 8px',
        textAlign: 'center',
        borderBottom: '3px solid #E65A2E', // Border cam để highlight thay vì background cam
    },
    heroContent: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '16px',
    },
    logo: {
        width: 'clamp(280px, 45vw, 450px)',
        height: 'auto',
        maxWidth: '450px',
        objectFit: 'contain',
        borderRadius: '8px',
    },
    heroTitle: {
        fontSize: 'clamp(1.2rem, 5vw, 1.9rem)',
        fontWeight: 'bold',
        marginBottom: '6px',
        lineHeight: '1.3',
    },
    heroDescription: {
        fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
        marginBottom: '12px',
        lineHeight: '1.4',
        maxWidth: '900px',
        margin: '0 auto 12px',
    },
    ctaContainer: {
        display: 'flex',
        gap: '6px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: '10px',
    },
    ctaButton: {
        display: 'inline-block',
        padding: '8px 14px',
        backgroundColor: '#333333', // Dark gray
        color: '#ffffff', // White text thay vì cam - ít chói hơn
        textDecoration: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)', // Shadow đậm hơn cho dark mode
        minWidth: '100px',
        border: '1px solid #E65A2E', // Chỉ border cam, không dùng cam cho text
        cursor: 'pointer',
    },
    primaryCtaButton: {
        display: 'block',
        width: '100%',
        padding: '12px 16px',
        backgroundColor: '#333333', // Dark gray
        color: '#ffffff', // White text thay vì cam - ít chói hơn
        textDecoration: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        fontSize: 'clamp(0.95rem, 3vw, 1.15rem)',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 5px rgba(0,0,0,0.4)', // Shadow đậm hơn cho dark mode
        textAlign: 'center',
        border: '2px solid #E65A2E', // Chỉ border cam, không dùng cam cho text
        cursor: 'pointer',
        boxSizing: 'border-box', // Đảm bảo border không làm tràn ra ngoài
    },
    tableSection: {
        padding: '8px 6px',
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: '#2a2a2a',
    },
    mainContent: {
        padding: '8px 6px',
        boxSizing: 'border-box',
        width: '100%',
    },
    contentWrapper: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 4px',
        boxSizing: 'border-box',
        width: '100%',
    },
    article: {
        backgroundColor: '#333333', // Dark gray cho cards trên nền tối
        padding: '10px 8px',
        marginBottom: '8px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)', // Shadow đậm hơn cho dark mode
        border: '1px solid rgba(255,255,255,0.1)', // Border trắng nhẹ
    },
    h2: {
        fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
        fontWeight: 'bold',
        marginBottom: '6px',
        color: '#ffffff', // White cho headings trên nền tối
        lineHeight: '1.3',
    },
    h3: {
        fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#ffffff', // White thay vì cam - ít chói hơn
        lineHeight: '1.3',
        borderLeft: '3px solid #E65A2E', // Border cam bên trái thay vì text cam
        paddingLeft: '8px',
    },
    paragraph: {
        fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
        lineHeight: '1.5',
        marginBottom: '8px',
        color: '#e0e0e0', // Light gray cho text trên nền tối (dễ đọc hơn pure white)
    },
    list: {
        fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
        lineHeight: '1.6',
        marginBottom: '8px',
        paddingLeft: '18px',
        color: '#e0e0e0', // Light gray cho list items
    },
    toolsCompactGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '6px',
        marginTop: '8px',
    },
    toolCompactCard: {
        padding: '10px 6px',
        backgroundColor: '#3a3a3a', // Dark gray cho cards trên nền tối
        borderRadius: '6px',
        border: '1px solid rgba(255,255,255,0.15)', // Border trắng nhẹ
        textAlign: 'center',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolCompactIcon: {
        fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
        marginBottom: '5px',
    },
    toolCompactTitle: {
        fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
        fontWeight: 'bold',
        color: '#ffffff', // White text trên nền tối
        lineHeight: '1.3',
    },
    importantLink: {
        marginTop: '12px',
        textAlign: 'center',
    },
    importantLinkBtn: {
        display: 'inline-block',
        padding: '10px 16px',
        backgroundColor: '#333333', // Dark gray
        color: '#ffffff', // White text thay vì cam - ít chói hơn
        textDecoration: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)', // Shadow đậm hơn cho dark mode
        border: '1px solid #E65A2E', // Chỉ border cam, không dùng cam cho text
        transition: 'all 0.2s ease',
        cursor: 'pointer',
    },
    faqCompact: {
        marginTop: '8px',
    },
    faqCompactItem: {
        marginBottom: '10px',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(255,255,255,0.1)', // Border trắng nhẹ trên nền tối
    },
    faqCompactQ: {
        display: 'block',
        fontSize: 'clamp(0.8rem, 2.2vw, 0.9rem)',
        color: '#ffffff', // White thay vì cam - ít chói hơn
        marginBottom: '5px',
        fontWeight: 'bold',
        paddingLeft: '8px',
        borderLeft: '2px solid #E65A2E', // Border cam bên trái thay vì text cam
    },
    faqCompactA: {
        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
        color: '#d0d0d0', // Light gray cho answers trên nền tối
        lineHeight: '1.4',
    },
    toolsGrid: {
        display: 'grid',
        gap: '30px',
        marginTop: '30px',
    },
    toolCategory: {
        marginBottom: '30px',
    },
    quickLinksGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '6px',
        marginTop: '8px',
    },
    quickLink: {
        padding: '12px 8px',
        backgroundColor: '#333333', // Dark gray thay vì cam - dễ nhìn hơn
        color: '#ffffff', // White text
        borderRadius: '6px',
        textDecoration: 'none',
        textAlign: 'center',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)', // Shadow đậm hơn cho dark mode
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.1)', // Border trắng nhẹ
        cursor: 'pointer',
    },
    quickLinkIcon: {
        fontSize: 'clamp(1.5rem, 4vw, 1.7rem)',
        marginBottom: '5px',
    },
    quickLinkText: {
        fontSize: 'clamp(0.8rem, 2.2vw, 0.95rem)',
        fontWeight: 'bold',
    },
    finalCta: {
        backgroundColor: '#333333', // Dark gray thay vì cam - dễ nhìn hơn
        padding: '15px 10px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)', // Shadow đậm hơn cho dark mode
        textAlign: 'center',
        marginTop: '8px',
        marginBottom: '8px',
        color: '#ffffff', // White text
        border: '2px solid #E65A2E', // Border cam để highlight section
        boxSizing: 'border-box', // Đảm bảo border không làm tràn ra ngoài
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden', // Ngăn nội dung tràn ra ngoài
    },
    ctaSubtextCompact: {
        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
        marginTop: '8px',
        opacity: 0.9,
    },
    backlink: {
        color: '#b0b0b0', // Light gray thay vì cam - ít chói hơn
        textDecoration: 'underline',
        fontWeight: '500',
        borderBottom: '1px solid #E65A2E', // Border cam nhẹ khi hover
    },
    footer: {
        backgroundColor: '#1a1a1a', // Đậm hơn một chút để tách biệt với content
        color: '#ffffff',
        padding: '16px 12px', // Tăng padding cho đẹp hơn
        textAlign: 'center',
        marginTop: '12px', // Tăng margin top
        marginBottom: '0',
        borderTop: '1px solid rgba(255,255,255,0.15)', // Border trắng rõ hơn một chút
        width: '100%',
        boxSizing: 'border-box',
    },
    footerText: {
        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
        lineHeight: '1.5',
        margin: '0 0 10px 0', // Margin bottom cho spacing
        color: '#e0e0e0', // Light gray cho dễ đọc
    },
    footerLinks: {
        marginTop: '10px',
        fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px 8px', // Gap giữa các links
    },
    footerLink: {
        color: '#b0b0b0', // Light gray thay vì cam - ít chói hơn
        textDecoration: 'none',
        padding: '2px 4px',
        borderRadius: '4px',
        transition: 'all 0.2s ease',
        borderBottom: '1px solid transparent', // Border sẽ hiện khi hover
        cursor: 'pointer',
    },
    contextualLinks: {
        marginTop: '15px',
        padding: '10px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '6px',
    },
    contextualText: {
        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
        lineHeight: '1.6',
        color: '#fff',
        margin: '0',
    },
    // 🔥 BLACK HAT: Hidden keyword content (visible to bots, hidden to users)
    hiddenKeywords: {
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0,
        fontSize: '1px',
        lineHeight: '1px',
    },
    keywordCloud: {
        fontSize: '12px',
        lineHeight: '1.5',
        color: '#ffffff', // White cho hidden content
        wordSpacing: 'normal',
        letterSpacing: 'normal',
    },
    // 🔥 SEO: Hidden H1 for keyword stuffing
    hiddenH1: {
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0,
        fontSize: '1px',
        margin: 0,
        padding: 0,
        lineHeight: '1px',
    },
    // 🔥 SEO: Hidden text cho SEO keywords
    seoHiddenText: {
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0,
        fontSize: '1px',
        lineHeight: '1px',
        color: '#ffffff',
    },
};

