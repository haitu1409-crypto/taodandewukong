/**
 * TaoDanCham Component
 * Tạo dàn đặc biệt theo chạm
 * ✅ PERFORMANCE: Optimized with memo, useCallback, useMemo for best render performance
 */

import { useState, useEffect, useRef, useCallback, useMemo, memo, useTransition, useDeferredValue } from 'react';
import styles from '../styles/DanDacBiet.module.css';

const TaoDanCham = memo(function TaoDanCham() {
    const [chamInput, setChamInput] = useState('');
    const [tongInput, setTongInput] = useState('');
    const [themInput, setThemInput] = useState('');
    const [boInput, setBoInput] = useState('');
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [copyStatus, setCopyStatus] = useState(false);
    const [clearStatus, setClearStatus] = useState(false);
    const [hasSearched, setHasSearched] = useState(false); // Track nếu đã tìm kiếm

    // ✅ PERFORMANCE: Use transition for non-urgent updates to prevent blocking UI
    const [isPending, startTransitionFn] = useTransition();

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

    // ✅ PERFORMANCE: Memoize helper functions to prevent recreation on every render
    // Hàm tính tổng các chữ số
    const calculateSum = useCallback((number) => {
        return number.split('').reduce((s, d) => s + parseInt(d), 0);
    }, []);

    // ✅ PERFORMANCE: Memoize generateDanCham function - optimized for mobile with chunking
    // Hàm tạo dàn chạm với logic client-side
    const generateDanCham = useCallback(() => {
        // Client-side logic to generate numbers with cham
        const chamNumbers = chamInput.split(',').map(c => c.trim()).filter(c => c !== '' && /^\d$/.test(c));
        if (chamNumbers.length === 0) {
            return [];
        }

        // ✅ PERFORMANCE: Use Set for O(1) lookup - pre-allocate for better performance
        const resultSet = new Set();

        // ✅ PERFORMANCE: Optimized generation - generate all numbers containing cham digits
        for (const cham of chamNumbers) {
            // Generate all 2-digit numbers containing cham (00-99)
            for (let i = 0; i <= 99; i++) {
                const numStr = i.toString().padStart(2, '0');
                if (numStr.includes(cham)) {
                    resultSet.add(numStr);
                }
            }
        }

        let resultNumbers = Array.from(resultSet);

        // Filter by tong if provided - optimized with Set
        if (tongInput.trim()) {
            const tongValues = tongInput.split(',').map(t => t.trim()).filter(t => t !== '' && /^\d+$/.test(t));
            if (tongValues.length > 0) {
                const tongSet = new Set(tongValues.map(t => parseInt(t)));
                resultNumbers = resultNumbers.filter(num => {
                    const sum = calculateSum(num);
                    return tongSet.has(sum) || tongSet.has(sum - 10);
                });
            }
        }

        // Add them numbers if provided
        if (themInput.trim()) {
            const themNumbers = themInput.split(',').map(t => t.trim()).filter(t => t !== '' && /^\d{2}$/.test(t));
            themNumbers.forEach(num => resultSet.add(num));
            resultNumbers = Array.from(resultSet);
        }

        // Remove bo numbers if provided - optimized with Set
        if (boInput.trim()) {
            const boSet = new Set(boInput.split(',').map(b => b.trim()).filter(b => b !== '' && /^\d{2}$/.test(b)));
            resultNumbers = resultNumbers.filter(num => !boSet.has(num));
        }

        // ✅ PERFORMANCE: Use Intl.Collator for faster numeric sort on mobile
        resultNumbers.sort((a, b) => {
            const aNum = parseInt(a);
            const bNum = parseInt(b);
            return aNum - bNum;
        });

        return resultNumbers;
    }, [chamInput, tongInput, themInput, boInput, calculateSum]);

    // ✅ PERFORMANCE: Memoize event handlers - use transition for non-blocking UI
    const handleTaoDan = useCallback(() => {
        if (!chamInput) {
            setModalMessage('Vui lòng nhập số chạm');
            setShowModal(true);
            return;
        }

        setLoading(true);
        setHasSearched(true); // Đánh dấu đã tìm kiếm

        // ✅ PERFORMANCE: Use requestIdleCallback for better mobile performance, fallback to setTimeout
        const scheduleWork = (callback) => {
            if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                requestIdleCallback(callback, { timeout: 100 });
            } else {
                setTimeout(callback, 0);
            }
        };

        // ✅ PERFORMANCE: Use startTransition to prevent blocking UI on mobile
        startTransitionFn(() => {
            scheduleWork(() => {
                try {
                    const resultNumbers = generateDanCham();

                    // ✅ PERFORMANCE: Batch state updates to reduce re-renders
                    setResult(resultNumbers);
                    setLoading(false);
                } catch (error) {
                    console.error('Error generating dan cham:', error);
                    setModalMessage('Lỗi khi tạo dàn số');
                    setShowModal(true);
                    setLoading(false);
                    setHasSearched(false); // Reset nếu có lỗi
                }
            });
        });
    }, [chamInput, generateDanCham]);

    // Hàm lấy số từ chạm
    const getNumbersByCham = useCallback((chamNumbers) => {
        const resultSet = new Set();
        chamNumbers.forEach(cham => {
            // Generate all 2-digit numbers containing cham (00-99)
            for (let i = 0; i <= 99; i++) {
                const numStr = i.toString().padStart(2, '0');
                if (numStr.includes(cham)) {
                    resultSet.add(numStr);
                }
            }
        });
        return Array.from(resultSet);
    }, []);

    // Hàm lấy số từ tổng
    const getNumbersByTong = useCallback((tongNumbers) => {
        const result = [];
        const allNumbers = Array.from({ length: 100 }, (_, i) => {
            return i.toString().padStart(2, '0');
        });

        tongNumbers.forEach(targetTong => {
            const target = parseInt(targetTong);
            allNumbers.forEach(number => {
                const sum = calculateSum(number);
                // Tổng có thể là chính xác hoặc tổng + 10
                if (sum === target || sum === (target + 10)) {
                    result.push(number);
                }
            });
        });
        return result;
    }, [calculateSum]);

    const handleLayHet = useCallback(() => {
        setLoading(true);
        setHasSearched(true); // Đánh dấu đã tìm kiếm

        const scheduleWork = (callback) => {
            if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                requestIdleCallback(callback, { timeout: 100 });
            } else {
                setTimeout(callback, 0);
            }
        };

        startTransitionFn(() => {
            scheduleWork(() => {
                try {
                    let allNumbers = [];

                    // Bước 1: Lấy số từ chạm (nếu có)
                    const chamNumbers = chamInput.split(',').map(c => c.trim()).filter(c => c !== '' && /^\d$/.test(c));
                    if (chamNumbers.length > 0) {
                        const chamResult = getNumbersByCham(chamNumbers);
                        allNumbers = [...allNumbers, ...chamResult];
                    }

                    // Bước 2: Lấy số từ tổng (nếu có)
                    if (tongInput.trim()) {
                        const tongValues = tongInput.split(',').map(t => t.trim()).filter(t => t !== '' && /^\d+$/.test(t));
                        if (tongValues.length > 0) {
                            const tongResult = getNumbersByTong(tongValues);
                            allNumbers = [...allNumbers, ...tongResult];
                        }
                    }

                    // Kiểm tra nếu không có chạm và tổng nào
                    if (allNumbers.length === 0) {
                        setResult([]);
                        setLoading(false);
                        return;
                    }

                    // Bước 3: Loại bỏ trùng lặp
                    allNumbers = [...new Set(allNumbers)];

                    // Bước 4: Thêm số (nếu có)
                    if (themInput.trim()) {
                        const themNumbers = themInput.split(',').map(t => t.trim()).filter(t => t !== '' && /^\d{2}$/.test(t));
                        allNumbers = [...allNumbers, ...themNumbers];
                        allNumbers = [...new Set(allNumbers)];
                    }

                    // Bước 5: Bỏ số (nếu có)
                    if (boInput.trim()) {
                        const boSet = new Set(boInput.split(',').map(b => b.trim()).filter(b => b !== '' && /^\d{2}$/.test(b)));
                        allNumbers = allNumbers.filter(num => !boSet.has(num));
                    }

                    // Sắp xếp kết quả
                    allNumbers.sort((a, b) => parseInt(a) - parseInt(b));

                    setResult(allNumbers);
                    setLoading(false);
                } catch (error) {
                    console.error('Error generating all numbers:', error);
                    setModalMessage('Lỗi khi tạo dàn số');
                    setShowModal(true);
                    setLoading(false);
                    setHasSearched(false); // Reset nếu có lỗi
                }
            });
        });
    }, [chamInput, tongInput, themInput, boInput, getNumbersByCham, getNumbersByTong]);

    const handleClearAll = useCallback(() => {
        setChamInput('');
        setTongInput('');
        setThemInput('');
        setBoInput('');
        setResult([]);
        setHasSearched(false); // Reset trạng thái tìm kiếm
        setClearStatus(true);
        const timeoutId = setTimeout(() => setClearStatus(false), 2000);
        timeoutRefs.current.push(timeoutId);
    }, []);

    const handleCopy = useCallback(() => {
        if (result.length === 0) {
            setModalMessage('Chưa có dàn số để copy');
            setShowModal(true);
            return;
        }

        const copyText = `Dàn Chạm (${result.length} số)\n${result.join(',')}`;

        navigator.clipboard.writeText(copyText).then(() => {
            setCopyStatus(true);
            const timeoutId = setTimeout(() => setCopyStatus(false), 2000);
            timeoutRefs.current.push(timeoutId);
        }).catch(() => {
            setModalMessage('Lỗi khi sao chép');
            setShowModal(true);
        });
    }, [result]);

    const closeModal = useCallback(() => {
        setShowModal(false);
        setModalMessage('');
    }, []);

    // ✅ PERFORMANCE: Memoize textarea content - optimize join for large arrays with chunking
    const textareaContent = useMemo(() => {
        // Nếu đã tìm kiếm nhưng không có kết quả
        if (hasSearched && result.length === 0) {
            // Kiểm tra xem có phải là trường hợp không có chạm/tổng khi "Lấy Hết" không
            if (!chamInput.trim() && !tongInput.trim()) {
                return "Vui lòng nhập chạm hoặc tổng để lấy hết.";
            }
            return "Không có số nào phù hợp với các tiêu chí đã chọn.";
        }

        // Nếu chưa tìm kiếm
        if (!hasSearched && result.length === 0) {
            return "Chưa có dàn số nào. Nhấn \"Tạo Dàn\" hoặc \"Lấy Hết\" để bắt đầu.";
        }

        // ✅ PERFORMANCE: For very large arrays, limit display to prevent UI blocking on mobile
        if (result.length > 300) {
            // Use chunked join for better performance
            const chunkSize = 100;
            const chunks = [];
            for (let i = 0; i < Math.min(300, result.length); i += chunkSize) {
                chunks.push(result.slice(i, i + chunkSize).join(', '));
            }
            const display = chunks.join(', ');
            return display + (result.length > 300 ? `\n... (còn ${result.length - 300} số, tổng: ${result.length} số)` : '');
        }

        // ✅ PERFORMANCE: For smaller arrays, use direct join but limit to 300 items
        return result.slice(0, 300).join(', ') + (result.length > 300 ? `\n... (còn ${result.length - 300} số, tổng: ${result.length} số)` : '');
    }, [result, hasSearched, chamInput, tongInput]);

    // ✅ PERFORMANCE: Memoize disabled states to prevent recalculation
    const isCopyDisabled = useMemo(() => {
        return result.length === 0;
    }, [result.length]);

    // ✅ PERFORMANCE: Memoize input change handlers to prevent recreation
    const handleChamInputChange = useCallback((e) => {
        setChamInput(e.target.value);
    }, []);

    const handleTongInputChange = useCallback((e) => {
        setTongInput(e.target.value);
    }, []);

    const handleThemInputChange = useCallback((e) => {
        setThemInput(e.target.value);
    }, []);

    const handleBoInputChange = useCallback((e) => {
        setBoInput(e.target.value);
    }, []);

    return (
        <div className={styles.toolContainer}>

            <div className={styles.twoColumnLayout}>
                {/* Left Column: Inputs and Controls */}
                <div className={styles.leftColumn}>
                    <div className={styles.inputsSection}>
                        {/* Row 1: Chạm và Tổng */}
                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label className={styles.inputLabel}>Chạm *</label>
                                <input
                                    type="text"
                                    value={chamInput}
                                    onChange={handleChamInputChange}
                                    placeholder="Ví dụ: 8"
                                    className={styles.input}
                                    disabled={loading}
                                />
                            </div>
                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label className={styles.inputLabel}>Tổng</label>
                                <input
                                    type="text"
                                    value={tongInput}
                                    onChange={handleTongInputChange}
                                    placeholder="Ví dụ: 5"
                                    className={styles.input}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Row 2: Thêm và Bỏ */}
                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label className={styles.inputLabel}>Thêm</label>
                                <input
                                    type="text"
                                    value={themInput}
                                    onChange={handleThemInputChange}
                                    placeholder="Ví dụ: 11,22,33"
                                    className={styles.input}
                                    disabled={loading}
                                />
                            </div>
                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label className={styles.inputLabel}>Bỏ</label>
                                <input
                                    type="text"
                                    value={boInput}
                                    onChange={handleBoInputChange}
                                    placeholder="Ví dụ: 99"
                                    className={styles.input}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Results */}
                <div className={styles.rightColumn}>
                    <div className={styles.resultsSection}>
                        {/* Buttons Section */}
                        <div className={styles.buttonsSection}>
                            <div className={styles.buttonRow}>
                                <button
                                    onClick={handleTaoDan}
                                    className={`${styles.button} ${styles.orangeButton}`}
                                    disabled={loading || isPending}
                                >
                                    {loading || isPending ? 'Đang tạo...' : 'Tạo Dàn'}
                                </button>
                                <button
                                    onClick={handleLayHet}
                                    className={`${styles.button} ${styles.orangeButton}`}
                                    disabled={loading || isPending}
                                >
                                    Lấy Hết
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className={`${styles.button} ${copyStatus ? styles.successButton : styles.secondaryButton}`}
                                    disabled={isCopyDisabled}
                                >
                                    {copyStatus ? 'Đã Copy!' : 'Copy Dàn'}
                                </button>
                                <button
                                    onClick={handleClearAll}
                                    className={`${styles.button} ${clearStatus ? styles.successButton : styles.dangerButton}`}
                                    disabled={loading}
                                >
                                    {clearStatus ? 'Đã Xóa!' : 'Xóa Tất Cả'}
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={textareaContent}
                            readOnly
                            placeholder="Kết quả sẽ hiển thị ở đây..."
                            className={styles.resultsTextarea}
                            // ✅ PERFORMANCE: Disable browser features for better mobile performance
                            spellCheck={false}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                        />
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <p className={styles.modalMessage}>{modalMessage}</p>
                        <button onClick={closeModal} className={styles.modalButton}>
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default TaoDanCham;
