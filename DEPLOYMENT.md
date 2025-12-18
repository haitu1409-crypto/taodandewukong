# Deployment Guide

Hướng dẫn deploy landing page SEO này lên production.

## Pre-Deployment Checklist

### 1. Environment Variables

Tạo file `.env.local` với các biến sau:

```env
NEXT_PUBLIC_SITE_URL=https://taodandewukong.pro
NEXT_PUBLIC_TARGET_URL=https://ketquamn.com
NEXT_PUBLIC_SITE_NAME=Tạo Dàn Đề WuKong | Taodandewukong.pro
```

### 2. Domain Setup

- Đảm bảo domain `taodandewukong.pro` đã được mua
- Point DNS về hosting provider
- SSL certificate đã được setup (HTTPS bắt buộc)

### 3. Assets

- Favicon: `/public/favicon.ico`
- OG Image: `/public/og-image.png` (1200x630px)
- Logo: `/public/logo.png` (512x512px)

## Deployment Options

### Option 1: Vercel (Recommended)

**Ưu điểm**:
- Free tier
- Auto SSL
- Fast CDN
- Easy deployment từ GitHub

**Steps**:

1. Push code lên GitHub repository
2. Login vào [Vercel](https://vercel.com)
3. Import project từ GitHub
4. Set environment variables:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_TARGET_URL`
   - `NEXT_PUBLIC_SITE_NAME`
5. Deploy

**Command** (nếu dùng Vercel CLI):
```bash
npm i -g vercel
vercel
```

### Option 2: Netlify

**Steps**:

1. Push code lên GitHub
2. Login vào [Netlify](https://netlify.com)
3. New site from Git
4. Select repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Set environment variables
7. Deploy

### Option 3: Railway / Render

Tương tự như trên, chỉ cần:
- Connect GitHub
- Set build command: `npm run build`
- Set start command: `npm start`
- Set environment variables

## Post-Deployment Steps

### 1. Submit to Google Search Console

1. Verify ownership của domain
2. Submit sitemap: `https://taodandewukong.pro/sitemap.xml`
3. Request indexing cho homepage

### 2. Submit to Bing Webmaster Tools

1. Add site
2. Verify ownership
3. Submit sitemap

### 3. Test URLs

- [ ] Homepage: `https://taodandewukong.pro/`
- [ ] Sitemap: `https://taodandewukong.pro/sitemap.xml`
- [ ] Robots.txt: `https://taodandewukong.pro/robots.txt`

### 4. SEO Validation

**Use these tools**:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Schema Markup Validator](https://validator.schema.org/)

### 5. Analytics Setup

**Google Analytics**:

1. Tạo GA4 property
2. Add tracking code vào `_document.js` hoặc dùng Google Tag Manager
3. Verify tracking

**Google Search Console**:

1. Verify site
2. Monitor performance
3. Check for errors

## Monitoring

### Daily

- Check Google Search Console for errors
- Monitor indexing status
- Check page speed

### Weekly

- Review keyword rankings
- Check analytics data
- Monitor backlink acquisition

### Monthly

- Full SEO audit
- Content updates
- Technical SEO check

## Troubleshooting

### Issue: Site not indexing

**Solution**:
- Check robots.txt allows crawling
- Submit sitemap in Search Console
- Request indexing manually
- Check for noindex tags

### Issue: Slow page speed

**Solution**:
- Optimize images
- Enable compression
- Use CDN
- Check hosting performance

### Issue: SSL errors

**Solution**:
- Ensure SSL certificate is valid
- Check certificate expiration
- Use Let's Encrypt if needed

## Maintenance

### Regular Updates

1. **Content Updates**: Update content mỗi tuần/tháng
2. **Keyword Research**: Research keywords mới mỗi tháng
3. **Technical Updates**: Update dependencies mỗi quý
4. **SEO Audit**: Full audit mỗi 6 tháng

### Performance Monitoring

- Page speed: Target < 2s
- Core Web Vitals: Target 90+
- Uptime: Target 99.9%

## Support

Nếu có vấn đề, check:
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Google Search Central](https://developers.google.com/search)




