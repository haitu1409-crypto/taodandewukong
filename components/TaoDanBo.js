/**
 * TaoDanBo Component
 * Tạo dàn đặc biệt theo bộ (kép)
 * ✅ PERFORMANCE: Optimized with memo, useCallback, useMemo for best render performance
 */

import { useState, useCallback, useMemo, memo, useTransition, useDeferredValue } from 'react';
import styles from '../styles/DanDacBiet.module.css';
import { getAllSpecialSets, getCombinedSpecialSetNumbers } from '../utils/specialSets';

const TaoDanBo = memo(function TaoDanBo() {
    const [selectedSpecialSets, setSelectedSpecialSets] = useState([]);
    const [tongInput, setTongInput] = useState('');
    const [themInput, setThemInput] = useState('');
    const [boInput, setBoInput] = useState('');
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // ✅ PERFORMANCE: Use transition for non-urgent updates to prevent blocking UI
    const [isPending, startTransitionFn] = useTransition();

    // ✅ PERFORMANCE: Memoize special sets data - only compute once
    const specialSetsData = useMemo(() => getAllSpecialSets(), []);

    // ✅ PERFORMANCE: Memoize utility functions to prevent recreation
    const calculateSum = useCallback((number) => {
        return number.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }, []);

    // ✅ PERFORMANCE: Memoize filter function
    const filterBySum = useCallback((numbers, targetSum) => {
        if (!targetSum || targetSum.trim() === '') return numbers;

        const sums = targetSum.split(',').map(s => s.trim()).filter(s => s !== '');
        if (sums.length === 0) return numbers;

        return numbers.filter(number => {
            const sum = calculateSum(number);
            return sums.some(targetSumStr => {
                const target = parseInt(targetSumStr);
                return sum === target || sum === (target + 10);
            });
        });
    }, [calculateSum]);

    // ✅ PERFORMANCE: Memoize parse function
    const parseInputNumbers = useCallback((input) => {
        if (!input || input.trim() === '') return [];
        return input
            .replace(/[;,\s]+/g, ',')
            .replace(/,+/g, ',')
            .replace(/^,|,$/g, '')
            .split(',')
            .map(n => n.trim())
            .filter(n => n !== '' && /^\d{2}$/.test(n) && parseInt(n) <= 99)
            .map(n => n.padStart(2, '0'));
    }, []);

    // ✅ PERFORMANCE: Memoize parsed input values (only for them and bo, tong uses filterBySum)
    const parsedThemInput = useMemo(() => parseInputNumbers(themInput), [themInput, parseInputNumbers]);
    const parsedBoInput = useMemo(() => parseInputNumbers(boInput), [boInput, parseInputNumbers]);

    // ✅ PERFORMANCE: Use deferred values for input to reduce re-renders
    const deferredTongInput = useDeferredValue(tongInput);
    const deferredThemInput = useDeferredValue(themInput);
    const deferredBoInput = useDeferredValue(boInput);

    // ✅ PERFORMANCE: Handler cho chọn/bỏ chọn bộ số đặc biệt - memoized
    const handleSpecialSetToggle = useCallback((setId) => {
        setSelectedSpecialSets(prev => {
            if (prev.includes(setId)) {
                return prev.filter(id => id !== setId);
            } else if (prev.length < 5) {
                return [...prev, setId];
            }
            return prev;
        });
    }, []);

    // ✅ PERFORMANCE: Memoize generation function
    const generateDanBo = useCallback(() => {
        // Bước 1: Lấy tất cả số từ các bộ đã chọn
        let resultNumbers = [];

        selectedSpecialSets.forEach(setId => {
            const setNumbers = getCombinedSpecialSetNumbers([setId]);
            resultNumbers = [...resultNumbers, ...setNumbers];
        });

        // Loại bỏ trùng lặp
        resultNumbers = [...new Set(resultNumbers)];

        // Bước 2: Lọc theo tổng (nếu có)
        if (deferredTongInput.trim()) {
            resultNumbers = filterBySum(resultNumbers, deferredTongInput);
        }

        // Bước 3: Thêm số (nếu có)
        if (deferredThemInput.trim()) {
            resultNumbers = [...resultNumbers, ...parsedThemInput];
            // Loại bỏ trùng lặp sau khi thêm
            resultNumbers = [...new Set(resultNumbers)];
        }

        // Bước 4: Bỏ số (nếu có)
        if (deferredBoInput.trim()) {
            resultNumbers = resultNumbers.filter(num => !parsedBoInput.includes(num));
        }

        // Sắp xếp kết quả
        resultNumbers.sort((a, b) => parseInt(a) - parseInt(b));

        return resultNumbers;
    }, [selectedSpecialSets, deferredTongInput, deferredThemInput, deferredBoInput, parsedThemInput, parsedBoInput, filterBySum]);

    // ✅ PERFORMANCE: Memoize handlers to prevent recreation
    const handleTaoDan = useCallback(() => {
        if (selectedSpecialSets.length === 0) {
            setModalMessage('Vui lòng chọn ít nhất một bộ số đặc biệt');
            setShowModal(true);
            return;
        }

        setLoading(true);

        // Use startTransition for non-urgent computation
        startTransitionFn(() => {
            try {
                // Sử dụng logic client-side thay vì gọi API
                const result = generateDanBo();
                setResult(result);

                if (result.length === 0) {
                    setModalMessage('Không có số nào phù hợp với các tiêu chí đã chọn');
                    setShowModal(true);
                }
            } catch (error) {
                console.error('Error generating dan bo:', error);
                setModalMessage('Lỗi khi tạo dàn số');
                setShowModal(true);
            } finally {
                setLoading(false);
            }
        });
    }, [selectedSpecialSets, generateDanBo, startTransitionFn]);

    const handleLamLai = useCallback(() => {
        setSelectedSpecialSets([]);
        setTongInput('');
        setThemInput('');
        setBoInput('');
        setResult([]);
    }, []);

    const handleCopy = useCallback(() => {
        if (result.length === 0) {
            setModalMessage('Chưa có dàn số để copy');
            setShowModal(true);
            return;
        }

        const copyText = `DÀN BỘ (${result.length} số)\n${'='.repeat(30)}\n${result.join(',')}`;

        navigator.clipboard.writeText(copyText).then(() => {
            setModalMessage('Đã copy dàn số thành công!');
            setShowModal(true);
        }).catch(() => {
            setModalMessage('Lỗi khi sao chép');
            setShowModal(true);
        });
    }, [result]);

    const closeModal = useCallback(() => {
        setShowModal(false);
        setModalMessage('');
    }, []);

    // ✅ PERFORMANCE: Memoize input handlers
    const handleTongInputChange = useCallback((e) => {
        setTongInput(e.target.value);
    }, []);

    const handleThemInputChange = useCallback((e) => {
        setThemInput(e.target.value);
    }, []);

    const handleBoInputChange = useCallback((e) => {
        setBoInput(e.target.value);
    }, []);

    // ✅ PERFORMANCE: Memoize selected sets text
    const selectedSpecialSetsText = useMemo(() => {
        if (selectedSpecialSets.length === 0) return '';
        return selectedSpecialSets.map(id => `Bộ ${id}`).join(', ');
    }, [selectedSpecialSets]);

    // ✅ PERFORMANCE: Memoize combined numbers for display
    const combinedNumbers = useMemo(() => {
        if (selectedSpecialSets.length === 0) return [];
        return getCombinedSpecialSetNumbers(selectedSpecialSets);
    }, [selectedSpecialSets]);

    // Tạo nội dung textarea từ kết quả
    const generateTextareaContent = useMemo(() => {
        if (result.length === 0) {
            return "Chưa có dàn số nào. Nhấn \"Tạo Dàn\" để bắt đầu.";
        }

        const content = [];

        // Tiêu đề
        content.push(`DÀN BỘ (${result.length} số)`);
        content.push('='.repeat(30));
        content.push(result.join(','));

        return content.join('\n');
    }, [result]);

    return (
        <div className={styles.toolContainer}>
            <div className={styles.twoColumnLayout}>
                {/* Left Column: Inputs and Controls */}
                <div className={styles.leftColumn}>
                    <div className={styles.inputsSection}>
                        {/* Special Sets Selection */}
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>
                                Chọn Bộ Số Đặc Biệt * (tối đa 5 bộ)
                            </label>
                            <div className={styles.specialSetsContainer}>
                                <div className={styles.specialSetsList}>
                                    {specialSetsData.map(set => {
                                        const isSelected = selectedSpecialSets.includes(set.id);
                                        const isDisabled = selectedSpecialSets.length >= 5 && !isSelected;
                                        return (
                                            <div
                                                key={set.id}
                                                className={`${styles.specialSetItem} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
                                                onClick={() => !loading && !isPending && handleSpecialSetToggle(set.id)}
                                                title={`Bộ ${set.id}: ${set.numbers.join(', ')}`}
                                            >
                                                <div className={styles.specialSetHeader}>
                                                    <span className={styles.specialSetId}>Bộ {set.id}</span>
                                                    <span className={styles.specialSetCount}>({set.count} số)</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {selectedSpecialSets.length > 0 && (
                                <div className={styles.selectedSpecialSets}>
                                    <strong>Đã chọn:</strong> {selectedSpecialSetsText}
                                </div>
                            )}
                        </div>

                        {/* Additional Options */}
                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Tổng</label>
                                <input
                                    type="text"
                                    value={tongInput}
                                    onChange={handleTongInputChange}
                                    placeholder="Ví dụ: 5,7,9"
                                    className={styles.input}
                                    disabled={loading || isPending}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Thêm</label>
                                <input
                                    type="text"
                                    value={themInput}
                                    onChange={handleThemInputChange}
                                    placeholder="Ví dụ: 12,34,56"
                                    className={styles.input}
                                    disabled={loading || isPending}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>Bỏ</label>
                                <input
                                    type="text"
                                    value={boInput}
                                    onChange={handleBoInputChange}
                                    placeholder="Ví dụ: 1 (bỏ số chứa 1)"
                                    className={styles.input}
                                    disabled={loading || isPending}
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
                                    disabled={loading || isPending || selectedSpecialSets.length === 0}
                                >
                                    {loading || isPending ? 'Đang tạo...' : 'Tạo Dàn'}
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className={`${styles.button} ${styles.secondaryButton}`}
                                    disabled={loading || isPending || result.length === 0}
                                >
                                    Copy
                                </button>
                                <button
                                    onClick={handleLamLai}
                                    className={`${styles.button} ${styles.dangerButton}`}
                                    disabled={loading || isPending}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                        <textarea
                            className={styles.danBoTextarea}
                            value={generateTextareaContent}
                            readOnly
                            placeholder="Kết quả tạo dàn sẽ hiển thị ở đây..."
                            aria-label="Kết quả tạo dàn số"
                            tabIndex="-1"
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

TaoDanBo.displayName = 'TaoDanBo';

export default TaoDanBo;

