/**
 * TaoDanCham Component
 * Tạo dàn đặc biệt theo chạm
 * ✅ PERFORMANCE: Optimized with memo, useCallback, useMemo for best render performance
 */

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
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

    // ✅ PERFORMANCE: Memoize generateDanCham function
    // Hàm tạo dàn chạm với logic client-side
    const generateDanCham = useCallback(() => {
        // Client-side logic to generate numbers with cham
        const chamNumbers = chamInput.split(',').map(c => c.trim()).filter(c => c !== '' && /^\d$/.test(c));
        if (chamNumbers.length === 0) {
            return [];
        }

        let resultNumbers = [];

        // Generate numbers containing cham digits
        chamNumbers.forEach(cham => {
            for (let i = 0; i <= 99; i++) {
                const numStr = i.toString().padStart(2, '0');
                if (numStr.includes(cham)) {
                    resultNumbers.push(numStr);
                }
            }
        });

        // Remove duplicates
        resultNumbers = [...new Set(resultNumbers)];

        // Filter by tong if provided
        if (tongInput.trim()) {
            const tongValues = tongInput.split(',').map(t => t.trim()).filter(t => t !== '' && /^\d+$/.test(t));
            if (tongValues.length > 0) {
                resultNumbers = resultNumbers.filter(num => {
                    const sum = calculateSum(num);
                    return tongValues.some(t => {
                        const targetTong = parseInt(t);
                        return sum === targetTong || sum === (targetTong + 10);
                    });
                });
            }
        }

        // Add them numbers if provided
        if (themInput.trim()) {
            const themNumbers = themInput.split(',').map(t => t.trim()).filter(t => t !== '' && /^\d{2}$/.test(t));
            resultNumbers = [...resultNumbers, ...themNumbers];
            resultNumbers = [...new Set(resultNumbers)];
        }

        // Remove bo numbers if provided
        if (boInput.trim()) {
            const boNumbers = boInput.split(',').map(b => b.trim()).filter(b => b !== '' && /^\d{2}$/.test(b));
            resultNumbers = resultNumbers.filter(num => !boNumbers.includes(num));
        }

        // Sort result
        resultNumbers.sort((a, b) => parseInt(a) - parseInt(b));

        return resultNumbers;
    }, [chamInput, tongInput, themInput, boInput, calculateSum]);

    // ✅ PERFORMANCE: Memoize event handlers to prevent recreation on every render
    const handleTaoDan = useCallback(() => {
        if (!chamInput) {
            setModalMessage('Vui lòng nhập số chạm');
            setShowModal(true);
            return;
        }

        setLoading(true);

        try {
            const resultNumbers = generateDanCham();

            if (resultNumbers.length === 0) {
                setModalMessage('Vui lòng nhập số chạm hợp lệ');
                setShowModal(true);
                setLoading(false);
                return;
            }

            setResult(resultNumbers);

            if (resultNumbers.length === 0) {
                setModalMessage('Không có số nào phù hợp với các tiêu chí đã chọn');
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error generating dan cham:', error);
            setModalMessage('Lỗi khi tạo dàn số');
            setShowModal(true);
        } finally {
            setLoading(false);
        }
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

    // ✅ PERFORMANCE: Memoize textarea content to prevent recalculation
    const textareaContent = useMemo(() => {
        return result.length > 0 ? result.join(', ') : '';
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
                                    disabled={loading}
                                >
                                    Tạo Dàn
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
