/**
 * API Utilities
 * Các utility functions để xử lý API calls với retry logic và error handling
 */

/**
 * Fetch với retry logic cho 429 errors
 * @param {string} url - URL để fetch
 * @param {Object} options - Fetch options
 * @param {number} maxRetries - Số lần retry tối đa
 * @returns {Promise<Response>} - Response object
 */
export const fetchWithRetry = async (url, options = {}, maxRetries = 3) => {
    // Đảm bảo fetch có sẵn (Next.js 15+ đã polyfill sẵn)
    // Sử dụng globalThis.fetch để đảm bảo hoạt động ở cả server và client
    const fetchFn = typeof globalThis !== 'undefined' && globalThis.fetch
        ? globalThis.fetch
        : typeof window !== 'undefined' && window.fetch
            ? window.fetch
            : typeof fetch !== 'undefined'
                ? fetch
                : null;

    if (!fetchFn) {
        throw new Error('Fetch API is not available. Please ensure you are using Next.js 13+ or Node.js 18+.');
    }

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetchFn(url, options);

            if (response.status === 429) {
                if (attempt < maxRetries) {
                    const retryAfter = response.headers.get('Retry-After') || Math.pow(2, attempt);
                    console.warn(`⚠️ Rate limited (429), retrying in ${retryAfter}s (attempt ${attempt}/${maxRetries})`);
                    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
                    continue;
                } else {
                    throw new Error('API đang bị giới hạn. Vui lòng thử lại sau vài phút.');
                }
            }

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return response;
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            console.warn(`⚠️ Fetch attempt ${attempt} failed:`, error.message);
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
};

/**
 * Fetch JSON với retry logic
 * @param {string} url - URL để fetch
 * @param {Object} options - Fetch options
 * @param {number} maxRetries - Số lần retry tối đa
 * @returns {Promise<Object>} - JSON data
 */
export const fetchJSONWithRetry = async (url, options = {}, maxRetries = 3) => {
    const response = await fetchWithRetry(url, options, maxRetries);
    return await response.json();
};

/**
 * Xử lý 429 error với user-friendly message
 * @param {Error} error - Error object
 * @returns {string} - User-friendly error message
 */
export const handle429Error = (error) => {
    if (error.message.includes('429') || error.message.includes('Too Many Requests')) {
        return 'API đang bị giới hạn. Vui lòng thử lại sau vài phút.';
    }
    return error.message;
};

/**
 * Debounce function để tránh gọi API quá nhiều
 * @param {Function} func - Function cần debounce
 * @param {number} wait - Thời gian chờ (ms)
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle function để giới hạn số lần gọi API
 * @param {Function} func - Function cần throttle
 * @param {number} limit - Số lần gọi tối đa
 * @param {number} time - Khoảng thời gian (ms)
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit, time) => {
    let inThrottle;
    let lastFunc;
    let lastRan;

    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            lastRan = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= time) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, time - (Date.now() - lastRan));
        }
    };
};

/**
 * Cache cho API responses
 */
class APICache {
    constructor(defaultTTL = 5 * 60 * 1000) { // 5 minutes default
        this.cache = new Map();
        this.defaultTTL = defaultTTL;
    }

    set(key, value, ttl = this.defaultTTL) {
        this.cache.set(key, {
            value,
            expiry: Date.now() + ttl
        });
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    clear() {
        this.cache.clear();
    }

    delete(key) {
        this.cache.delete(key);
    }
}

export const apiCache = new APICache();

/**
 * Fetch với cache và retry
 * @param {string} url - URL để fetch
 * @param {Object} options - Fetch options
 * @param {number} cacheTTL - Cache TTL (ms)
 * @param {number} maxRetries - Số lần retry tối đa
 * @returns {Promise<Object>} - JSON data
 */
export const fetchWithCacheAndRetry = async (url, options = {}, cacheTTL = 5 * 60 * 1000, maxRetries = 3) => {
    // Đảm bảo chỉ chạy ở client-side
    if (typeof window === 'undefined') {
        // Trả về empty response thay vì throw error để tránh crash
        return { success: false, data: null };
    }

    try {
        const cacheKey = `${url}_${JSON.stringify(options)}`;
        const cached = apiCache.get(cacheKey);

        if (cached) {
            console.log('📦 Using cached API data for:', url);
            return cached;
        }

        const data = await fetchJSONWithRetry(url, options, maxRetries);
        apiCache.set(cacheKey, data, cacheTTL);

        return data;
    } catch (error) {
        console.error('Error in fetchWithCacheAndRetry:', error);
        // Trả về empty response thay vì throw error
        return { success: false, data: null, error: error.message };
    }
};

/**
 * API URL configuration
 */
const apiUrl = typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000')
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');

/**
 * Lấy danh sách bài viết
 * @param {string} search - Từ khóa tìm kiếm
 * @param {number} page - Số trang
 * @param {number} limit - Số lượng bài viết mỗi trang
 * @param {string} category - Danh mục bài viết
 * @returns {Promise<{posts: Array, total: number, page: number, totalPages: number}>}
 */
export async function getPosts(search = null, page = 1, limit = 10, category = null) {
    // Đảm bảo chỉ chạy ở client-side
    if (typeof window === 'undefined') {
        return {
            posts: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }

    try {
        const queryParams = new URLSearchParams();
        queryParams.append('page', page);
        queryParams.append('limit', limit);
        queryParams.append('sort', '-publishedAt');

        if (category) {
            queryParams.append('category', category);
        }

        if (search) {
            queryParams.append('search', search);
        }

        const url = `${apiUrl}/api/articles?${queryParams}`;
        const data = await fetchWithCacheAndRetry(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        }, 5 * 60 * 1000); // Cache 5 phút

        // Chuyển đổi format từ API response sang format mà code hiện tại mong đợi
        if (data.success && data.data) {
            return {
                posts: Array.isArray(data.data.articles) ? data.data.articles : [],
                total: data.data.pagination?.totalArticles || 0,
                page: data.data.pagination?.currentPage || page,
                totalPages: data.data.pagination?.totalPages || 1,
            };
        }

        // Fallback nếu response không có structure mong đợi
        if (Array.isArray(data)) {
            return {
                posts: data,
                total: data.length,
                page: 1,
                totalPages: 1,
            };
        }

        return {
            posts: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return {
            posts: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }
}

/**
 * Lấy danh sách danh mục
 * @returns {Promise<Array>}
 */
export async function getCategories() {
    // Đảm bảo chỉ chạy ở client-side
    if (typeof window === 'undefined') {
        return ['Thể thao', 'Đời sống', 'Giải trí', 'Tin hot'];
    }

    try {
        // Kiểm tra fetch có sẵn không
        const fetchFn = typeof globalThis !== 'undefined' && globalThis.fetch
            ? globalThis.fetch
            : typeof window !== 'undefined' && window.fetch
                ? window.fetch
                : typeof fetch !== 'undefined'
                    ? fetch
                    : null;

        if (!fetchFn) {
            console.warn('Fetch API is not available, returning default categories');
            return ['Thể thao', 'Đời sống', 'Giải trí', 'Tin hot'];
        }

        const url = `${apiUrl}/api/articles/categories`;
        const data = await fetchWithCacheAndRetry(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        }, 10 * 60 * 1000); // Cache 10 phút cho categories

        // Chuyển đổi format từ API response sang format mà code hiện tại mong đợi
        if (data.success && data.data) {
            // Nếu data.data là array, trả về trực tiếp
            if (Array.isArray(data.data)) {
                // Map từ format mới sang format cũ nếu cần
                return data.data.map((cat) => {
                    // Nếu là object có key và count, chỉ lấy key
                    if (typeof cat === 'object' && cat.key) {
                        return cat.key;
                    }
                    // Nếu là string, trả về trực tiếp
                    return cat;
                });
            }
        }

        // Fallback nếu response không có structure mong đợi
        if (Array.isArray(data)) {
            return data;
        }

        // Fallback mặc định
        return ['Thể thao', 'Đời sống', 'Giải trí', 'Tin hot'];
    } catch (error) {
        console.error('Error fetching categories:', error);
        // Trả về danh mục mặc định khi lỗi
        return ['Thể thao', 'Đời sống', 'Giải trí', 'Tin hot'];
    }
}

export default {
    fetchWithRetry,
    fetchJSONWithRetry,
    handle429Error,
    debounce,
    throttle,
    APICache,
    apiCache,
    fetchWithCacheAndRetry,
    getPosts,
    getCategories
};
