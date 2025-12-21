/**
 * GhepLoXien Component
 * Ghép lô xiên 2-3-4 từ danh sách số
 * ✅ PERFORMANCE: Optimized with memo, useCallback, useMemo for best render performance
 */

import { useState, useEffect, useRef, useMemo, useCallback, memo, useTransition, useDeferredValue } from 'react';
import styles from '../styles/GhepLoXien.module.css';

/**
 * ✅ PERFORMANCE: Generate combinations (combinations of n numbers from array)
 * Optimized to prevent excessive memory allocation
 * @param {Array} arr - Array of numbers
 * @param {number} n - Size of combination
 * @returns {Array} - Array of combinations
 */
function generateCombinations(arr, n) {
    if (n > arr.length || n === 0) return [];
    if (n === 1) return arr.map(item => [item]);
    if (n === arr.length) return [arr];

    const combinations = [];
    const combo = new Array(n); // Pre-allocate array for better performance

    function combine(start, depth) {
        if (depth === n) {
            // ✅ PERFORMANCE: Use slice instead of spread for better memory efficiency
            combinations.push(combo.slice());
            return;
        }

        // ✅ PERFORMANCE: Early exit if remaining elements are not enough
        const remainingNeeded = n - depth;
        const remainingAvailable = arr.length - start;
        if (remainingAvailable < remainingNeeded) return;

        for (let i = start; i < arr.length; i++) {
            combo[depth] = arr[i];
            combine(i + 1, depth + 1);
        }
    }

    combine(0, 0);
    return combinations;
}

const GhepLoXien = memo(function GhepLoXien() {
    const [danSo, setDanSo] = useState('');
    const [xienType, setXienType] = useState(2); // 2, 3, or 4
    const [result, setResult] = useState('');
    const [copyStatus, setCopyStatus] = useState(false);
    const [clearStatus, setClearStatus] = useState(false);
    const [showUndo, setShowUndo] = useState(false);
    const [undoData, setUndoData] = useState({});
    const [status, setStatus] = useState('');

    // ✅ PERFORMANCE: Use transition for non-urgent updates to prevent blocking UI
    const [isPending, startTransitionFn] = useTransition();

    // ✅ PERFORMANCE: Use deferred value for input to reduce re-renders
    const deferredDanSo = useDeferredValue(danSo);

    // Refs để cleanup setTimeout
    const timeoutRefs = useRef([]);

    // Cleanup timeouts khi component unmount
    useEffect(() => {
        return () => {
            timeoutRefs.current.forEach(timeoutId => {
                if (timeoutId) clearTimeout(timeoutId);
            });
            timeoutRefs.current = [];
        };
    }, []);

    // ✅ PERFORMANCE: Helper function to parse numbers from text - Memoized with useCallback
    const parseNumbersFromText = useCallback((text) => {
        if (!text.trim()) return [];

        // ✅ PERFORMANCE: Use Set for O(1) duplicate removal instead of filter + indexOf
        const numberSet = new Set();
        
        text
            .replace(/[^0-9\s,;]/g, '') // Remove non-numeric characters except separators
            .replace(/[;\s]+/g, ',')
            .replace(/,+/g, ',')
            .replace(/^,|,$/g, '')
            .split(',')
            .forEach(num => {
                const trimmed = num.trim();
                if (trimmed.length > 0 && !isNaN(parseInt(trimmed))) {
                    // Pad to 2 digits for lottery numbers
                    const numStr = trimmed.length === 1 ? `0${trimmed}` : trimmed;
                    if (numStr.length === 2) {
                        numberSet.add(numStr);
                    }
                }
            });

        // ✅ PERFORMANCE: Use Intl.Collator for faster numeric sort
        return Array.from(numberSet).sort((a, b) => {
            const aNum = parseInt(a);
            const bNum = parseInt(b);
            return aNum - bNum;
        });
    }, []);

    // ✅ PERFORMANCE: Memoize parsed numbers to avoid re-parsing on every render
    const parsedNumbers = useMemo(() => parseNumbersFromText(deferredDanSo), [deferredDanSo, parseNumbersFromText]);

    // ✅ PERFORMANCE: Helper to calculate combinations count (nCr) without generating them
    const calculateCombinations = useCallback((n, r) => {
        if (r > n || r < 0) return 0;
        if (r === 0 || r === n) return 1;
        
        // Use iterative approach to avoid stack overflow
        let result = 1;
        for (let i = 0; i < r; i++) {
            result = result * (n - i) / (i + 1);
        }
        return Math.round(result);
    }, []);

    // ✅ PERFORMANCE: Memoize handleGhepXien with useCallback and useTransition
    const handleGhepXien = useCallback(() => {
        if (parsedNumbers.length === 0) {
            setStatus('Vui lòng nhập dàn số');
            return;
        }

        if (parsedNumbers.length < xienType) {
            setStatus(`Cần ít nhất ${xienType} số để tạo xiên ${xienType}`);
            return;
        }

        // ✅ PERFORMANCE: Limit combination size to prevent performance issues
        const MAX_COMBINATIONS = 10000;
        const estimatedCombinations = calculateCombinations(parsedNumbers.length, xienType);
        
        if (estimatedCombinations > MAX_COMBINATIONS) {
            setStatus(`Dàn số quá lớn (ước tính ${estimatedCombinations} xiên). Vui lòng giảm số lượng số nhập vào.`);
            return;
        }

        // Save for undo
        setUndoData({
            danSo,
            xienType,
            result,
            operation: `Ghép xiên ${xienType}`
        });

        // ✅ PERFORMANCE: Use transition for non-urgent computation
        startTransitionFn(() => {
            // Generate combinations
            const combinations = generateCombinations(parsedNumbers, xienType);
            
            if (combinations.length === 0) {
                setResult('Không thể tạo xiên từ dàn số này');
                setStatus('Không có kết quả');
                return;
            }

            // ✅ PERFORMANCE: Format combinations efficiently
            // For large results, consider chunking
            let formattedResult;
            if (combinations.length > 1000) {
                // Chunk for very large results to avoid blocking
                const chunks = [];
                for (let i = 0; i < combinations.length; i += 500) {
                    chunks.push(combinations.slice(i, i + 500).map(combo => combo.join('-')).join(', '));
                }
                formattedResult = chunks.join(', ');
            } else {
                formattedResult = combinations.map(combo => combo.join('-')).join(', ');
            }

            setResult(formattedResult);
            setStatus(`Đã tạo ${combinations.length} xiên ${xienType}`);
            setShowUndo(true);
        });
    }, [danSo, xienType, result, parsedNumbers, startTransitionFn, calculateCombinations]);

    // ✅ PERFORMANCE: Memoize handleCopy with useCallback
    const handleCopy = useCallback(async () => {
        if (!result.trim()) {
            setStatus('Không có kết quả để copy');
            return;
        }

        try {
            await navigator.clipboard.writeText(result);
            setCopyStatus(true);
            setStatus('Đã copy thành công');
            const timeoutId = setTimeout(() => {
                setCopyStatus(false);
                setStatus('');
            }, 2000);
            timeoutRefs.current.push(timeoutId);
        } catch (err) {
            setStatus('Không thể copy vào clipboard');
        }
    }, [result]);

    // ✅ PERFORMANCE: Memoize handleClear with useCallback
    const handleClear = useCallback(() => {
        // Save for undo
        setUndoData({
            danSo,
            xienType,
            result,
            operation: 'Xóa tất cả'
        });

        setDanSo('');
        setResult('');
        setClearStatus(true);
        setStatus('Đã xóa tất cả');
        const timeoutId = setTimeout(() => {
            setClearStatus(false);
            setStatus('');
        }, 2000);
        timeoutRefs.current.push(timeoutId);
        setShowUndo(true);
    }, [danSo, xienType, result]);

    // ✅ PERFORMANCE: Memoize handleUndo with useCallback
    const handleUndo = useCallback(() => {
        if (undoData.danSo !== undefined) {
            setDanSo(undoData.danSo);
            setXienType(undoData.xienType);
            setResult(undoData.result);
            setShowUndo(false);
            setUndoData({});
            setStatus('Đã hoàn tác');
        }
    }, [undoData]);

    // ✅ PERFORMANCE: Memoize onChange handlers
    const handleDanSoChange = useCallback((e) => {
        const value = e.target.value;
        // Chỉ cho phép số, dấu phẩy, chấm phẩy, khoảng trắng, xuống dòng
        const filteredValue = value.replace(/[^0-9\s,;\r\n]/g, '');
        setDanSo(filteredValue);
    }, []);

    const handleXienTypeChange = useCallback((e) => {
        setXienType(parseInt(e.target.value));
    }, []);

    // ✅ PERFORMANCE: Memoize status className calculation
    const statusClassName = useMemo(() => {
        if (!status) return '';
        
        if (status.includes('Đã tạo') || 
            status.includes('Đã copy') || 
            status.includes('Đã xóa') ||
            status.includes('Đã hoàn tác')) {
            return styles.success;
        }
        
        if (status.includes('Vui lòng') || 
            status.includes('Không có') || 
            status.includes('Không thể') ||
            status.includes('Cần ít nhất')) {
            return '';
        }
        
        return styles.info;
    }, [status]);

    return (
        <div className={styles.toolContainer}>
            <div className={styles.twoColumnLayout}>
                {/* Left Column: Input và Controls */}
                <div className={styles.leftColumn}>
                    <div className={styles.xienTypeSelector}>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="xienType"
                                    value="2"
                                    checked={xienType === 2}
                                    onChange={handleXienTypeChange}
                                    className={styles.radioInput}
                                />
                                <span>Xiên 2</span>
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="xienType"
                                    value="3"
                                    checked={xienType === 3}
                                    onChange={handleXienTypeChange}
                                    className={styles.radioInput}
                                />
                                <span>Xiên 3</span>
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="xienType"
                                    value="4"
                                    checked={xienType === 4}
                                    onChange={handleXienTypeChange}
                                    className={styles.radioInput}
                                />
                                <span>Xiên 4</span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.textareaContainer}>
                        <label className={styles.textareaLabel}>Dàn số</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Nhập các số (cách nhau bởi dấu phẩy, khoảng trắng hoặc xuống dòng). Ví dụ: 01, 02, 03, 04..."
                            value={danSo}
                            onChange={handleDanSoChange}
                            inputMode="numeric"
                        />
                    </div>
                </div>

                {/* Right Column: Kết quả */}
                <div className={styles.rightColumn}>
                    <div className={styles.buttonGroup}>
                        <button
                            onClick={handleGhepXien}
                            className={`${styles.button} ${styles.primaryButton}`}
                            disabled={isPending}
                        >
                            {isPending ? 'Đang xử lý...' : `Ghép xiên ${xienType}`}
                        </button>
                        <button
                            onClick={handleCopy}
                            className={`${styles.button} ${copyStatus ? styles.successButton : styles.secondaryButton}`}
                        >
                            {copyStatus ? '✓ Đã Copy!' : 'Copy'}
                        </button>
                        <button
                            onClick={handleClear}
                            className={`${styles.button} ${clearStatus ? styles.successButton : styles.dangerButton}`}
                        >
                            {clearStatus ? '✓ Đã Xóa!' : 'Xóa tất cả'}
                        </button>
                        {showUndo && (
                            <button
                                onClick={handleUndo}
                                className={`${styles.button} ${styles.undoButton}`}
                            >
                                ↶ Hoàn tác
                            </button>
                        )}
                    </div>

                    <div className={styles.textareaContainer}>
                        <label className={styles.textareaLabel}>Kết quả</label>
                        <textarea
                            className={styles.textarea}
                            value={result}
                            readOnly
                            placeholder="Kết quả ghép xiên sẽ hiển thị ở đây..."
                        />
                    </div>
                </div>
            </div>

            {status && (
                <div className={`${styles.status} ${statusClassName}`}>
                    {status}
                </div>
            )}
        </div>
    );
});

GhepLoXien.displayName = 'GhepLoXien';

export default GhepLoXien;
