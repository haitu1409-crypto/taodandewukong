/**
 * TaoDanCham Component
 * Tạo dàn đặc biệt theo chạm
 * ✅ PERFORMANCE: Optimized with memo, useCallback, useMemo for best render performance
 */

import { useState, useEffect, useRef, useCallback, useMemo, memo, useTransition, startTransition } from 'react';
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

    // ✅ PERFORMANCE: Memoize generateDanCham function - optimized for mobile
    // Hàm tạo dàn chạm với logic client-side
    const generateDanCham = useCallback(() => {
        // Client-side logic to generate numbers with cham
        const chamNumbers = chamInput.split(',').map(c => c.trim()).filter(c => c !== '' && /^\d$/.test(c));
        if (chamNumbers.length === 0) {
            return [];
        }

        // ✅ PERFORMANCE: Use Set for O(1) lookup instead of array
        const resultSet = new Set();

        // Generate numbers containing cham digits - optimized loop
        for (const cham of chamNumbers) {
            // Generate numbers with cham digit
            for (let i = 0; i <= 9; i++) {
                resultSet.add(cham + i.toString().padStart(1, '0'));
            }
            for (let i = 0; i <= 9; i++) {
                resultSet.add(i.toString() + cham);
            }
        }

        let resultNumbers = Array.from(resultSet);

        // Filter by tong if provided
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

        // Remove bo numbers if provided
        if (boInput.trim()) {
            const boSet = new Set(boInput.split(',').map(b => b.trim()).filter(b => b !== '' && /^\d{2}$/.test(b)));
            resultNumbers = resultNumbers.filter(num => !boSet.has(num));
        }

        // Sort result - use numeric sort for better performance
        resultNumbers.sort((a, b) => parseInt(a) - parseInt(b));

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

        // ✅ PERFORMANCE: Use startTransition to prevent blocking UI on mobile
        startTransitionFn(() => {
            try {
                const resultNumbers = generateDanCham();

                if (resultNumbers.length === 0) {
                    setModalMessage('Vui lòng nhập số chạm hợp lệ');
                    setShowModal(true);
                    setLoading(false);
                    return;
                }

                // Use setTimeout to yield to browser for better mobile performance
                setTimeout(() => {
                    setResult(resultNumbers);
                    setLoading(false);

                    if (resultNumbers.length === 0) {
                        setModalMessage('Không có số nào phù hợp với các tiêu chí đã chọn');
                        setShowModal(true);
                    }
                }, 0);
            } catch (error) {
                console.error('Error generating dan cham:', error);
                setModalMessage('Lỗi khi tạo dàn số');
                setShowModal(true);
                setLoading(false);
            }
        });
    }, [chamInput, generateDanCham]);

    const handleClearAll = useCallback(() => {
        setChamInput('');
        setTongInput('');
        setThemInput('');
        setBoInput('');
        setResult([]);
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

    // ✅ PERFORMANCE: Memoize textarea content - optimize join for large arrays
    const textareaContent = useMemo(() => {
        if (result.length === 0) return '';
        // ✅ PERFORMANCE: For large arrays, use more efficient join
        // Limit display to prevent UI blocking on mobile
        if (result.length > 500) {
            return result.slice(0, 500).join(', ') + `\n... (còn ${result.length - 500} số, tổng: ${result.length} số)`;
        }
        return result.join(', ');
    }, [result]);

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
