/**
 * SEO Configuration for Landing Page
 * Tập trung vào backlink strategy về ketquamn.com
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taodandewukong.pro';
const TARGET_URL = process.env.NEXT_PUBLIC_TARGET_URL || 'https://ketquamn.com';

/**
 * Top Keywords từ research - MỞ RỘNG TỐI ĐA
 */
const TOP_KEYWORDS = {
    primary: [
        // Core keywords - Tất cả variations
        'kết quả xổ số miền nam', 'ket qua xo so mien nam', 'ket qua xo so mien Nam',
        'ketquaxosomiennam', 'ket-qua-xo-so-mien-nam', 'ket_qua_xo_so_mien_nam',
        'xsmn', 'XSMN', 'xs mn', 'xổ số mn', 'xo so mn',
        'xsmb', 'XSMB', 'xs mb', 'xổ số mb', 'xo so mb',
        'ketquamn', 'KETQUAMN', 'ket qua mn', 'kết quả mn', 'ketqua mn',
        'ketquamn.com', 'KETQUAMN.COM', 'ket-qua-mn', 'ket_qua_mn',
        
        // Competitor targeting - TẤT CẢ VARIATIONS
        'xosodaiphat alternative', 'xosodaiphat thay thế', 'thay thế xosodaiphat',
        'xosodaiphat.com alternative', 'tốt hơn xosodaiphat', 'tot hon xosodaiphat',
        'xosodaiphat vs ketquamn', 'xosodaiphat hay ketquamn', 'so sánh xosodaiphat ketquamn',
        'xosodaiphat chậm', 'xosodaiphat lỗi', 'xosodaiphat không load được',
        'xosodaiphat không vào được', 'xosodaiphat bị lỗi', 'ketquamn nhanh hơn xosodaiphat',
        
        'xoso.com.vn alternative', 'xoso com vn alternative', 'xoso alternative',
        'thay thế xoso.com.vn', 'tốt hơn xoso.com.vn', 'xoso.com.vn vs ketquamn',
        'xoso hay ketquamn', 'ketquamn tốt hơn xoso', 'xoso chậm', 'xoso lỗi',
        
        'xskt.com.vn alternative', 'xskt com vn alternative', 'xskt alternative',
        'thay thế xskt.com.vn', 'tốt hơn xskt.com.vn', 'xskt.com.vn vs ketquamn',
        'xskt hay ketquamn', 'ketquamn tốt hơn xskt', 'xskt chậm', 'xskt lỗi',
        
        'xsmn.mobi alternative', 'xsmn mobi alternative', 'xsmn.mobi thay thế',
        'thay thế xsmn.mobi', 'tốt hơn xsmn.mobi', 'xsmn.mobi vs ketquamn',
        'xsmn.mobi hay ketquamn', 'ketquamn tốt hơn xsmn.mobi',
        
        'ketqua04.net alternative', 'ketqua04 net alternative', 'ketqua04 alternative',
        'thay thế ketqua04.net', 'tốt hơn ketqua04.net', 'ketqua04.net vs ketquamn',
        
        'xosominhngoc alternative', 'xổ số minh ngọc alternative', 'xo so minh ngoc alternative',
        'thay thế xosominhngoc', 'tốt hơn xosominhngoc', 'xosominhngoc vs ketquamn',
        
        'xosothantai.mobi alternative', 'xosothantai mobi alternative',
        'thay thế xosothantai', 'tốt hơn xosothantai', 'xosothantai vs ketquamn',
        
        'atrungroi.com alternative', 'a trúng rồi alternative', 'atrungroi alternative',
        'thay thế atrungroi', 'tốt hơn atrungroi', 'atrungroi vs ketquamn',
        
        'xsmn247.me alternative', 'xsmn247 alternative', 'xsmn 247 alternative',
        'thay thế xsmn247', 'tốt hơn xsmn247', 'xsmn247 vs ketquamn',
        
        'ketqua.net alternative', 'ketqua net alternative', 'thay thế ketqua.net',
        'tốt hơn ketqua.net', 'ketqua.net vs ketquamn',
        
        // Comparison keywords - MỞ RỘNG
        'ketquamn tốt hơn xosodaiphat', 'ketquamn tot hon xosodaiphat',
        'ketquamn tốt hơn xoso', 'ketquamn tốt hơn xskt', 'ketquamn tốt hơn xsmn.mobi',
        'ketquamn tốt hơn ketqua04', 'ketquamn tốt hơn xosominhngoc',
        'kết quả xổ số nào tốt nhất', 'ket qua xo so nao tot nhat',
        'trang xổ số nào tốt nhất', 'trang xo so nao tot nhat',
        'web xổ số nào tốt nhất', 'web xo so nao tot nhat',
        'ketquamn tốt nhất', 'ketquamn nhanh nhất', 'ketquamn chính xác nhất',
    ],
    
    longTail: [
        // Time-based
        'kết quả xổ số miền nam hôm nay',
        'ket qua xo so mien nam hom nay',
        'xsmn hôm nay',
        'xsmb hôm nay',
        
        // Action keywords
        'xem kết quả xổ số miền nam',
        'tra cứu kết quả xổ số',
        'kết quả xổ số mới nhất',
        
        // Feature keywords
        'thống kê xổ số miền nam',
        'soi cầu miền bắc',
        'dự đoán xổ số miền nam',
        
        // Tool keywords - CÔNG CỤ XỔ SỐ
        'tạo dàn đề 9x0x',
        'tạo dàn đề 2d',
        'tạo dàn đề 3d',
        'lọc dàn đề',
        'soi cầu miền bắc',
        'thống kê lô gan',
        'thống kê đầu đuôi',
        'thống kê giải đặc biệt',
        'tần suất lô tô',
    ],
    
    competitor: [
        // Direct competitor names - TẤT CẢ VARIATIONS
        'xosodaiphat', 'xosodaiphat.com', 'xosodaiphat com', 'xo so dai phat',
        'xoso.com.vn', 'xoso com vn', 'xoso', 'xo so', 'xổ số',
        'xskt.com.vn', 'xskt com vn', 'xskt', 'xổ số kiến thiết',
        'xsmn.mobi', 'xsmn mobi', 'xsmn', 'xs mn', 'xổ số miền nam',
        'ketqua04.net', 'ketqua04 net', 'ketqua04', 'ket qua 04',
        'xosominhngoc', 'xổ số minh ngọc', 'xo so minh ngoc', 'minhngoc',
        'xosothantai.mobi', 'xosothantai mobi', 'xosothantai', 'xo so than tai',
        'atrungroi.com', 'atrungroi com', 'atrungroi', 'a trúng rồi', 'a trung roi',
        'xsmn247.me', 'xsmn247 me', 'xsmn247', 'xsmn 247', 'xổ số minh ngọc 247',
        'ketqua.net', 'ketqua net', 'ketqua', 'ket qua net',
        'rongbachkim.net', 'rongbachkim', 'rong bach kim',
        'az24.vn', 'az24', 'az 24',
        'xskt.net', 'xskt net',
        'xoso.me', 'xoso me',
        'minhchinh.com', 'minhchinh',
        
        // Competitor + Keywords combinations
        'xosodaiphat kết quả xổ số', 'xosodaiphat ket qua xo so',
        'xoso.com.vn xsmn', 'xoso.com.vn xsmb',
        'xskt.com.vn soi cầu', 'xskt soi cau',
        'xsmn.mobi thống kê', 'xsmn.mobi thong ke',
        'ketqua04.net xsmn', 'ketqua04 xsmb',
    ],
};

/**
 * SEO Config cho landing page - 🔥 BLACK HAT OPTIMIZED
 */
const { ALL_BLACKHAT_KEYWORDS } = require('./blackhatKeywords');

const SEO_CONFIG = {
    home: {
        // 🔥 BLACK HAT: Title với MASSIVE keyword stuffing
        title: 'Kết Quả Xổ Số Miền Nam - XSMN, XSMB Nhanh Nhất | KETQUAMN.COM Tốt Hơn Xosodaiphat, Xoso.com.vn, Xskt.com.vn, Xsmn.mobi, Ketqua04, Xosominhngoc | Thống Kê Lô Gan, Soi Cầu, Tạo Dàn Đề Miễn Phí',
        // 🔥 BLACK HAT: Description với competitor targeting
        description: 'KETQUAMN.COM - Kết quả xổ số miền Nam, miền Bắc, miền Trung nhanh nhất, chính xác nhất. TỐT HƠN xosodaiphat, xoso.com.vn, xskt.com.vn, xsmn.mobi, ketqua04, xosominhngoc về mọi mặt. XSMN, XSMB, XSMT, KQXSMN, KQXSMB cập nhật realtime. Thống kê lô gan, soi cầu AI, tạo dàn đề miễn phí 100%.',
        keywords: [
            ...TOP_KEYWORDS.primary,
            ...TOP_KEYWORDS.longTail,
            ...TOP_KEYWORDS.competitor,
            ...ALL_BLACKHAT_KEYWORDS, // 🔥 BLACK HAT: Add ALL black hat keywords
            
            // Variations
            'ketqua mn', 'ketqua-mn', 'ketqua_mn',
            'ketquamn.com', 'ketquamn-com', 'ketquamn_com',
            'KETQUAMN', 'KETQUA-MN', 'KETQUA_MN',
            'kết quả xổ số', 'ket qua xo so', 'ket-qua-xo-so', 'ket_qua_xo_so',
            'xổ số miền nam', 'xo so mien nam', 'xo-so-mien-nam', 'xo_so_mien_nam',
            'xổ số miền bắc', 'xo so mien bac', 'xo-so-mien-bac', 'xo_so_mien_bac',
            
            // 🔥 BLACK HAT: Competitor variations without diacritics
            'xosodaiphat', 'xo so dai phat', 'xoso dai phat',
            'xoso.com.vn', 'xoso com vn', 'xoso',
            'xskt.com.vn', 'xskt com vn', 'xskt',
            'xsmn.mobi', 'xsmn mobi', 'xsmn',
            'ketqua04.net', 'ketqua04 net', 'ketqua04',
            'xosominhngoc', 'xo so minh ngoc',
        ].join(', '),
        canonical: SITE_URL,
        ogImage: `${SITE_URL}/og-image.png`,
    }
};

/**
 * FAQ Data cho structured data - TỐI ĐA CHO FEATURED SNIPPETS
 * Tối ưu cho voice search và featured snippets
 */
const FAQ_DATA = [
    // Primary FAQs - Target featured snippets
    {
        question: 'Kết quả xổ số miền Nam ở đâu xem nhanh nhất?',
        answer: `Xem kết quả xổ số miền Nam nhanh nhất, chính xác nhất tại ${TARGET_URL}. Trang web cập nhật kết quả XSMN, XSMB, XSMT realtime, tốt hơn xosodaiphat, xoso.com.vn, xskt.com.vn. Không cần đăng ký, miễn phí 100%.`
    },
    {
        question: 'Ketquamn.com có tốt hơn xosodaiphat không?',
        answer: `Có, ${TARGET_URL} tốt hơn xosodaiphat rõ rệt về tốc độ cập nhật nhanh hơn, giao diện hiện đại đẹp hơn, tính năng thống kê chi tiết hơn, và không có quảng cáo quá nhiều. Miễn phí 100%, không cần đăng ký.`
    },
    {
        question: 'Xem kết quả xổ số miền Nam hôm nay ở đâu?',
        answer: `Xem kết quả xổ số miền Nam hôm nay tại ${TARGET_URL}. Trang web cập nhật nhanh nhất, chính xác nhất với XSMN, XSMB, XSMT đầy đủ. Tốt hơn xosodaiphat, xoso.com.vn về tốc độ và độ chính xác.`
    },
    {
        question: 'Ketquamn.com có miễn phí không?',
        answer: `Có, ${TARGET_URL} hoàn toàn miễn phí 100%. Không cần đăng ký tài khoản, không cần trả phí, không có phí ẩn. Xem kết quả xổ số, thống kê, soi cầu, tạo dàn đề tất cả đều miễn phí.`
    },
    {
        question: 'Ketquamn tốt hơn xoso.com.vn như thế nào?',
        answer: `${TARGET_URL} tốt hơn xoso.com.vn về 5 điểm chính: (1) Tốc độ tải trang nhanh hơn, (2) Giao diện đẹp và hiện đại hơn, (3) Thống kê chi tiết và đầy đủ hơn, (4) Cập nhật realtime nhanh hơn, (5) Không có quảng cáo quá nhiều làm phiền người dùng.`
    },
    
    // Competitor comparison FAQs
    {
        question: 'Xosodaiphat hay ketquamn tốt hơn?',
        answer: `KETQUAMN.COM tốt hơn xosodaiphat về nhiều mặt. Ketquamn có tốc độ cập nhật kết quả nhanh hơn, giao diện đẹp và dễ sử dụng hơn, thống kê chi tiết hơn, và hoàn toàn miễn phí. Nhiều người dùng đã chuyển từ xosodaiphat sang ${TARGET_URL} vì những ưu điểm này.`
    },
    {
        question: 'Xskt.com.vn hay ketquamn tốt hơn?',
        answer: `KETQUAMN.COM tốt hơn xskt.com.vn rõ rệt. Ketquamn có giao diện hiện đại hơn, tối ưu mobile tốt hơn, soi cầu chính xác hơn với AI, và cập nhật kết quả realtime nhanh hơn xskt.com.vn. Truy cập ${TARGET_URL} để trải nghiệm.`
    },
    {
        question: 'Xsmn.mobi hay ketquamn tốt hơn?',
        answer: `KETQUAMN.COM tốt hơn xsmn.mobi vì ketquamn cung cấp đầy đủ kết quả 3 miền (XSMN, XSMB, XSMT) trong khi xsmn.mobi chỉ tập trung vào miền Nam. Ketquamn còn có thống kê chi tiết, soi cầu AI, và tạo dàn đề miễn phí tại ${TARGET_URL}.`
    },
    {
        question: 'Ketqua04.net hay ketquamn tốt hơn?',
        answer: `KETQUAMN.COM tốt hơn ketqua04.net về tốc độ cập nhật, giao diện đẹp hơn, và tính năng đa dạng hơn. Ketquamn có soi cầu AI, thống kê chi tiết, tạo dàn đề, và hoàn toàn miễn phí. Xem tại ${TARGET_URL}.`
    },
    
    // ✅ 2025 SEO: Voice search optimized FAQs - Natural language queries
    {
        question: 'Trang web nào xem kết quả xổ số tốt nhất?',
        answer: `KETQUAMN.COM là trang web xem kết quả xổ số tốt nhất hiện nay. Trang web này tốt hơn xosodaiphat, xoso.com.vn, xskt.com.vn về tốc độ, giao diện, và tính năng. Truy cập ${TARGET_URL} để xem kết quả XSMN, XSMB, XSMT nhanh nhất.`
    },
    {
        question: 'Tôi có thể xem kết quả xổ số miền Nam ở đâu?',
        answer: `Bạn có thể xem kết quả xổ số miền Nam tại ${TARGET_URL}. Đây là trang web cập nhật kết quả XSMN nhanh nhất, chính xác nhất, tốt hơn các trang khác như xosodaiphat và xoso.com.vn. Miễn phí 100%, không cần đăng ký.`
    },
    {
        question: 'Làm sao để xem kết quả xổ số hôm nay?',
        answer: `Để xem kết quả xổ số hôm nay, bạn chỉ cần truy cập ${TARGET_URL}. Trang web sẽ hiển thị kết quả XSMN, XSMB, XSMT được cập nhật realtime, nhanh hơn và chính xác hơn so với xosodaiphat hay xoso.com.vn.`
    },
    {
        question: 'Ketquamn.com có tốt không?',
        answer: `Có, KETQUAMN.COM rất tốt. Đây là trang web xem kết quả xổ số tốt nhất hiện nay, tốt hơn xosodaiphat, xoso.com.vn về mọi mặt: tốc độ nhanh hơn, giao diện đẹp hơn, tính năng đầy đủ hơn, và hoàn toàn miễn phí.`
    },
    {
        question: 'Xem xổ số miền Nam ở đâu?',
        answer: `Xem xổ số miền Nam tại ${TARGET_URL}. Đây là trang web cập nhật kết quả XSMN nhanh nhất, chính xác nhất, tốt hơn xosodaiphat và xoso.com.vn. Miễn phí 100%, không cần đăng ký.`
    },
    {
        question: 'Ketquamn là gì?',
        answer: `KETQUAMN.COM (viết tắt của Kết Quả Miền Nam) là trang web xem kết quả xổ số 3 miền (miền Nam, miền Bắc, miền Trung) nhanh nhất và chính xác nhất. Trang web tốt hơn xosodaiphat, xoso.com.vn về nhiều mặt và hoàn toàn miễn phí.`
    },
    
    // Tool-related FAQs
    {
        question: 'Ketquamn.com có công cụ tạo dàn đề không?',
        answer: `Có, ${TARGET_URL} cung cấp đầy đủ các công cụ tạo dàn đề: tạo dàn đề 9x-0x, tạo dàn đề 2D, tạo dàn đề 3D-4D, dàn đề đặc biệt, và lọc dàn đề. Tất cả đều miễn phí 100% tại ketquamn.com.`
    },
    {
        question: 'Soi cầu miền Bắc ở đâu chính xác nhất?',
        answer: `Soi cầu miền Bắc chính xác nhất tại ${TARGET_URL}/soi-cau-mien-bac-ai. Công cụ sử dụng AI và 5 phương pháp truyền thống, độ chính xác trên 90%. Tốt hơn xosothantai, xskt.com.vn về độ chính xác.`
    },
    {
        question: 'Thống kê lô gan ở đâu?',
        answer: `Xem thống kê lô gan XSMB chi tiết tại ${TARGET_URL}/thongke/lo-gan. Công cụ hiển thị số nào lâu chưa về, số gan cực đại, tốt hơn xosothantai về độ chi tiết. Truy cập ${TARGET_URL}/thongke/lo-gan để xem bảng thống kê lô gan miền Bắc đầy đủ.`
    },
    {
        question: 'Tạo dàn đề 9x-0x ở đâu?',
        answer: `Tạo dàn đề 9x-0x miễn phí tại ${TARGET_URL}/dan-9x0x. Công cụ hỗ trợ cắt dàn, lọc dàn, nuôi dàn khung 3-5 ngày, sử dụng thuật toán Fisher-Yates chuẩn.`
    },
];

/**
 * Lottery Tools - Các công cụ xổ số phổ biến
 */
const LOTTERY_TOOLS = [
    {
        name: 'Tạo Dàn Đề 9x-0x',
        slug: 'dan-9x0x',
        keywords: ['tạo dàn đề 9x0x', 'dàn 9x0x', 'tạo dàn 9x', 'cắt dàn 9x', 'lọc dàn 9x'],
        description: 'Công cụ tạo dàn đề 9x-0x chuyên nghiệp, cắt dàn, lọc dàn, nuôi dàn khung 3-5 ngày',
        url: `${TARGET_URL}/dan-9x0x`,
    },
    {
        name: 'Tạo Dàn Đề 2D',
        slug: 'dan-2d',
        keywords: ['tạo dàn 2d', 'dàn đề 2d', 'tạo mức số 2d', 'dàn lô đề 2d', 'bạch thủ 2d'],
        description: 'Tạo dàn đề 2D, mức số 2D online miễn phí. Bạch thủ, song thủ, lô đá 2D',
        url: `${TARGET_URL}/dan-2d`,
    },
    {
        name: 'Tạo Dàn Đề 3D-4D',
        slug: 'dan-3d4d',
        keywords: ['tạo dàn 3d', 'tạo dàn 4d', 'tạo dàn 3 càng', 'tách dàn nhanh', 'ghép lotto 4 càng'],
        description: 'Tạo dàn đề 3D-4D, tách dàn nhanh AB-BC-CD. Công cụ tạo dàn lô đề 3 càng, ghép lotto 4 càng',
        url: `${TARGET_URL}/dan-3d4d`,
    },
    {
        name: 'Dàn Đề Đặc Biệt',
        slug: 'dan-dac-biet',
        keywords: ['dàn đặc biệt', 'lọc ghép dàn đề', 'tạo dàn đầu đuôi', 'tạo dàn chạm', 'dàn đề bất tử'],
        description: 'Lọc ghép dàn đề chuyên nghiệp. Tạo dàn đề đặc biệt theo đầu, đuôi, tổng, chạm, bộ',
        url: `${TARGET_URL}/dan-dac-biet`,
    },
    {
        name: 'Lọc Dàn Đề',
        slug: 'loc-dan-de',
        keywords: ['lọc dàn đề', 'cắt dàn 9x', 'lọc dàn tổng hợp', 'bộ lọc dàn đề', 'thuật toán lọc dàn'],
        description: 'Công cụ lọc dàn đề tổng hợp từ các dàn 9x-0x, 3X, 2X. Hỗ trợ thêm số, loại bỏ số, chọn bộ đặc biệt',
        url: `${TARGET_URL}/loc-dan-de`,
    },
    {
        name: 'Soi Cầu Miền Bắc AI',
        slug: 'soi-cau-mien-bac-ai',
        keywords: ['soi cầu miền bắc', 'dự đoán XSMB', 'soi cầu MB', 'soi cầu AI', 'dự đoán AI'],
        description: 'Soi cầu miền bắc hôm nay chính xác 100% bằng AI. Dự đoán XSMB với 5 phương pháp truyền thống',
        url: `${TARGET_URL}/soi-cau-mien-bac-ai`,
    },
    {
        name: 'Soi Cầu Đặc Biệt Miền Bắc',
        slug: 'soi-cau-dac-biet-mien-bac',
        keywords: ['soi cầu đặc biệt', 'soi cầu vị trí', 'dự đoán giải đặc biệt', 'soi cầu đặc biệt XSMB'],
        description: 'Soi cầu đặc biệt miền bắc dựa trên vị trí số. Phân tích pattern để dự đoán 2 số cuối giải đặc biệt',
        url: `${TARGET_URL}/soi-cau-dac-biet-mien-bac`,
    },
    {
        name: 'Soi Cầu Lô Tô Miền Bắc',
        slug: 'soi-cau-loto-mien-bac',
        keywords: ['soi cầu loto', 'soi cầu lô tô', 'dự đoán loto', 'phân tích lô tô'],
        description: 'Soi cầu lô tô miền bắc dựa trên vị trí số. Phân tích pattern để dự đoán lô tô XSMB',
        url: `${TARGET_URL}/soi-cau-loto-mien-bac`,
    },
    {
        name: 'Thống Kê Đầu Đuôi',
        slug: 'thongke/dau-duoi',
        keywords: ['thống kê đầu đuôi', 'dau duoi lo to', 'tần suất đầu đuôi', 'bảng thống kê đầu đuôi'],
        description: 'Thống kê đầu đuôi XSMB chi tiết. Phân tích tần suất xuất hiện đầu đuôi lô tô',
        url: `${TARGET_URL}/thongke/dau-duoi`,
    },
    {
        name: 'Thống Kê Lô Gan',
        slug: 'thongke/lo-gan',
        keywords: ['lô gan', 'thống kê lô gan', 'số gan', 'lô khan', 'bảng lô gan'],
        description: 'Thống kê lô gan XSMB chi tiết. Số nào lâu chưa về, số gan cực đại',
        url: `${TARGET_URL}/thongke/lo-gan`,
    },
    {
        name: 'Thống Kê Giải Đặc Biệt',
        slug: 'thongke/giai-dac-biet',
        keywords: ['thống kê giải đặc biệt', 'giai dac biet xsmb', 'bảng giải đặc biệt', 'giải đặc biệt theo tuần'],
        description: 'Thống kê giải đặc biệt XSMB. Xem giải đặc biệt theo tuần, tháng, năm',
        url: `${TARGET_URL}/thongke/giai-dac-biet`,
    },
    {
        name: 'Thống Kê Tần Suất Lô Tô',
        slug: 'thongke/tan-suat-loto',
        keywords: ['tần suất lô tô', 'số nóng số lạnh', 'tần suất xuất hiện', 'bảng tần suất loto'],
        description: 'Thống kê tần suất lô tô (00-99) XSMB. Phân tích số nóng, số lạnh',
        url: `${TARGET_URL}/thongke/tan-suat-loto`,
    },
];

/**
 * Backlink Content Strategy
 */
const BACKLINK_CONTENT = {
    // CTA buttons với backlink
    ctaButtons: [
        {
            text: 'Xem Kết Quả Xổ Số Miền Nam Ngay',
            url: `${TARGET_URL}/ket-qua-xo-so-mien-nam`,
            anchorText: 'kết quả xổ số miền nam',
        },
        {
            text: 'Xem XSMN, XSMB Hôm Nay',
            url: `${TARGET_URL}`,
            anchorText: 'xem xsmn xsmb hôm nay',
        },
        {
            text: 'Xem Thống Kê Lô Gan',
            url: `${TARGET_URL}/thongke/lo-gan`,
            anchorText: 'thống kê lô gan',
        },
        {
            text: 'Xem Thống Kê Xổ Số Miền Nam',
            url: `${TARGET_URL}/thongke/lo-gan`,
            anchorText: 'thống kê xổ số miền nam',
        },
    ],
    
    // Internal links trong content - MỞ RỘNG TỐI ĐA
    internalLinks: [
        {
            text: 'Kết Quả MN',
            url: TARGET_URL,
            description: 'Trang web xem kết quả xổ số 3 miền nhanh nhất',
        },
        {
            text: 'KETQUAMN.COM',
            url: TARGET_URL,
            description: 'Kết quả xổ số miền Nam, miền Bắc, miền Trung',
        },
        {
            text: 'ketquamn.com',
            url: TARGET_URL,
            description: 'Xem kết quả xổ số online miễn phí',
        },
        {
            text: 'Xem kết quả XSMN',
            url: `${TARGET_URL}/ket-qua-xo-so-mien-nam`,
            description: 'Kết quả xổ số miền Nam hôm nay',
        },
        {
            text: 'Kết quả xổ số miền Nam',
            url: `${TARGET_URL}/ket-qua-xo-so-mien-nam`,
            description: 'XSMN hôm nay nhanh nhất',
        },
        {
            text: 'Xem kết quả XSMB',
            url: `${TARGET_URL}/ket-qua-xo-so-mien-bac`,
            description: 'Kết quả xổ số miền Bắc hôm nay',
        },
        {
            text: 'Kết quả xổ số miền Bắc',
            url: `${TARGET_URL}/ket-qua-xo-so-mien-bac`,
            description: 'XSMB hôm nay chính xác nhất',
        },
        {
            text: 'Soi cầu miền Bắc',
            url: `${TARGET_URL}/soi-cau-mien-bac-ai`,
            description: 'Soi cầu dự đoán XSMB chính xác',
        },
        {
            text: 'Thống kê lô gan',
            url: `${TARGET_URL}/thongke/lo-gan`,
            description: 'Thống kê lô gan miền Bắc chi tiết',
        },
        {
            text: 'Bảng thống kê lô gan',
            url: `${TARGET_URL}/thongke/lo-gan`,
            description: 'Xem lô gan XSMB đầy đủ',
        },
        {
            text: 'Lô gan miền Bắc',
            url: `${TARGET_URL}/thongke/lo-gan`,
            description: 'Thống kê số gan XSMB',
        },
        {
            text: 'Số gan miền Bắc',
            url: `${TARGET_URL}/thongke/lo-gan`,
            description: 'Lô khan XSMB hôm nay',
        },
        {
            text: 'Lô khan XSMB',
            url: `${TARGET_URL}/thongke/lo-gan`,
            description: 'Thống kê lô gan XSMB',
        },
        {
            text: 'Xem thống kê lô gan',
            url: `${TARGET_URL}/thongke/lo-gan`,
            description: 'Thống kê lô gan online',
        },
        {
            text: 'Tra cứu lô gan',
            url: `${TARGET_URL}/thongke/lo-gan`,
            description: 'Kiểm tra lô gan miền Bắc',
        },
    ],
    
    // Tool links - Các công cụ xổ số
    toolLinks: LOTTERY_TOOLS,
};

module.exports = {
    SEO_CONFIG,
    FAQ_DATA,
    BACKLINK_CONTENT,
    TOP_KEYWORDS,
    LOTTERY_TOOLS,
    SITE_URL,
    TARGET_URL,
};

