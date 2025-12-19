/**
 * Dan2DGenerator Component
 * Component logic cho tạo dàn số 2D
 */

import { useState, useEffect, useMemo, useCallback, memo, useRef, useDeferredValue, startTransition } from 'react';
import axios from 'axios';
import styles from '../styles/Dan2DGenerator.module.css';

// ✅ PERFORMANCE: Inline SVG icons to avoid external dependencies
const IconTrash = memo(({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
));
IconTrash.displayName = 'IconTrash';

const IconCopy = memo(({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
));
IconCopy.displayName = 'IconCopy';

const IconClock = memo(({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </svg>
));
IconClock.displayName = 'IconClock';

const IconCheck = memo(({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
    </svg>
));
IconCheck.displayName = 'IconCheck';

const IconDice = memo(({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M9 9h.01" />
        <path d="M15 9h.01" />
        <path d="M9 15h.01" />
        <path d="M15 15h.01" />
        <path d="M12 12h.01" />
    </svg>
));
IconDice.displayName = 'IconDice';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Debounce utility for performance optimization
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// Parse và chuẩn hóa input cho 2D
const parseInput = (input) => {
    // Chấp nhận số, dấu phẩy, chấm phẩy, khoảng trắng, xuống dòng
    if (!/^[0-9\s,;\r\n]*$/.test(input)) {
        return { normalized: '', pairs: [], error: 'Vui lòng chỉ nhập số và các ký tự phân tách (, ; hoặc khoảng trắng)' };
    }

    // Xử lý tất cả dấu phân tách (bao gồm cả xuống dòng) thành dấu phẩy
    const normalized = input
        .replace(/[\r\n]+/g, ',')      // Xuống dòng → dấu phẩy
        .replace(/[;\s]+/g, ',')       // Chấm phẩy, space → dấu phẩy
        .replace(/,+/g, ',')           // Nhiều dấu phẩy → 1 dấu phẩy
        .replace(/^,|,$/g, '');        // Xóa dấu phẩy đầu/cuối

    const nums = normalized.split(',').map(num => num.trim()).filter(n => n);
    const pairs = [];

    nums.forEach(num => {
        const strNum = num.toString();
        if (strNum.length === 1 && !isNaN(parseInt(strNum))) {
            // ✅ FIX: Xử lý số 1 chữ số - thêm 0 vào trước (1 → 01)
            pairs.push(strNum.padStart(2, '0'));
        } else if (strNum.length === 2 && !isNaN(parseInt(strNum))) {
            pairs.push(strNum.padStart(2, '0'));
        } else if (strNum.length >= 3 && !isNaN(parseInt(strNum))) {
            for (let i = 0; i < strNum.length - 1; i++) {
                const pair = strNum.slice(i, i + 2);
                pairs.push(pair.padStart(2, '0'));
            }
        }
    });

    return { normalized, pairs, error: null };
};

// Parse và chuẩn hóa input cho 1D
const parseInput1D = (input) => {
    if (!/^[0-9\s,;\r\n]*$/.test(input)) {
        return { normalized: '', digits: [], error: 'Vui lòng chỉ nhập số và các ký tự phân tách (, ; hoặc khoảng trắng)' };
    }

    const normalized = input
        .replace(/[\r\n]+/g, ',')
        .replace(/[;\s]+/g, ',')
        .replace(/,+/g, ',')
        .replace(/^,|,$/g, '');

    const nums = normalized.split(',').map(num => num.trim()).filter(n => n);
    const digits = [];

    nums.forEach(num => {
        const strNum = num.toString();
        // Xử lý số 1 chữ số
        if (strNum.length === 1 && !isNaN(parseInt(strNum))) {
            digits.push(strNum);
        }
        // Xử lý số nhiều chữ số - tách thành từng chữ số
        else if (strNum.length >= 2 && !isNaN(parseInt(strNum))) {
            for (let i = 0; i < strNum.length; i++) {
                const digit = strNum[i];
                if (digit >= '0' && digit <= '9') {
                    digits.push(digit);
                }
            }
        }
    });

    return { normalized, digits, error: null };
};

// Parse và chuẩn hóa input 3D
const parseInput3D = (input) => {
    if (!/^[0-9\s,;\r\n]*$/.test(input)) {
        return { normalized: '', numbers: [], error: 'Vui lòng chỉ nhập số và các ký tự phân tách (, ; hoặc khoảng trắng)' };
    }

    const normalized = input
        .replace(/[\r\n]+/g, ',')
        .replace(/[;\s]+/g, ',')
        .replace(/,+/g, ',')
        .replace(/^,|,$/g, '');

    const nums = normalized.split(',').map(num => num.trim()).filter(n => n);
    const validNumbers = [];

    nums.forEach(num => {
        const strNum = num.toString();
        if (strNum.length === 1 && !isNaN(parseInt(strNum))) {
            // ✅ FIX: Xử lý số 1 chữ số - thêm 2 số 0 vào trước (1 → 001)
            validNumbers.push(strNum.padStart(3, '0'));
        } else if (strNum.length === 2 && !isNaN(parseInt(strNum))) {
            // ✅ FIX: Xử lý số 2 chữ số - thêm 1 số 0 vào trước (12 → 012)
            validNumbers.push(strNum.padStart(3, '0'));
        } else if (strNum.length === 3 && !isNaN(parseInt(strNum))) {
            validNumbers.push(strNum);
        } else if (strNum.length > 3 && !isNaN(parseInt(strNum))) {
            // Xử lý số nhiều hơn 3 chữ số - tách thành các số 3 chữ số
            for (let i = 0; i <= strNum.length - 3; i++) {
                const threeDigit = strNum.slice(i, i + 3);
                validNumbers.push(threeDigit);
            }
        }
    });

    return { normalized, numbers: validNumbers, error: null };
};

// Parse và chuẩn hóa input 4D
const parseInput4D = (input) => {
    if (!/^[0-9\s,;\r\n]*$/.test(input)) {
        return { normalized: '', numbers: [], error: 'Vui lòng chỉ nhập số và các ký tự phân tách (, ; hoặc khoảng trắng)' };
    }

    const normalized = input
        .replace(/[\r\n]+/g, ',')
        .replace(/[;\s]+/g, ',')
        .replace(/,+/g, ',')
        .replace(/^,|,$/g, '');

    const nums = normalized.split(',').map(num => num.trim()).filter(n => n);
    const validNumbers = [];

    nums.forEach(num => {
        const strNum = num.toString();
        if (strNum.length === 1 && !isNaN(parseInt(strNum))) {
            // ✅ FIX: Xử lý số 1 chữ số - thêm 3 số 0 vào trước (1 → 0001)
            validNumbers.push(strNum.padStart(4, '0'));
        } else if (strNum.length === 2 && !isNaN(parseInt(strNum))) {
            // ✅ FIX: Xử lý số 2 chữ số - thêm 2 số 0 vào trước (12 → 0012)
            validNumbers.push(strNum.padStart(4, '0'));
        } else if (strNum.length === 3 && !isNaN(parseInt(strNum))) {
            // ✅ FIX: Xử lý số 3 chữ số - thêm 1 số 0 vào trước (123 → 0123)
            validNumbers.push(strNum.padStart(4, '0'));
        } else if (strNum.length === 4 && !isNaN(parseInt(strNum))) {
            validNumbers.push(strNum);
        } else if (strNum.length > 4 && !isNaN(parseInt(strNum))) {
            // Xử lý số nhiều hơn 4 chữ số - tách thành các số 4 chữ số
            for (let i = 0; i <= strNum.length - 4; i++) {
                const fourDigit = strNum.slice(i, i + 4);
                validNumbers.push(fourDigit);
            }
        }
    });

    return { normalized, numbers: validNumbers, error: null };
};

// ✅ PERFORMANCE: Memoized Tab Button component with custom comparison
const TabButton = memo(({ label, isActive, onClick }) => (
    <button
        className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
        onClick={onClick}
        role="tab"
        aria-selected={isActive}
        aria-controls="result-textarea"
        tabIndex={isActive ? 0 : -1}
    >
        {label}
    </button>
), (prevProps, nextProps) => {
    // ✅ PERFORMANCE: Custom comparison - only re-render if props change
    return prevProps.label === nextProps.label &&
        prevProps.isActive === nextProps.isActive &&
        prevProps.onClick === nextProps.onClick;
});
TabButton.displayName = 'TabButton';

// ✅ PERFORMANCE: Main component - will be memoized at export
function Dan2DGenerator() {
    const [inputNumbers, setInputNumbers] = useState('');
    const [displayInput, setDisplayInput] = useState('');
    const [quantity, setQuantity] = useState(''); // Số lượng số cần tạo
    const [generateMode, setGenerateMode] = useState(null); // Loại số để tạo ngẫu nhiên (1D, 2D, 3D, 4D)
    const [levels2D, setLevels2D] = useState({});
    const [levels1D, setLevels1D] = useState({});
    const [levels3D, setLevels3D] = useState({});
    const [levels4D, setLevels4D] = useState({});
    const [viewMode, setViewMode] = useState(null); // Tab để xem kết quả (1D, 2D, 3D, 4D)
    const [lastActiveViewMode, setLastActiveViewMode] = useState(null); // Lưu tab cuối cùng để hiển thị kết quả khi focus
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [copy2DStatus, setCopy2DStatus] = useState(false);
    const [copy1DStatus, setCopy1DStatus] = useState(false);
    const [copy3DStatus, setCopy3DStatus] = useState(false);
    const [copy4DStatus, setCopy4DStatus] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [levelCopyStatus, setLevelCopyStatus] = useState({});
    const [lastApiCallTime, setLastApiCallTime] = useState(0);
    const [offlineMode, setOfflineMode] = useState(false);
    const [lastOfflineWarning, setLastOfflineWarning] = useState(0);
    const [isInputFocused, setIsInputFocused] = useState(false); // Track khi textarea input được focus

    // Refs để cleanup setTimeout
    const timeoutRefs = useRef([]);
    
    // ✅ PERFORMANCE: Ref to track current viewMode without causing re-renders
    const viewModeRef = useRef(null);
    // ✅ FIX: Ref to track lastActiveViewMode to check if we should use API result for 1D
    const lastActiveViewModeRef = useRef(null);

    // ✅ PERFORMANCE: Deferred values for better performance
    const deferredDisplayInput = useDeferredValue(displayInput);

    // ✅ PERFORMANCE: Sync viewModeRef with viewMode state
    useEffect(() => {
        viewModeRef.current = viewMode;
    }, [viewMode]);

    // ✅ FIX: Sync lastActiveViewModeRef with lastActiveViewMode state
    useEffect(() => {
        lastActiveViewModeRef.current = lastActiveViewMode;
    }, [lastActiveViewMode]);

    // Cleanup timeouts khi component unmount
    useEffect(() => {
        return () => {
            timeoutRefs.current.forEach(timeoutId => {
                if (timeoutId) clearTimeout(timeoutId);
            });
            timeoutRefs.current = [];
        };
    }, []);


    // ✅ PERFORMANCE: Memoize totalSelected - calculate from input numbers based on viewMode
    // ✅ FIXED: Use lastActiveViewMode when viewMode is null (when focusing input)
    const totalSelected = useMemo(() => {
        if (!inputNumbers || inputNumbers.trim() === '') return 0;
        
        // Dùng viewMode hoặc lastActiveViewMode để tính totalSelected
        const activeMode = viewMode || lastActiveViewMode;
        if (!activeMode) return 0;

        if (activeMode === '1D') {
            const { digits } = parseInput1D(inputNumbers);
            return digits.length;
        } else if (activeMode === '3D') {
            const { numbers } = parseInput3D(inputNumbers);
            return numbers.length;
        } else if (activeMode === '4D') {
            const { numbers } = parseInput4D(inputNumbers);
            return numbers.length;
        } else {
            const { pairs } = parseInput(inputNumbers);
            return pairs.length;
        }
    }, [inputNumbers, viewMode, lastActiveViewMode]);

    // ✅ PERFORMANCE: Tính toán local nếu API lỗi - Memoized - Hỗ trợ 2D, 1D, 3D, 4D
    const calculateLevelsLocal = useCallback((input) => {
        // Calculate 2D and 1D
        const { pairs } = parseInput(input);
        const freq = {};
        pairs.forEach(p => freq[p] = (freq[p] || 0) + 1);

        // Calculate 2D levels - check all numbers 00-99
        const levels2D = {};
        for (let i = 0; i <= 99; i++) {
            const num = i.toString().padStart(2, '0');
            const f = freq[num] || 0;
            if (!levels2D[f]) levels2D[f] = [];
            levels2D[f].push(num);
        }

        // Calculate 1D levels - từ input trực tiếp (xử lý số 1 chữ số)
        const { digits } = parseInput1D(input);
        const digitFreq = {};
        digits.forEach(d => digitFreq[d] = (digitFreq[d] || 0) + 1);

        const levels1D = {};
        for (let d = 0; d <= 9; d++) {
            const f = digitFreq[d.toString()] || 0;
            if (!levels1D[f]) levels1D[f] = [];
            levels1D[f].push(d.toString());
        }

        setLevels2D(levels2D);
        setLevels1D(levels1D);

        // Calculate 3D levels - check all numbers 000-999
        const { numbers: numbers3D } = parseInput3D(input);
        const freq3D = {};
        numbers3D.forEach(n => freq3D[n] = (freq3D[n] || 0) + 1);
        const levels3D = {};
        for (let i = 0; i <= 999; i++) {
            const num = i.toString().padStart(3, '0');
            const f = freq3D[num] || 0;
            if (!levels3D[f]) levels3D[f] = [];
            levels3D[f].push(num);
        }
        setLevels3D(levels3D);

        // Calculate 4D levels - check all numbers 0000-9999
        const { numbers: numbers4D } = parseInput4D(input);
        const freq4D = {};
        numbers4D.forEach(n => freq4D[n] = (freq4D[n] || 0) + 1);
        const levels4D = {};
        for (let i = 0; i <= 9999; i++) {
            const num = i.toString().padStart(4, '0');
            const f = freq4D[num] || 0;
            if (!levels4D[f]) levels4D[f] = [];
            levels4D[f].push(num);
        }
        setLevels4D(levels4D);
    }, []);

    // ✅ PERFORMANCE: Tính toán levels từ API - Fixed dependencies
    const fetchLevels = useCallback(async (input) => {
        if (!input || input.trim() === '') return;

        setLoading(true);
        setError(''); // Clear previous errors

        try {
            const response = await axios.post(`${API_URL}/api/dande/2d`, {
                input
            }, {
                timeout: 5000, // 5 second timeout
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setLevels2D(response.data.data.levels2D);
                // ✅ FIX: Không overwrite levels1D khi đang ở mode 1D vì API parse theo logic 2D, khác với parseInput1D
                // API endpoint /api/dande/2d parse input theo logic 2D (tạo cặp 2D) và tính 1D từ đó
                // Nhưng parseInput1D parse trực tiếp input thành các chữ số, nên kết quả khác nhau
                if (lastActiveViewModeRef.current !== '1D' && viewModeRef.current !== '1D') {
                    setLevels1D(response.data.data.levels1D);
                }
                setError(''); // Clear any previous errors
                setOfflineMode(false); // Reset offline mode on success
            }
        } catch (err) {
            console.error('API Error:', err);

            // Check if it's rate limiting error
            if (err.response?.status === 429) {
                setOfflineMode(true);
                setError('Quá nhiều yêu cầu. Đang sử dụng tính toán offline.');
                // Use offline calculation immediately for rate limiting
                calculateLevelsLocal(input);
            } else {
                setOfflineMode(true);
                setError('Không thể kết nối tới server. Đang sử dụng tính toán offline.');
                // Fallback: tính toán ở client
                calculateLevelsLocal(input);
            }
        } finally {
            setLoading(false);
        }
    }, [calculateLevelsLocal]);


    // ✅ PERFORMANCE: Calculate levels when input changes - Optimized with startTransition
    useEffect(() => {
        if (inputNumbers && inputNumbers.trim() !== '') {
            // Use startTransition for non-urgent calculation to avoid blocking UI
            startTransition(() => {
                calculateLevelsLocal(inputNumbers);
            });

            // Call API with debounce
            const timeoutId = setTimeout(() => {
                const now = Date.now();

                // If in offline mode, skip API calls
                if (offlineMode) {
                    return;
                }

                // Only call API if at least 3 seconds have passed since last call
                if (now - lastApiCallTime > 3000) {
                    setLastApiCallTime(now);
                    fetchLevels(inputNumbers);
                }
            }, 2000); // 2s delay for API calls
            timeoutRefs.current.push(timeoutId);

            // ✅ PERFORMANCE: Cleanup timeout on unmount or dependency change
            return () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutRefs.current = timeoutRefs.current.filter(id => id !== timeoutId);
                }
            };
        }
    }, [inputNumbers, fetchLevels, lastApiCallTime, calculateLevelsLocal, offlineMode]);

    // ✅ Ensure 3D and 4D are calculated when switching tabs if inputNumbers exists - Optimized with startTransition
    useEffect(() => {
        if (inputNumbers && inputNumbers.trim() !== '' && (viewMode === '3D' || viewMode === '4D')) {
            // Use startTransition for non-urgent recalculation
            startTransition(() => {
                calculateLevelsLocal(inputNumbers);
            });
        }
    }, [viewMode, inputNumbers, calculateLevelsLocal]);

    // ✅ PERFORMANCE: Debounced input validation
    const debouncedInputValidation = useMemo(
        () => debounce((value) => {
            startTransition(() => {
                // Validate input format
                if (!/^[0-9\s,;\r\n]*$/.test(value)) {
                    setError('Vui lòng chỉ nhập số và các ký tự phân tách');
                } else {
                    setError('');
                }
            });
        }, 150),
        []
    );

    // ✅ PERFORMANCE: Handle input change - Optimized with startTransition - Chỉ cho phép nhập số và ký tự phân tách
    const handleInputChange = useCallback((e) => {
        const value = e.target.value;
        
        // Chỉ cho phép nhập số, dấu phẩy, chấm phẩy, khoảng trắng, xuống dòng
        const filteredValue = value.replace(/[^0-9\s,;\r\n]/g, '');

        // Update immediately for responsive UI
        setDisplayInput(filteredValue);

        // Use startTransition for non-urgent validation
        startTransition(() => {
            debouncedInputValidation(filteredValue);
        });
    }, [debouncedInputValidation]);

    // ✅ PERFORMANCE: Handle quantity change - Optimized with startTransition
    const handleQuantityChange = useCallback((e) => {
        const value = e.target.value;
        
        // Update immediately
        if (value === '' || (!isNaN(value) && parseInt(value) >= 0)) {
            setQuantity(value);
            
            // Use startTransition for non-urgent error clearing
            startTransition(() => {
                setError('');
            });
        }
    }, []);

    // ✅ PERFORMANCE: Handle generateMode change - Optimized with startTransition
    const handleGenerateModeChange = useCallback((e) => {
        const value = e.target.value || null;
        setGenerateMode(value);
        
        // Use startTransition for non-urgent updates
        startTransition(() => {
            setError('');
        });
    }, []);

    // ✅ PERFORMANCE: Handle input focus - Reset tabs but keep results
    // ✅ OPTIMIZED: Use ref to avoid dependency, React 18 auto-batches state updates
    const handleInputFocus = useCallback(() => {
        setIsInputFocused(true); // Đánh dấu textarea đang được focus
        startTransition(() => {
            // Lấy viewMode hiện tại từ ref (không cần dependency)
            const currentViewMode = viewModeRef.current;
            // React 18 sẽ tự động batch cả 2 state updates này
            if (currentViewMode) {
                setLastActiveViewMode(currentViewMode);
            }
            // Reset viewMode về null để button không active
            setViewMode(null);
        });
    }, []); // ✅ OPTIMIZED: No dependencies needed - uses ref instead

    // ✅ PERFORMANCE: Handle input blur - Optimized with startTransition - Hỗ trợ 1D, 2D, 3D, 4D
    const handleInputBlur = useCallback(() => {
        setIsInputFocused(false); // Đánh dấu textarea không còn được focus
        startTransition(() => {
            let normalized, error;

            if (viewMode === '1D') {
                const result = parseInput1D(displayInput);
                normalized = result.normalized;
                error = result.error;
            } else if (viewMode === '3D') {
                const result = parseInput3D(displayInput);
                normalized = result.normalized;
                error = result.error;
            } else if (viewMode === '4D') {
                const result = parseInput4D(displayInput);
                normalized = result.normalized;
                error = result.error;
            } else {
                // Default to 2D
                const result = parseInput(displayInput);
                normalized = result.normalized;
                error = result.error;
            }

            if (error) {
                setError(error);
                return;
            }

            setInputNumbers(normalized);
            setDisplayInput(normalized);
        });
    }, [displayInput, viewMode]);

    // ✅ Helper function to shuffle array (Fisher-Yates algorithm)
    const shuffleArray = useCallback((array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);

    // ✅ Helper function to generate random numbers (unique, no duplicates)
    const generateRandomNumbers = useCallback((count, type) => {
        let allNumbers = [];
        let maxCount = 0;

        if (type === '1D') {
            // Tạo tất cả số từ 0-9 (10 số)
            maxCount = 10;
            for (let i = 0; i <= 9; i++) {
                allNumbers.push(i.toString());
            }
        } else if (type === '2D') {
            // Tạo tất cả số từ 00-99 (100 số)
            maxCount = 100;
            for (let i = 0; i <= 99; i++) {
                allNumbers.push(i.toString().padStart(2, '0'));
            }
        } else if (type === '3D') {
            // Tạo tất cả số từ 000-999 (1000 số)
            maxCount = 1000;
            for (let i = 0; i <= 999; i++) {
                allNumbers.push(i.toString().padStart(3, '0'));
            }
        } else if (type === '4D') {
            // Tạo tất cả số từ 0000-9999 (10000 số)
            maxCount = 10000;
            for (let i = 0; i <= 9999; i++) {
                allNumbers.push(i.toString().padStart(4, '0'));
            }
        }

        // Giới hạn số lượng không vượt quá max
        const actualCount = Math.min(count, maxCount);

        // Shuffle và lấy N số đầu tiên (đảm bảo không trùng lặp)
        const shuffled = shuffleArray(allNumbers);
        const selected = shuffled.slice(0, actualCount);

        // Sắp xếp từ nhỏ đến lớn
        return selected.sort((a, b) => parseInt(a) - parseInt(b));
    }, [shuffleArray]);

    // ✅ PERFORMANCE: Handle generate dan - Memoized - Tạo số ngẫu nhiên
    const handleGenerateDan = useCallback(() => {
        const quantityNum = parseInt(quantity);
        const mode = generateMode || '2D'; // Nếu không chọn mức, mặc định là 2D

        // Nếu không nhập số lượng
        if (!quantity || quantity.trim() === '' || isNaN(quantityNum) || quantityNum <= 0) {
            setError('');

            // Tự động set viewMode theo mode được chọn
            setViewMode(mode);
            setLastActiveViewMode(mode);

            // Tạo đủ số theo mức được chọn
            let defaultCount = 86; // Mặc định 2D
            if (mode === '1D') defaultCount = 10;      // 0-9
            else if (mode === '2D') defaultCount = 86; // 00-99 (86 số)
            else if (mode === '3D') defaultCount = 1000; // 000-999
            else if (mode === '4D') defaultCount = 10000; // 0000-9999

            const randomNumbers = generateRandomNumbers(defaultCount, mode);
            const normalized = randomNumbers.join(',');
            setInputNumbers(normalized);
            setDisplayInput(normalized);
            // API call will be triggered by useEffect debounce
            return;
        }

        // Giới hạn số lượng theo loại (mỗi số chỉ xuất hiện 1 lần)
        let maxQuantity = 1000;
        if (mode === '1D') maxQuantity = 10;
        else if (mode === '2D') maxQuantity = 100;
        else if (mode === '3D') maxQuantity = 1000;
        else if (mode === '4D') maxQuantity = 10000;

        if (quantityNum > maxQuantity) {
            const range = mode === '1D' ? '0-9' :
                mode === '2D' ? '00-99' :
                    mode === '3D' ? '000-999' : '0000-9999';
            setError(`Số lượng không được vượt quá ${maxQuantity} (${range})`);
            return;
        }

        setError('');

        // Tự động set viewMode theo mode được chọn (set trước để đảm bảo hiển thị đúng tab)
        setViewMode(mode);
        setLastActiveViewMode(mode);

        // Generate random numbers using mode
        const randomNumbers = generateRandomNumbers(quantityNum, mode);
        const normalized = randomNumbers.join(',');

        setInputNumbers(normalized);
        setDisplayInput(normalized);
        // API call will be triggered by useEffect debounce
    }, [quantity, generateMode, generateRandomNumbers]);

    // ✅ PERFORMANCE: Handle retry online mode - Memoized
    const handleRetryOnline = useCallback(() => {
        setOfflineMode(false);
        setError('');
        setLastApiCallTime(0); // Reset API call timer
        if (inputNumbers && inputNumbers.trim() !== '') {
            fetchLevels(inputNumbers);
        }
    }, [inputNumbers, fetchLevels]);


    // ✅ PERFORMANCE: Xóa tất cả - Memoized
    const handleXoaDan = useCallback(() => {
        setInputNumbers('');
        setDisplayInput('');
        setLevels2D({});
        setLevels1D({});
        setLevels3D({});
        setLevels4D({});
        setModalMessage('Đã xóa tất cả dàn số');
        setShowModal(true);
    }, []);

    // ✅ Helper function to create empty levels (all numbers at level 0)
    const createEmptyLevels = useCallback((type) => {
        const emptyLevels = { 0: [] };

        if (type === '1D') {
            // Tạo tất cả số từ 0-9
            for (let i = 0; i <= 9; i++) {
                emptyLevels[0].push(i.toString());
            }
        } else if (type === '2D') {
            // Tạo tất cả số từ 00-99
            for (let i = 0; i <= 99; i++) {
                emptyLevels[0].push(i.toString().padStart(2, '0'));
            }
        } else if (type === '3D') {
            // Tạo tất cả số từ 000-999
            for (let i = 0; i <= 999; i++) {
                emptyLevels[0].push(i.toString().padStart(3, '0'));
            }
        } else if (type === '4D') {
            // Tạo tất cả số từ 0000-9999
            for (let i = 0; i <= 9999; i++) {
                emptyLevels[0].push(i.toString().padStart(4, '0'));
            }
        }

        return emptyLevels;
    }, []);

    // ✅ PERFORMANCE: Copy dàn 2D - Memoized - Sử dụng logic tương tự currentLevels để đảm bảo copy đúng
    const handleCopy2D = useCallback(() => {
        // Tính toán levels cho 2D (tương tự currentLevels logic)
        let levels = levels2D;
        if (Object.keys(levels).length === 0 && totalSelected === 0) {
            levels = createEmptyLevels('2D');
        }

        const sorted = Object.entries(levels)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .filter(([, nums]) => nums.length > 0);

        if (sorted.length === 0) {
            setModalMessage('Chưa có dàn số để copy');
            setShowModal(true);
            return;
        }

        const copyText = sorted
            .map(([level, nums]) => `Mức ${level} (${nums.length} số)\n${nums.join(',')}`)
            .join('\n\n');

        navigator.clipboard.writeText(copyText.trim()).then(() => {
            setCopy2DStatus(true);
            const timeoutId = setTimeout(() => setCopy2DStatus(false), 2000);
            timeoutRefs.current.push(timeoutId);
        }).catch(() => {
            setModalMessage('Lỗi khi sao chép');
            setShowModal(true);
        });
    }, [levels2D, totalSelected, createEmptyLevels]);

    // ✅ PERFORMANCE: Copy dàn 1D - Memoized - Sử dụng logic tương tự currentLevels để đảm bảo copy đúng
    const handleCopy1D = useCallback(() => {
        // Tính toán levels cho 1D (tương tự currentLevels logic)
        let levels = levels1D;
        if (Object.keys(levels).length === 0 && totalSelected === 0) {
            levels = createEmptyLevels('1D');
        }

        const sorted = Object.entries(levels)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .filter(([, digits]) => digits.length > 0);

        if (sorted.length === 0) {
            setModalMessage('Chưa có dàn số để copy');
            setShowModal(true);
            return;
        }

        const copyText = sorted
            .map(([level, digits]) => `Mức ${level} (${digits.length} số)\n${digits.join(',')}`)
            .join('\n\n');

        navigator.clipboard.writeText(copyText.trim()).then(() => {
            setCopy1DStatus(true);
            const timeoutId = setTimeout(() => setCopy1DStatus(false), 2000);
            timeoutRefs.current.push(timeoutId);
        }).catch(() => {
            setModalMessage('Lỗi khi sao chép');
            setShowModal(true);
        });
    }, [levels1D, totalSelected, createEmptyLevels]);

    // ✅ PERFORMANCE: Copy dàn 3D - Memoized - Sử dụng logic tương tự currentLevels để đảm bảo copy đúng
    const handleCopy3D = useCallback(() => {
        // Tính toán levels cho 3D (tương tự currentLevels logic)
        let levels = levels3D;
        if (Object.keys(levels).length === 0 && totalSelected === 0) {
            levels = createEmptyLevels('3D');
        }

        const sorted = Object.entries(levels)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .filter(([, nums]) => nums.length > 0);

        if (sorted.length === 0) {
            setModalMessage('Chưa có dàn số để copy');
            setShowModal(true);
            return;
        }

        const copyText = sorted
            .map(([level, nums]) => `Mức ${level} (${nums.length} số)\n${nums.join(',')}`)
            .join('\n\n');

        navigator.clipboard.writeText(copyText.trim()).then(() => {
            setCopy3DStatus(true);
            const timeoutId = setTimeout(() => setCopy3DStatus(false), 2000);
            timeoutRefs.current.push(timeoutId);
        }).catch(() => {
            setModalMessage('Lỗi khi sao chép');
            setShowModal(true);
        });
    }, [levels3D, totalSelected, createEmptyLevels]);

    // ✅ PERFORMANCE: Copy dàn 4D - Memoized - Sử dụng logic tương tự currentLevels để đảm bảo copy đúng
    const handleCopy4D = useCallback(() => {
        // Tính toán levels cho 4D (tương tự currentLevels logic)
        let levels = levels4D;
        if (Object.keys(levels).length === 0 && totalSelected === 0) {
            levels = createEmptyLevels('4D');
        }

        const sorted = Object.entries(levels)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .filter(([, nums]) => nums.length > 0);

        if (sorted.length === 0) {
            setModalMessage('Chưa có dàn số để copy');
            setShowModal(true);
            return;
        }

        const copyText = sorted
            .map(([level, nums]) => `Mức ${level} (${nums.length} số)\n${nums.join(',')}`)
            .join('\n\n');

        navigator.clipboard.writeText(copyText.trim()).then(() => {
            setCopy4DStatus(true);
            const timeoutId = setTimeout(() => setCopy4DStatus(false), 2000);
            timeoutRefs.current.push(timeoutId);
        }).catch(() => {
            setModalMessage('Lỗi khi sao chép');
            setShowModal(true);
        });
    }, [levels4D, totalSelected, createEmptyLevels]);

    // ✅ PERFORMANCE: Close modal - Memoized
    const closeModal = useCallback(() => {
        setShowModal(false);
        setModalMessage('');
    }, []);


    // Copy selected levels

    // ✅ PERFORMANCE: Copy level function - Memoized
    const handleCopyLevel = useCallback((level, nums, type) => {
        const copyText = `Mức ${level} (${nums.length} số)\n${nums.join(',')}`;

        navigator.clipboard.writeText(copyText.trim()).then(() => {
            setLevelCopyStatus(prev => ({
                ...prev,
                [`${type}-${level}`]: true
            }));
            const timeoutId = setTimeout(() => {
                setLevelCopyStatus(prev => ({
                    ...prev,
                    [`${type}-${level}`]: false
                }));
            }, 2000);
            timeoutRefs.current.push(timeoutId);
        }).catch(() => {
            setModalMessage('Lỗi khi sao chép');
            setShowModal(true);
        });
    }, []);

    // ✅ PERFORMANCE: Handle clear with success state - Memoized
    const handleClear = useCallback(() => {
        // Xóa tất cả
        setInputNumbers('');
        setDisplayInput('');
        setQuantity('');
        setGenerateMode(null);
        setLevels2D({});
        setLevels1D({});
        setLevels3D({});
        setLevels4D({});
        setViewMode(null);
        setLastActiveViewMode(null);
        setError('');
        setDeleteStatus(true);
        const timeoutId = setTimeout(() => setDeleteStatus(false), 2000);
        timeoutRefs.current.push(timeoutId);
    }, []);

    // ✅ PERFORMANCE: Memoize sorted levels based on viewMode - Hỗ trợ 2D, 1D, 3D, 4D
    const currentLevels = useMemo(() => {
        // Dùng lastActiveViewMode nếu viewMode là null (khi đang focus vào input)
        const activeMode = viewMode || lastActiveViewMode;
        if (!activeMode) return {};

        let levels;
        if (activeMode === '2D') levels = levels2D;
        else if (activeMode === '1D') levels = levels1D;
        else if (activeMode === '3D') levels = levels3D;
        else if (activeMode === '4D') levels = levels4D;
        else return {};

        // Nếu không có input (levels rỗng), trả về levels với tất cả số ở mức 0
        if (Object.keys(levels).length === 0 && totalSelected === 0) {
            return createEmptyLevels(activeMode);
        }

        return levels;
    }, [viewMode, lastActiveViewMode, levels2D, levels1D, levels3D, levels4D, totalSelected, createEmptyLevels]);

    const sortedCurrentLevels = useMemo(() => {
        return Object.entries(currentLevels)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .filter(([, nums]) => nums.length > 0);
    }, [currentLevels]);

    // ✅ PERFORMANCE: Memoize tab change handlers
    const handleViewMode2D = useCallback(() => {
        setViewMode('2D');
        setLastActiveViewMode('2D');
    }, []);
    const handleViewMode1D = useCallback(() => {
        setViewMode('1D');
        setLastActiveViewMode('1D');
    }, []);
    const handleViewMode3D = useCallback(() => {
        setViewMode('3D');
        setLastActiveViewMode('3D');
    }, []);
    const handleViewMode4D = useCallback(() => {
        setViewMode('4D');
        setLastActiveViewMode('4D');
    }, []);

    // ✅ PERFORMANCE: Generate result text for textarea - Memoized - Hỗ trợ 2D, 1D, 3D, 4D
    const generateResultText = useMemo(() => {
        // Dùng lastActiveViewMode nếu viewMode là null (khi đang focus vào input)
        const activeMode = viewMode || lastActiveViewMode;
        if (!activeMode) {
            return "";
        }

        const currentTitle = activeMode === '2D' ? 'DÀN 2D' :
            activeMode === '1D' ? 'DÀN 1D' :
                activeMode === '3D' ? 'DÀN 3D' : 'DÀN 4D';
        let resultText = `${currentTitle}\n${'='.repeat(currentTitle.length)}\n`;

        if (sortedCurrentLevels.length > 0) {
            resultText += sortedCurrentLevels
                .map(([level, nums]) => `\nMức ${level} (${nums.length} số):\n${nums.join(', ')}`)
                .join('');
        } else {
            resultText += '\nChưa có số nào được chọn';
        }

        return resultText.trim();
    }, [viewMode, lastActiveViewMode, sortedCurrentLevels]);


    return (
        <div className={styles.container}>
            {/* Top Section - 2 Textareas */}
            <div className={styles.textareaSection}>
                {/* Left Column - Input */}
                <div className={styles.leftColumn}>
                    <div className={styles.inputSection}>
                        {/* Action Buttons */}
                        <div className={styles.buttonGroup} role="toolbar" aria-label="Công cụ tạo dàn số">
                            <button
                                onClick={handleGenerateDan}
                                className={`${styles.button} ${styles.primaryButton}`}
                                disabled={loading || isInputFocused}
                                aria-label={loading ? 'Đang tạo số ngẫu nhiên' : 'Tạo số ngẫu nhiên'}
                                aria-busy={loading}
                            >
                                {loading ? (
                                    <>
                                        <IconClock size={16} aria-hidden="true" />
                                        <span className={styles.buttonText}>Đang tạo...</span>
                                    </>
                                ) : (
                                    <>
                                        <IconDice size={16} aria-hidden="true" />
                                        <span className={styles.buttonText}>Tạo ngẫu nhiên</span>
                                    </>
                                )}
                            </button>

                            {/* Input and Select */}
                            <label htmlFor="quantity-input" className={styles.srOnly}>
                                Số lượng số cần tạo
                            </label>
                            <input
                                id="quantity-input"
                                type="number"
                                placeholder="Số lượng"
                                className={styles.numberInput}
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                max="1000"
                                disabled={loading}
                                aria-label="Số lượng số cần tạo"
                                aria-describedby={error ? "error-message" : undefined}
                            />
                            <label htmlFor="mode-select" className={styles.srOnly}>
                                Chọn mức số
                            </label>
                            <select
                                id="mode-select"
                                className={styles.modeSelect}
                                value={generateMode || ''}
                                onChange={handleGenerateModeChange}
                                disabled={loading}
                                aria-label="Chọn mức số (1D, 2D, 3D, 4D)"
                            >
                                <option value="">Mức</option>
                                <option value="1D">1D</option>
                                <option value="2D">2D</option>
                                <option value="3D">3D</option>
                                <option value="4D">4D</option>
                            </select>

                            <button
                                onClick={handleClear}
                                className={`${styles.button} ${styles.dangerButton} ${deleteStatus ? styles.successButton : ''}`}
                                disabled={loading}
                                aria-label={deleteStatus ? 'Đã xóa tất cả' : 'Xóa tất cả dàn số'}
                            >
                                <span className={styles.buttonText}>
                                    {deleteStatus ? 'Đã Xóa!' : 'Xóa'}
                                </span>
                            </button>

                        </div>

                        <label htmlFor="input-textarea" className={styles.srOnly}>
                            Nhập các dàn số 2D, 3D, 4D
                        </label>
                        <textarea
                            id="input-textarea"
                            value={displayInput}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            placeholder="Nhập các dàn 2D,3D,4D hoặc bấm nút tạo ngẫu nhiên theo mức"
                            className={styles.inputTextarea}
                            disabled={loading}
                            inputMode="tel"
                            aria-label="Nhập các dàn số 2D, 3D, 4D"
                            aria-describedby={error ? "error-message" : undefined}
                        />
                        {error && (
                            <div 
                                id="error-message"
                                className={styles.errorMessage}
                                role="alert"
                                aria-live="polite"
                            >
                                {error}
                                {offlineMode && (
                                    <button
                                        onClick={handleRetryOnline}
                                        className={styles.retryButton}
                                        aria-label="Thử lại kết nối online"
                                    >
                                        Thử lại Online
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Results */}
                <div className={styles.rightColumn}>
                    <div className={styles.resultsSection}>
                        <div className={styles.resultsHeader}>
                            <div 
                                className={styles.tabGroup}
                                role="tablist"
                                aria-label="Chọn loại dàn số để xem"
                            >
                                <TabButton
                                    label="Tạo Mức 1D"
                                    isActive={viewMode === '1D'}
                                    onClick={handleViewMode1D}
                                />
                                <TabButton
                                    label="Tạo Mức 2D"
                                    isActive={viewMode === '2D'}
                                    onClick={handleViewMode2D}
                                />
                                <TabButton
                                    label="Tạo Mức 3D"
                                    isActive={viewMode === '3D'}
                                    onClick={handleViewMode3D}
                                />
                                <TabButton
                                    label="Tạo Mức 4D"
                                    isActive={viewMode === '4D'}
                                    onClick={handleViewMode4D}
                                />
                            </div>
                        </div>

                        <div className={styles.resultTextareaWrapper}>
                            <label htmlFor="result-textarea" className={styles.srOnly}>
                                Kết quả dàn số {viewMode || ''}
                            </label>
                            <textarea
                                id="result-textarea"
                                value={generateResultText}
                                readOnly
                                className={styles.resultTextarea}
                                placeholder={`- Tạo mức 1D: Tạo mức số cho các dàn càng
- Tạo mức 2D: Tạo mức số cho các dàn 2D(các cặp số có thể gộp lại, ví dụ: 12,21=121)
- Tạo mức 3D,4D: Tạo mức số cho các dàn 3-4D`}
                                aria-label={`Kết quả dàn số ${viewMode || ''}`}
                                aria-live="polite"
                            />
                            <div className={styles.copyButtonContainer}>
                                {/* Dùng viewMode hoặc lastActiveViewMode để hiển thị nút copy đúng */}
                                {(viewMode === '2D' || lastActiveViewMode === '2D') && (
                                    <button
                                        onClick={handleCopy2D}
                                        className={`${styles.copyButton} ${copy2DStatus ? styles.successButton : ''}`}
                                        disabled={!generateResultText.trim() || loading}
                                        aria-label={copy2DStatus ? 'Đã sao chép dàn 2D' : 'Sao chép dàn 2D'}
                                        aria-pressed={copy2DStatus}
                                    >
                                        {copy2DStatus ? <IconCheck size={16} aria-hidden="true" /> : <IconCopy size={16} aria-hidden="true" />}
                                        <span className={styles.copyButtonText}>Copy</span>
                                    </button>
                                )}

                                {(viewMode === '1D' || lastActiveViewMode === '1D') && (
                                    <button
                                        onClick={handleCopy1D}
                                        className={`${styles.copyButton} ${copy1DStatus ? styles.successButton : ''}`}
                                        disabled={!generateResultText.trim() || loading}
                                        aria-label={copy1DStatus ? 'Đã sao chép dàn 1D' : 'Sao chép dàn 1D'}
                                        aria-pressed={copy1DStatus}
                                    >
                                        {copy1DStatus ? <IconCheck size={16} aria-hidden="true" /> : <IconCopy size={16} aria-hidden="true" />}
                                        <span className={styles.copyButtonText}>Copy</span>
                                    </button>
                                )}

                                {(viewMode === '3D' || lastActiveViewMode === '3D') && (
                                    <button
                                        onClick={handleCopy3D}
                                        className={`${styles.copyButton} ${copy3DStatus ? styles.successButton : ''}`}
                                        disabled={!generateResultText.trim() || loading}
                                        aria-label={copy3DStatus ? 'Đã sao chép dàn 3D' : 'Sao chép dàn 3D'}
                                        aria-pressed={copy3DStatus}
                                    >
                                        {copy3DStatus ? <IconCheck size={16} aria-hidden="true" /> : <IconCopy size={16} aria-hidden="true" />}
                                        <span className={styles.copyButtonText}>Copy</span>
                                    </button>
                                )}

                                {(viewMode === '4D' || lastActiveViewMode === '4D') && (
                                    <button
                                        onClick={handleCopy4D}
                                        className={`${styles.copyButton} ${copy4DStatus ? styles.successButton : ''}`}
                                        disabled={!generateResultText.trim() || loading}
                                        aria-label={copy4DStatus ? 'Đã sao chép dàn 4D' : 'Sao chép dàn 4D'}
                                        aria-pressed={copy4DStatus}
                                    >
                                        {copy4DStatus ? <IconCheck size={16} aria-hidden="true" /> : <IconCopy size={16} aria-hidden="true" />}
                                        <span className={styles.copyButtonText}>Copy</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal */}
            {showModal && (
                <div 
                    className={styles.modalOverlay} 
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-message"
                >
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <p id="modal-message" className={styles.modalMessage} role="alert">{modalMessage}</p>
                        <button 
                            onClick={closeModal} 
                            className={styles.modalButton}
                            aria-label="Đóng hộp thoại"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

// ✅ PERFORMANCE: Export memoized component to prevent unnecessary re-renders
export default memo(Dan2DGenerator);
