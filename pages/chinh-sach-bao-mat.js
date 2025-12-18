/**
 * Chính Sách Bảo Mật Page
 */

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import UltraSEOHead from '../components/UltraSEOHead';
import { TARGET_URL, SITE_URL } from '../config/seoConfig';

export default function ChinhSachBaoMat() {
    const siteUrl = SITE_URL;
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Structured Data cho trang chính sách bảo mật
    const structuredData = useMemo(() => [
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Chính Sách Bảo Mật - KETQUAMN.COM',
            description: 'Chính sách bảo mật thông tin của KETQUAMN.COM. Cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng.',
            url: `${siteUrl}/chinh-sach-bao-mat`,
            inLanguage: 'vi-VN',
            isPartOf: {
                '@type': 'WebSite',
                name: 'KETQUAMN.COM',
                url: siteUrl
            },
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
                        name: 'Chính Sách Bảo Mật',
                        item: `${siteUrl}/chinh-sach-bao-mat`
                    }
                ]
            },
            datePublished: '2024-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            publisher: {
                '@type': 'Organization',
                name: 'KETQUAMN.COM',
                url: TARGET_URL
            }
        }
    ], [siteUrl]);

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
                title="Chính Sách Bảo Mật - KETQUAMN.COM | Bảo Vệ Thông Tin Người Dùng"
                description="Chính sách bảo mật thông tin của KETQUAMN.COM. Cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng khi sử dụng dịch vụ xổ số, tạo dàn đề."
                keywords="chính sách bảo mật, bảo mật thông tin, quyền riêng tư, bảo vệ dữ liệu, ketquamn, privacy policy"
                canonical={`${siteUrl}/chinh-sach-bao-mat`}
                ogImage={`${siteUrl}/backgroundseo.png`}
                pageType="article"
                structuredData={structuredData}
                breadcrumbs={[
                    { name: 'Trang chủ', url: siteUrl },
                    { name: 'Chính Sách Bảo Mật', url: `${siteUrl}/chinh-sach-bao-mat` }
                ]}
            />

            <div style={styles.container} className="page-container">
                <section style={styles.contentSection} className="page-content-section">
                    <div style={styles.contentWrapper} className="page-content-wrapper">
                        <header>
                            <h1 style={styles.h1}>Chính Sách Bảo Mật</h1>
                            <p style={styles.lastUpdated}>Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
                        </header>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>1. Giới Thiệu</h2>
                            <p style={styles.paragraph}>
                                <strong>KETQUAMN.COM</strong> cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng. 
                                Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn 
                                khi sử dụng dịch vụ của chúng tôi.
                            </p>
                            <p style={styles.paragraph}>
                                Bằng việc truy cập và sử dụng website <strong>KETQUAMN.COM</strong>, bạn đồng ý với các điều khoản 
                                và điều kiện được nêu trong chính sách bảo mật này.
                            </p>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>2. Thông Tin Chúng Tôi Thu Thập</h2>
                            <h3 style={styles.h3}>2.1. Thông Tin Tự Động Thu Thập</h3>
                            <p style={styles.paragraph}>
                                Khi bạn truy cập website, chúng tôi có thể tự động thu thập một số thông tin sau:
                            </p>
                            <ul style={styles.list}>
                                <li>Địa chỉ IP của bạn</li>
                                <li>Loại trình duyệt và phiên bản</li>
                                <li>Hệ điều hành bạn đang sử dụng</li>
                                <li>Trang web bạn đã truy cập trước khi đến với chúng tôi</li>
                                <li>Thời gian và ngày bạn truy cập</li>
                                <li>Thông tin về thiết bị bạn sử dụng (máy tính, điện thoại, tablet)</li>
                            </ul>

                            <h3 style={styles.h3}>2.2. Thông Tin Bạn Cung Cấp</h3>
                            <p style={styles.paragraph}>
                                Chúng tôi có thể thu thập thông tin mà bạn tự nguyện cung cấp khi:
                            </p>
                            <ul style={styles.list}>
                                <li>Liên hệ với chúng tôi qua form liên hệ</li>
                                <li>Đăng ký nhận thông báo</li>
                                <li>Tham gia các cuộc khảo sát hoặc phản hồi</li>
                            </ul>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>3. Mục Đích Sử Dụng Thông Tin</h2>
                            <p style={styles.paragraph}>
                                Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:
                            </p>
                            <ul style={styles.list}>
                                <li>Cải thiện và tối ưu hóa trải nghiệm người dùng trên website</li>
                                <li>Phân tích xu hướng và hành vi người dùng để nâng cao chất lượng dịch vụ</li>
                                <li>Đảm bảo an ninh và ngăn chặn các hoạt động gian lận, lạm dụng</li>
                                <li>Gửi thông báo về các cập nhật, tính năng mới (nếu bạn đã đăng ký)</li>
                                <li>Trả lời các câu hỏi và yêu cầu hỗ trợ từ người dùng</li>
                                <li>Tuân thủ các yêu cầu pháp lý và quy định hiện hành</li>
                            </ul>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>4. Bảo Vệ Thông Tin</h2>
                            <p style={styles.paragraph}>
                                Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin của bạn 
                                khỏi việc truy cập, sử dụng, tiết lộ, thay đổi hoặc phá hủy trái phép:
                            </p>
                            <ul style={styles.list}>
                                <li>Mã hóa dữ liệu khi truyền tải (HTTPS/SSL)</li>
                                <li>Giới hạn quyền truy cập thông tin chỉ cho nhân viên có thẩm quyền</li>
                                <li>Thường xuyên cập nhật và kiểm tra hệ thống bảo mật</li>
                                <li>Sử dụng các công nghệ bảo mật tiên tiến</li>
                            </ul>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>5. Chia Sẻ Thông Tin</h2>
                            <p style={styles.paragraph}>
                                Chúng tôi <strong>KHÔNG</strong> bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba 
                                vì mục đích thương mại. Chúng tôi chỉ có thể chia sẻ thông tin trong các trường hợp sau:
                            </p>
                            <ul style={styles.list}>
                                <li>Khi có yêu cầu từ cơ quan nhà nước có thẩm quyền theo quy định pháp luật</li>
                                <li>Để bảo vệ quyền lợi, tài sản hoặc an toàn của chúng tôi và người dùng</li>
                                <li>Với các nhà cung cấp dịch vụ đáng tin cậy hỗ trợ hoạt động của website (nhưng họ bị ràng buộc bởi cam kết bảo mật)</li>
                            </ul>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>6. Cookies và Công Nghệ Theo Dõi</h2>
                            <p style={styles.paragraph}>
                                Website của chúng tôi sử dụng cookies và các công nghệ tương tự để:
                            </p>
                            <ul style={styles.list}>
                                <li>Ghi nhớ tùy chọn và cài đặt của bạn</li>
                                <li>Phân tích lưu lượng truy cập và hành vi người dùng</li>
                                <li>Cải thiện hiệu suất và trải nghiệm người dùng</li>
                            </ul>
                            <p style={styles.paragraph}>
                                Bạn có thể điều chỉnh cài đặt trình duyệt để từ chối cookies, nhưng điều này có thể ảnh hưởng 
                                đến một số chức năng của website.
                            </p>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>7. Quyền Của Người Dùng</h2>
                            <p style={styles.paragraph}>
                                Bạn có các quyền sau đối với thông tin cá nhân của mình:
                            </p>
                            <ul style={styles.list}>
                                <li>Quyền được biết về việc thu thập và sử dụng thông tin</li>
                                <li>Quyền truy cập và xem thông tin cá nhân của mình</li>
                                <li>Quyền yêu cầu sửa đổi hoặc xóa thông tin không chính xác</li>
                                <li>Quyền yêu cầu xóa thông tin cá nhân (trong phạm vi pháp luật cho phép)</li>
                                <li>Quyền từ chối việc xử lý thông tin cá nhân</li>
                            </ul>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>8. Liên Kết Đến Website Khác</h2>
                            <p style={styles.paragraph}>
                                Website của chúng tôi có thể chứa các liên kết đến website của bên thứ ba. Chúng tôi không chịu trách nhiệm 
                                về chính sách bảo mật hoặc nội dung của các website đó. Chúng tôi khuyến khích bạn đọc chính sách bảo mật 
                                của các website đó trước khi cung cấp thông tin.
                            </p>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>9. Thay Đổi Chính Sách Bảo Mật</h2>
                            <p style={styles.paragraph}>
                                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được thông báo trên trang này 
                                với ngày cập nhật mới nhất. Việc bạn tiếp tục sử dụng website sau khi có thay đổi được coi là bạn đã chấp nhận 
                                chính sách mới.
                            </p>
                        </article>

                        <article style={styles.article}>
                            <h2 style={styles.h2}>10. Liên Hệ</h2>
                            <p style={styles.paragraph}>
                                Nếu bạn có bất kỳ câu hỏi, thắc mắc hoặc yêu cầu liên quan đến chính sách bảo mật này, vui lòng liên hệ với chúng tôi:
                            </p>
                            <div style={styles.contactInfo}>
                                <p style={styles.paragraph}>
                                    <strong>Website:</strong> <a href={TARGET_URL} style={styles.link} rel="nofollow">{TARGET_URL}</a>
                                </p>
                                <p style={styles.paragraph}>
                                    <strong>Email:</strong> <a href="mailto:contact@ketquamn.com" style={styles.link}>contact@ketquamn.com</a>
                                </p>
                            </div>
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
                                href={TARGET_URL}
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
                                href={`${TARGET_URL}/thongke/lo-gan`}
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
                                href={`${TARGET_URL}/ket-qua-xo-so-mien-nam`}
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
                                href={`${TARGET_URL}/ket-qua-xo-so-mien-bac`}
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
                                href={TARGET_URL}
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
        maxWidth: '900px',
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
        marginBottom: '10px',
        paddingTop: '0',
        color: '#333333',
        borderBottom: '3px solid #E65A2E',
        paddingBottom: '15px',
    },
    lastUpdated: {
        fontSize: '0.9rem',
        color: '#666666',
        marginBottom: '30px',
        fontStyle: 'italic',
    },
    article: {
        marginBottom: '30px',
    },
    h2: {
        fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
        fontWeight: 'bold',
        marginBottom: '15px',
        marginTop: '25px',
        color: '#333333',
        borderLeft: '4px solid #E65A2E',
        paddingLeft: '15px',
    },
    h3: {
        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
        fontWeight: 'bold',
        marginBottom: '12px',
        marginTop: '20px',
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
    contactInfo: {
        backgroundColor: 'rgba(230, 90, 46, 0.1)',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '15px',
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

