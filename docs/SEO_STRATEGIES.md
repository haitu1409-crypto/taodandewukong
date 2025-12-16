# SEO Strategies Document

Tài liệu chi tiết về các kỹ thuật SEO đã được áp dụng trong landing page này.

## 1. White Hat SEO Techniques

### 1.1 Rich Structured Data (Schema.org)

**Mục tiêu**: Giúp Google hiểu rõ hơn về nội dung và hiển thị rich snippets

**Các Schema Types đã sử dụng**:

1. **WebSite Schema**
   ```json
   {
     "@type": "WebSite",
     "name": "Tạo Dàn Đề WuKong",
     "potentialAction": {
       "@type": "SearchAction",
       "target": "https://ketquamn.com/search?q={search_term_string}"
     }
   }
   ```

2. **Organization Schema**
   ```json
   {
     "@type": "Organization",
     "name": "Kết Quả MN",
     "aggregateRating": {
       "@type": "AggregateRating",
       "ratingValue": "4.9",
       "reviewCount": "2500"
     }
   }
   ```

3. **Service Schema**
   - Mô tả dịch vụ
   - Provider information
   - Service area

4. **FAQPage Schema**
   - 5-10 FAQs
   - Question + Answer format
   - Target Featured Snippets

5. **BreadcrumbList Schema**
   - Navigation hierarchy
   - Giúp Google hiểu cấu trúc site

### 1.2 Semantic HTML

- Sử dụng `<article>`, `<section>`, `<header>`, `<footer>`
- Heading hierarchy: H1 → H2 → H3
- Proper use of lists: `<ul>`, `<ol>`

### 1.3 Mobile-First Design

- Responsive breakpoints
- Mobile viewport meta tags
- Touch-friendly buttons
- Fast loading on mobile

### 1.4 Performance Optimization

- Image optimization (WebP, AVIF)
- Code splitting
- Lazy loading
- Compression (Gzip, Brotli)
- CDN usage

## 2. Gray Hat SEO Techniques (An Toàn)

### 2.1 LSI Keywords (Latent Semantic Indexing)

**Mục tiêu**: Tăng relevance và coverage của keywords

**Cách hoạt động**:
- Từ base keyword "kết quả xổ số", tự động generate:
  - "tra cứu kết quả"
  - "xem kết quả"
  - "kết quả mới nhất"
  - "kết quả hôm nay"
  - "ket qua xo so"
  - "kqxs"

**Implementation**:
```javascript
const lsiKeywords = generateLSIKeywords(baseKeywords);
// Returns: ["tra cứu kết quả", "xem kết quả", ...]
```

### 2.2 Keyword Variations

**Mục tiêu**: Cover tất cả cách người dùng search

**Variations**:
- Có dấu / không dấu: "kết quả" vs "ket qua"
- Viết tắt: "xsmn" vs "xổ số miền nam"
- Spacing: "ketqua" vs "ket qua" vs "ket-qua"
- Case: "XSMN" vs "xsmn" vs "XsMn"

### 2.3 Competitor Brand Targeting

**Mục tiêu**: Xuất hiện khi user search tên competitor

**Keywords**:
- "xosodaiphat alternative"
- "tốt hơn xosodaiphat"
- "ketquamn vs xosodaiphat"
- "thay thế xosodaiphat"
- "xosodaiphat chậm" → highlight "ketquamn nhanh hơn"

**Strategy**:
1. Target competitor brand names
2. Comparison keywords
3. Alternative keywords
4. Negative keywords (competitor problems → our solutions)

### 2.4 Multiple Schema Types

**Mục tiêu**: Tăng khả năng hiển thị rich snippets

**Strategy**:
- Mỗi page có 3-5 schema types
- WebSite + Organization + Service + FAQPage
- Mỗi schema có keywords riêng

### 2.5 Content Clustering

**Mục tiêu**: Xây dựng topic authority

**Structure**:
```
Pillar: Kết Quả Xổ Số
├── Cluster 1: XSMN
│   ├── XSMN hôm nay
│   ├── Thống kê XSMN
│   └── Soi cầu XSMN
├── Cluster 2: XSMB
│   ├── XSMB hôm nay
│   ├── Thống kê XSMB
│   └── Soi cầu XSMB
└── Cluster 3: XSMT
    ├── XSMT hôm nay
    └── Thống kê XSMT
```

## 3. Backlink Strategy

### 3.1 Internal Linking

**Anchor Text Variations**:
- Brand: "KETQUAMN.COM", "ketquamn.com"
- Descriptive: "kết quả xổ số miền nam"
- Long-tail: "xem kết quả xổ số miền nam hôm nay"

**Link Placement**:
- Hero section
- Content paragraphs
- Comparison sections
- Feature lists
- FAQ answers
- CTA buttons

### 3.2 Link Targets

**Priority Pages**:
1. Homepage: `/`
2. XSMN page: `/ket-qua-xo-so-mien-nam`
3. XSMB page: `/ket-qua-xo-so-mien-bac`
4. Thống kê: `/thongke/lo-gan`
5. Soi cầu: `/soi-cau-mien-bac-ai`

### 3.3 Link Attributes

**Current**: `rel="nofollow"`
- An toàn hơn
- Tránh bị Google coi là paid links

**Can Change To**: `rel="follow"`
- Nếu muốn pass link juice
- Chỉ khi chắc chắn không bị penalty

## 4. Content Strategy

### 4.1 Content Structure

**Hero Section**:
- H1 với primary keyword
- Description với keywords
- CTA buttons với backlinks

**Main Content**:
- H2 với secondary keywords
- H3 với long-tail keywords
- Paragraphs với natural keyword usage
- Lists với keywords

**Comparison Sections**:
- "Tốt hơn Xosodaiphat" → Target competitor keywords
- Highlight advantages
- Natural backlinks

**FAQ Section**:
- Target question keywords
- Rich answers với backlinks
- Schema markup

### 4.2 Keyword Density

**Target**: 1-2% keyword density
- Primary keyword: 1-2%
- Secondary keywords: 0.5-1%
- LSI keywords: Natural distribution

**Tools**: 
- Yoast SEO (if using WordPress)
- Manual check

### 4.3 Content Length

**Target**: 1500-2500 words
- Comprehensive coverage
- Multiple sections
- Natural keyword distribution

## 5. Technical SEO

### 5.1 Sitemap

**Dynamic Sitemap**:
- Generate from pages
- Include priority và changefreq
- Submit to Google Search Console

### 5.2 Robots.txt

**Configuration**:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Sitemap: https://taodandewukong.pro/sitemap.xml
```

### 5.3 Canonical Tags

**Strategy**:
- Mỗi page có canonical URL
- Self-referencing canonical
- Prevent duplicate content

### 5.4 Open Graph & Twitter Cards

**Purpose**: Social sharing optimization

**OG Tags**:
- og:title
- og:description
- og:image (1200x630)
- og:url
- og:type

**Twitter Cards**:
- twitter:card
- twitter:title
- twitter:description
- twitter:image

## 6. Monitoring & Optimization

### 6.1 Key Metrics

**Rankings**:
- Primary keywords position
- Competitor keywords position
- Long-tail keywords position

**Traffic**:
- Organic traffic
- Keyword traffic
- Backlink traffic

**Engagement**:
- Bounce rate (< 50%)
- Time on page (> 2 min)
- Pages per session (> 2)

**Technical**:
- Page speed (< 2s)
- Core Web Vitals (90+)
- Mobile-friendly test

### 6.2 Tools

**Free Tools**:
- Google Search Console
- Google Analytics
- PageSpeed Insights
- Google Rich Results Test

**Paid Tools** (Optional):
- Ahrefs
- SEMrush
- Moz
- Screaming Frog

### 6.3 Optimization Cycle

**Weekly**:
- Check rankings
- Review analytics
- Monitor backlinks

**Monthly**:
- Content updates
- Keyword research
- Competitor analysis
- Technical audit

**Quarterly**:
- Strategy review
- Major updates
- Link building campaigns

## 7. Best Practices

### ✅ Do's

- ✅ Create quality content
- ✅ Use natural keyword placement
- ✅ Build relevant backlinks
- ✅ Optimize for mobile
- ✅ Monitor and adjust
- ✅ Follow Google guidelines

### ❌ Don'ts

- ❌ Keyword stuffing
- ❌ Hidden text/links
- ❌ Duplicate content
- ❌ Paid links (without disclosure)
- ❌ Cloaking
- ❌ Link farms

## 8. Future Enhancements

### Planned Features

1. **Blog Section**
   - Regular content updates
   - More backlink opportunities
   - Topic authority building

2. **More Landing Pages**
   - Target specific keywords
   - Different angles
   - More backlink sources

3. **Video Content**
   - YouTube optimization
   - Video schema markup
   - More engagement

4. **Social Media Integration**
   - Share buttons
   - Social proof
   - More visibility

## Conclusion

Landing page này sử dụng kết hợp White Hat và Gray Hat SEO techniques an toàn để:

1. Tối ưu ranking cho target keywords
2. Target competitor keywords
3. Build backlinks về ketquamn.com
4. Increase organic traffic
5. Improve domain authority

**Remember**: SEO là quá trình lâu dài, cần kiên nhẫn và consistency!

