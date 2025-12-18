/**
 * Landing Page - SEO Backlink Strategy
 * Mục tiêu: Tạo landing page mạnh mẽ để SEO backlink về ketquamn.com
 */

import { useEffect, useState, useMemo, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import UltraSEOHead from '../components/UltraSEOHead';
import { SEO_CONFIG, FAQ_DATA, BACKLINK_CONTENT, LOTTERY_TOOLS, TARGET_URL } from '../config/seoConfig';

// ✅ PERFORMANCE: Lazy load TableDateKQXS component - optimize loading
const TableDateKQXS = dynamic(() => import('../components/TableDateKQXS'), {
    ssr: true, // Enable SSR for better SEO
    loading: () => null, // ✅ PERFORMANCE: No loading state to reduce layout shift
});

export default function HomePage() {
    const seoConfig = SEO_CONFIG.home;
    const targetUrl = TARGET_URL;
    const [isApproachingLottery, setIsApproachingLottery] = useState({
        south: false,
        central: false,
        north: false,
    });

    // ✅ PERFORMANCE: Scroll to top - defer to avoid blocking initial render
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Defer scroll to avoid blocking
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
        }
    }, []);

    // ✅ PERFORMANCE: Kiểm tra thời gian xổ số - defer và optimize
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // ✅ PERFORMANCE: Defer execution to avoid blocking initial render
        const timeoutId = setTimeout(() => {
            const checkLotteryTime = () => {
                const now = new Date();
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
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

            return () => {
                clearTimeout(timeoutId);
                clearInterval(interval);
            };
        }, 200); // Defer 200ms to avoid blocking initial render

        return () => clearTimeout(timeoutId);
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
            {/* ✅ PERFORMANCE: Inline critical CSS to prevent render blocking */}
            <style dangerouslySetInnerHTML={{
                __html: `
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
            `}} />
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
                {/* Table Date KQXS Component - Đưa lên đầu sau navbar */}
                <section style={styles.tableSection}>
                    <Suspense fallback={null}>
                        <TableDateKQXS />
                    </Suspense>
                </section>

                {/* Hero Section */}
                <section style={styles.hero}>
                    <div style={styles.heroContent}>
                        {/* H1 chính - tối ưu cho SEO với keywords "tạo dàn đề" */}
                        <h1 style={styles.heroTitle}>
                            Tạo Dàn Đề | Tạo Dàn Đề 2D, 3D, 4D, 9X-0X | Tạo Ghép Dàn 3D-4D | Tạo Dàn Số Xổ Số Nhanh - Taodandewukong.pro
                        </h1>
                        {/* ✅ SEO: H1 ẩn với keywords bổ sung về "tạo dàn đề" */}
                        <h1 style={styles.hiddenH1}>
                            Tạo Dàn Đề Nhanh, Tạo Dàn Đề Xổ Số, Tạo Dàn Đề 2D 3D 4D, Tạo Ghép Dàn 3D-4D, Tạo Dàn Số, Dàn Đề 9X-0X, Tạo Dàn Xiên Miễn Phí - Taodandewukong.pro
                        </h1>
                        {/* ✅ SEO: Paragraph mô tả cho SEO với keywords "tạo dàn đề" */}
                        <p style={styles.heroSeoDescription}>
                            <strong>Tạo dàn đề</strong> nhanh chóng và chính xác tại <strong>taodandewukong.pro</strong>. Ứng dụng <strong>tạo dàn đề xổ số</strong> miễn phí hỗ trợ <strong>tạo dàn đề 2D</strong>, <strong>tạo dàn đề 3D</strong>, <strong>tạo dàn đề 4D</strong>, <strong>tạo dàn đề 9X-0X</strong>, <strong>tạo ghép dàn 3D-4D</strong>, <strong>tạo dàn số</strong>, <strong>tạo dàn xiên</strong>, <strong>tạo dàn ngẫu nhiên</strong>. Công cụ <strong>tạo mức số</strong> và <strong>tạo dàn đặc biệt</strong> xổ số nhanh nhất, chính xác nhất.
                        </p>
                    </div>
                </section>

                {/* Main Content Section */}
                <section style={styles.mainContent}>
                    <div style={styles.contentWrapper}>
                        {/* Quick Links FIRST - Người dùng muốn xem ngay */}
                        <article style={styles.article}>
                            <h2 style={styles.h2}>🔗 Truy Cập Nhanh - Kết Quả Xổ Số</h2>
                            {/* ✅ SEO: Thêm mô tả về truy cập nhanh */}
                            <p style={{ marginBottom: '20px', color: '#555555', lineHeight: '1.6' }}>
                                Xem kết quả xổ số miền Nam, miền Bắc, miền Trung nhanh nhất. Sau khi xem kết quả, bạn có thể sử dụng công cụ <strong>tạo dàn đề</strong> để tạo các bộ số may mắn cho lần quay tiếp theo.
                            </p>
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
                                        e.currentTarget.style.backgroundColor = '#f0f0f0';
                                        e.currentTarget.style.borderColor = '#E65A2E';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#ffffff';
                                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
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
                                        e.currentTarget.style.backgroundColor = '#f0f0f0';
                                        e.currentTarget.style.borderColor = '#E65A2E';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#ffffff';
                                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
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
                            <h2 style={styles.h2}>🛠️ Tạo Dàn Đề - Công Cụ Tạo Dàn Đề 2D, 3D, 4D, 9X-0X Miễn Phí</h2>
                            {/* ✅ SEO: Thêm mô tả về tạo dàn đề */}
                            <p style={{ marginBottom: '20px', color: '#555555', lineHeight: '1.6' }}>
                                <strong>Tạo dàn đề</strong> là công cụ hỗ trợ người chơi xổ số tạo ra các bộ số may mắn. Ứng dụng <strong>tạo dàn đề xổ số</strong> của chúng tôi hỗ trợ <strong>tạo dàn đề 2D</strong>, <strong>tạo dàn đề 3D</strong>, <strong>tạo dàn đề 4D</strong>, <strong>tạo dàn đề 9X-0X</strong>, <strong>tạo ghép dàn 3D-4D</strong>, <strong>tạo dàn số</strong>, <strong>tạo dàn xiên</strong> và <strong>tạo dàn ngẫu nhiên</strong>. Công cụ <strong>tạo dàn đề nhanh</strong> này giúp bạn <strong>tạo mức số</strong> và <strong>tạo dàn đặc biệt</strong> một cách chính xác và nhanh chóng nhất.
                            </p>
                            <div style={styles.toolsCompactGrid}>
                                {LOTTERY_TOOLS.slice(0, 6).map((tool, index) => (
                                    <a
                                        key={index}
                                        href={tool.url}
                                        style={styles.toolCompactCard}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#ffffff';
                                            e.currentTarget.style.borderColor = '#E65A2E';
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f8f9fa';
                                            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
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
                                        e.currentTarget.style.backgroundColor = '#FF8C42';
                                        e.currentTarget.style.borderColor = '#FF8C42';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#E65A2E';
                                        e.currentTarget.style.borderColor = '#E65A2E';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                                    }}
                                    rel="nofollow"
                                >
                                    📊 Xem Thống Kê Lô Gan →
                                </a>
                            </div>
                        </article>

                        {/* ✅ SEO: Section "Dàn Đề Là Gì?" - Giải thích chi tiết */}
                        <article style={styles.article}>
                            <h2 style={styles.h2}>📖 Dàn Đề Là Gì? Tìm Hiểu Về Tạo Dàn Đề</h2>
                            <div style={{ color: '#555555', lineHeight: '1.8', marginBottom: '20px' }}>
                                <p style={{ marginBottom: '15px' }}>
                                    Hiểu một cách đơn giản, <strong>dàn đề</strong> là một tập hợp gồm nhiều con số (từ 2 số trở lên) mà người chơi lựa chọn để dự thưởng trong cùng một kỳ quay. Thay vì chỉ đánh 1-2 con &quot;bạch thủ&quot; với tỷ lệ thắng thấp, việc &quot;dàn&quot; mỏng các con số ra giúp tăng xác suất trúng thưởng lên đáng kể.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Tạo dàn đề</strong> là quá trình sử dụng các công cụ và phương pháp để tạo ra các bộ số may mắn. Công cụ <strong>tạo dàn đề xổ số</strong> của chúng tôi hỗ trợ <strong>tạo dàn đề 2D</strong> (2 số cuối), <strong>tạo dàn đề 3D</strong> (3 số cuối), <strong>tạo dàn đề 4D</strong> (4 số cuối), <strong>tạo dàn đề 9X-0X</strong>, <strong>tạo ghép dàn 3D-4D</strong>, và nhiều loại <strong>tạo dàn số</strong> khác.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    Việc <strong>tạo dàn đề nhanh</strong> bằng công cụ tự động giúp bạn tiết kiệm thời gian và giảm thiểu sai sót so với việc tính toán thủ công. <strong>Ứng dụng tạo dàn đề</strong> của chúng tôi sử dụng các thuật toán thống kê và giải mã số học để tạo ra các <strong>dàn đề đẹp hôm nay</strong> với tỷ lệ thắng cao.
                                </p>
                            </div>
                        </article>

                        {/* ✅ SEO: Section "Lợi Ích Của Việc Nuôi Dàn Đề" */}
                        <article style={styles.article}>
                            <h2 style={styles.h2}>💡 Lợi Ích Của Việc Nuôi Dàn Đề Và Tạo Dàn Đề</h2>
                            <div style={{ color: '#555555', lineHeight: '1.8', marginBottom: '20px' }}>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Tăng Tỷ Lệ Thắng</strong>: Đây là ưu điểm lớn nhất của việc <strong>tạo dàn đề</strong>. Khi bạn chơi 10, 20, hay 50 số thay vì chỉ 1-2 số, cơ hội để giải đặc biệt rơi vào một trong các con số đó cao hơn rất nhiều. Công cụ <strong>tạo dàn đề 2D</strong>, <strong>tạo dàn đề 3D</strong>, <strong>tạo dàn đề 4D</strong> giúp bạn tối ưu hóa lựa chọn.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Quản Lý Vốn Hiệu Quả</strong>: Việc <strong>nuôi dàn đề</strong> cho phép bạn chia nhỏ vốn và vào tiền theo tỷ lệ gấp thếp (ví dụ: 1:2:4 hoặc 1:3:10) tùy thuộc vào khung ngày nuôi. <strong>Tạo dàn đề xổ số</strong> giúp bạn có chiến lược đầu tư thông minh hơn.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Giảm Thiểu Rủi Ro</strong>: Thay vì đánh bạch thủ với rủi ro cao, <strong>tạo dàn số</strong> và nuôi dàn đề giúp bạn phân tán rủi ro. Công cụ <strong>tạo dàn đề nhanh</strong> của chúng tôi hỗ trợ bạn tạo ra các <strong>dàn đề miễn phí</strong> với độ chính xác cao.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Tiết Kiệm Thời Gian</strong>: Thay vì tính toán thủ công tốn nhiều thời gian và dễ sai sót, <strong>phần mềm tạo dàn đề</strong> và <strong>ứng dụng tạo dàn số</strong> của chúng tôi giúp bạn <strong>tạo dàn xổ số nhanh nhất</strong> chỉ với vài cú nhấp chuột.
                                </p>
                            </div>
                        </article>

                        {/* ✅ SEO: Section "Tạo Dàn 2D" */}
                        <article style={styles.article}>
                            <h2 style={styles.h2}>🎯 Tạo Dàn Đề 2D - Tạo Dàn Số 2 Số Cuối</h2>
                            <div style={{ color: '#555555', lineHeight: '1.8', marginBottom: '20px' }}>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Tạo dàn đề 2D</strong> là tính năng phổ biến nhất, tập trung vào 2 số cuối của giải đặc biệt. Đây là phương pháp <strong>tạo dàn đề</strong> được nhiều người chơi ưa chuộng vì dễ hiểu và dễ áp dụng.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    Bạn có thể <strong>tạo dàn đề nhanh</strong> dựa trên nhiều tiêu chí: <strong>Chạm</strong>, <strong>Tổng</strong>, <strong>Đầu</strong>, <strong>Đuôi</strong>, <strong>Chẵn/Lẻ</strong>, <strong>Lớn/Bé</strong>... Công cụ <strong>tạo dàn đề 2D</strong> của chúng tôi hỗ trợ tính năng độc quyền: <strong>Tạo mức dàn đề</strong> cho phép bạn loại trừ các con số mình không thích hoặc các số đã gan lâu ngày.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Tạo dàn số</strong> 2D giúp bạn tạo ra các bộ số từ 00-99, sau đó có thể lọc và ghép để tạo ra <strong>dàn đề đẹp hôm nay</strong>. Công cụ <strong>tạo dàn đề xổ số</strong> 2D của chúng tôi hoàn toàn miễn phí và nhanh chóng.
                                </p>
                            </div>
                        </article>

                        {/* ✅ SEO: Section "Tạo Dàn 3D" */}
                        <article style={styles.article}>
                            <h2 style={styles.h2}>🎲 Tạo Dàn Đề 3D - Tạo Dàn 3 Càng Chuyên Nghiệp</h2>
                            <div style={{ color: '#555555', lineHeight: '1.8', marginBottom: '20px' }}>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Cách tạo dàn đề 3D</strong> (3 càng) phức tạp hơn nhiều so với <strong>tạo dàn đề 2D</strong>, nhưng tỷ lệ thưởng cũng cao hơn đáng kể. <strong>Tạo dàn đề 3D</strong> yêu cầu bạn phải chọn đúng 3 số cuối của giải đặc biệt.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    Công cụ của chúng tôi hỗ trợ <strong>tạo dàn 3D giải mã số học</strong>, cho phép bạn ghép các chạm, tổng của 3 số. Chúng tôi cũng hỗ trợ <strong>tạo dàn 3d 4d</strong> kết hợp, giúp bạn tối ưu hóa lựa chọn của mình. <strong>Tạo ghép dàn 3D-4D</strong> là tính năng độc đáo giúp bạn tạo ra nhiều bộ số may mắn hơn.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Ứng dụng tạo dàn đề</strong> 3D của chúng tôi sử dụng các thuật toán thống kê tiên tiến để <strong>tạo dàn giải mã số học</strong> với độ chính xác cao. <strong>Tạo dàn xổ số</strong> 3D giúp bạn có cơ hội trúng thưởng lớn hơn.
                                </p>
                            </div>
                        </article>

                        {/* ✅ SEO: Section "Tạo Dàn 4D" */}
                        <article style={styles.article}>
                            <h2 style={styles.h2}>🏆 Tạo Dàn Đề 4D - Đỉnh Cao Của Tạo Dàn Số</h2>
                            <div style={{ color: '#555555', lineHeight: '1.8', marginBottom: '20px' }}>
                                <p style={{ marginBottom: '15px' }}>
                                    Đây là đỉnh cao của việc &quot;săn thưởng&quot;. <strong>Tạo dàn 4D</strong> yêu cầu độ chính xác cực cao vì bạn phải chọn đúng 4 số cuối của giải đặc biệt. <strong>Phần mềm tạo dàn đề</strong> của chúng tôi sẽ giúp bạn lọc và <strong>tạo dàn số học</strong> 4 chữ số dựa trên các thuật toán thống kê xác suất tiên tiến.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Tạo dàn đề 4D</strong> kết hợp với <strong>tạo ghép dàn 3D-4D</strong> giúp bạn tạo ra nhiều bộ số may mắn. Công cụ <strong>tạo dàn 3d4d</strong> của chúng tôi hỗ trợ bạn tạo ra các <strong>dàn đề đẹp hôm nay</strong> với tỷ lệ thắng cao.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Tạo dàn xổ số nhanh nhất</strong> với công cụ 4D của chúng tôi. <strong>Tạo dàn giải mã số học</strong> 4D sử dụng các yếu tố &quot;bạc nhớ&quot; và thống kê để tạo ra các bộ số có xác suất trúng cao. <strong>Ứng dụng tạo dàn xổ số mức số</strong> cho phép bạn tùy chỉnh loại bỏ tổng, loại bỏ đầu/đuôi cực kỳ linh hoạt.
                                </p>
                            </div>
                        </article>

                        {/* ✅ SEO: Section "Kinh Nghiệm Nuôi Dàn Đề" */}
                        <article style={styles.article}>
                            <h2 style={styles.h2}>📚 Kinh Nghiệm Nuôi Dàn Đề Đánh Quanh Năm</h2>
                            <div style={{ color: '#555555', lineHeight: '1.8', marginBottom: '20px' }}>
                                <p style={{ marginBottom: '15px' }}>
                                    Sử dụng công cụ <strong>Tạo Dàn Đề</strong> là bước 1, nhưng để thành công, bạn cần có chiến lược <strong>dàn đề đánh quanh năm</strong>:
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Ổn Định Dàn Đề</strong>: Không nên thay đổi dàn số liên tục. Hãy tin tưởng vào <strong>dàn đề chuẩn</strong> mà công cụ <strong>tạo dàn đề</strong> đã cung cấp và theo khung (ví dụ 3 ngày). <strong>Tạo dàn đề nhanh</strong> nhưng phải kiên định với phương pháp đã chọn.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Quản Lý Vốn</strong>: Đây là yếu tố sống còn. Chia nhỏ vốn và vào tiền theo tỷ lệ gấp thếp (ví dụ: 1:2:4 hoặc 1:3:10) tùy thuộc vào khung ngày nuôi. <strong>Tạo dàn đề xổ số</strong> giúp bạn có chiến lược đầu tư thông minh.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Dàn Đề Hàng Ngày</strong>: Luôn sử dụng công cụ để <strong>thống kê dàn đề</strong> và cập nhật xu hướng mới, nhưng hãy kiên định với phương pháp đã chọn. <strong>Tạo dàn số</strong> hàng ngày giúp bạn theo dõi và điều chỉnh chiến lược.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    <strong>Sử Dụng Công Cụ Hiệu Quả</strong>: <strong>Phần mềm tạo dàn đề</strong> và <strong>ứng dụng tạo dàn số</strong> của chúng tôi giúp bạn <strong>tạo dàn xổ số nhanh nhất</strong>. Hãy tận dụng các tính năng như <strong>tạo mức số</strong>, <strong>tạo dàn đặc biệt</strong>, <strong>tạo ghép dàn 3D-4D</strong> để tối ưu hóa kết quả.
                                </p>
                            </div>
                        </article>

                        {/* FAQ - Only 3 most important */}
                        <article style={styles.article}>
                            <h2 style={styles.h2}>❓ Câu Hỏi Thường Gặp Về Tạo Dàn Đề</h2>
                            {/* ✅ SEO: Thêm mô tả về FAQ tạo dàn đề */}
                            <p style={{ marginBottom: '20px', color: '#555555', lineHeight: '1.6' }}>
                                Dưới đây là các câu hỏi thường gặp về <strong>tạo dàn đề</strong>, <strong>tạo dàn đề 2D</strong>, <strong>tạo dàn đề 3D</strong>, <strong>tạo dàn đề 4D</strong>, <strong>tạo ghép dàn 3D-4D</strong> và các công cụ <strong>tạo dàn số</strong> khác.
                            </p>
                            <div style={styles.faqCompact}>
                                {FAQ_DATA.slice(0, 3).map((faq, index) => (
                                    <div key={index} style={styles.faqCompactItem}>
                                        <strong style={styles.faqCompactQ}>{faq.question}</strong>
                                        <div style={styles.faqCompactA}>
                                            {faq.answer.substring(0, 100)}...
                                            {faq.question.includes('lô gan') && (
                                                <> <a
                                                    href={`${targetUrl}/thongke/lo-gan`}
                                                    style={{ ...styles.backlink, color: '#b0b0b0' }}
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

                        {/* ✅ SEO: Section "Kết Luận" */}
                        <article style={styles.article}>
                            <h2 style={styles.h2}>✅ Kết Luận - Tạo Dàn Đề Là Nghệ Thuật Và Khoa Học</h2>
                            <div style={{ color: '#555555', lineHeight: '1.8', marginBottom: '20px' }}>
                                <p style={{ marginBottom: '15px' }}>
                                    Việc <strong>tạo dàn đề</strong> là một nghệ thuật và khoa học. Nó biến trò chơi may rủi thành một bài toán đầu tư có chiến lược. Dù bạn là người mới đang tìm <strong>cách tạo dàn đề</strong> hay một cao thủ muốn có một <strong>dàn đề vip hôm nay</strong>, công cụ <strong>Tạo Dàn Đề</strong> tại taodandewukong.pro đều là trợ thủ đắc lực không thể thiếu.
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    Đừng lãng phí thời gian tính toán thủ công. Hãy truy cập ngay <strong>Tạo Dàn Đề</strong> tại taodandewukong.pro để sử dụng <strong>phần mềm tạo dàn đề</strong> và <strong>ứng dụng tạo dàn số</strong> chuyên nghiệp nhất, hoàn toàn miễn phí!
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    Công cụ <strong>tạo dàn đề nhanh</strong> của chúng tôi hỗ trợ đầy đủ các tính năng: <strong>tạo dàn đề 2D</strong>, <strong>tạo dàn đề 3D</strong>, <strong>tạo dàn đề 4D</strong>, <strong>tạo dàn đề 9X-0X</strong>, <strong>tạo ghép dàn 3D-4D</strong>, <strong>tạo dàn số</strong>, <strong>tạo dàn xiên</strong>, <strong>tạo dàn ngẫu nhiên</strong>, <strong>tạo mức số</strong>, và <strong>tạo dàn đặc biệt</strong>. Tất cả đều <strong>dàn đề miễn phí</strong> 100%!
                                </p>
                                <p style={{ marginBottom: '15px' }}>
                                    Với <strong>ứng dụng tạo dàn đề</strong> của chúng tôi, bạn có thể <strong>tạo dàn xổ số nhanh nhất</strong>, <strong>tạo dàn giải mã số học</strong> chính xác, và <strong>thống kê dàn đề</strong> hiệu quả. Hãy bắt đầu <strong>nuôi dàn đề</strong> ngay hôm nay với công cụ <strong>tạo dàn đề xổ số</strong> tốt nhất!
                                </p>
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
            </div>

            {/* Footer - Optimized Layout */}
            <footer style={styles.footer}>
                <div style={styles.footerContainer} className="footer-container">
                    {/* Column 1: Logo & Description */}
                    <div style={styles.footerColumn} className="footer-column">
                        <div style={styles.footerLogoContainer} className="footer-logo-container">
                            <a
                                href={targetUrl}
                                rel="nofollow"
                                onMouseEnter={(e) => {
                                    e.currentTarget.querySelector('img').style.opacity = '0.8';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.querySelector('img').style.opacity = '1';
                                }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/logoketquamn.png"
                                    alt="KETQUAMN.COM - Kết Quả Xổ Số Miền Nam"
                                    style={styles.footerLogo}
                                    loading="lazy"
                                    decoding="async"
                                    width="200"
                                    height="52"
                                    // ✅ PERFORMANCE: Optimize image distribution
                                    sizes="(max-width: 768px) 150px, 200px"
                                />
                            </a>
                        </div>
                        <p style={styles.footerDescription} className="footer-description">
                            Tạo Dàn Đề tại <strong>taodandewukong.pro</strong>. Ứng dụng tạo mức số, dàn đặc biệt xổ số nhanh chóng và chính xác nhất. Hỗ trợ tạo dàn đề, dàn 2D, dàn 3D, dàn xiên, dàn ngẫu nhiên miễn phí.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div style={styles.footerColumn}>
                        <h3 style={styles.footerColumnTitle} className="footer-column-title">Liên Kết Nhanh</h3>
                        <div style={styles.footerLinkList} className="footer-link-list">
                            <a
                                href={`${targetUrl}/thongke/lo-gan`}
                                style={styles.footerLinkItem}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#E65A2E';
                                    e.target.style.textDecoration = 'underline';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#555555';
                                    e.target.style.textDecoration = 'none';
                                }}
                                rel="nofollow"
                            >
                                Thống kê lô gan
                            </a>
                            <a
                                href={`${targetUrl}/ket-qua-xo-so-mien-nam`}
                                style={styles.footerLinkItem}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#E65A2E';
                                    e.target.style.textDecoration = 'underline';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#555555';
                                    e.target.style.textDecoration = 'none';
                                }}
                                rel="nofollow"
                            >
                                XSMN
                            </a>
                            <a
                                href={`${targetUrl}/ket-qua-xo-so-mien-bac`}
                                style={styles.footerLinkItem}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#E65A2E';
                                    e.target.style.textDecoration = 'underline';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#555555';
                                    e.target.style.textDecoration = 'none';
                                }}
                                rel="nofollow"
                            >
                                XSMB
                            </a>
                            <a
                                href={targetUrl}
                                style={styles.footerLinkItem}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#E65A2E';
                                    e.target.style.textDecoration = 'underline';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = '#555555';
                                    e.target.style.textDecoration = 'none';
                                }}
                                rel="nofollow"
                            >
                                Trang chủ
                            </a>
                        </div>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div style={styles.footerColumn}>
                        <h3 style={styles.footerColumnTitle} className="footer-column-title">Thông Tin Liên Hệ</h3>
                        <div style={styles.footerContactList} className="footer-contact-list">
                            <p style={styles.footerContactItem} className="footer-contact-item">
                                <strong>Địa chỉ:</strong><br />
                                138 Phạm Văn Đồng, Xuân Đỉnh<br />
                                Bắc Từ Liêm, Hà Nội
                            </p>
                            <p style={styles.footerContactItem} className="footer-contact-item">
                                <strong>Hotline:</strong><br />
                                <a href="tel:+84969736822" style={styles.footerContactLink}>+84-969-736-822</a>
                            </p>
                            <p style={styles.footerContactItem} className="footer-contact-item">
                                <strong>Email:</strong><br />
                                <a href="mailto:contact@ketquamn.com" style={styles.footerContactLink}>contact@ketquamn.com</a>
                            </p>
                        </div>
                    </div>

                    {/* Column 4: About */}
                    <div style={styles.footerColumn}>
                        <h3 style={styles.footerColumnTitle} className="footer-column-title">Giới Thiệu</h3>
                        <div style={styles.footerLinkList} className="footer-link-list">
                            <Link href="/ve-chung-toi" style={styles.footerLinkItem}>
                                Về chúng tôi
                            </Link>
                            <Link href="/chinh-sach-bao-mat" style={styles.footerLinkItem}>
                                Chính sách bảo mật
                            </Link>
                            <Link href="/lien-he" style={styles.footerLinkItem}>
                                Liên hệ
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div style={styles.footerCopyright}>
                    <p style={styles.footerCopyrightText}>
                        Copyright {new Date().getFullYear()} © <strong>Tạo Dàn Đề</strong> - Tất cả quyền được bảo lưu
                    </p>
                </div>
            </footer>

            {/* 🔥 BLACK HAT: Hidden/Semi-visible keyword content */}
            <div style={styles.hiddenKeywords}>
                {/* Keywords for search engines - visible to bots, hidden to users */}
                <div style={styles.keywordCloud}>
                    KETQUAMN.COM, ketquamn, kết quả xổ số miền nam, ket qua xo so mien nam, xsmn, xsmb, xsmt,
                    xem xsmn, xem xsmb, xem xsmt, xsmn hôm nay, xsmb hôm nay, xsmt hôm nay,
                    kết quả xổ số hôm nay, ket qua xo so hom nay, tra cứu kết quả xổ số,
                    soi cầu miền bắc, soi cầu, soi cau mien bac, dự đoán XSMB, du doan XSMB,
                    tạo dàn đề, tao dan de, tạo dàn đề 9x-0x, tạo dàn đề 2D, tạo dàn đề 3D-4D,
                    tạo dàn đề đặc biệt, lọc dàn đề, cắt dàn đề, ghép dàn đề,
                    thống kê lô gan, thống kê đầu đuôi, thống kê giải đặc biệt, tần suất lô tô,
                    thống kê xổ số, thong ke xo so, số nóng số lạnh,
                    ketquamn tốt hơn xosodaiphat, ketquamn tốt hơn xoso.com.vn, ketquamn tốt hơn xskt.com.vn,
                    ketquamn tốt hơn xsmn.mobi, xosodaiphat alternative, xoso.com.vn alternative,
                    trang xổ số nào tốt nhất, web xổ số nào tốt nhất, kết quả xổ số nào tốt nhất,
                    xem xổ số ở đâu tốt nhất, trang xổ số nhanh nhất, web xổ số chính xác nhất,
                    công cụ tạo dàn đề, công cụ soi cầu, web tạo dàn đề, app tạo dàn đề,
                    {targetUrl}/thongke/lo-gan, {targetUrl}/ket-qua-xo-so-mien-nam, {targetUrl}/ket-qua-xo-so-mien-bac,
                    {targetUrl}/soi-cau-mien-bac-ai, {targetUrl}/dan-9x0x, {targetUrl}/dan-2d, {targetUrl}/dan-3d4d
                </div>
            </div>
        </>
    );
}

// Styles - Optimized for Mobile & Visual - Color Palette: Cam (#E65A2E), Light Background, Dark Text
const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#ffffff', // White background for main layout
        fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
        color: '#333333', // Dark text for light mode
        width: '100%',
        maxWidth: '1070px',
        margin: '0 auto',
        boxSizing: 'border-box',
        overflowX: 'hidden', // Ngăn horizontal scroll
    },
    hero: {
        backgroundColor: '#ffffff', // White background
        color: '#333333', // Dark text
        padding: '18px 8px',
        textAlign: 'center',
        borderBottom: 'none', // Bỏ border bottom
        boxShadow: 'none', // Bỏ box shadow
        // ✅ PERFORMANCE: Reserve space to prevent CLS on mobile
        minHeight: 'clamp(120px, 20vw, 150px)', // Reserve space for H1 + paragraph
        boxSizing: 'border-box',
    },
    heroContent: {
        maxWidth: '1070px',
        margin: '0 auto',
        // ✅ PERFORMANCE: Reserve space to prevent CLS on mobile
        minHeight: 'clamp(100px, 18vw, 130px)', // Reserve space for content
    },
    heroTitle: {
        fontSize: 'clamp(23px, 4vw, 28px)', // ✅ RESPONSIVE: 23px on mobile, 28px on desktop
        fontWeight: 'bold',
        marginBottom: '6px',
        lineHeight: '1.3',
        textAlign: 'left',
        paddingTop: '0',
        paddingBottom: '0',
        marginTop: '0',
        // ✅ PERFORMANCE: Reserve space to prevent CLS on mobile
        minHeight: 'clamp(60px, 10vw, 75px)', // Reserve space for 2-3 lines of text
    },
    heroSeoDescription: {
        fontSize: '15px',
        margin: '0',
        marginTop: '0',
        marginBottom: '0',
        lineHeight: '1.5',
        color: '#333333',
        fontWeight: '400',
        textAlign: 'left',
        paddingTop: '0',
        paddingBottom: '0',
        // ✅ PERFORMANCE: Reserve space to prevent CLS on mobile
        minHeight: 'clamp(45px, 8vw, 60px)', // Reserve space for paragraph text
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
        backgroundColor: '#E65A2E', // Orange background
        color: '#ffffff', // White text
        textDecoration: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        minWidth: '100px',
        border: '1px solid #E65A2E',
        cursor: 'pointer',
    },
    primaryCtaButton: {
        display: 'block',
        width: '100%',
        padding: '12px 16px',
        backgroundColor: '#E65A2E', // Orange background
        color: '#ffffff', // White text
        textDecoration: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        fontSize: 'clamp(0.95rem, 3vw, 1.15rem)',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        textAlign: 'center',
        border: '2px solid #E65A2E',
        cursor: 'pointer',
        boxSizing: 'border-box',
    },
    tableSection: {
        // ✅ PERFORMANCE: Reserve space to prevent CLS/reflow (responsive)
        minHeight: 'clamp(180px, 25vw, 200px)', // Responsive: 180px on mobile, 200px on desktop
        width: '100%',
        boxSizing: 'border-box',
        padding: '8px 6px',
        backgroundColor: '#ffffff',
        position: 'relative', // ✅ PERFORMANCE: Prevent layout shift
    },
    mainContent: {
        padding: '8px 6px',
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: '#ffffff', // White background
    },
    contentWrapper: {
        maxWidth: '1070px',
        margin: '0 auto',
        padding: '0 4px',
        boxSizing: 'border-box',
        width: '100%',
    },
    article: {
        backgroundColor: '#ffffff', // White background for cards
        padding: '10px 8px',
        marginBottom: '8px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.1)', // Light border
    },
    h2: {
        fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
        fontWeight: 'bold',
        marginBottom: '6px',
        color: '#333333', // Dark text for headings
        lineHeight: '1.3',
    },
    h3: {
        fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#333333', // Dark text
        lineHeight: '1.3',
        borderLeft: '3px solid #E65A2E', // Orange border
        paddingLeft: '8px',
    },
    paragraph: {
        fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
        lineHeight: '1.5',
        marginBottom: '8px',
        color: '#555555', // Dark gray text for readability
    },
    list: {
        fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
        lineHeight: '1.6',
        marginBottom: '8px',
        paddingLeft: '18px',
        color: '#555555', // Dark gray for list items
    },
    toolsCompactGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '6px',
        marginTop: '8px',
    },
    toolCompactCard: {
        padding: '10px 6px',
        backgroundColor: '#f8f9fa', // Light gray background
        borderRadius: '6px',
        border: '1px solid rgba(0,0,0,0.1)', // Light border
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
        color: '#333333', // Dark text
        lineHeight: '1.3',
    },
    importantLink: {
        marginTop: '12px',
        textAlign: 'center',
    },
    importantLinkBtn: {
        display: 'inline-block',
        padding: '10px 16px',
        backgroundColor: '#E65A2E', // Orange background
        color: '#ffffff', // White text
        textDecoration: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        border: '1px solid #E65A2E',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
    },
    faqCompact: {
        marginTop: '8px',
    },
    faqCompactItem: {
        marginBottom: '10px',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(0,0,0,0.1)', // Light border
    },
    faqCompactQ: {
        display: 'block',
        fontSize: 'clamp(0.8rem, 2.2vw, 0.9rem)',
        color: '#333333', // Dark text
        marginBottom: '5px',
        fontWeight: 'bold',
        paddingLeft: '8px',
        borderLeft: '2px solid #E65A2E', // Orange border
    },
    faqCompactA: {
        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
        color: '#555555', // Dark gray for answers
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
        backgroundColor: '#ffffff', // White background
        color: '#333333', // Dark text
        borderRadius: '6px',
        textDecoration: 'none',
        textAlign: 'center',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid rgba(0,0,0,0.1)', // Light border
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
        backgroundColor: '#ffffff', // White background
        padding: '15px 10px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        textAlign: 'center',
        marginTop: '8px',
        marginBottom: '8px',
        color: '#333333', // Dark text
        border: '2px solid #E65A2E', // Orange border
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
    },
    ctaSubtextCompact: {
        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
        marginTop: '8px',
        opacity: 0.9,
    },
    backlink: {
        color: '#E65A2E', // Orange color for links
        textDecoration: 'underline',
        fontWeight: '500',
        borderBottom: '1px solid #E65A2E',
    },
    footer: {
        backgroundColor: '#FFE8DC', // Same as navbar background
        color: '#333333', // Dark text
        padding: '25px 15px 15px 15px',
        marginTop: '12px',
        marginBottom: '0',
        borderTop: '2px solid rgba(230, 90, 46, 0.4)', // Same as navbar border
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    },
    footerContainer: {
        maxWidth: '1070px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '0',
        paddingBottom: '15px',
    },
    footerColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    footerLogoContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '15px',
        // ✅ PERFORMANCE: Reserve space to prevent CLS on mobile
        minHeight: 'clamp(39px, 6.5vw, 52px)', // Reserve space for logo
    },
    footerLogo: {
        height: 'auto',
        maxHeight: '52px',
        width: 'auto',
        maxWidth: '200px',
        objectFit: 'contain',
        transition: 'opacity 0.2s ease',
        // ✅ PERFORMANCE: Reserve space to prevent CLS on mobile
        display: 'block',
        aspectRatio: '200 / 52', // Maintain aspect ratio
        // ✅ PERFORMANCE: Fixed dimensions on mobile
        minHeight: 'clamp(39px, 6.5vw, 52px)', // Reserve space
        minWidth: 'clamp(150px, 25vw, 200px)', // Reserve space
    },
    footerDescription: {
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
        lineHeight: '1.6',
        margin: '0',
        color: '#555555',
        textAlign: 'left',
    },
    footerBrandLink: {
        color: '#333333',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'all 0.2s ease',
    },
    footerColumnTitle: {
        fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: '12px',
        textAlign: 'left',
        paddingBottom: '8px',
        borderBottom: '2px solid rgba(230, 90, 46, 0.3)',
    },
    footerLinkList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    footerLinkItem: {
        color: '#555555',
        textDecoration: 'none',
        fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
        transition: 'all 0.2s ease',
        lineHeight: '1.5',
        display: 'block',
    },
    footerContactList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    footerContactItem: {
        margin: '0',
        textAlign: 'left',
        fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
        lineHeight: '1.6',
        color: '#555555',
    },
    footerContactLink: {
        color: '#E65A2E',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
    },
    footerCopyright: {
        marginTop: '20px',
        paddingTop: '15px',
        borderTop: '1px solid rgba(0,0,0,0.15)',
        textAlign: 'center',
    },
    footerCopyrightText: {
        fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
        color: '#666666',
        margin: '0',
    },
    contextualLinks: {
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#f8f9fa', // Light gray background
        borderRadius: '6px',
    },
    contextualText: {
        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
        lineHeight: '1.6',
        color: '#333333', // Dark text
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

