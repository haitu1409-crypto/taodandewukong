/**
 * BLACK HAT SEO KEYWORDS - CỰC ĐẠI
 * Tất cả keyword variations để dominate mọi search query
 */

const TARGET_URL = process.env.NEXT_PUBLIC_TARGET_URL || 'https://ketquamn.com';

// 🔥 COMPETITOR KEYWORDS - TẤT CẢ VARIATIONS CÓ THỂ
const COMPETITOR_KEYWORDS = {
    // Xosodaiphat - MỌI VARIATIONS
    xosodaiphat: [
        'xosodaiphat', 'xosodaiphat.com', 'xosodaiphat com', 'xo so dai phat',
        'xổ số đại phát', 'xo so dai phat', 'xoso dai phat', 'xs dai phat',
        'xosodaiphat xsmn', 'xosodaiphat xsmb', 'xosodaiphat ketqua',
        'xosodaiphat kết quả', 'xosodaiphat thống kê', 'xosodaiphat soi cầu',
        'xosodaiphat thay thế', 'xosodaiphat alternative', 'thay thế xosodaiphat',
        'tốt hơn xosodaiphat', 'xosodaiphat vs ketquamn', 'xosodaiphat hay ketquamn',
        'xosodaiphat chậm', 'xosodaiphat lỗi', 'xosodaiphat không vào được',
        'xosodaiphat bị lỗi', 'xosodaiphat không load', 'xosodaiphat down',
    ],
    
    // Xoso.com.vn - MỌI VARIATIONS
    xoso: [
        'xoso.com.vn', 'xoso com vn', 'xoso', 'xo so', 'xổ số',
        'xoso xsmn', 'xoso xsmb', 'xoso ketqua', 'xoso kết quả',
        'xoso thống kê', 'xoso soi cầu', 'xoso thay thế',
        'xoso alternative', 'thay thế xoso', 'tốt hơn xoso',
        'xoso vs ketquamn', 'xoso hay ketquamn', 'xoso chậm',
        'xoso lỗi', 'xoso không vào được', 'xoso bị lỗi',
    ],
    
    // Xskt.com.vn
    xskt: [
        'xskt.com.vn', 'xskt com vn', 'xskt', 'xổ số kiến thiết',
        'xo so kien thiet', 'xskt xsmn', 'xskt xsmb', 'xskt ketqua',
        'xskt thống kê', 'xskt soi cầu', 'xskt thay thế',
        'xskt alternative', 'thay thế xskt', 'tốt hơn xskt',
        'xskt vs ketquamn', 'xskt hay ketquamn',
    ],
    
    // Xsmn.mobi
    xsmnmobi: [
        'xsmn.mobi', 'xsmn mobi', 'xsmn', 'xs mn', 'xổ số mn',
        'xo so mn', 'xsmn ketqua', 'xsmn kết quả', 'xsmn thống kê',
        'xsmn soi cầu', 'xsmn thay thế', 'xsmn alternative',
        'thay thế xsmn.mobi', 'tốt hơn xsmn.mobi', 'xsmn vs ketquamn',
    ],
    
    // Ketqua04
    ketqua04: [
        'ketqua04.net', 'ketqua04 net', 'ketqua04', 'ket qua 04',
        'ketqua 04', 'ketqua04 xsmn', 'ketqua04 xsmb', 'ketqua04 ketqua',
        'ketqua04 thống kê', 'ketqua04 thay thế', 'ketqua04 alternative',
        'thay thế ketqua04', 'tốt hơn ketqua04', 'ketqua04 vs ketquamn',
    ],
    
    // Xosominhngoc
    xosominhngoc: [
        'xosominhngoc', 'xổ số minh ngọc', 'xo so minh ngoc',
        'minhngoc', 'xosominhngoc xsmn', 'xosominhngoc ketqua',
        'xosominhngoc thay thế', 'xosominhngoc alternative',
        'thay thế xosominhngoc', 'tốt hơn xosominhngoc',
        'xosominhngoc vs ketquamn',
    ],
    
    // Xosothantai
    xosothantai: [
        'xosothantai.mobi', 'xosothantai mobi', 'xosothantai',
        'xo so than tai', 'xổ số thần tài', 'xosothantai xsmn',
        'xosothantai thống kê', 'xosothantai thay thế',
        'xosothantai alternative', 'tốt hơn xosothantai',
    ],
    
    // Atrungroi
    atrungroi: [
        'atrungroi.com', 'atrungroi com', 'atrungroi',
        'a trúng rồi', 'a trung roi', 'atrungroi xsmn',
        'atrungroi thay thế', 'atrungroi alternative',
        'tốt hơn atrungroi', 'atrungroi vs ketquamn',
    ],
    
    // Xsmn247
    xsmn247: [
        'xsmn247.me', 'xsmn247 me', 'xsmn247', 'xsmn 247',
        'xổ số minh ngọc 247', 'xsmn247 xsmn', 'xsmn247 ketqua',
        'xsmn247 thay thế', 'xsmn247 alternative',
    ],
    
    // Ketqua.net
    ketqua: [
        'ketqua.net', 'ketqua net', 'ketqua', 'ket qua net',
        'ket qua', 'ketqua xsmn', 'ketqua xsmb', 'ketqua thống kê',
        'ketqua thay thế', 'ketqua alternative', 'tốt hơn ketqua',
    ],
};

// 🔥 CORE KEYWORDS - HÀNG NGÀN VARIATIONS
const CORE_KEYWORDS = [
    // Ketquamn variations
    'ketquamn', 'KETQUAMN', 'ket qua mn', 'kết quả mn', 'ketqua mn',
    'ketquamn.com', 'KETQUAMN.COM', 'ket-qua-mn', 'ket_qua_mn',
    'ketquamn xsmn', 'ketquamn xsmb', 'ketquamn ketqua',
    'ketquamn kết quả', 'ketquamn thống kê', 'ketquamn soi cầu',
    'ketquamn tốt nhất', 'ketquamn nhanh nhất', 'ketquamn chính xác nhất',
    
    // Kết quả xổ số
    'kết quả xổ số', 'ket qua xo so', 'ket qua xoso', 'ketqua xoso',
    'ket qua xs', 'kqxs', 'kq xs', 'ket qua', 'ketqua',
    'kết quả xổ số miền nam', 'ket qua xo so mien nam', 'ket qua xo so mien Nam',
    'ketquaxosomiennam', 'ket-qua-xo-so-mien-nam', 'ket_qua_xo_so_mien_nam',
    'kết quả xổ số miền bắc', 'ket qua xo so mien bac',
    'kết quả xổ số miền trung', 'ket qua xo so mien trung',
    
    // XSMN variations
    'xsmn', 'XSMN', 'xs mn', 'xổ số mn', 'xo so mn', 'xs mien nam',
    'xổ số miền nam', 'xo so mien nam', 'xoso mien nam',
    'xsmn hôm nay', 'xsmn hom nay', 'xsmn ket qua', 'xsmn kết quả',
    
    // XSMB variations
    'xsmb', 'XSMB', 'xs mb', 'xổ số mb', 'xo so mb', 'xs mien bac',
    'xổ số miền bắc', 'xo so mien bac', 'xoso mien bac',
    'xsmb hôm nay', 'xsmb hom nay', 'xsmb ket qua', 'xsmb kết quả',
    
    // XSMT variations
    'xsmt', 'XSMT', 'xs mt', 'xổ số mt', 'xo so mt', 'xs mien trung',
    'xổ số miền trung', 'xo so mien trung',
    
    // Action keywords
    'xem kết quả xổ số', 'xem ket qua xo so', 'xem ketqua',
    'tra cứu kết quả xổ số', 'tra cuu ket qua xo so',
    'kết quả xổ số hôm nay', 'ket qua xo so hom nay',
    'kết quả xổ số mới nhất', 'ket qua xo so moi nhat',
    'kết quả xổ số nhanh nhất', 'ket qua xo so nhanh nhat',
    'kết quả xổ số chính xác', 'ket qua xo so chinh xac',
    
    // Tool keywords
    'thống kê lô gan', 'thong ke lo gan', 'lo gan', 'lô gan',
    'thống kê xổ số', 'thong ke xo so', 'thống kê', 'thong ke',
    'soi cầu', 'soi cau', 'soi cầu miền bắc', 'soi cau mien bac',
    'tạo dàn đề', 'tao dan de', 'dàn đề', 'dan de',
];

// 🔥 COMPARISON KEYWORDS
const COMPARISON_KEYWORDS = [
    'trang xổ số nào tốt nhất', 'trang xo so nao tot nhat',
    'web xổ số nào tốt nhất', 'web xo so nao tot nhat',
    'kết quả xổ số nào tốt nhất', 'ket qua xo so nao tot nhat',
    'xem xổ số ở đâu tốt nhất', 'xem xo so o dau tot nhat',
    'trang xổ số nhanh nhất', 'trang xo so nhanh nhat',
    'web xổ số chính xác nhất', 'web xo so chinh xac nhat',
];

// Flatten all keywords
const ALL_BLACKHAT_KEYWORDS = [
    ...Object.values(COMPETITOR_KEYWORDS).flat(),
    ...CORE_KEYWORDS,
    ...COMPARISON_KEYWORDS,
];

module.exports = {
    COMPETITOR_KEYWORDS,
    CORE_KEYWORDS,
    COMPARISON_KEYWORDS,
    ALL_BLACKHAT_KEYWORDS,
};









