/**
 * Article Detail Page - SEO & UX Optimized
 * High performance with rich snippets and accessibility
 */

import { useState, useEffect, useMemo, useCallback, memo, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Lazy load heavy components for better performance
const SEOOptimized = dynamic(() => import('../../components/SEOOptimized'), {
    ssr: true
});

const PageSpeedOptimizer = dynamic(() => import('../../components/PageSpeedOptimizer'), {
    ssr: false
});

const Layout = dynamic(() => import('../../components/Layout'), {
    ssr: true
});

const ArticleSEO = dynamic(() => import('../../components/ArticleSEO'), {
    ssr: true
});

const SocialShareButtons = dynamic(() => import('../../components/SocialShareButtons'), {
    ssr: false,
    loading: () => <div style={{ minHeight: '50px' }} />
});

// Cloudinary optimization helper - Add transformations for better performance
const optimizeCloudinaryUrl = (imageUrl, options = {}) => {
    if (!imageUrl) return null;

    // Check if it's a Cloudinary URL
    const isCloudinary = imageUrl.includes('res.cloudinary.com') || imageUrl.includes('cloudinary.com');
    
    if (!isCloudinary) {
        return null; // Let caller handle non-Cloudinary URLs
    }

    // Parse Cloudinary URL
    // Format: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{folder}/{public_id}.{format}
    try {
        const url = new URL(imageUrl);
        const pathParts = url.pathname.split('/').filter(Boolean); // Remove empty strings

        // Cloudinary URL structure: /{cloud_name}/image/upload/{...}
        // pathParts[0] = cloud_name
        // pathParts[1] = 'image'
        // pathParts[2] = 'upload'
        // pathParts[3+] = version/folders/transforms/public_id

        if (pathParts.length < 4) return imageUrl; // Invalid URL structure
        if (pathParts[1] !== 'image' || pathParts[2] !== 'upload') return imageUrl;

        // Extract cloud_name (first part)
        const cloudName = pathParts[0];
        if (!cloudName) return imageUrl;

        // Extract parts after 'upload' (index 2)
        const afterUpload = pathParts.slice(3);
        if (afterUpload.length === 0) return imageUrl;

        // Find version and transformations
        let versionIndex = -1;
        let firstTransformIndex = -1;
        
        for (let i = 0; i < afterUpload.length; i++) {
            const part = afterUpload[i];
            // Check if it's a version (starts with 'v' followed by digits)
            if (part.startsWith('v') && /^v\d+$/.test(part) && versionIndex === -1) {
                versionIndex = i;
            }
            // Check if it's transformations (contains '_' or ',')
            if ((part.includes('_') || part.includes(',')) && firstTransformIndex === -1) {
                firstTransformIndex = i;
            }
        }

        // Extract components
        let version = null;
        let existingTransforms = [];
        let publicIdPath = []; // This includes folders + public_id
        
        if (versionIndex >= 0) {
            // URL has version
            version = afterUpload[versionIndex];
            // Everything before version are transformations (if any)
            if (versionIndex > 0) {
                existingTransforms = afterUpload.slice(0, versionIndex);
            }
            // Everything after version (including folders and public_id)
            publicIdPath = afterUpload.slice(versionIndex + 1);
        } else if (firstTransformIndex >= 0) {
            // URL has transformations but no version
            // Find where transformations end
            let transformEndIndex = firstTransformIndex;
            for (let i = firstTransformIndex + 1; i < afterUpload.length; i++) {
                if (!afterUpload[i].includes('_') && !afterUpload[i].includes(',')) {
                    transformEndIndex = i - 1;
                    break;
                }
                transformEndIndex = i;
            }
            existingTransforms = afterUpload.slice(0, transformEndIndex + 1);
            // Everything after transformations
            publicIdPath = afterUpload.slice(transformEndIndex + 1);
        } else {
            // No version, no transformations - everything is public_id path
            publicIdPath = afterUpload;
        }
        
        // publicIdPath now contains: [folders..., public_id.format]
        // Join them to get the full public_id path (Cloudinary supports folder in public_id)
        const publicIdWithFormat = publicIdPath.join('/');

        // Build optimized transformations
        const transforms = [];
        
        if (options.width) transforms.push(`w_${options.width}`);
        if (options.height) transforms.push(`h_${options.height}`);
        
        if (options.crop) {
            transforms.push(`c_${options.crop}`);
        } else if (options.width || options.height) {
            transforms.push('c_limit');
        }

        if (options.quality && options.quality !== 'auto') {
            transforms.push(`q_${options.quality}`);
        } else {
            transforms.push('q_auto');
        }

        transforms.push('f_auto');

        // Combine all parts in correct Cloudinary order:
        // transformations -> version -> public_id (which may include folders)
        const urlParts = [];
        
        // 1. Add transformations FIRST (combine existing and new)
        const allTransforms = [];
        if (existingTransforms.length > 0) {
            existingTransforms.forEach(transform => {
                // If transform contains commas, split and add individually
                if (transform.includes(',')) {
                    allTransforms.push(...transform.split(','));
                } else {
                    allTransforms.push(transform);
                }
            });
        }
        // Add new transforms
        allTransforms.push(...transforms);
        
        // Join all transforms with comma
        if (allTransforms.length > 0) {
            urlParts.push(allTransforms.join(','));
        }
        
        // 2. Add version if exists
        if (version) {
            urlParts.push(version);
        }
        
        // 3. Add public_id path (which includes folders if any)
        urlParts.push(publicIdWithFormat);
        
        // Build the path: /{cloud_name}/image/upload/{transformations}/{version}/{public_id_path}
        const newPath = `/${cloudName}/image/upload/${urlParts.join('/')}`;
        
        return `${url.protocol}//${url.host}${newPath}`;
    } catch (error) {
        console.warn('Error optimizing Cloudinary URL:', error, 'Original URL:', imageUrl);
        return imageUrl; // Return original on error
    }
};

// Helper to get optimized image URL
const getOptimizedImageUrl = (imageUrl, width, height) => {
    if (!imageUrl || imageUrl === 'null' || imageUrl === 'undefined' || imageUrl === '') {
        return '/logo1.png';
    }
    
    // Convert to string and trim
    let urlString = String(imageUrl).trim();
    if (!urlString) {
        return '/logo1.png';
    }
    
    // Fix malformed URLs where apiUrl was incorrectly prepended to absolute URLs
    // Example: "http://localhost:5000https://res.cloudinary.com/..." 
    // or "http://api1.ketquamn.comhttps://res.cloudinary.com/..."
    const malformedPattern = /^(https?:\/\/[^\/]+)(https?:\/\/.+)$/;
    const malformedMatch = urlString.match(malformedPattern);
    if (malformedMatch) {
        // Extract the correct absolute URL (the second part)
        urlString = malformedMatch[2];
        console.warn('Fixed malformed URL:', imageUrl, '->', urlString);
    }
    
    // If it's already a relative path starting with /, return as is
    if (urlString.startsWith('/') && !urlString.startsWith('//')) {
        return urlString;
    }
    
    // Check if it's already an absolute URL (starts with http:// or https://)
    // This must be checked BEFORE any other processing to avoid concatenation issues
    if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
        
        // If it's Cloudinary, optimize it
        if (urlString.includes('cloudinary.com') || urlString.includes('res.cloudinary.com')) {
            const optimized = optimizeCloudinaryUrl(urlString, { width, height, quality: 'auto', crop: 'limit' });
            return optimized || urlString; // Return original if optimization failed
        }
        // For other absolute URLs, return as is
        return urlString;
    }
    
    // Handle protocol-relative URLs (//example.com/path)
    if (urlString.startsWith('//')) {
        const urlWithProtocol = `https:${urlString}`;
        if (urlWithProtocol.includes('cloudinary.com') || urlWithProtocol.includes('res.cloudinary.com')) {
            const optimized = optimizeCloudinaryUrl(urlWithProtocol, { width, height, quality: 'auto', crop: 'limit' });
            return optimized || urlWithProtocol;
        }
        return urlWithProtocol;
    }
    
    // If it's Cloudinary URL but missing protocol, add it
    if (urlString.includes('cloudinary.com') || urlString.includes('res.cloudinary.com')) {
        const cloudinaryUrl = urlString.startsWith('/') ? `https://res.cloudinary.com${urlString}` : `https://${urlString}`;
        const optimized = optimizeCloudinaryUrl(cloudinaryUrl, { width, height, quality: 'auto', crop: 'limit' });
        return optimized || cloudinaryUrl;
    }
    
    // Try to parse as URL to check if it's valid
    try {
        const url = new URL(urlString);
        return urlString;
    } catch {
        // If it's not a valid URL, treat as relative path
        if (urlString && !urlString.startsWith('/')) {
            return `/${urlString}`;
        }
        // Last resort: return fallback
        console.warn('Invalid image URL:', imageUrl);
        return '/logo1.png';
    }
};
// ✅ Removed duplicate CSS import to reduce bundle size
// import '../../styles/XoSoMienBac.module.css';
// SVG Icon Components (replacing lucide-react)
const CalendarIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const EyeIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const HeartIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

const Share2Icon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);

const ClockIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const TagIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
        <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
);

const ArrowLeftIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const TrendingUpIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
);

const StarIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const BookOpenIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
);

const LightbulbIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="9" y1="21" x2="15" y2="21"></line>
        <line x1="12" y1="3" x2="12" y2="23"></line>
        <path d="M21 12h-4l-2-2H9l-2 2H3"></path>
    </svg>
);

const BarChart3Icon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
);

const NewspaperIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
        <path d="M18 14h-8"></path>
        <path d="M15 18h-5"></path>
        <path d="M10 6h8v4h-8V6Z"></path>
    </svg>
);

const FacebookIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const Link2Icon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path>
        <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
);

const FolderOpenIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h12a2 2 0 0 1 2 2v1"></path>
        <path d="M5 19h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v7a2 2 0 0 1-2 2z"></path>
    </svg>
);

const ArrowRightIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const MenuIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const TwitterIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
);

const SendIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

const MessageCircleIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);

const XIcon = ({ size = 14, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// Aliases for compatibility
const Calendar = CalendarIcon;
const Eye = EyeIcon;
const Heart = HeartIcon;
const Share2 = Share2Icon;
const Clock = ClockIcon;
const Tag = TagIcon;
const ArrowLeft = ArrowLeftIcon;
const TrendingUp = TrendingUpIcon;
const Star = StarIcon;
const BookOpen = BookOpenIcon;
const Lightbulb = LightbulbIcon;
const BarChart3 = BarChart3Icon;
const Newspaper = NewspaperIcon;
const Facebook = FacebookIcon;
const Link2 = Link2Icon;
const FolderOpen = FolderOpenIcon;
const ArrowRight = ArrowRightIcon;
const Menu = MenuIcon;
const Twitter = TwitterIcon;
const Send = SendIcon;
const MessageCircle = MessageCircleIcon;
const X = XIcon;
import styles from '../../styles/ArticleDetailClassic.module.css';

// Lazy load heavy components for better PageSpeed with proper code splitting
// Note: RelatedArticles is rendered inline, no need for separate component

// Server-side data fetching for SEO
export async function getServerSideProps(context) {
    const { slug } = context.params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    // Normalize siteUrl - remove trailing slash for consistency
    const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
    const siteUrl = rawSiteUrl.replace(/\/+$/, '');

    try {
        // Fetch article data on server with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        let response;
        try {
            response = await fetch(`${apiUrl}/api/articles/${slug}`, {
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            clearTimeout(timeoutId);
        } catch (fetchError) {
            clearTimeout(timeoutId);
            console.error('Fetch error in getServerSideProps:', fetchError);
            // Return not found if fetch fails
            return {
                notFound: true
            };
        }

        if (!response.ok) {
            console.error(`API returned ${response.status} for article ${slug}`);
            return {
                notFound: true
            };
        }

        const result = await response.json();

        if (result.success && result.data) {
            const article = result.data;
            
            // Prepare SEO data
            let ogImageUrl = `${siteUrl}/logo1.png`;
            if (article.featuredImage?.url) {
                if (article.featuredImage.url.startsWith('http://') || article.featuredImage.url.startsWith('https://')) {
                    ogImageUrl = article.featuredImage.url;
                } else if (article.featuredImage.url.startsWith('/')) {
                    ogImageUrl = `${siteUrl}${article.featuredImage.url}`;
                } else {
                    ogImageUrl = `${siteUrl}/${article.featuredImage.url}`;
                }
            }

            // Prepare description
            let description = article.metaDescription || article.excerpt;
            if (!description && article.content) {
                // Remove HTML tags and get first 150 chars
                description = article.content.replace(/<[^>]*>/g, '').substring(0, 150).trim();
            }
            if (!description) {
                description = article.title;
            }
            if (description.length > 160) {
                description = description.substring(0, 157) + '...';
            }

            return {
                props: {
                    article: article,
                    seoData: {
                        title: article.title,
                        description: description,
                        image: ogImageUrl,
                        url: `${siteUrl}/tin-tuc/${article.slug}`,
                        publishedTime: article.publishedAt,
                        modifiedTime: article.updatedAt || article.publishedAt,
                        author: article.author || 'Admin',
                        category: article.category,
                        tags: article.tags || [],
                        articleData: {
                            publishedTime: article.publishedAt,
                            modifiedTime: article.updatedAt || article.publishedAt,
                            author: article.author || 'Admin',
                            section: article.category,
                            tags: article.tags || [],
                            readingTime: Math.ceil((article.content?.length || 0) / 1000),
                            wordCount: article.content?.length || 0
                        }
                    }
                }
            };
        } else {
            console.error('Article not found or invalid response:', result);
            return {
                notFound: true
            };
        }
    } catch (error) {
        console.error('Error fetching article in getServerSideProps:', error);
        return {
            notFound: true
        };
    }
}

export default function ArticleDetailPage({ article: initialArticle, seoData: initialSeoData }) {
    const router = useRouter();
    const { slug } = router.query;
    const [article, setArticle] = useState(initialArticle);
    const [relatedArticles, setRelatedArticles] = useState([]);
    // Simple: just initialize empty arrays, fetch once on mount
    const [mostViewedArticles, setMostViewedArticles] = useState([]);
    const [trendingArticles, setTrendingArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [readingProgress, setReadingProgress] = useState(0);
    const [showTOC, setShowTOC] = useState(false);
    const [activeHeading, setActiveHeading] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [viewCount, setViewCount] = useState(0);

    // Normalize siteUrl to avoid hydration mismatch (remove trailing slash)
    const siteUrl = useMemo(() => {
        const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketquamn.com';
        return url.replace(/\/+$/, ''); // Remove trailing slashes for consistency
    }, []);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Memoized utility functions for better performance
    const formatDate = useCallback((dateString) => {
        if (!dateString) return 'Ngày đăng';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return 'Ngày đăng';
        }
    }, []);

    // Map old categories to new categories (đồng bộ với tin-tuc.js)
    const mapOldCategoryToNew = useCallback((category) => {
        const mapping = {
            'du-doan-ket-qua-xo-so': 'soi-cau-dac-biet',
            'dan-de-chuyen-nghiep': 'dan-de-bat-tu',
            'thong-ke-xo-so': 'soi-cau-dac-biet',
            'giai-ma-giac-mo': 'soi-cau-lo-to',
            'tin-tuc-xo-so': 'soi-cau-dac-biet',
            'kinh-nghiem-choi-lo-de': 'kinh-nghiem',
            'meo-vat-xo-so': 'kinh-nghiem',
            'phuong-phap-soi-cau': 'soi-cau-lo-to',
            'huong-dan-choi': 'kinh-nghiem'
        };
        return mapping[category] || category;
    }, []);

    const getCategoryColor = useCallback((category) => {
        const mappedCategory = mapOldCategoryToNew(category);
        const colors = {
            'kinh-nghiem': '#0397ab',
            'soi-cau-lo-to': '#d32f2f',
            'soi-cau-dac-biet': '#7c3aed',
            'dan-de-bat-tu': '#f59e0b'
        };
        return colors[mappedCategory] || '#6b7280';
    }, [mapOldCategoryToNew]);

    const getCategoryLabel = useCallback((category) => {
        const mappedCategory = mapOldCategoryToNew(category);
        const labels = {
            'kinh-nghiem': 'Kinh Nghiệm',
            'soi-cau-lo-to': 'Soi Cầu Lôtô',
            'soi-cau-dac-biet': 'Soi Cầu Đặc Biệt',
            'dan-de-bat-tu': 'Dàn Đề Bất Tử'
        };
        return labels[mappedCategory] || 'Tin Tức';
    }, [mapOldCategoryToNew]);

    // Helper function to shuffle array (Fisher-Yates algorithm)
    const shuffleArray = useCallback((array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);

    // Fetch article data with error handling, caching, and request deduplication
    const fetchArticle = useCallback(async () => {
        if (!slug || initialArticle) {
            // If we have initial data from SSR, use it and just update view count
            if (initialArticle) {
                setViewCount(initialArticle.views || 0);
                setLoading(false);
                // Fetch related articles, most viewed, and trending in background
                if (initialArticle.category && initialArticle._id) {
                    // Get mapped category (new category) for filtering
                    const currentArticleCategory = mapOldCategoryToNew(initialArticle.category);
                    
                    Promise.allSettled([
                        // Fetch recent articles (200 should be enough to get 20 articles of same category)
                        // Then filter by mapped category on client-side and take max 20 newest
                        fetch(`${apiUrl}/api/articles?limit=200&sort=-publishedAt`, {
                            headers: { 'Cache-Control': 'max-age=600' }
                        }).then(res => res.json()).catch(() => ({ success: false })),
                        fetch(`${apiUrl}/api/articles?sort=views&limit=5`, {
                            headers: { 'Cache-Control': 'max-age=600' }
                        }).then(res => res.json()).catch(() => ({ success: false })),
                        fetch(`${apiUrl}/api/articles?category=trending&limit=6`, {
                            headers: { 'Cache-Control': 'max-age=600' }
                        }).then(res => res.json()).catch(() => ({ success: false }))
                    ]).then(([relatedRes, mostViewedRes, trendingRes]) => {
                        console.log('📰 Related articles fetch result:', {
                            status: relatedRes.status,
                            success: relatedRes.status === 'fulfilled' ? relatedRes.value?.success : null,
                            data: relatedRes.status === 'fulfilled' ? relatedRes.value?.data : null
                        });
                        
                        if (relatedRes.status === 'fulfilled' && relatedRes.value.success) {
                            let relatedData = relatedRes.value.data?.articles || [];
                            console.log('📰 Raw articles fetched:', {
                                total: relatedData.length,
                                currentArticleCategory: initialArticle.category,
                                mappedCategory: currentArticleCategory,
                                articles: relatedData.slice(0, 5).map(a => ({ 
                                    id: String(a._id), 
                                    title: a.title, 
                                    category: a.category,
                                    mappedCategory: mapOldCategoryToNew(a.category)
                                }))
                            });
                            
                            // Filter by mapped category (new category) - so all articles with same mapped category are included
                            const beforeCategoryFilter = relatedData.length;
                            relatedData = relatedData.filter(article => {
                                const articleMappedCategory = mapOldCategoryToNew(article.category);
                                return articleMappedCategory === currentArticleCategory;
                            });
                            console.log('📰 After category filter:', {
                                before: beforeCategoryFilter,
                                after: relatedData.length,
                                currentArticleCategory: initialArticle.category,
                                mappedCategory: currentArticleCategory
                            });
                            
                            // Filter out current article - convert both to string for reliable comparison
                            const currentArticleId = String(initialArticle._id);
                            const beforeExclude = relatedData.length;
                            relatedData = relatedData.filter(article => String(article._id) !== currentArticleId);
                            console.log('📰 After exclude current:', {
                                before: beforeExclude,
                                after: relatedData.length,
                                currentArticleId: currentArticleId
                            });
                            
                            // Sort by publishedAt (newest first) - articles are already sorted by API but ensure it
                            relatedData.sort((a, b) => {
                                const dateA = new Date(a.publishedAt || 0);
                                const dateB = new Date(b.publishedAt || 0);
                                return dateB - dateA; // Newest first
                            });
                            
                            // Take maximum 20 newest articles
                            relatedData = relatedData.slice(0, 20);
                            
                            // Shuffle array to get random articles from the 20 newest
                            relatedData = shuffleArray(relatedData);
                            
                            // Take first 4 random articles to display
                            relatedData = relatedData.slice(0, 4);
                            
                            console.log('📰 Related articles final result:', {
                                totalFetched: relatedRes.value.data?.articles?.length || 0,
                                afterCategoryFilter: beforeExclude,
                                afterExcludeCurrent: relatedData.length,
                                max20Newest: Math.min(20, relatedData.length),
                                finalDisplayed: relatedData.length,
                                currentCategory: initialArticle.category,
                                mappedCategory: currentArticleCategory,
                                currentArticleId: String(initialArticle._id),
                                finalArticles: relatedData.map(a => ({ id: String(a._id), title: a.title, category: a.category, publishedAt: a.publishedAt }))
                            });
                            setRelatedArticles(relatedData);
                        } else {
                            console.error('⚠️ Failed to load related articles (SSR):', {
                                status: relatedRes.status,
                                reason: relatedRes.status === 'rejected' ? relatedRes.reason : null,
                                value: relatedRes.status === 'fulfilled' ? relatedRes.value : null
                            });
                            setRelatedArticles([]);
                        }
                        if (mostViewedRes.status === 'fulfilled' && mostViewedRes.value.success) {
                            const mostViewedData = mostViewedRes.value.data.articles || [];
                            console.log('👁️ Most viewed articles loaded (SSR):', mostViewedData.length);
                            setMostViewedArticles(mostViewedData);
                        } else {
                            console.warn('⚠️ Failed to load most viewed articles (SSR):', mostViewedRes.status === 'rejected' ? mostViewedRes.reason : mostViewedRes.value);
                        }
                        if (trendingRes.status === 'fulfilled' && trendingRes.value.success) {
                            const trendingData = trendingRes.value.data.articles || [];
                            console.log('🔥 Trending articles loaded (SSR):', trendingData.length);
                            setTrendingArticles(trendingData);
                        } else {
                            console.warn('⚠️ Failed to load trending articles (SSR):', trendingRes.status === 'rejected' ? trendingRes.reason : trendingRes.value);
                        }
                    }).catch(console.error);
                }
                return;
            }
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Fetch article first to get category for related articles
            const articleResponse = await fetch(`${apiUrl}/api/articles/${slug}`, {
                headers: { 'Cache-Control': 'max-age=300' }
            });
            const articleResult = await articleResponse.json();

            if (articleResult.success) {
                const articleData = articleResult.data;
                setArticle(articleData);
                setViewCount(articleData.views || 0);

                // Get mapped category (new category) for filtering
                const currentArticleCategory = mapOldCategoryToNew(articleData.category);

                // Now fetch related articles, most viewed, and trending in parallel
                const [relatedRes, mostViewedRes, trendingRes] = await Promise.allSettled([
                    // Fetch recent articles (200 should be enough to get 20 articles of same category)
                    // Then filter by mapped category on client-side and take max 20 newest
                    fetch(`${apiUrl}/api/articles?limit=200&sort=-publishedAt`, {
                        headers: { 'Cache-Control': 'max-age=600' }
                    }).then(res => res.json()).catch(() => ({ success: false })),
                    fetch(`${apiUrl}/api/articles?sort=views&limit=5`, {
                        headers: { 'Cache-Control': 'max-age=600' }
                    }).then(res => res.json()).catch(() => ({ success: false })),
                    fetch(`${apiUrl}/api/articles?category=trending&limit=6`, {
                        headers: { 'Cache-Control': 'max-age=600' }
                    }).then(res => res.json()).catch(() => ({ success: false }))
                ]);

                // Process related articles
                console.log('📰 Related articles fetch result (client):', {
                    status: relatedRes.status,
                    success: relatedRes.status === 'fulfilled' ? relatedRes.value?.success : null,
                    data: relatedRes.status === 'fulfilled' ? relatedRes.value?.data : null
                });
                
                if (relatedRes.status === 'fulfilled' && relatedRes.value.success) {
                    let relatedData = relatedRes.value.data?.articles || [];
                    console.log('📰 Raw articles fetched (client):', {
                        total: relatedData.length,
                        currentArticleCategory: articleData.category,
                        mappedCategory: currentArticleCategory,
                        articles: relatedData.slice(0, 5).map(a => ({ 
                            id: String(a._id), 
                            title: a.title, 
                            category: a.category,
                            mappedCategory: mapOldCategoryToNew(a.category)
                        }))
                    });
                    
                    // Filter by mapped category (new category) - so all articles with same mapped category are included
                    const beforeCategoryFilter = relatedData.length;
                    relatedData = relatedData.filter(article => {
                        const articleMappedCategory = mapOldCategoryToNew(article.category);
                        return articleMappedCategory === currentArticleCategory;
                    });
                    console.log('📰 After category filter (client):', {
                        before: beforeCategoryFilter,
                        after: relatedData.length,
                        currentArticleCategory: articleData.category,
                        mappedCategory: currentArticleCategory
                    });
                    
                    // Filter out current article - convert both to string for reliable comparison
                    const currentArticleId = String(articleData._id);
                    const beforeExclude = relatedData.length;
                    relatedData = relatedData.filter(article => String(article._id) !== currentArticleId);
                    console.log('📰 After exclude current (client):', {
                        before: beforeExclude,
                        after: relatedData.length,
                        currentArticleId: currentArticleId
                    });
                    
                    // Sort by publishedAt (newest first) - articles are already sorted by API but ensure it
                    relatedData.sort((a, b) => {
                        const dateA = new Date(a.publishedAt || 0);
                        const dateB = new Date(b.publishedAt || 0);
                        return dateB - dateA; // Newest first
                    });
                    
                    // Take maximum 20 newest articles
                    relatedData = relatedData.slice(0, 20);
                    
                    // Shuffle array to get random articles from the 20 newest
                    relatedData = shuffleArray(relatedData);
                    
                    // Take first 4 random articles to display
                    relatedData = relatedData.slice(0, 4);
                    
                    console.log('📰 Related articles final result (client):', {
                        totalFetched: relatedRes.value.data?.articles?.length || 0,
                        afterCategoryFilter: beforeExclude,
                        afterExcludeCurrent: relatedData.length,
                        max20Newest: Math.min(20, relatedData.length),
                        finalDisplayed: relatedData.length,
                        currentCategory: articleData.category,
                        mappedCategory: currentArticleCategory,
                        currentArticleId: String(articleData._id),
                        finalArticles: relatedData.map(a => ({ id: String(a._id), title: a.title, category: a.category, publishedAt: a.publishedAt }))
                    });
                    setRelatedArticles(relatedData);
                } else {
                    console.error('⚠️ Failed to load related articles (client):', {
                        status: relatedRes.status,
                        reason: relatedRes.status === 'rejected' ? relatedRes.reason : null,
                        value: relatedRes.status === 'fulfilled' ? relatedRes.value : null
                    });
                    setRelatedArticles([]);
                }

                // Process most viewed articles
                if (mostViewedRes.status === 'fulfilled' && mostViewedRes.value.success) {
                    const mostViewedData = mostViewedRes.value.data.articles || [];
                    console.log('👁️ Most viewed articles loaded:', mostViewedData.length);
                    setMostViewedArticles(mostViewedData);
                } else {
                    console.warn('⚠️ Failed to load most viewed articles:', mostViewedRes.status === 'rejected' ? mostViewedRes.reason : mostViewedRes.value);
                }

                // Process trending articles
                if (trendingRes.status === 'fulfilled' && trendingRes.value.success) {
                    const trendingData = trendingRes.value.data.articles || [];
                    console.log('🔥 Trending articles loaded:', trendingData.length);
                    setTrendingArticles(trendingData);
                } else {
                    console.warn('⚠️ Failed to load trending articles:', trendingRes.status === 'rejected' ? trendingRes.reason : trendingRes.value);
                }

                // Track view asynchronously (don't wait for it)
                fetch(`${apiUrl}/api/articles/${slug}/view`, { 
                    method: 'POST',
                    keepalive: true 
                }).catch(console.error);
            } else {
                setError(articleRes.value?.message || 'Không thể tải bài viết');
            }
        } catch (err) {
            console.error('Error fetching article:', err);
            setError('Lỗi kết nối. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    }, [slug, apiUrl, initialArticle, shuffleArray, mapOldCategoryToNew]);

    // Table of Contents generation and content processing
    // Use state to track if we're on client to avoid hydration mismatch
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    const { tableOfContents, processedContent } = useMemo(() => {
        const currentArticle = article || initialArticle;
        if (!currentArticle?.content) {
            return { tableOfContents: [], processedContent: '' };
        }

        // On server or before hydration, return original content
        if (!isClient || typeof document === 'undefined') {
            return { 
                tableOfContents: [], 
                processedContent: currentArticle.content 
            };
        }

        // Only process on client after hydration
        const headings = [];
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = currentArticle.content;

        const headingElements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headingElements.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            headings.push({
                id,
                text: heading.textContent,
                level: parseInt(heading.tagName.charAt(1))
            });
        });

        // Return the processed HTML with IDs
        return {
            tableOfContents: headings,
            processedContent: tempDiv.innerHTML
        };
    }, [article?.content, initialArticle?.content, isClient]);

    // Load sidebar articles from sessionStorage when slug changes (route change)
    // This runs FIRST before any other effects to ensure data is available immediately
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        // Load from sessionStorage immediately when slug changes
        // This ensures data is available immediately, avoiding "Đang tải..." flash
        const loadFromCache = () => {
            try {
                const cachedMostViewed = sessionStorage.getItem('mostViewedArticles');
                const cachedTrending = sessionStorage.getItem('trendingArticles');
                
                if (cachedMostViewed) {
                    const parsed = JSON.parse(cachedMostViewed);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        // Always update to ensure data is fresh
                        console.log('📦 Loading most viewed articles from cache on route change:', parsed.length);
                        setMostViewedArticles(parsed);
                    }
                }
                
                if (cachedTrending) {
                    const parsed = JSON.parse(cachedTrending);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        // Always update to ensure data is fresh
                        console.log('📦 Loading trending articles from cache on route change:', parsed.length);
                        setTrendingArticles(parsed);
                    }
                }
            } catch (error) {
                console.warn('⚠️ Error loading from sessionStorage on route change:', error);
            }
        };
        
        // Load immediately
        loadFromCache();
    }, [slug]); // Only depend on slug

    // Reset and fetch article when slug changes
    useEffect(() => {
        if (!router.isReady || !slug) return;
        
        // Check if slug matches initialArticle
        if (initialArticle && initialArticle.slug === slug) {
            // Use initialArticle if slug matches
            setArticle(initialArticle);
            setViewCount(initialArticle.views || 0);
            setLoading(false);
            setError(null);
        } else if (slug) {
            // Fetch new article if slug doesn't match or no initialArticle
            console.log('🔄 Slug changed, fetching new article:', slug);
            setLoading(true);
            setError(null);
            setArticle(null);
            
            fetch(`${apiUrl}/api/articles/${slug}`, {
                headers: { 'Cache-Control': 'max-age=300' }
            })
            .then(res => res.json())
            .then(result => {
                if (result.success && result.data) {
                    setArticle(result.data);
                    setViewCount(result.data.views || 0);
                    setLoading(false);
                } else {
                    setError('Không tìm thấy bài viết');
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error('Error fetching article:', err);
                setError('Lỗi kết nối. Vui lòng thử lại sau.');
                setLoading(false);
            });
        }
    }, [slug, router.isReady, initialArticle, apiUrl]);

    // Simple: Fetch most viewed and trending articles when needed
    // Fetch when slug changes if we don't have data (similar to related articles)
    useEffect(() => {
        // Only fetch if we don't have data yet
        if (mostViewedArticles.length > 0) {
            return; // Already have data, don't fetch again
        }

        const fetchSidebarArticles = async () => {
            try {
                console.log('🔄 Fetching most viewed and trending articles...');
                
                const [mostViewedRes, trendingRes] = await Promise.allSettled([
                    fetch(`${apiUrl}/api/articles?sort=views&limit=5`, {
                        headers: { 'Cache-Control': 'max-age=600' }
                    }).then(res => res.json()).catch(() => ({ success: false })),
                    fetch(`${apiUrl}/api/articles?category=trending&limit=6`, {
                        headers: { 'Cache-Control': 'max-age=600' }
                    }).then(res => res.json()).catch(() => ({ success: false }))
                ]);

                if (mostViewedRes.status === 'fulfilled' && mostViewedRes.value.success) {
                    const mostViewedData = mostViewedRes.value.data?.articles || [];
                    if (mostViewedData.length > 0) {
                        console.log('👁️ Most viewed articles loaded:', mostViewedData.length);
                        setMostViewedArticles(mostViewedData);
                    }
                }

                if (trendingRes.status === 'fulfilled' && trendingRes.value.success) {
                    const trendingData = trendingRes.value.data?.articles || [];
                    if (trendingData.length > 0) {
                        console.log('🔥 Trending articles loaded:', trendingData.length);
                        setTrendingArticles(trendingData);
                    }
                }
            } catch (error) {
                console.error('❌ Error fetching sidebar articles:', error);
            }
        };

        fetchSidebarArticles();
    }, [apiUrl, slug, mostViewedArticles.length]); // Fetch when slug changes if we don't have data

    // Fetch related articles when article is available
    useEffect(() => {
        const currentArticle = article || initialArticle;
        if (!currentArticle || !currentArticle._id || !currentArticle.category) {
            return;
        }
        
        // Only fetch if slug matches current article
        if (currentArticle.slug !== slug) {
            return;
        }

        const fetchRelatedArticles = async () => {
            try {
                const currentArticleCategory = mapOldCategoryToNew(currentArticle.category);
                console.log('🔄 Fetching related articles for:', {
                    articleId: String(currentArticle._id),
                    category: currentArticle.category,
                    mappedCategory: currentArticleCategory
                });

                const response = await fetch(`${apiUrl}/api/articles?limit=200&sort=-publishedAt`, {
                    headers: { 'Cache-Control': 'max-age=600' }
                });
                const result = await response.json();

                if (result.success && result.data?.articles) {
                    let relatedData = result.data.articles || [];
                    console.log('📰 Raw articles fetched:', {
                        total: relatedData.length,
                        currentArticleCategory: currentArticle.category,
                        mappedCategory: currentArticleCategory
                    });

                    // Filter by mapped category
                    relatedData = relatedData.filter(article => {
                        const articleMappedCategory = mapOldCategoryToNew(article.category);
                        return articleMappedCategory === currentArticleCategory;
                    });
                    console.log('📰 After category filter:', {
                        count: relatedData.length,
                        mappedCategory: currentArticleCategory
                    });

                    // Filter out current article
                    const currentArticleId = String(currentArticle._id);
                    relatedData = relatedData.filter(article => String(article._id) !== currentArticleId);
                    console.log('📰 After exclude current:', {
                        count: relatedData.length,
                        currentArticleId: currentArticleId
                    });

                    // Sort by publishedAt (newest first)
                    relatedData.sort((a, b) => {
                        const dateA = new Date(a.publishedAt || 0);
                        const dateB = new Date(b.publishedAt || 0);
                        return dateB - dateA;
                    });

                    // Take maximum 20 newest articles
                    relatedData = relatedData.slice(0, 20);

                    // Shuffle array to get random articles
                    relatedData = shuffleArray(relatedData);

                    // Take first 4 random articles to display
                    relatedData = relatedData.slice(0, 4);

                    console.log('📰 Related articles final result:', {
                        finalCount: relatedData.length,
                        articles: relatedData.map(a => ({ id: String(a._id), title: a.title, category: a.category }))
                    });
                    setRelatedArticles(relatedData);
                } else {
                    console.error('❌ Failed to fetch related articles:', result);
                    setRelatedArticles([]);
                }
            } catch (error) {
                console.error('❌ Error fetching related articles:', error);
                setRelatedArticles([]);
            }
        };

        fetchRelatedArticles();
    }, [article, initialArticle, apiUrl, mapOldCategoryToNew, shuffleArray, slug]);

    // Reset state when slug changes (navigation to different article)
    useEffect(() => {
        if (slug && router.isReady) {
            // Reset all states when navigating to a new article
            setArticle(null);
            setRelatedArticles([]);
            setMostViewedArticles([]);
            setTrendingArticles([]);
            setLoading(true);
            setError(null);
            setReadingProgress(0);
            setShowTOC(false);
            setActiveHeading('');
            setIsLiked(false);
            setViewCount(0);
        }
    }, [slug, router.isReady]);

    // Effects
    useEffect(() => {
        if (!router.isReady) return; // Wait for router to be ready
        
        // If we have initial data and slug matches, use it
        if (initialArticle && initialArticle.slug === slug) {
            setLoading(false);
            setViewCount(initialArticle.views || 0);
            setArticle(initialArticle);
        } else if (slug) {
            // Fetch article if slug doesn't match initialArticle or no initialArticle
            fetchArticle();
        }
    }, [fetchArticle, initialArticle, slug, router.isReady]);

    // Ensure headings have IDs after content is rendered
    useEffect(() => {
        if (typeof window === 'undefined' || !processedContent || tableOfContents.length === 0) return;

        // Wait for DOM to be ready
        const timer = setTimeout(() => {
            // Try multiple selectors to find the article content
            const articleContent = document.querySelector('[itemprop="articleBody"]') || 
                                   document.querySelector('.xsmbContainer');
            if (!articleContent) return;

            // Find all headings in the rendered content and add IDs
            const headings = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headings.forEach((heading, index) => {
                if (index < tableOfContents.length && !heading.id) {
                    heading.id = tableOfContents[index].id;
                }
            });
        }, 100);

        return () => clearTimeout(timer);
    }, [processedContent, tableOfContents]);

    // Reading progress tracking and active heading detection - Optimized with throttling
    useEffect(() => {
        if (typeof window === 'undefined') return;

        let ticking = false;
        let rafId = null;

        const updateReadingProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.min(100, (scrollTop / docHeight) * 100);
            setReadingProgress(scrollPercent);

            // Update active heading based on scroll position
            if (tableOfContents.length > 0) {
                const offset = 100; // Offset for fixed headers
                let currentHeading = '';

                // Check each heading from bottom to top
                for (let i = tableOfContents.length - 1; i >= 0; i--) {
                    const element = document.getElementById(tableOfContents[i].id);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top <= offset) {
                            currentHeading = tableOfContents[i].id;
                            break;
                        }
                    }
                }

                if (currentHeading !== activeHeading) {
                    setActiveHeading(currentHeading);
                }
            }
            
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                rafId = requestAnimationFrame(updateReadingProgress);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [tableOfContents, activeHeading]);

            // Enhanced structured data for rich snippets - SEO optimized
    const structuredData = useMemo(() => {
        const currentArticle = article || initialArticle;
        if (!currentArticle) return null;

        const readingTime = Math.max(1, Math.ceil((currentArticle.content?.length || 0) / 1000));
        const wordCount = currentArticle.content?.split(/\s+/).length || 0;
        
        // Ensure image URL is absolute
        let imageUrl = `${siteUrl}/logo1.png`;
        if (currentArticle.featuredImage?.url) {
            if (currentArticle.featuredImage.url.startsWith('http://') || currentArticle.featuredImage.url.startsWith('https://')) {
                imageUrl = currentArticle.featuredImage.url;
            } else if (currentArticle.featuredImage.url.startsWith('/')) {
                imageUrl = `${siteUrl}${currentArticle.featuredImage.url}`;
            } else {
                imageUrl = `${siteUrl}/${currentArticle.featuredImage.url}`;
            }
        }

        return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: currentArticle.title,
            description: currentArticle.metaDescription || currentArticle.excerpt || currentArticle.title,
            image: {
                '@type': 'ImageObject',
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: currentArticle.featuredImage?.alt || currentArticle.title
            },
            datePublished: currentArticle.publishedAt,
            dateModified: currentArticle.updatedAt || currentArticle.publishedAt,
            author: {
                '@type': 'Person',
                name: currentArticle.author || 'Admin',
                url: siteUrl
            },
            publisher: {
                '@type': 'Organization',
                name: 'S-Games - Tin Tức Game & Esports',
                logo: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}/logo1.png`,
                    width: 512,
                    height: 512
                }
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${siteUrl}/tin-tuc/${currentArticle.slug}`
            },
            interactionStatistic: [
                {
                    '@type': 'InteractionCounter',
                    interactionType: 'https://schema.org/ReadAction',
                    userInteractionCount: currentArticle.views || 0
                },
                {
                    '@type': 'InteractionCounter',
                    interactionType: 'https://schema.org/ShareAction',
                    userInteractionCount: currentArticle.shares || Math.floor((currentArticle.views || 0) * 0.1)
                }
            ],
            wordCount: wordCount,
            timeRequired: `PT${readingTime}M`,
            articleSection: getCategoryLabel(currentArticle.category),
            keywords: currentArticle.keywords?.join(', ') || currentArticle.tags?.join(', ') || 'tin tức game, LMHT, Liên Quân Mobile, TFT',
            inLanguage: 'vi-VN',
            // Add category URL for better internal linking
            about: {
                '@type': 'Thing',
                name: getCategoryLabel(currentArticle.category),
                url: `${siteUrl}/tin-tuc?category=${currentArticle.category}`
            }
        };
    }, [article, initialArticle, siteUrl]);

    // Enhanced SEO data with validation - use initial data if available
    const seoData = useMemo(() => {
        const currentArticle = article || initialArticle;
        if (!currentArticle) return initialSeoData || null;

        const readingTime = Math.max(1, Math.ceil((currentArticle.content?.length || 0) / 1000));
        
        // Optimize meta description length (150-160 chars for best SEO)
        // Use excerpt or first part of content as description
        let rawDescription = currentArticle.metaDescription || currentArticle.excerpt;
        
        // If no excerpt, extract from content (first 150 chars) - safe for SSR
        if (!rawDescription && currentArticle.content && typeof document !== 'undefined') {
            try {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = currentArticle.content;
                const textContent = tempDiv.textContent || tempDiv.innerText || '';
                rawDescription = textContent.substring(0, 150).trim();
            } catch (e) {
                // Fallback: remove HTML tags using regex (works on server)
                rawDescription = currentArticle.content.replace(/<[^>]*>/g, '').substring(0, 150).trim();
            }
        } else if (!rawDescription && currentArticle.content) {
            // Server-side fallback: remove HTML tags using regex
            rawDescription = currentArticle.content.replace(/<[^>]*>/g, '').substring(0, 150).trim();
        }
        
        // Fallback to title if still no description
        if (!rawDescription) {
            rawDescription = currentArticle.title;
        }
        
        const optimizedDescription = rawDescription.length > 160 
            ? rawDescription.substring(0, 157) + '...' 
            : rawDescription;

        // Ensure ogImage is absolute URL for proper social sharing preview
        let ogImageUrl = `${siteUrl}/logo1.png`;
        if (currentArticle.featuredImage?.url) {
            if (currentArticle.featuredImage.url.startsWith('http://') || currentArticle.featuredImage.url.startsWith('https://')) {
                ogImageUrl = currentArticle.featuredImage.url;
            } else if (currentArticle.featuredImage.url.startsWith('/')) {
                ogImageUrl = `${siteUrl}${currentArticle.featuredImage.url}`;
            } else {
                ogImageUrl = `${siteUrl}/${currentArticle.featuredImage.url}`;
            }
        }

        return {
            title: `${currentArticle.title} | Tin Tức Game - LMHT, Liên Quân, TFT`,
            description: optimizedDescription,
            keywords: currentArticle.keywords?.join(', ') || currentArticle.tags?.join(', ') || 'tin tức game, LMHT, Liên Quân Mobile, TFT, esports',
            canonical: `${siteUrl}/tin-tuc/${currentArticle.slug}`,
            ogImage: ogImageUrl,
            ogType: 'article',
            articleData: {
                publishedTime: currentArticle.publishedAt,
                modifiedTime: currentArticle.updatedAt || currentArticle.publishedAt,
                author: currentArticle.author || 'Admin',
                section: getCategoryLabel(currentArticle.category),
                tags: currentArticle.tags || [],
                readingTime: readingTime,
                wordCount: currentArticle.content?.length || 0
            }
        };
    }, [article, initialArticle, initialSeoData, siteUrl]);

    // Breadcrumbs - Normalize URLs to avoid hydration mismatch
    const breadcrumbs = useMemo(() => {
        const currentArticle = article || initialArticle;
        if (!currentArticle) return [];
        
        // Normalize siteUrl - remove trailing slash for consistency
        // Use consistent normalization for both server and client
        const normalizedSiteUrl = typeof window !== 'undefined' 
            ? (siteUrl || window.location.origin).replace(/\/+$/, '')
            : siteUrl.replace(/\/+$/, '');
        
        return [
            { name: 'Trang chủ', url: normalizedSiteUrl },
            { name: 'Tin Tức', url: `${normalizedSiteUrl}/tin-tuc` },
            { name: getCategoryLabel(currentArticle.category), url: `${normalizedSiteUrl}/tin-tuc?category=${currentArticle.category}` },
            { name: currentArticle.title || 'Bài viết', url: `${normalizedSiteUrl}/tin-tuc/${currentArticle.slug}` }
        ];
    }, [article, initialArticle, siteUrl, getCategoryLabel]);

    // Social sharing functions
    const shareToFacebook = () => {
        const currentArticle = article || initialArticle;
        if (!currentArticle) return;
        const url = encodeURIComponent(`${siteUrl}/tin-tuc/${currentArticle.slug}`);
        const title = encodeURIComponent(currentArticle.title);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank', 'width=600,height=400');
    };

    const shareToTwitter = () => {
        const currentArticle = article || initialArticle;
        if (!currentArticle) return;
        const url = encodeURIComponent(`${siteUrl}/tin-tuc/${currentArticle.slug}`);
        const text = encodeURIComponent(currentArticle.title);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
    };

    const shareToTelegram = () => {
        const currentArticle = article || initialArticle;
        if (!currentArticle) return;
        const url = encodeURIComponent(`${siteUrl}/tin-tuc/${currentArticle.slug}`);
        const text = encodeURIComponent(currentArticle.title);
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
    };

    const shareToZalo = () => {
        const currentArticle = article || initialArticle;
        if (!currentArticle) return;
        const url = encodeURIComponent(`${siteUrl}/tin-tuc/${currentArticle.slug}`);
        window.open(`https://zalo.me/share?url=${url}`, '_blank', 'width=600,height=400');
    };

    const copyLink = async () => {
        const currentArticle = article || initialArticle;
        if (!currentArticle) return;
        try {
            await navigator.clipboard.writeText(`${siteUrl}/tin-tuc/${currentArticle.slug}`);
            // Show toast notification here
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    // Get current article (from SSR or client-side)
    const currentArticle = article || initialArticle;
    const currentSeoData = seoData || initialSeoData;

    // Loading state - but still render SEO if we have initial data
    if (loading && !initialArticle) {
        return (
            <>
                <SEOOptimized
                    pageType="article"
                    title="Đang tải..."
                    description="Đang tải bài viết..."
                />
            <Layout>
                <div className={styles.pageWrapper}>
                    <div className={styles.container}>
                        <div className={styles.loading}>
                            <div className={styles.loadingSpinner}></div>
                            <p className={styles.loadingText}>Đang tải bài viết...</p>
                        </div>
                    </div>
                </div>
            </Layout>
            </>
        );
    }

    // Error state
    if (error || !currentArticle) {
        return (
            <Layout>
                <div className={styles.pageWrapper}>
                    <div className={styles.container}>
                        <div className={styles.error}>
                            <h2 className={styles.errorTitle}>Không tìm thấy bài viết</h2>
                            <p className={styles.errorMessage}>{error || 'Bài viết này không tồn tại hoặc đã bị xóa.'}</p>
                            <Link href="/tin-tuc" className={styles.backButton}>
                                <ArrowLeft size={16} />
                                Quay lại tin tức
                            </Link>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Prepare SEO data for rendering
    const finalTitle = currentSeoData?.title || (currentArticle ? `${currentArticle.title} | Tin Tức Game - LMHT, Liên Quân, TFT` : 'Tin Tức Game');
    const finalDescription = currentSeoData?.description || (currentArticle ? (currentArticle.metaDescription || currentArticle.excerpt || currentArticle.title) : 'Tin tức game mới nhất');
    const finalOgImage = currentSeoData?.image || (currentArticle?.featuredImage?.url ? 
        (currentArticle.featuredImage.url.startsWith('http') ? currentArticle.featuredImage.url : `${siteUrl}${currentArticle.featuredImage.url.startsWith('/') ? currentArticle.featuredImage.url : '/' + currentArticle.featuredImage.url}`)
        : `${siteUrl}/logo1.png`);
    const finalCanonical = currentSeoData?.url || (currentArticle ? `${siteUrl}/tin-tuc/${currentArticle.slug}` : siteUrl);

    return (
        <>
            {/* Enhanced SEO with JSON-LD Schema - Render FIRST to ensure priority */}
            {currentArticle && (
                <>
                    <Head>
                        {/* Force override og:title and og:description - These MUST be set here to override _app.js */}
                        <meta property="og:title" content={currentArticle.title} key="og-title-override" />
                        <meta property="og:description" content={finalDescription} key="og-description-override" />
                        <meta property="og:image" content={finalOgImage} key="og-image-override" />
                        <meta property="og:image:secure_url" content={finalOgImage} key="og-image-secure-override" />
                        <meta property="og:image:width" content="1200" key="og-image-width-override" />
                        <meta property="og:image:height" content="630" key="og-image-height-override" />
                        <meta property="og:image:alt" content={currentArticle.title} key="og-image-alt-override" />
                        <meta property="og:url" content={finalCanonical} key="og-url-override" />
                        <meta property="og:type" content="article" key="og-type-override" />
                        <meta property="og:site_name" content="Kết Quả MN" key="og-site-name-override" />
                        <meta property="og:locale" content="vi_VN" key="og-locale-override" />
                        {process.env.NEXT_PUBLIC_FB_APP_ID && (
                            <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_FB_APP_ID} key="fb-app-id" />
                        )}
                        <meta property="article:published_time" content={currentArticle.publishedAt} key="article-published-override" />
                        <meta property="article:modified_time" content={currentArticle.updatedAt || currentArticle.publishedAt} key="article-modified-override" />
                        <meta property="article:author" content={currentArticle.author || 'Admin'} key="article-author-override" />
                        <meta property="article:section" content={getCategoryLabel(currentArticle.category)} key="article-section-override" />
                        {currentArticle.tags?.map((tag, index) => (
                            <meta key={`article-tag-override-${index}`} property="article:tag" content={tag} />
                        ))}
                        <title key="title-override">{finalTitle}</title>
                        <meta name="description" content={finalDescription} key="description-override" />
                        
                        {/* Twitter Card - Full set */}
                        <meta name="twitter:card" content="summary_large_image" key="twitter-card-override" />
                        <meta name="twitter:url" content={finalCanonical} key="twitter-url-override" />
                        <meta name="twitter:title" content={currentArticle.title} key="twitter-title-override" />
                        <meta name="twitter:description" content={finalDescription} key="twitter-description-override" />
                        <meta name="twitter:image" content={finalOgImage} key="twitter-image-override" />
                        <meta name="twitter:image:alt" content={currentArticle.title} key="twitter-image-alt-override" />
                        <meta name="twitter:site" content="@ketquamn" key="twitter-site-override" />
                        <meta name="twitter:creator" content="@ketquamn" key="twitter-creator-override" />
                        
                        {/* Zalo - Full set */}
                        <meta property="zalo:title" content={currentArticle.title} key="zalo-title-override" />
                        <meta property="zalo:description" content={finalDescription} key="zalo-description-override" />
                        <meta property="zalo:image" content={finalOgImage} key="zalo-image-override" />
                        <meta property="zalo:url" content={finalCanonical} key="zalo-url-override" />
                        
                        {/* Telegram - Full set */}
                        <meta property="telegram:title" content={currentArticle.title} key="telegram-title-override" />
                        <meta property="telegram:description" content={finalDescription} key="telegram-description-override" />
                        <meta property="telegram:image" content={finalOgImage} key="telegram-image-override" />
                        <meta property="telegram:image:width" content="1200" key="telegram-image-width-override" />
                        <meta property="telegram:image:height" content="630" key="telegram-image-height-override" />
                        <meta property="telegram:image:alt" content={currentArticle.title} key="telegram-image-alt-override" />
                        <meta property="telegram:url" content={finalCanonical} key="telegram-url-override" />
                        <meta property="telegram:site_name" content="Kết Quả MN" key="telegram-site-name-override" />
                        
                        {/* LinkedIn - Uses Open Graph but needs specific tags */}
                        <meta property="linkedin:owner" content="Kết Quả MN" key="linkedin-owner-override" />
                        
                        {/* TikTok */}
                        <meta property="tiktok:title" content={currentArticle.title} key="tiktok-title-override" />
                        <meta property="tiktok:description" content={finalDescription} key="tiktok-description-override" />
                        <meta property="tiktok:image" content={finalOgImage} key="tiktok-image-override" />
                        
                        {/* WhatsApp - Uses Open Graph but can add specific */}
                        <meta property="og:image:type" content="image/png" key="og-image-type-override" />
                        
                        {/* Additional for better compatibility */}
                        <link rel="image_src" href={finalOgImage} key="image-src-override" />
                        <meta name="image" content={finalOgImage} key="image-override" />
                    </Head>
            <ArticleSEO
                        title={currentArticle.title}
                        description={finalDescription}
                        author={currentArticle.author || 'Admin'}
                        publishedTime={currentArticle.publishedAt}
                        modifiedTime={currentArticle.updatedAt || currentArticle.publishedAt}
                        image={finalOgImage}
                        url={finalCanonical}
                        keywords={currentArticle.keywords || currentArticle.tags || []}
                        category={getCategoryLabel(currentArticle.category)}
                        tags={currentArticle.tags || []}
                        readingTime={`${Math.ceil((currentArticle.content?.length || 0) / 1000)} phút đọc`}
                        canonical={finalCanonical}
            />
            <SEOOptimized
                pageType="article"
                        customTitle={finalTitle}
                        customDescription={finalDescription}
                        customKeywords={currentArticle.keywords?.join(', ') || currentArticle.tags?.join(', ') || 'tin tức game, LMHT, Liên Quân Mobile, TFT, esports'}
                        canonical={finalCanonical}
                        canonicalUrl={finalCanonical}
                        ogImage={finalOgImage}
                breadcrumbs={breadcrumbs}
                structuredData={structuredData}
                        articleData={currentSeoData?.articleData || {
                            publishedTime: currentArticle.publishedAt,
                            modifiedTime: currentArticle.updatedAt || currentArticle.publishedAt,
                            author: currentArticle.author || 'Admin',
                            section: getCategoryLabel(currentArticle.category),
                            tags: currentArticle.tags || [],
                            readingTime: Math.ceil((currentArticle.content?.length || 0) / 1000),
                            wordCount: currentArticle.content?.length || 0
                        }}
                    />
                </>
            )}
            <PageSpeedOptimizer />

            {/* Reading Progress Bar */}
            <div
                className={styles.readingProgress}
                style={{ width: `${readingProgress}%` }}
            />

            <Layout>
                <div className={styles.pageWrapper}>
                    <div className={styles.container}>
                        {/* Breadcrumb */}
                        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                            <ul className={styles.breadcrumbList}>
                                {breadcrumbs.map((crumb, index) => (
                                    <li key={index} className={styles.breadcrumbItem}>
                                        {index > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
                                        {index === breadcrumbs.length - 1 ? (
                                            <span className={styles.breadcrumbCurrent}>{crumb.name}</span>
                                        ) : (
                                            <Link 
                                                href={crumb.url.replace(/\/+$/, '') || '/'} 
                                                className={styles.breadcrumbLink}
                                            >
                                                {crumb.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Main Content Layout */}
                        <div className={styles.contentLayout}>
                            {/* Article Main */}
                            <main>
                                <article className={styles.articleMain} itemScope itemType="https://schema.org/Article">
                                    {/* Article Header */}
                                    <header className={styles.articleHeader}>
                                        <span
                                            className={styles.categoryBadge}
                                            style={{ background: getCategoryColor(currentArticle.category) }}
                                        >
                                            {getCategoryLabel(currentArticle.category)}
                                        </span>

                                        <h1 className={styles.articleTitle} itemProp="headline">
                                            {currentArticle.title}
                                        </h1>

                                        {currentArticle.excerpt && (
                                            <p className={styles.articleSummary}>
                                                {currentArticle.excerpt}
                                            </p>
                                        )}

                                        <div className={styles.articleMeta}>
                                            <div className={styles.metaItem}>
                                                <Calendar size={14} className={styles.metaIcon} />
                                                <time dateTime={currentArticle.publishedAt} itemProp="datePublished">
                                                    {formatDate(currentArticle.publishedAt)}
                                                </time>
                                            </div>
                                            <div className={styles.metaItem}>
                                                <Tag size={14} className={styles.metaIcon} />
                                                <span className={styles.author} itemProp="author" itemScope itemType="https://schema.org/Person">
                                                    <span itemProp="name">{currentArticle.author || 'Admin'}</span>
                                                </span>
                                            </div>
                                            <div className={styles.metaItem}>
                                                <Eye size={14} className={styles.metaIcon} />
                                                <span>{viewCount.toLocaleString('vi-VN')} lượt xem</span>
                                            </div>
                                            <div className={styles.metaItem}>
                                                <Clock size={14} className={styles.metaIcon} />
                                                <span>{Math.ceil((currentArticle.content?.length || 0) / 1000)} phút đọc</span>
                                            </div>
                                        </div>
                                    </header>

                                    {/* Table of Contents */}
                                    {tableOfContents.length > 0 && (
                                        <div className={styles.articleContent}>
                                            <div className={styles.tocBox}>
                                                <div
                                                    className={styles.tocHeader}
                                                    onClick={() => setShowTOC(!showTOC)}
                                                >
                                                    <span>📑 Mục lục bài viết</span>
                                                    <span>{showTOC ? '▲' : '▼'}</span>
                                                </div>
                                                {showTOC && (
                                                    <div className={styles.tocContent}>
                                                        <ul className={styles.tocList}>
                                                            {tableOfContents.map((heading) => (
                                                                <li key={heading.id} className={styles.tocItem}>
                                                                    <a
                                                                        href={`#${heading.id}`}
                                                                        className={`${styles.tocLink} ${activeHeading === heading.id ? styles.active : ''}`}
                                                                        style={{ paddingLeft: `${(heading.level - 1) * 15}px` }}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            
                                                                            // Try to find the element, with retry logic
                                                                            const scrollToHeading = (retries = 3) => {
                                                                                const element = document.getElementById(heading.id);
                                                                                if (element) {
                                                                                    const offset = 80; // Offset for fixed headers
                                                                                    const elementPosition = element.getBoundingClientRect().top;
                                                                                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                                                                                    window.scrollTo({
                                                                                        top: offsetPosition,
                                                                                        behavior: 'smooth'
                                                                                    });
                                                                                    
                                                                                    // Update active heading immediately
                                                                                    setActiveHeading(heading.id);
                                                                                } else if (retries > 0) {
                                                                                    // If element not found, wait a bit and retry
                                                                                    setTimeout(() => scrollToHeading(retries - 1), 50);
                                                                                } else {
                                                                                    // Fallback: try to find by text content
                                                                                    const articleContent = document.querySelector('[itemprop="articleBody"]');
                                                                                    if (articleContent) {
                                                                                        const headings = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
                                                                                        const targetHeading = Array.from(headings).find(h => 
                                                                                            h.textContent.trim() === heading.text.trim()
                                                                                        );
                                                                                        if (targetHeading) {
                                                                                            targetHeading.id = heading.id;
                                                                                            const offset = 80;
                                                                                            const elementPosition = targetHeading.getBoundingClientRect().top;
                                                                                            const offsetPosition = elementPosition + window.pageYOffset - offset;
                                                                                            window.scrollTo({
                                                                                                top: offsetPosition,
                                                                                                behavior: 'smooth'
                                                                                            });
                                                                                            setActiveHeading(heading.id);
                                                                                        }
                                                                                    }
                                                                                }
                                                                            };
                                                                            
                                                                            scrollToHeading();
                                                                        }}
                                                                    >
                                                                        {heading.text}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Article Content */}
                                    <div
                                        className={`${styles.articleContent} xsmbContainer`}
                                        itemProp="articleBody"
                                        dangerouslySetInnerHTML={{ 
                                            __html: isClient && processedContent 
                                                ? processedContent 
                                                : (currentArticle?.content || '') 
                                        }}
                                    />

                                    {/* Article Footer - Tags & Sharing */}
                                    <footer className={styles.articleFooter}>
                                        {/* Tags */}
                                        {currentArticle.tags && currentArticle.tags.length > 0 && (
                                            <div className={styles.articleTags}>
                                                <h3 className={styles.tagsTitle}>Từ khóa:</h3>
                                                <div className={styles.tagsList}>
                                                    {currentArticle.tags.map((tag, index) => (
                                                        <Link
                                                            key={index}
                                                            href={`/tin-tuc?tag=${tag}`}
                                                            className={styles.tag}
                                                        >
                                                            {tag}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Enhanced Social Sharing */}
                                        <SocialShareButtons
                                            url={`${siteUrl}/tin-tuc/${currentArticle.slug}`}
                                            title={currentArticle.title}
                                            description={currentArticle.summary || currentArticle.metaDescription}
                                            image={currentArticle.featuredImage?.url}
                                            hashtags={currentArticle.tags || []}
                                        />
                                    </footer>
                                </article>

                                {/* Related Articles - Below Main Article */}
                                    <section className={styles.relatedSection}>
                                        <h2 className={styles.relatedTitle}>Bài viết liên quan</h2>
                                    {relatedArticles.length > 0 ? (
                                        <div className={styles.relatedGrid}>
                                            {relatedArticles.slice(0, 4).map((relatedArticle) => (
                                                <Link
                                                    key={relatedArticle._id}
                                                    href={`/tin-tuc/${relatedArticle.slug}`}
                                                    className={styles.relatedCard}
                                                >
                                                    <Image
                                                        src={getOptimizedImageUrl(relatedArticle.featuredImage?.url, 300, 200) || '/logo1.png'}
                                                        alt={relatedArticle.title}
                                                        width={300}
                                                        height={200}
                                                        className={styles.relatedCardImage}
                                                        style={{
                                                            width: '100%',
                                                            height: '110px',
                                                            objectFit: 'cover'
                                                        }}
                                                        loading="lazy"
                                                        quality={75}
                                                        placeholder="blur"
                                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                                        unoptimized={relatedArticle.featuredImage?.url?.includes('cloudinary.com')}
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                                                    />
                                                    <div className={styles.relatedCardContent}>
                                                        <h3 className={styles.relatedCardTitle}>
                                                            {relatedArticle.title}
                                                        </h3>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className={styles.emptyState}>
                                            <p>Chưa có bài viết liên quan</p>
                                        </div>
                                    )}
                                </section>

                                {/* Trending Articles - Below Related Section */}
                                <section className={styles.trendingSection}>
                                    <h2 className={styles.trendingTitle}>Trending</h2>
                                    {trendingArticles.length > 0 ? (
                                        <div className={styles.trendingGrid}>
                                            {trendingArticles.slice(0, 6).map((trendingArticle) => (
                                                <Link
                                                    key={trendingArticle._id}
                                                    href={`/tin-tuc/${trendingArticle.slug}`}
                                                    className={styles.trendingCard}
                                                >
                                                    <Image
                                                        src={getOptimizedImageUrl(trendingArticle.featuredImage?.url, 400, 250) || '/logo1.png'}
                                                        alt={trendingArticle.title}
                                                        width={400}
                                                        height={250}
                                                        className={styles.trendingCardImage}
                                                        style={{
                                                            width: '100%',
                                                            height: '140px',
                                                            objectFit: 'cover'
                                                        }}
                                                        loading="lazy"
                                                        quality={75}
                                                        placeholder="blur"
                                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                                        unoptimized={trendingArticle.featuredImage?.url?.includes('cloudinary.com')}
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                                                    />
                                                    <h3 className={styles.trendingCardTitle}>
                                                        {trendingArticle.title}
                                                    </h3>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className={styles.emptyState}>
                                            <p>Chưa có bài viết trending</p>
                                        </div>
                                    )}
                                </section>
                            </main>

                            {/* Sidebar */}
                            <aside className={styles.sidebar}>
                                {/* Most Viewed Articles */}
                                    <div className={styles.sidebarBox}>
                                        <div className={styles.sidebarHeader}>
                                            📊 Xem nhiều nhất
                                        </div>
                                        <div className={styles.sidebarContent}>
                                        {mostViewedArticles.length > 0 ? (
                                            <div className={styles.sidebarArticleList}>
                                                {mostViewedArticles.map((article) => (
                                                    <Link
                                                        key={article._id}
                                                        href={`/tin-tuc/${article.slug}`}
                                                        className={styles.sidebarArticle}
                                                    >
                                                        <Image
                                                            src={getOptimizedImageUrl(article.featuredImage?.url, 160, 120) || '/logo1.png'}
                                                            alt={article.title}
                                                            width={160}
                                                            height={120}
                                                            className={styles.sidebarArticleImage}
                                                            loading="lazy"
                                                            quality={75}
                                                            unoptimized={article.featuredImage?.url?.includes('cloudinary.com')}
                                                            sizes="(max-width: 500px) 80px, 160px"
                                                        />
                                                        <div className={styles.sidebarArticleContent}>
                                                            <h4 className={styles.sidebarArticleTitle}>
                                                                {article.title}
                                                            </h4>
                                                            <div className={styles.sidebarArticleMeta}>
                                                                <Clock size={12} />
                                                                <span>{formatDate(article.publishedAt)}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className={styles.emptyState}>
                                                <p>Chưa có bài viết</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className={styles.sidebarBox}>
                                    <div className={styles.sidebarHeader}>
                                        📁 Chuyên mục
                                    </div>
                                    <div className={styles.sidebarContent}>
                                        <div className={styles.categoriesList}>
                                            <Link href="/tin-tuc?category=lien-minh-huyen-thoai" className={styles.categoryItem}>
                                                Liên Minh Huyền Thoại
                                            </Link>
                                            <Link href="/tin-tuc?category=lien-quan-mobile" className={styles.categoryItem}>
                                                Liên Quân Mobile
                                            </Link>
                                            <Link href="/tin-tuc?category=dau-truong-chan-ly-tft" className={styles.categoryItem}>
                                                Đấu Trường Chân Lý TFT
                                            </Link>
                                            <Link href="/tin-tuc?category=trending" className={styles.categoryItem}>
                                                Trending
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Useful Tools */}
                                <div className={styles.sidebarBox}>
                                    <div className={styles.sidebarHeader}>
                                        🛠️ Công cụ hữu ích
                                    </div>
                                    <div className={styles.sidebarContent}>
                                        <div className={styles.toolsList}>
                                            <Link href="/" className={styles.toolButton}>
                                                <span>Tạo Dàn Đề 9x-0x</span>
                                                <ArrowRight size={14} />
                                            </Link>
                                            <Link href="/dan-2d" className={styles.toolButton}>
                                                <span>Tạo Dàn 2D</span>
                                                <ArrowRight size={14} />
                                            </Link>
                                            <Link href="/dan-3d4d" className={styles.toolButton}>
                                                <span>Tạo Dàn 3D/4D</span>
                                                <ArrowRight size={14} />
                                            </Link>
                                            <Link href="/dan-dac-biet" className={styles.toolButton}>
                                                <span>Dàn Đặc Biệt</span>
                                                <ArrowRight size={14} />
                                            </Link>
                                            <Link href="/thong-ke" className={styles.toolButton}>
                                                <span>Thống Kê 3 Miền</span>
                                                <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}