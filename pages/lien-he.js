/**
 * Liên Hệ Page
 */

import { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import UltraSEOHead from '../components/UltraSEOHead';
import { TARGET_URL, SITE_URL } from '../config/seoConfig';

export default function LienHe() {
    const siteUrl = SITE_URL;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = useCallback((e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
    }, []);

    // Structured Data cho trang liên hệ
    const structuredData = useMemo(() => [
        {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Liên Hệ - KETQUAMN.COM',
            description: 'Liên hệ với KETQUAMN.COM để được hỗ trợ và tư vấn về kết quả xổ số, tạo dàn đề, soi cầu.',
            url: `${siteUrl}/lien-he`,
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
                        name: 'Liên Hệ',
                        item: `${siteUrl}/lien-he`
                    }
                ]
            },
            mainEntity: {
                '@type': 'Organization',
                name: 'KETQUAMN.COM',
                url: TARGET_URL,
                contactPoint: [
                    {
                        '@type': 'ContactPoint',
                        contactType: 'Customer Service',
                        telephone: '+84-969-736-822',
                        email: 'contact@ketquamn.com',
                        availableLanguage: ['Vietnamese'],
                        areaServed: 'VN',
                        hoursAvailable: {
                            '@type': 'OpeningHoursSpecification',
                            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                            opens: '00:00',
                            closes: '23:59'
                        }
                    }
                ],
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: '138 Phạm Văn Đồng, Xuân Đỉnh',
                    addressLocality: 'Bắc Từ Liêm',
                    addressRegion: 'Hà Nội',
                    addressCountry: 'VN',
                    postalCode: '100000'
                }
            }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: 'Tôi có thể liên hệ vào giờ nào?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Chúng tôi hỗ trợ 24/7. Bạn có thể liên hệ với chúng tôi bất cứ lúc nào qua email, hotline hoặc form liên hệ trên trang này.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'Thời gian phản hồi là bao lâu?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Chúng tôi sẽ phản hồi email và tin nhắn trong vòng 24 giờ. Đối với các vấn đề khẩn cấp, vui lòng gọi hotline để được hỗ trợ ngay lập tức.'
                    }
                },
                {
                    '@type': 'Question',
                    name: 'Tôi có thể đến trực tiếp văn phòng không?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Có, bạn có thể đến trực tiếp địa chỉ của chúng tôi. Tuy nhiên, vui lòng liên hệ trước qua email hoặc hotline để đặt lịch hẹn.'
                    }
                }
            ]
        }
    ], [siteUrl]);

    return (
        <>
            <UltraSEOHead
                title="Liên Hệ - KETQUAMN.COM | Hỗ Trợ & Tư Vấn 24/7"
                description="Liên hệ với KETQUAMN.COM để được hỗ trợ và tư vấn về kết quả xổ số, tạo dàn đề, soi cầu. Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7."
                keywords="liên hệ ketquamn, hỗ trợ xổ số, tư vấn dàn đề, contact ketquamn, hotline ketquamn"
                canonical={`${siteUrl}/lien-he`}
                ogImage={`${siteUrl}/backgroundseo.png`}
                pageType="article"
                structuredData={structuredData}
                breadcrumbs={[
                    { name: 'Trang chủ', url: siteUrl },
                    { name: 'Liên Hệ', url: `${siteUrl}/lien-he` }
                ]}
                faq={[
                    {
                        question: 'Tôi có thể liên hệ vào giờ nào?',
                        answer: 'Chúng tôi hỗ trợ 24/7. Bạn có thể liên hệ với chúng tôi bất cứ lúc nào qua email, hotline hoặc form liên hệ trên trang này.'
                    },
                    {
                        question: 'Thời gian phản hồi là bao lâu?',
                        answer: 'Chúng tôi sẽ phản hồi email và tin nhắn trong vòng 24 giờ. Đối với các vấn đề khẩn cấp, vui lòng gọi hotline để được hỗ trợ ngay lập tức.'
                    },
                    {
                        question: 'Tôi có thể đến trực tiếp văn phòng không?',
                        answer: 'Có, bạn có thể đến trực tiếp địa chỉ của chúng tôi. Tuy nhiên, vui lòng liên hệ trước qua email hoặc hotline để đặt lịch hẹn.'
                    }
                ]}
            />
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
            <div style={styles.container} className="page-container">
                <section style={styles.contentSection} className="page-content-section">
                    <div style={styles.contentWrapper} className="page-content-wrapper">
                        <header>
                            <h1 style={styles.h1}>Liên Hệ Với Chúng Tôi</h1>
                            <p style={styles.intro}>
                            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Nếu bạn có bất kỳ câu hỏi, 
                            góp ý hoặc cần tư vấn về dịch vụ của <strong>KETQUAMN.COM</strong>, vui lòng liên hệ với chúng tôi 
                            qua các phương thức sau:
                            </p>
                        </header>

                        <div style={styles.contactGrid}>
                            {/* Thông Tin Liên Hệ */}
                            <div style={styles.contactInfoSection}>
                                <h2 style={styles.h2}>Thông Tin Liên Hệ</h2>
                                
                                <div style={styles.contactItem}>
                                    <div style={styles.icon}>🌐</div>
                                    <div>
                                        <h3 style={styles.h3}>Website</h3>
                                        <a href={TARGET_URL} style={styles.contactLink} rel="nofollow">
                                            {TARGET_URL}
                                        </a>
                                    </div>
                                </div>

                                <div style={styles.contactItem}>
                                    <div style={styles.icon}>📧</div>
                                    <div>
                                        <h3 style={styles.h3}>Email</h3>
                                        <a href="mailto:contact@ketquamn.com" style={styles.contactLink}>
                                            contact@ketquamn.com
                                        </a>
                                    </div>
                                </div>

                                <div style={styles.contactItem}>
                                    <div style={styles.icon}>📱</div>
                                    <div>
                                        <h3 style={styles.h3}>Hotline</h3>
                                        <a href="tel:0969736822" style={styles.contactLink}>
                                            0969 736 822
                                        </a>
                                    </div>
                                </div>

                                <div style={styles.contactItem}>
                                    <div style={styles.icon}>📍</div>
                                    <div>
                                        <h3 style={styles.h3}>Địa Chỉ</h3>
                                        <p style={styles.address}>
                                            138 Phạm Văn Đồng, Xuân Đỉnh,<br />
                                            Bắc Từ Liêm, Hà Nội, Việt Nam
                                        </p>
                                    </div>
                                </div>

                                <div style={styles.workingHours}>
                                    <h3 style={styles.h3}>⏰ Thời Gian Làm Việc</h3>
                                    <p style={styles.paragraph}>
                                        <strong>24/7</strong> - Chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi
                                    </p>
                                </div>
                            </div>

                            {/* Form Liên Hệ */}
                            <div style={styles.formSection}>
                                <h2 style={styles.h2}>Gửi Tin Nhắn Cho Chúng Tôi</h2>
                                
                                {submitted && (
                                    <div style={styles.successMessage}>
                                        ✅ Cảm ơn bạn! Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất có thể.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} style={styles.form} aria-label="Form liên hệ">
                                    <div style={styles.formGroup}>
                                        <label htmlFor="name" style={styles.label}>
                                            Họ và Tên <span style={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={styles.input}
                                            placeholder="Nhập họ và tên của bạn"
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label htmlFor="email" style={styles.label}>
                                            Email <span style={styles.required}>*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            style={styles.input}
                                            placeholder="example@email.com"
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label htmlFor="phone" style={styles.label}>
                                            Số Điện Thoại
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            style={styles.input}
                                            placeholder="0969 736 822"
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label htmlFor="message" style={styles.label}>
                                            Nội Dung Tin Nhắn <span style={styles.required}>*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            style={styles.textarea}
                                            placeholder="Nhập nội dung tin nhắn của bạn..."
                                        />
                                    </div>

                                    <button type="submit" style={styles.submitButton}>
                                        Gửi Tin Nhắn
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div style={styles.faqSection}>
                            <h2 style={styles.h2}>Câu Hỏi Thường Gặp</h2>
                            
                            <div style={styles.faqItem}>
                                <h3 style={styles.faqQuestion}>❓ Tôi có thể liên hệ vào giờ nào?</h3>
                                <p style={styles.faqAnswer}>
                                    Chúng tôi hỗ trợ 24/7. Bạn có thể liên hệ với chúng tôi bất cứ lúc nào qua email, 
                                    hotline hoặc form liên hệ trên trang này.
                                </p>
                            </div>

                            <div style={styles.faqItem}>
                                <h3 style={styles.faqQuestion}>❓ Thời gian phản hồi là bao lâu?</h3>
                                <p style={styles.faqAnswer}>
                                    Chúng tôi sẽ phản hồi email và tin nhắn trong vòng 24 giờ. Đối với các vấn đề khẩn cấp, 
                                    vui lòng gọi hotline để được hỗ trợ ngay lập tức.
                                </p>
                            </div>

                            <div style={styles.faqItem}>
                                <h3 style={styles.faqQuestion}>❓ Tôi có thể đến trực tiếp văn phòng không?</h3>
                                <p style={styles.faqAnswer}>
                                    Có, bạn có thể đến trực tiếp địa chỉ của chúng tôi. Tuy nhiên, vui lòng liên hệ trước 
                                    qua email hoặc hotline để đặt lịch hẹn.
                                </p>
                            </div>
                        </div>
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
        maxWidth: '1200px',
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
        maxWidth: '1200px',
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
        marginBottom: '15px',
        paddingTop: '0',
        color: '#333333',
        borderBottom: '3px solid #E65A2E',
        paddingBottom: '15px',
        textAlign: 'center',
    },
    intro: {
        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
        lineHeight: '1.8',
        marginBottom: '30px',
        color: '#555555',
        textAlign: 'center',
    },
    contactGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '40px',
    },
    contactInfoSection: {
        backgroundColor: '#f8f9fa',
        padding: '25px',
        borderRadius: '8px',
        border: '1px solid rgba(0,0,0,0.1)',
    },
    formSection: {
        backgroundColor: '#ffffff',
        padding: '25px',
        borderRadius: '8px',
        border: '1px solid rgba(0,0,0,0.1)',
    },
    h2: {
        fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333333',
        borderLeft: '4px solid #E65A2E',
        paddingLeft: '15px',
    },
    contactItem: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '25px',
        gap: '15px',
    },
    icon: {
        fontSize: '2rem',
        flexShrink: 0,
    },
    h3: {
        fontSize: 'clamp(1rem, 3vw, 1.2rem)',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#333333',
    },
    contactLink: {
        color: '#E65A2E',
        textDecoration: 'none',
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        transition: 'all 0.2s ease',
    },
    address: {
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        color: '#555555',
        lineHeight: '1.6',
        margin: 0,
    },
    workingHours: {
        marginTop: '25px',
        paddingTop: '25px',
        borderTop: '1px solid rgba(0,0,0,0.1)',
    },
    paragraph: {
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        lineHeight: '1.8',
        color: '#555555',
        margin: 0,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        fontWeight: '500',
        marginBottom: '8px',
        color: '#333333',
    },
    required: {
        color: '#E65A2E',
    },
    input: {
        padding: '12px 15px',
        fontSize: '1rem',
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: '6px',
        backgroundColor: '#ffffff',
        color: '#333333',
        outline: 'none',
        transition: 'all 0.2s ease',
    },
    textarea: {
        padding: '12px 15px',
        fontSize: '1rem',
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: '6px',
        backgroundColor: '#ffffff',
        color: '#333333',
        outline: 'none',
        resize: 'vertical',
        fontFamily: 'inherit',
        transition: 'all 0.2s ease',
    },
    submitButton: {
        padding: '14px 28px',
        fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
        fontWeight: 'bold',
        backgroundColor: '#E65A2E',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        alignSelf: 'flex-start',
    },
    successMessage: {
        padding: '15px',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        border: '1px solid #4CAF50',
        borderRadius: '6px',
        color: '#4CAF50',
        marginBottom: '20px',
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
    },
    faqSection: {
        marginTop: '40px',
        paddingTop: '40px',
        borderTop: '2px solid rgba(255,255,255,0.1)',
    },
    faqItem: {
        marginBottom: '25px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid rgba(0,0,0,0.1)',
    },
    faqQuestion: {
        fontSize: 'clamp(1rem, 3vw, 1.2rem)',
        fontWeight: 'bold',
        marginBottom: '12px',
        color: '#333333',
    },
    faqAnswer: {
        fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
        lineHeight: '1.8',
        color: '#555555',
        margin: 0,
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
        maxWidth: '1200px',
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

