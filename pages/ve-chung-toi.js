/**
 * Về Chúng Tôi Page
 */

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import UltraSEOHead from '../components/UltraSEOHead';
import { TARGET_URL, SITE_URL } from '../config/seoConfig';

export default function VeChungToi() {
    const siteUrl = SITE_URL;
    const targetUrl = TARGET_URL;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Structured Data cho trang về chúng tôi
    const structuredData = useMemo(() => [
        {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'Về Chúng Tôi - KETQUAMN.COM',
            description: 'Tìm hiểu về KETQUAMN.COM - Trang web xem kết quả xổ số 3 miền nhanh nhất, chính xác nhất.',
            url: `${siteUrl}/ve-chung-toi`,
            inLanguage: 'vi-VN',
            breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Trang chủ',
                        item: siteUrl
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Về Chúng Tôi',
                        item: `${siteUrl}/ve-chung-toi`
                    }
                ]
            },
            mainEntity: {
                '@type': 'Organization',
                name: 'KETQUAMN.COM',
                alternateName: ['Kết Quả MN', 'Ket Qua MN'],
                url: targetUrl,
                logo: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}/logoketquamn.png`,
                    width: 512,
                    height: 512
                },
                description: 'Trang web xem kết quả xổ số 3 miền nhanh nhất, chính xác nhất tại Việt Nam. Cung cấp dịch vụ miễn phí, chất lượng cao cho người dùng.',
                foundingDate: '2020',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: '138 Phạm Văn Đồng, Xuân Đỉnh',
                    addressLocality: 'Bắc Từ Liêm',
                    addressRegion: 'Hà Nội',
                    addressCountry: 'VN',
                    postalCode: '100000'
                },
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'Customer Service',
                    telephone: '+84-969-736-822',
                    email: 'contact@ketquamn.com',
                    availableLanguage: ['Vietnamese']
                },
                sameAs: [
                    'https://www.facebook.com/ketquamn',
                    'https://www.youtube.com/@ketquamn'
                ],
                knowsAbout: [
                    'Xổ Số',
                    'Kết Quả Xổ Số',
                    'Thống Kê Xổ Số',
                    'Soi Cầu Xổ Số',
                    'Tạo Dàn Đề',
                    'XSMN',
                    'XSMB',
                    'XSMT'
                ],
                areaServed: {
                    '@type': 'Country',
                    name: 'Vietnam'
                },
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.9',
                    reviewCount: '2500',
                    bestRating: '5',
                    worstRating: '1'
                }
            }
        }
    ], [siteUrl, targetUrl]);

    return (
        <>
            <style jsx global>{`
                @media (max-width: 768px) {
                    .page-container {
                        padding-top: 0 !important;
                        padding-bottom: 20px !important;
                    }
                    .page-content-section {
                        padding: 10px 12px !important;
                    }
                    .page-content-wrapper {
                        padding: 10px 12px !important;
                    }
                }
            `}</style>
            <UltraSEOHead
                title="Về Chúng Tôi - KETQUAMN.COM | Giới Thiệu & Sứ Mệnh"
                description="Tìm hiểu về KETQUAMN.COM - Trang web xem kết quả xổ số 3 miền nhanh nhất, chính xác nhất. Chúng tôi cam kết cung cấp dịch vụ miễn phí, chất lượng cao cho người dùng."
                keywords="về chúng tôi, giới thiệu ketquamn, sứ mệnh ketquamn, ketquamn.com, about ketquamn"
                canonical={`${siteUrl}/ve-chung-toi`}
                ogImage={`${siteUrl}/backgroundseo.png`}
                pageType="article"
                structuredData={structuredData}
                breadcrumbs={[
                    { name: 'Trang chủ', url: siteUrl },
                    { name: 'Về Chúng Tôi', url: `${siteUrl}/ve-chung-toi` }
                ]}
            />

            <div style={styles.container} className="page-container">
                <section style={styles.contentSection} className="page-content-section">
                    <div style={styles.contentWrapper} className="page-content-wrapper">
                        <header>
                            <h1 style={styles.h1}>Về Chúng Tôi</h1>
                        </header>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>Giới Thiệu</h2>
                            <p style={styles.paragraph}>
                                <strong>KETQUAMN.COM</strong> là một trong những trang web hàng đầu về <strong>kết quả xổ số</strong> 
                                tại Việt Nam. Chúng tôi tự hào cung cấp dịch vụ xem <strong>kết quả xổ số miền Nam, miền Bắc, miền Trung</strong> 
                                nhanh nhất, chính xác nhất và hoàn toàn <strong>miễn phí</strong> cho tất cả người dùng.
                            </p>
                            <p style={styles.paragraph}>
                                Với sứ mệnh mang đến trải nghiệm tốt nhất cho người chơi xổ số, chúng tôi không ngừng cải thiện và 
                                phát triển các tính năng như <strong>soi cầu miền Bắc</strong>, <strong>tạo dàn đề</strong>, 
                                <strong>thống kê lô gan</strong> và nhiều công cụ hữu ích khác.
                            </p>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>Sứ Mệnh Của Chúng Tôi</h2>
                            <p style={styles.paragraph}>
                                Sứ mệnh của chúng tôi là trở thành địa chỉ tin cậy hàng đầu cho người chơi xổ số Việt Nam, 
                                cung cấp các dịch vụ chất lượng cao với các cam kết:
                            </p>
                            <ul style={styles.list}>
                                <li>
                                    <strong>Nhanh Chóng & Chính Xác:</strong> Cập nhật kết quả xổ số realtime, đảm bảo thông tin 
                                    chính xác 100%
                                </li>
                                <li>
                                    <strong>Hoàn Toàn Miễn Phí:</strong> Tất cả dịch vụ của chúng tôi đều miễn phí, không có phí ẩn, 
                                    không cần đăng ký tài khoản
                                </li>
                                <li>
                                    <strong>Giao Diện Thân Thiện:</strong> Thiết kế hiện đại, dễ sử dụng, tối ưu cho mọi thiết bị 
                                    (máy tính, điện thoại, tablet)
                                </li>
                                <li>
                                    <strong>Công Cụ Chuyên Nghiệp:</strong> Cung cấp đầy đủ các công cụ hỗ trợ như soi cầu, tạo dàn đề, 
                                    thống kê chi tiết
                                </li>
                                <li>
                                    <strong>Bảo Mật Thông Tin:</strong> Cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng
                                </li>
                            </ul>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>Tại Sao Chọn KETQUAMN.COM?</h2>
                            
                            <div style={styles.featuresGrid}>
                                <div style={styles.featureCard}>
                                    <div style={styles.featureIcon}>⚡</div>
                                    <h3 style={styles.h3}>Tốc Độ Nhanh Nhất</h3>
                                    <p style={styles.paragraph}>
                                        Cập nhật kết quả xổ số realtime, nhanh hơn các trang web khác như xosodaiphat, 
                                        xoso.com.vn, xskt.com.vn
                                    </p>
                                </div>

                                <div style={styles.featureCard}>
                                    <div style={styles.featureIcon}>🎯</div>
                                    <h3 style={styles.h3}>Độ Chính Xác Cao</h3>
                                    <p style={styles.paragraph}>
                                        Kết quả được kiểm tra kỹ lưỡng, đảm bảo chính xác 100% từ nguồn dữ liệu uy tín
                                    </p>
                                </div>

                                <div style={styles.featureCard}>
                                    <div style={styles.featureIcon}>🆓</div>
                                    <h3 style={styles.h3}>Miễn Phí 100%</h3>
                                    <p style={styles.paragraph}>
                                        Tất cả dịch vụ đều miễn phí, không có quảng cáo quá nhiều, không yêu cầu đăng ký
                                    </p>
                                </div>

                                <div style={styles.featureCard}>
                                    <div style={styles.featureIcon}>📊</div>
                                    <h3 style={styles.h3}>Thống Kê Chi Tiết</h3>
                                    <p style={styles.paragraph}>
                                        Cung cấp đầy đủ thống kê lô gan, đầu đuôi, giải đặc biệt, tần suất xuất hiện
                                    </p>
                                </div>

                                <div style={styles.featureCard}>
                                    <div style={styles.featureIcon}>🔮</div>
                                    <h3 style={styles.h3}>Soi Cầu AI</h3>
                                    <p style={styles.paragraph}>
                                        Công cụ soi cầu miền Bắc sử dụng AI và 5 phương pháp truyền thống, độ chính xác cao
                                    </p>
                                </div>

                                <div style={styles.featureCard}>
                                    <div style={styles.featureIcon}>🛠️</div>
                                    <h3 style={styles.h3}>Công Cụ Đa Dạng</h3>
                                    <p style={styles.paragraph}>
                                        Tạo dàn đề 9x-0x, 2D, 3D-4D, dàn đề đặc biệt, lọc dàn đề và nhiều công cụ khác
                                    </p>
                                </div>
                            </div>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>Dịch Vụ Của Chúng Tôi</h2>
                            
                            <h3 style={styles.h3}>1. Xem Kết Quả Xổ Số</h3>
                            <p style={styles.paragraph}>
                                Cung cấp kết quả xổ số đầy đủ cho cả 3 miền:
                            </p>
                            <ul style={styles.list}>
                                <li><strong>XSMN (Xổ Số Miền Nam):</strong> Kết quả xổ số miền Nam hôm nay, các ngày trong tuần</li>
                                <li><strong>XSMB (Xổ Số Miền Bắc):</strong> Kết quả xổ số miền Bắc hàng ngày</li>
                                <li><strong>XSMT (Xổ Số Miền Trung):</strong> Kết quả xổ số miền Trung đầy đủ</li>
                            </ul>

                            <h3 style={styles.h3}>2. Công Cụ Soi Cầu</h3>
                            <p style={styles.paragraph}>
                                Hệ thống soi cầu thông minh với nhiều phương pháp:
                            </p>
                            <ul style={styles.list}>
                                <li>Soi cầu miền Bắc AI - Sử dụng trí tuệ nhân tạo</li>
                                <li>Soi cầu đặc biệt miền Bắc</li>
                                <li>Soi cầu lô tô miền Bắc</li>
                            </ul>

                            <h3 style={styles.h3}>3. Tạo Dàn Đề</h3>
                            <p style={styles.paragraph}>
                                Công cụ tạo dàn đề chuyên nghiệp:
                            </p>
                            <ul style={styles.list}>
                                <li>Tạo dàn đề 9x-0x</li>
                                <li>Tạo dàn đề 2D</li>
                                <li>Tạo dàn đề 3D-4D</li>
                                <li>Dàn đề đặc biệt</li>
                                <li>Lọc dàn đề</li>
                            </ul>

                            <h3 style={styles.h3}>4. Thống Kê</h3>
                            <p style={styles.paragraph}>
                                Bảng thống kê chi tiết và đầy đủ:
                            </p>
                            <ul style={styles.list}>
                                <li>Thống kê lô gan</li>
                                <li>Thống kê đầu đuôi</li>
                                <li>Thống kê giải đặc biệt</li>
                                <li>Thống kê tần suất lô tô</li>
                            </ul>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>Cam Kết Của Chúng Tôi</h2>
                            <p style={styles.paragraph}>
                                Chúng tôi cam kết:
                            </p>
                            <ul style={styles.list}>
                                <li>Luôn cập nhật kết quả xổ số nhanh nhất, chính xác nhất</li>
                                <li>Không thu phí, không có phí ẩn, hoàn toàn miễn phí</li>
                                <li>Bảo vệ thông tin cá nhân của người dùng</li>
                                <li>Không ngừng cải thiện và phát triển dịch vụ</li>
                                <li>Hỗ trợ người dùng 24/7</li>
                                <li>Giao diện thân thiện, dễ sử dụng</li>
                            </ul>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>Liên Hệ Với Chúng Tôi</h2>
                            <p style={styles.paragraph}>
                                Nếu bạn có bất kỳ câu hỏi, góp ý hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi:
                            </p>
                            <div style={styles.contactBox}>
                                <p style={styles.paragraph}>
                                    <strong>Website:</strong> <a href={targetUrl} style={styles.link} rel="nofollow">{targetUrl}</a>
                                </p>
                                <p style={styles.paragraph}>
                                    <strong>Email:</strong> <a href="mailto:contact@ketquamn.com" style={styles.link}>contact@ketquamn.com</a>
                                </p>
                                <p style={styles.paragraph}>
                                    <strong>Hotline:</strong> <a href="tel:0969736822" style={styles.link}>0969 736 822</a>
                                </p>
                                <p style={styles.paragraph}>
                                    <strong>Địa chỉ:</strong> 138 Phạm Văn Đồng, Xuân Đỉnh, Bắc Từ Liêm, Hà Nội, Việt Nam
                                </p>
                            </div>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>Cảm Ơn Bạn Đã Tin Tưởng</h2>
                            <p style={styles.paragraph}>
                                Chúng tôi xin chân thành cảm ơn tất cả người dùng đã tin tưởng và sử dụng dịch vụ của 
                                <strong> KETQUAMN.COM</strong>. Sự ủng hộ của bạn là động lực để chúng tôi không ngừng 
                                cải thiện và phát triển, mang đến những dịch vụ tốt nhất cho cộng đồng người chơi xổ số Việt Nam.
                            </p>
                            <p style={styles.paragraph}>
                                Hãy tiếp tục đồng hành cùng chúng tôi trên hành trình mang đến những trải nghiệm tuyệt vời nhất!
                            </p>
                        </article>
                    </div>
                </section>
            </div>

            {/* Footer */}
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
        </>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
        color: '#333333',
        width: '100%',
        maxWidth: '1070px',
        margin: '0 auto',
        boxSizing: 'border-box',
        paddingTop: '10px',
        paddingBottom: '40px',
    },
    contentSection: {
        padding: '20px 16px',
        boxSizing: 'border-box',
        width: '100%',
    },
    contentWrapper: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    h1: {
        fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
        fontWeight: 'bold',
        marginTop: '0',
        marginBottom: '30px',
        paddingTop: '0',
        color: '#333333',
        borderBottom: '3px solid #E65A2E',
        paddingBottom: '15px',
        textAlign: 'center',
    },
    article: {
        marginBottom: '35px',
    },
    h2: {
        fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginTop: '30px',
        color: '#333333',
        borderLeft: '4px solid #E65A2E',
        paddingLeft: '15px',
    },
    h3: {
        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
        fontWeight: 'bold',
        marginBottom: '15px',
        marginTop: '25px',
        color: '#333333',
    },
    paragraph: {
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        lineHeight: '1.8',
        marginBottom: '15px',
        color: '#555555',
        textAlign: 'justify',
    },
    list: {
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        lineHeight: '1.8',
        marginBottom: '15px',
        paddingLeft: '25px',
        color: '#555555',
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '25px',
    },
    featureCard: {
        backgroundColor: '#f8f9fa',
        padding: '25px',
        borderRadius: '8px',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(0,0,0,0.1)',
    },
    featureIcon: {
        fontSize: '3rem',
        marginBottom: '15px',
    },
    contactBox: {
        backgroundColor: '#f8f9fa',
        padding: '25px',
        borderRadius: '8px',
        marginTop: '15px',
        border: '1px solid rgba(0,0,0,0.1)',
    },
    link: {
        color: '#E65A2E',
        textDecoration: 'underline',
        transition: 'all 0.2s ease',
    },
    footer: {
        backgroundColor: '#FFE8DC',
        color: '#333333',
        padding: '25px 15px 15px 15px',
        marginTop: '12px',
        marginBottom: '0',
        borderTop: '2px solid rgba(230, 90, 46, 0.4)',
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
    },
    footerLogo: {
        height: 'auto',
        maxHeight: '52px',
        width: 'auto',
        maxWidth: '200px',
        objectFit: 'contain',
        transition: 'opacity 0.2s ease',
    },
    footerDescription: {
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
        lineHeight: '1.6',
        margin: '0',
        color: '#555555',
        textAlign: 'left',
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
};

