# SEO Landing Page - Backlink Strategy

Landing page SEO mạnh mẽ để tạo backlink về [KETQUAMN.COM](https://ketquamn.com).

## Mục Tiêu

1. **Tạo landing page SEO mạnh** với domain `taodandewukong.pro`
2. **Backlink strategy** về `ketquamn.com`
3. **Target competitor keywords**: xosodaiphat, xoso.com.vn, xskt.com.vn, xsmn.mobi, etc.
4. **Áp dụng kỹ thuật SEO mạnh mẽ nhất** (White Hat + Gray Hat an toàn)

## Cấu Trúc Dự Án

```
seo_ketquamn/
├── components/
│   └── UltraSEOHead.js          # Component SEO mạnh mẽ
├── config/
│   └── seoConfig.js             # Config SEO, keywords, FAQs
├── pages/
│   ├── index.js                 # Landing page chính
│   ├── _document.js             # Custom document
│   ├── sitemap.xml.js           # Dynamic sitemap
│   └── robots.txt.js            # Robots.txt
├── next.config.js               # Next.js config
├── package.json                 # Dependencies
└── README.md                    # Tài liệu này
```

## Kỹ Thuật SEO Đã Áp Dụng

### ✅ White Hat SEO

1. **Rich Structured Data (Schema.org)**
   - WebSite Schema với SearchAction
   - Organization Schema
   - Service Schema
   - FAQPage Schema
   - BreadcrumbList Schema

2. **Semantic HTML**
   - Sử dụng đúng các thẻ HTML5 semantic
   - Heading hierarchy (H1, H2, H3)
   - Article, Section tags

3. **Mobile-First**
   - Responsive design
   - Mobile meta tags
   - Viewport optimization

4. **Fast Loading**
   - Image optimization
   - Code splitting
   - Compression

5. **Content Optimization**
   - Quality content
   - Natural keyword usage
   - Internal linking strategy

### ✅ Gray Hat SEO (An Toàn)

1. **LSI Keywords (Latent Semantic Indexing)**
   - Tự động generate LSI keywords từ base keywords
   - Mở rộng với các từ liên quan ngữ nghĩa

2. **Keyword Variations**
   - Có dấu / không dấu
   - Viết tắt / viết đầy đủ
   - Hyphen / underscore / no space

3. **Competitor Brand Targeting**
   - Target competitor brand names trong keywords
   - Alternative keywords: "xosodaiphat alternative", "tốt hơn xosodaiphat"
   - Comparison keywords: "ketquamn vs xosodaiphat"

4. **Multiple Schema Types**
   - Nhiều loại schema trên 1 page để tăng visibility
   - Service + Organization + WebSite + FAQPage

5. **Content Clustering**
   - Topic clusters
   - Internal linking giữa các topics

## Backlink Strategy

### 1. Internal Links

- **Anchor Text Đa Dạng**: "KETQUAMN.COM", "ketquamn.com", "Kết Quả MN", "kết quả xổ số miền nam"
- **Contextual Links**: Links trong nội dung tự nhiên
- **CTA Buttons**: Nhiều CTA buttons với backlink về target site

### 2. Link Targets

- Homepage: `https://ketquamn.com`
- Specific pages:
  - `/ket-qua-xo-so-mien-nam`
  - `/ket-qua-xo-so-mien-bac`
  - `/thongke/lo-gan`
  - `/soi-cau-mien-bac-ai`

### 3. Rel Attributes

- Sử dụng `rel="nofollow"` cho external links (an toàn hơn)
- Có thể thay đổi thành `rel="follow"` nếu cần

## Keywords Strategy

### Primary Keywords

- `kết quả xổ số miền nam`
- `ket qua xo so mien nam`
- `xsmn`, `xsmb`
- `ketquamn`, `ket qua mn`

### Competitor Targeting

- `xosodaiphat alternative`
- `tốt hơn xosodaiphat`
- `ketquamn tốt hơn xoso.com.vn`
- `ketquamn vs xskt.com.vn`

### Long-Tail Keywords

- `xem kết quả xổ số miền nam hôm nay`
- `tra cứu kết quả xổ số miền nam`
- `thống kê xổ số miền nam`
- `soi cầu miền bắc`

## Installation & Setup

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Production
npm start
```

## Environment Variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://taodandewukong.pro
NEXT_PUBLIC_TARGET_URL=https://ketquamn.com
NEXT_PUBLIC_SITE_NAME=Tạo Dàn Đề WuKong | Taodandewukong.pro
```

## Deployment

### Vercel (Recommended)

1. Push code lên GitHub
2. Connect với Vercel
3. Set environment variables
4. Deploy

### Other Platforms

- Netlify
- Railway
- Render
- Cloudflare Pages

## SEO Checklist

### On-Page SEO

- ✅ Title tag optimized
- ✅ Meta description optimized
- ✅ H1 tag với primary keyword
- ✅ Heading hierarchy (H2, H3)
- ✅ Internal linking
- ✅ Image alt tags
- ✅ URL structure clean
- ✅ Mobile-friendly
- ✅ Fast loading speed

### Technical SEO

- ✅ XML Sitemap
- ✅ Robots.txt
- ✅ Canonical tags
- ✅ Structured data (Schema.org)
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ HTTPS enabled
- ✅ SSL certificate

### Content SEO

- ✅ Quality content
- ✅ Keyword optimization
- ✅ LSI keywords
- ✅ FAQ section
- ✅ Long-form content
- ✅ Fresh content updates

## Monitoring & Analytics

### Tools Recommended

1. **Google Search Console**
   - Monitor indexing
   - Track keywords
   - Check backlinks

2. **Google Analytics**
   - Track traffic
   - User behavior
   - Conversion tracking

3. **Ahrefs / SEMrush**
   - Keyword rankings
   - Backlink analysis
   - Competitor analysis

4. **PageSpeed Insights**
   - Performance monitoring
   - Core Web Vitals

## Notes

### ⚠️ Important

- Landing page này chỉ dùng để **backlink strategy**, không phải main site
- Domain `taodandewukong.pro` sẽ redirect/backlink về `ketquamn.com`
- Áp dụng các kỹ thuật SEO an toàn, tránh black hat techniques

### ✅ Safe Techniques

- ✅ LSI Keywords
- ✅ Keyword Variations
- ✅ Competitor Targeting
- ✅ Multiple Schema Types
- ✅ Content Clustering

### ❌ Avoid

- ❌ Keyword Stuffing
- ❌ Hidden Text
- ❌ Cloaking
- ❌ Link Farms
- ❌ Duplicate Content

## License

Private project - All rights reserved

