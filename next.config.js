/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compress: true,
    poweredByHeader: false,
    
    // Domain configuration
    env: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://taodandewukong.pro',
        NEXT_PUBLIC_TARGET_URL: process.env.NEXT_PUBLIC_TARGET_URL || 'https://ketquamn.com',
        NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Tạo Dàn Đề WuKong | Taodandewukong.pro',
    },

    // Images configuration - Optimized for performance
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 31536000,
        unoptimized: false,
        dangerouslyAllowSVG: false,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [],
    },

    // Headers for SEO and security
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    },
                    // ✅ 2025 SEO: Core Web Vitals optimization headers
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    }
                ],
            },
            // ✅ Performance: Static assets caching
            {
                source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ],
            },
            // ✅ Performance: Fonts caching
            {
                source: '/:all*(woff|woff2|ttf|otf)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ],
            },
        ];
    },

    // Redirects - Redirect các paths quan trọng
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
        ];
    },

    // Webpack optimizations
    webpack: (config, { dev, isServer }) => {
        if (!isServer) {
            config.optimization = {
                ...config.optimization,
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        default: false,
                        vendors: false,
                        vendor: {
                            name: 'vendor',
                            chunks: 'all',
                            test: /node_modules/,
                            priority: 20,
                            reuseExistingChunk: true,
                        },
                        common: {
                            name: 'common',
                            minChunks: 2,
                            chunks: 'all',
                            priority: 10,
                            reuseExistingChunk: true,
                        },
                    },
                },
            };
            // ✅ PERFORMANCE: Modern JavaScript - không transpile ES6+ features
            config.output.environment = {
                arrowFunction: true,
                bigIntLiteral: true,
            };
        }
        return config;
    },

    // Production optimizations
    productionBrowserSourceMaps: false,
    generateEtags: false,
    compress: true,
    
    // Remove console.log in production
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'],
        } : false,
    },

    // Experimental features
    experimental: {
        optimizePackageImports: ['moment', 'axios'],
    },
};

module.exports = nextConfig;

