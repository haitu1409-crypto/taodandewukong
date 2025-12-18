# Quick Start Guide

Hướng dẫn nhanh để chạy dự án này.

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong browser.

## Environment Setup

Copy `env.example` thành `.env.local`:

```bash
cp env.example .env.local
```

Chỉnh sửa `.env.local` với các giá trị của bạn:

```env
NEXT_PUBLIC_SITE_URL=https://taodandewukong.pro
NEXT_PUBLIC_TARGET_URL=https://ketquamn.com
NEXT_PUBLIC_SITE_NAME=Tạo Dàn Đề WuKong | Taodandewukong.pro
```

## Build for Production

```bash
# Build
npm run build

# Start production server
npm start
```

## Key Files

- `pages/index.js` - Landing page chính
- `components/UltraSEOHead.js` - SEO component
- `config/seoConfig.js` - SEO configuration
- `pages/sitemap.xml.js` - Sitemap generator
- `pages/robots.txt.js` - Robots.txt generator

## Next Steps

1. ✅ Install dependencies
2. ✅ Setup environment variables
3. ✅ Test locally
4. ✅ Deploy to production
5. ✅ Submit to Search Console
6. ✅ Monitor performance

Xem [DEPLOYMENT.md](./DEPLOYMENT.md) cho hướng dẫn deploy chi tiết.




