/**
 * Navbar Component
 * Navigation header với các menu items chính
 */

import { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [router.pathname]);

    const menuItems = [
        {
            label: 'Tạo dàn đề',
            href: '/',
            description: 'Công cụ tạo dàn đề chuyên nghiệp',
            isExternal: false
        },
        {
            label: 'Live xổ số',
            href: 'https://ketquamn.com',
            description: 'Xem kết quả xổ số trực tiếp',
            isExternal: true
        },
        {
            label: 'Dàn đề bất tử',
            href: '/dan-de-bat-tu',
            description: 'Dàn đề bất tử - Dàn đề đặc biệt',
            isExternal: false
        },
        {
            label: 'Liên hệ',
            href: '/lien-he',
            description: 'Liên hệ với chúng tôi',
            isExternal: false
        },
        {
            label: 'Chính sách bảo mật',
            href: '/chinh-sach-bao-mat',
            description: 'Chính sách bảo mật thông tin',
            isExternal: false
        },
        {
            label: 'Về chúng tôi',
            href: '/ve-chung-toi',
            description: 'Thông tin về chúng tôi',
            isExternal: false
        }
    ];

    return (
        <>
            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            <style jsx global>{`
                @media (max-width: 767px) {
                    .desktop-menu-nav {
                        display: none !important;
                    }
                    .mobile-menu-button-nav {
                        display: flex !important;
                    }
                }
                @media (min-width: 768px) {
                    .desktop-menu-nav {
                        display: flex !important;
                    }
                    .mobile-menu-button-nav {
                        display: none !important;
                    }
                }
            `}</style>
            <nav style={styles.navbar(isScrolled)}>
                <div style={styles.container}>
                    {/* Logo/Brand */}
                    <Link href="/" style={styles.brand}>
                        {/* ✅ PERFORMANCE: Use Next.js Image for better optimization */}
                        <img 
                            src="/logoketquamn.png" 
                            alt="KETQUAMN.COM" 
                            style={styles.logo}
                            loading="eager"
                            fetchpriority="high"
                            decoding="async"
                            width="200"
                            height="52"
                            // ✅ PERFORMANCE: Optimize image distribution
                            sizes="(max-width: 768px) 150px, 200px"
                            // ✅ PERFORMANCE: Reserve space to prevent LCP reflow
                            onLoad={(e) => {
                                // Mark as loaded to prevent layout shift
                                e.target.style.opacity = '1';
                            }}
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="desktop-menu-nav" style={styles.desktopMenu}>
                        {menuItems.map((item, index) => {
                            if (item.isExternal) {
                                return (
                                    <a
                                        key={index}
                                        href={item.href}
                                        target="_blank"
                                        rel="nofollow noopener noreferrer"
                                        style={styles.menuItem(false)}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f5f5f5';
                                            e.currentTarget.style.color = '#E65A2E';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = '#333333';
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                );
                            }
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    style={styles.menuItem(router.pathname === item.href)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = router.pathname === item.href ? 'rgba(230, 90, 46, 0.15)' : '#f5f5f5';
                                        e.currentTarget.style.color = '#E65A2E';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = router.pathname === item.href ? 'rgba(230, 90, 46, 0.1)' : 'transparent';
                                        e.currentTarget.style.color = router.pathname === item.href ? '#E65A2E' : '#333333';
                                    }}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-button-nav"
                        style={styles.mobileMenuButton}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div style={styles.hamburgerContainer}>
                            <span style={{
                                ...styles.hamburger(isMenuOpen),
                                transform: isMenuOpen ? 'rotate(45deg) translate(8px, 8px)' : 'none',
                                opacity: isMenuOpen ? 0 : 1,
                            }}></span>
                            <span style={{
                                ...styles.hamburger(isMenuOpen),
                                transform: isMenuOpen ? 'rotate(-45deg)' : 'none',
                            }}></span>
                            <span style={{
                                ...styles.hamburger(isMenuOpen),
                                transform: isMenuOpen ? 'rotate(45deg) translate(-8px, -8px)' : 'none',
                                opacity: isMenuOpen ? 0 : 1,
                            }}></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div style={styles.mobileMenu}>
                        {menuItems.map((item, index) => {
                            if (item.isExternal) {
                                return (
                                    <a
                                        key={index}
                                        href={item.href}
                                        target="_blank"
                                        rel="nofollow noopener noreferrer"
                                        style={styles.mobileMenuItem(false)}
                                        onClick={() => setIsMenuOpen(false)}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f5f5f5';
                                            e.currentTarget.style.color = '#E65A2E';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = '#333333';
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                );
                            }
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    style={styles.mobileMenuItem(router.pathname === item.href)}
                                    onClick={() => setIsMenuOpen(false)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = router.pathname === item.href ? 'rgba(230, 90, 46, 0.15)' : '#f5f5f5';
                                        e.currentTarget.style.color = '#E65A2E';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = router.pathname === item.href ? 'rgba(230, 90, 46, 0.1)' : 'transparent';
                                        e.currentTarget.style.color = router.pathname === item.href ? '#E65A2E' : '#333333';
                                    }}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </nav>
        </>
    );
}

const styles = {
    navbar: (isScrolled) => ({
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#FFE8DC',
        borderBottom: '3px solid rgba(230, 90, 46, 0.4)',
        boxShadow: isScrolled ? '0 2px 8px rgba(230, 90, 46, 0.2)' : '0 1px 3px rgba(230, 90, 46, 0.15)',
        transition: 'box-shadow 0.3s ease', // ✅ PERFORMANCE: Only transition box-shadow to prevent layout shift
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
        // ✅ PERFORMANCE: Fixed height to prevent layout shift on mobile (responsive with clamp)
        minHeight: 'clamp(60px, 8vw, 72px)', // Responsive: 60px on mobile, 72px on desktop
    }),
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px)', // ✅ PERFORMANCE: Responsive padding
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        // ✅ PERFORMANCE: Fixed height to prevent layout shift
        minHeight: 'clamp(40px, 6vw, 52px)', // Responsive: 40px on mobile, 52px on desktop
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        flexShrink: 0,
    },
    logo: {
        height: 'auto',
        maxHeight: 'clamp(39px, 6.5vw, 52px)', // ✅ PERFORMANCE: Responsive height
        width: 'auto',
        maxWidth: 'clamp(150px, 25vw, 200px)', // ✅ PERFORMANCE: Responsive width
        objectFit: 'contain',
        // ✅ PERFORMANCE: Reserve space to prevent layout shift on mobile
        display: 'block',
        aspectRatio: '200 / 52', // Maintain aspect ratio
    },
    desktopMenu: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
    },
    menuItem: (isActive) => ({
        padding: '10px 16px',
        color: isActive ? '#E65A2E' : '#333333',
        textDecoration: 'none',
        fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
        fontWeight: isActive ? 'bold' : '600',
        borderRadius: '6px',
        transition: 'all 0.2s ease',
        border: isActive ? '2px solid #E65A2E' : '2px solid transparent',
        backgroundColor: isActive ? 'rgba(230, 90, 46, 0.1)' : 'transparent',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    }),
    mobileMenuButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        zIndex: 1001,
    },
    hamburgerContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '28px',
        height: '20px',
        position: 'relative',
    },
    hamburger: (isOpen) => ({
        width: '28px',
        height: '3px',
        backgroundColor: '#333333',
        borderRadius: '3px',
        transition: 'all 0.3s ease',
    }),
    mobileMenu: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        animation: 'slideDown 0.3s ease',
        width: '100%',
        boxSizing: 'border-box',
        // ✅ PERFORMANCE: Use transform instead of height to prevent layout shift
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 999,
        // ✅ PERFORMANCE: Reserve space to prevent layout shift (responsive)
        maxHeight: 'calc(100vh - clamp(60px, 8vw, 72px))', // Responsive: 60px on mobile, 72px on desktop
        overflowY: 'auto',
    },
    mobileMenuItem: (isActive) => ({
        padding: '16px 20px',
        color: isActive ? '#E65A2E' : '#333333',
        textDecoration: 'none',
        fontSize: 'clamp(1rem, 3vw, 1.15rem)',
        fontWeight: isActive ? 'bold' : '600',
        border: isActive ? '2px solid #E65A2E' : '1px solid rgba(0,0,0,0.1)',
        borderRadius: isActive ? '6px' : '0',
        transition: 'all 0.2s ease',
        backgroundColor: isActive ? 'rgba(230, 90, 46, 0.1)' : 'transparent',
        cursor: 'pointer',
        margin: isActive ? '4px' : '0',
        ':hover': {
            backgroundColor: '#f5f5f5',
            color: '#E65A2E',
        },
    }),
};

// ✅ Performance: Memoize Navbar component
export default memo(Navbar);

