/**
 * News Articles Listing Page
 * Trang danh sách bài viết tin tức - Tối ưu SEO
 */

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Calendar, Eye, Clock, ArrowRight } from 'lucide-react';
import Layout from '../../components/Layout';
import SEOOptimized from '../../components/SEOOptimized';

const ITEMS_PER_PAGE = 12;

function NewsListingPage({
    initialArticles = [],
    initialTotalArticles = 0,
    initialTotalPages = 1,
    initialCategory = null,
    initialSearch = null,
    initialPage = 1,
}) {
    const router = useRouter();
    const { category, page: pageParam, search } = router.query;
    const currentPage = parseInt(pageParam) || initialPage;

    const [articles, setArticles] = useState(initialArticles);
    const [loading, setLoading] = useState(false); // Start with false since we have initial data
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [totalArticles, setTotalArticles] = useState(initialTotalArticles);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://taodandewukong.pro';

    // Category mapping
    const categoryLabels = {
        'lien-minh-huyen-thoai': 'Liên Minh Huyền Thoại',
        'lien-quan-mobile': 'Liên Quân Mobile',
        'dau-truong-chan-ly-tft': 'Đấu Trường Chân Lý TFT',
        'trending': 'Trending'
    };

    const currentCategoryLabel = categoryLabels[category] || 'Tất cả tin tức';

    // Fetch articles - only if query params changed from initial props
    useEffect(() => {
        const hasChanged =
            category !== initialCategory ||
            search !== initialSearch ||
            currentPage !== initialPage;

        if (!hasChanged && initialArticles.length > 0) {
            // Use initial data, no need to fetch
            return;
        }

        const fetchArticles = async () => {
            setLoading(true);
            try {
                let url = `${apiUrl}/api/articles?limit=${ITEMS_PER_PAGE}&sort=-publishedAt`;

                // Add pagination
                const skip = (currentPage - 1) * ITEMS_PER_PAGE;
                url += `&skip=${skip}`;

                // Add category filter
                if (category) {
                    url += `&category=${category}`;
                }

                // Add search
                if (search) {
                    url += `&search=${encodeURIComponent(search)}`;
                }

                const response = await fetch(url);
                if (response.ok) {
                    const result = await response.json();
                    if (result.success && result.data) {
                        setArticles(result.data.articles || []);
                        setTotalArticles(result.data.total || 0);
                        setTotalPages(Math.ceil((result.data.total || 0) / ITEMS_PER_PAGE));
                    }
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [category, currentPage, search, apiUrl, initialCategory, initialSearch, initialPage, initialArticles.length]);

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    // Get optimized image URL
    const getOptimizedImageUrl = (imageUrl, width = 400, height = 250) => {
        if (!imageUrl) return '/logo1.png';
        if (imageUrl.startsWith('http')) return imageUrl;
        return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    };

    // Build page URL
    const buildPageUrl = (page) => {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        if (page > 1) params.append('page', page);
        const query = params.toString();
        return `/tin-tuc${query ? `?${query}` : ''}`;
    };

    // SEO data
    const seoTitle = useMemo(() => {
        if (search) return `Tìm kiếm: ${search} | Tin Tức Game`;
        if (category) return `${currentCategoryLabel} | Tin Tức Game`;
        return 'Tin Tức Game - LMHT, Liên Quân Mobile, TFT | Kết Quả MN';
    }, [category, search, currentCategoryLabel]);

    const seoDescription = useMemo(() => {
        if (search) return `Kết quả tìm kiếm cho "${search}" - Tin tức game mới nhất về LMHT, Liên Quân Mobile, TFT`;
        if (category) return `Tin tức ${currentCategoryLabel} mới nhất - Cập nhật hàng ngày về game, esports, và giải đấu`;
        return 'Tin tức game mới nhất về Liên Minh Huyền Thoại, Liên Quân Mobile, Đấu Trường Chân Lý TFT. Cập nhật hàng ngày về esports, giải đấu, và cộng đồng game.';
    }, [category, search, currentCategoryLabel]);

    // Breadcrumbs
    const breadcrumbs = [
        { name: 'Trang chủ', url: '/' },
        { name: 'Tin tức', url: '/tin-tuc' },
        ...(category ? [{ name: currentCategoryLabel, url: `/tin-tuc?category=${category}` }] : [])
    ];

    // Structured data
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: seoTitle,
        description: seoDescription,
        url: `${siteUrl}/tin-tuc${category ? `?category=${category}` : ''}`,
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: totalArticles,
            itemListElement: articles.slice(0, 10).map((article, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Article',
                    headline: article.title,
                    url: `${siteUrl}/tin-tuc/${article.slug}`,
                    datePublished: article.publishedAt,
                    image: article.featuredImage?.url || `${siteUrl}/logo1.png`
                }
            }))
        }
    };

    return (
        <>
            <Head>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <link rel="canonical" href={`${siteUrl}/tin-tuc${category ? `?category=${category}` : ''}`} />
                <style>{`
                    @keyframes pulse {
                        0%, 100% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0.5;
                        }
                    }
                    @media (max-width: 768px) {
                        .articles-grid {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}</style>
            </Head>
            <SEOOptimized
                pageType="content"
                customTitle={seoTitle}
                customDescription={seoDescription}
                canonical={`${siteUrl}/tin-tuc${category ? `?category=${category}` : ''}`}
                breadcrumbs={breadcrumbs}
                structuredData={structuredData}
            />
            <Layout>
                <div style={{ padding: '20px 0', minHeight: '80vh' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                        {/* Breadcrumb */}
                        <nav style={{ marginBottom: '20px', fontSize: '14px' }}>
                            {breadcrumbs.map((crumb, index) => (
                                <span key={index}>
                                    {index > 0 && ' / '}
                                    {index === breadcrumbs.length - 1 ? (
                                        <span style={{ color: '#666' }}>{crumb.name}</span>
                                    ) : (
                                        <Link href={crumb.url} style={{ color: '#0070f3', textDecoration: 'none' }}>
                                            {crumb.name}
                                        </Link>
                                    )}
                                </span>
                            ))}
                        </nav>

                        {/* Page Header */}
                        <header style={{ marginBottom: '30px' }}>
                            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
                                {seoTitle}
                            </h1>
                            <p style={{ color: '#666', fontSize: '16px' }}>
                                {totalArticles > 0 && `${totalArticles} bài viết`}
                            </p>
                        </header>

                        {/* Category Filter */}
                        <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <Link
                                href="/tin-tuc"
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    textDecoration: 'none',
                                    backgroundColor: !category ? '#0070f3' : '#f0f0f0',
                                    color: !category ? '#fff' : '#333',
                                    fontSize: '14px'
                                }}
                            >
                                Tất cả
                            </Link>
                            {Object.entries(categoryLabels).map(([key, label]) => (
                                <Link
                                    key={key}
                                    href={`/tin-tuc?category=${key}`}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        textDecoration: 'none',
                                        backgroundColor: category === key ? '#0070f3' : '#f0f0f0',
                                        color: category === key ? '#fff' : '#333',
                                        fontSize: '14px'
                                    }}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>

                        {/* Articles Grid */}
                        {loading ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '24px',
                                marginBottom: '40px'
                            }}>
                                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <div style={{
                                            width: '100%',
                                            height: '200px',
                                            backgroundColor: '#e0e0e0',
                                            animation: 'pulse 1.5s ease-in-out infinite'
                                        }} />
                                        <div style={{ padding: '16px' }}>
                                            <div style={{
                                                height: '20px',
                                                backgroundColor: '#e0e0e0',
                                                borderRadius: '4px',
                                                marginBottom: '8px',
                                                animation: 'pulse 1.5s ease-in-out infinite'
                                            }} />
                                            <div style={{
                                                height: '16px',
                                                backgroundColor: '#e0e0e0',
                                                borderRadius: '4px',
                                                width: '80%',
                                                animation: 'pulse 1.5s ease-in-out infinite'
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : articles.length > 0 ? (
                            <>
                                <div className="articles-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: '24px',
                                    marginBottom: '40px'
                                }}>
                                    {articles.map((article) => (
                                        <Link
                                            key={article._id}
                                            href={`/tin-tuc/${article.slug}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                display: 'block',
                                                backgroundColor: '#fff',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                transition: 'transform 0.2s, box-shadow 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-4px)';
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                            }}
                                        >
                                            <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                                                <Image
                                                    src={getOptimizedImageUrl(article.featuredImage?.url)}
                                                    alt={article.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    loading={articles.indexOf(article) < 6 ? 'eager' : 'lazy'}
                                                    priority={articles.indexOf(article) < 3}
                                                    quality={85}
                                                    placeholder="blur"
                                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                                />
                                            </div>
                                            <div style={{ padding: '16px' }}>
                                                <h2 style={{
                                                    fontSize: '18px',
                                                    fontWeight: '600',
                                                    marginBottom: '8px',
                                                    lineHeight: '1.4',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {article.title}
                                                </h2>
                                                {article.excerpt && (
                                                    <p style={{
                                                        fontSize: '14px',
                                                        color: '#666',
                                                        marginBottom: '12px',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        lineHeight: '1.5'
                                                    }}>
                                                        {article.excerpt}
                                                    </p>
                                                )}
                                                <div style={{
                                                    display: 'flex',
                                                    gap: '12px',
                                                    fontSize: '12px',
                                                    color: '#999',
                                                    alignItems: 'center'
                                                }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <Calendar size={12} />
                                                        {formatDate(article.publishedAt)}
                                                    </span>
                                                    {article.views > 0 && (
                                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <Eye size={12} />
                                                            {article.views.toLocaleString('vi-VN')}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        marginTop: '40px',
                                        flexWrap: 'wrap'
                                    }}>
                                        {currentPage > 1 && (
                                            <Link
                                                href={buildPageUrl(currentPage - 1)}
                                                style={{
                                                    padding: '8px 16px',
                                                    borderRadius: '4px',
                                                    textDecoration: 'none',
                                                    backgroundColor: '#f0f0f0',
                                                    color: '#333'
                                                }}
                                            >
                                                ← Trước
                                            </Link>
                                        )}
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }
                                            return (
                                                <Link
                                                    key={pageNum}
                                                    href={buildPageUrl(pageNum)}
                                                    style={{
                                                        padding: '8px 16px',
                                                        borderRadius: '4px',
                                                        textDecoration: 'none',
                                                        backgroundColor: currentPage === pageNum ? '#0070f3' : '#f0f0f0',
                                                        color: currentPage === pageNum ? '#fff' : '#333'
                                                    }}
                                                >
                                                    {pageNum}
                                                </Link>
                                            );
                                        })}
                                        {currentPage < totalPages && (
                                            <Link
                                                href={buildPageUrl(currentPage + 1)}
                                                style={{
                                                    padding: '8px 16px',
                                                    borderRadius: '4px',
                                                    textDecoration: 'none',
                                                    backgroundColor: '#f0f0f0',
                                                    color: '#333'
                                                }}
                                            >
                                                Sau →
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px' }}>
                                <p style={{ fontSize: '18px', color: '#666' }}>
                                    {search ? `Không tìm thấy bài viết nào cho "${search}"` : 'Chưa có bài viết nào'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    const { category, page: pageParam, search } = context.query;
    const currentPage = parseInt(pageParam) || 1;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    let initialArticles = [];
    let totalArticles = 0;
    let totalPages = 1;

    try {
        let url = `${apiUrl}/api/articles?limit=${ITEMS_PER_PAGE}&sort=-publishedAt`;
        const skip = (currentPage - 1) * ITEMS_PER_PAGE;
        url += `&skip=${skip}`;

        if (category) {
            url += `&category=${category}`;
        }

        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
                initialArticles = result.data.articles || [];
                totalArticles = result.data.total || 0;
                totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);
            }
        }
    } catch (error) {
        console.error('Error fetching articles in getServerSideProps:', error);
        // Continue with empty articles - client will retry
    }

    return {
        props: {
            initialArticles,
            initialTotalArticles: totalArticles,
            initialTotalPages: totalPages,
            initialCategory: category || null,
            initialSearch: search || null,
            initialPage: currentPage,
        },
    };
}

export default NewsListingPage;

