/**
 * TaoDanDauDuoi Component
 * Tạo dàn đặc biệt theo đầu-đuôi
 * ✅ PERFORMANCE: Optimized with memo, useCallback, useMemo for best render performance
 */

import { useState, useCallback, useMemo, memo } from 'react';
import styles from '../styles/DanDacBiet.module.css';

const TaoDanDauDuoi = memo(function TaoDanDauDuoi() {
    const [dauInput, setDauInput] = useState('');
    const [duoiInput, setDuoiInput] = useState('');
    const [tongInput, setTongInput] = useState('');
    const [themInput, setThemInput] = useState('');
    const [boInput, setBoInput] = useState('');
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [hasSearched, setHasSearched] = useState(false); // Track nếu đã tìm kiếm

    // ✅ PERFORMANCE: Memoize helper functions to prevent recreation on every render
    // Hàm parse input thành mảng số
    const parseInputNumbers = useCallback((input) => {
        if (!input || input.trim() === '') return [];
        return input
            .replace(/[;,\s]+/g, ',')
            .replace(/,+/g, ',')
            .replace(/^,|,$/g, '')
            .split(',')
            .map(n => n.trim())
            .filter(n => n !== '' && /^\d{1,2}$/.test(n) && parseInt(n) <= 99)
            .map(n => n.padStart(1, '0')); // Không pad thành 2 chữ số cho đầu/đuôi
    }, []);

    // Hàm tạo số từ đầu và đuôi
    const generateNumbersFromDauDuoi = useCallback((dauNumbers, duoiNumbers) => {
        const result = [];

        // Nếu có CẢ đầu VÀ đuôi: tạo tổ hợp (AND logic) - chỉ số có đầu X VÀ đuôi Y
        if (dauNumbers.length > 0 && duoiNumbers.length > 0) {
            dauNumbers.forEach(dau => {
                duoiNumbers.forEach(duoi => {
                    // Chỉ lấy chữ số cuối cùng để đảm bảo đúng format
                    const dauDigit = parseInt(dau) % 10;
                    const duoiDigit = parseInt(duoi) % 10;
                    const number = (dauDigit * 10 + duoiDigit).toString().padStart(2, '0');
                    result.push(number);
                });
            });
        } else {
            // Nếu chỉ có đầu HOẶC chỉ có đuôi: tạo số có đầu/đuôi đó (OR logic)
            // Nếu có đầu
            if (dauNumbers.length > 0) {
                dauNumbers.forEach(dau => {
                    const dauDigit = parseInt(dau) % 10;
                    for (let i = 0; i <= 9; i++) {
                        const number = (dauDigit * 10 + i).toString().padStart(2, '0');
                        result.push(number);
                    }
                });
            }

            // Nếu có đuôi
            if (duoiNumbers.length > 0) {
                duoiNumbers.forEach(duoi => {
                    const duoiDigit = parseInt(duoi) % 10;
                    for (let i = 0; i <= 9; i++) {
                        const number = (i * 10 + duoiDigit).toString().padStart(2, '0');
                        result.push(number);
                    }
                });
            }
        }

        return [...new Set(result)]; // Loại bỏ trùng lặp
    }, []);

    // Hàm tính tổng các chữ số
    const calculateSum = useCallback((number) => {
        return number.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }, []);

    // Hàm lọc theo tổng
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

    // ✅ PERFORMANCE: Memoize generateDanDauDuoi function
    // Hàm tạo dàn đầu-đuôi với logic client-side
    const generateDanDauDuoi = useCallback(() => {
        // Bước 1: Parse đầu và đuôi
        const dauNumbers = parseInputNumbers(dauInput);
        const duoiNumbers = parseInputNumbers(duoiInput);

        if (dauNumbers.length === 0 && duoiNumbers.length === 0) {
            return [];
        }

        // Bước 2: Tạo số từ đầu-đuôi
        let resultNumbers = generateNumbersFromDauDuoi(dauNumbers, duoiNumbers);

        // Bước 3: Lọc theo tổng (nếu có)
        if (tongInput.trim()) {
            resultNumbers = filterBySum(resultNumbers, tongInput);
        }

        // Bước 4: Thêm số (nếu có)
        if (themInput.trim()) {
            const themNumbers = parseInputNumbers(themInput).map(n => n.padStart(2, '0'));
            resultNumbers = [...resultNumbers, ...themNumbers];
            resultNumbers = [...new Set(resultNumbers)];
        }

        // Bước 5: Bỏ số (nếu có)
        if (boInput.trim()) {
            const boNumbers = parseInputNumbers(boInput).map(n => n.padStart(2, '0'));
            resultNumbers = resultNumbers.filter(num => !boNumbers.includes(num));
        }

        // Sắp xếp kết quả
        resultNumbers.sort((a, b) => parseInt(a) - parseInt(b));

        return resultNumbers;
    }, [dauInput, duoiInput, tongInput, themInput, boInput, parseInputNumbers, generateNumbersFromDauDuoi, filterBySum]);

    // ✅ PERFORMANCE: Memoize event handlers to prevent recreation on every render
    const handleTaoDan = useCallback(() => {
        if (!dauInput.trim() && !duoiInput.trim()) {
            setModalMessage('Vui lòng nhập đầu hoặc đuôi');
            setShowModal(true);
            return;
        }

        setLoading(true);
        setHasSearched(true); // Đánh dấu đã tìm kiếm

        try {
            const result = generateDanDauDuoi();
            setResult(result);
        } catch (error) {
            console.error('Error generating dan dau duoi:', error);
            setModalMessage('Lỗi khi tạo dàn số');
            setShowModal(true);
            setHasSearched(false); // Reset nếu có lỗi
        } finally {
            setLoading(false);
        }
    }, [generateDanDauDuoi]);

    const handleLamLai = useCallback(() => {
        setDauInput('');
        setDuoiInput('');
        setTongInput('');
        setThemInput('');
        setBoInput('');
        setResult([]);
        setHasSearched(false); // Reset trạng thái tìm kiếm
    }, []);

    // Hàm lấy số từ đầu
    const getNumbersByDau = useCallback((dauNumbers) => {
        const result = [];
        dauNumbers.forEach(dau => {
            // Chỉ lấy chữ số cuối cùng (0-9) để đảm bảo đúng format
            const dauDigit = parseInt(dau) % 10;
            for (let i = 0; i <= 9; i++) {
                const number = (dauDigit * 10 + i).toString().padStart(2, '0');
                result.push(number);
            }
        });
        return result;
    }, []);

    // Hàm lấy số từ đuôi
    const getNumbersByDuoi = useCallback((duoiNumbers) => {
        const result = [];
        duoiNumbers.forEach(duoi => {
            // Chỉ lấy chữ số cuối cùng (0-9) để đảm bảo đúng format
            const duoiDigit = parseInt(duoi) % 10;
            for (let i = 0; i <= 9; i++) {
                const number = (i * 10 + duoiDigit).toString().padStart(2, '0');
                result.push(number);
            }
        });
        return result;
    }, []);

    // Hàm parse tổng (chỉ chấp nhận 0-18)
    const parseTongInput = useCallback((input) => {
        if (!input || input.trim() === '') return [];
        return input
            .replace(/[;,\s]+/g, ',')
            .replace(/,+/g, ',')
            .replace(/^,|,$/g, '')
            .split(',')
            .map(n => n.trim())
            .filter(n => {
                const num = parseInt(n);
                return n !== '' && /^\d{1,2}$/.test(n) && num >= 0 && num <= 18;
            })
            .map(n => parseInt(n).toString());
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

        try {
            let allNumbers = [];

            // Bước 1: Lấy số từ đầu (nếu có)
            const dauNumbers = parseInputNumbers(dauInput);
            if (dauNumbers.length > 0) {
                const dauResult = getNumbersByDau(dauNumbers);
                allNumbers = [...allNumbers, ...dauResult];
            }

            // Bước 2: Lấy số từ đuôi (nếu có)
            const duoiNumbers = parseInputNumbers(duoiInput);
            if (duoiNumbers.length > 0) {
                const duoiResult = getNumbersByDuoi(duoiNumbers);
                allNumbers = [...allNumbers, ...duoiResult];
            }

            // Bước 3: Lấy số từ tổng (nếu có)
            const tongNumbers = parseTongInput(tongInput);
            if (tongNumbers.length > 0) {
                const tongResult = getNumbersByTong(tongNumbers);
                allNumbers = [...allNumbers, ...tongResult];
            }

            // Kiểm tra nếu không có đầu, đuôi, tổng nào
            if (allNumbers.length === 0) {
                setResult([]);
                setHasSearched(true); // Đánh dấu đã tìm kiếm để hiển thị thông báo
                setLoading(false);
                return;
            }

            // Bước 4: Loại bỏ trùng lặp
            allNumbers = [...new Set(allNumbers)];

            // Bước 5: Thêm số (nếu có)
            if (themInput.trim()) {
                const themNumbers = parseInputNumbers(themInput).map(n => n.padStart(2, '0'));
                allNumbers = [...allNumbers, ...themNumbers];
                allNumbers = [...new Set(allNumbers)];
            }

            // Bước 6: Bỏ số (nếu có)
            if (boInput.trim()) {
                const boNumbers = parseInputNumbers(boInput).map(n => n.padStart(2, '0'));
                allNumbers = allNumbers.filter(num => !boNumbers.includes(num));
            }

            // Sắp xếp kết quả
            allNumbers.sort((a, b) => parseInt(a) - parseInt(b));

            setResult(allNumbers);
            setHasSearched(true); // Đánh dấu đã tìm kiếm
        } catch (error) {
            console.error('Error generating all numbers:', error);
            setModalMessage('Lỗi khi tạo dàn số');
            setShowModal(true);
            setHasSearched(false); // Reset nếu có lỗi
        } finally {
            setLoading(false);
        }
    }, [dauInput, duoiInput, tongInput, themInput, boInput, parseInputNumbers, parseTongInput, getNumbersByDau, getNumbersByDuoi, getNumbersByTong]);

    const handleCopy = useCallback(() => {
        if (result.length === 0) {
            setModalMessage('Chưa có dàn số để copy');
            setShowModal(true);
            return;
        }

        const copyText = `DÀN ĐẦU-ĐUÔI (${result.length} số)\n${'='.repeat(30)}\n${result.join(',')}`;

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

    // ✅ PERFORMANCE: Memoize textarea content to prevent recalculation
    // Tạo nội dung textarea từ kết quả
    const generateTextareaContent = useMemo(() => {
        // Nếu đã tìm kiếm nhưng không có kết quả
        if (hasSearched && result.length === 0) {
            // Kiểm tra xem có phải là trường hợp không có đầu/đuôi/tổng khi "Lấy Hết" không
            if (!dauInput.trim() && !duoiInput.trim() && !tongInput.trim()) {
                return "Vui lòng nhập đầu, đuôi hoặc tổng để lấy hết.";
            }
            return "Không có số nào phù hợp với các tiêu chí đã chọn.";
        }

        // Nếu chưa tìm kiếm
        if (!hasSearched && result.length === 0) {
            return "Chưa có dàn số nào. Nhấn \"Tạo Dàn\" hoặc \"Lấy Hết\" để bắt đầu.";
        }

        const content = [];

        // Tiêu đề
        content.push(`DÀN ĐẦU-ĐUÔI (${result.length} số)`);
        content.push('='.repeat(30));
        content.push(result.join(','));

        return content.join('\n');
    }, [result, hasSearched, dauInput, duoiInput, tongInput]);

    // ✅ PERFORMANCE: Memoize disabled states to prevent recalculation
    const isTaoDanDisabled = useMemo(() => {
        return loading || (!dauInput.trim() && !duoiInput.trim());
    }, [loading, dauInput, duoiInput]);

    const isCopyDisabled = useMemo(() => {
        return loading || result.length === 0;
    }, [loading, result.length]);

    // ✅ PERFORMANCE: Memoize input change handlers to prevent recreation
    const handleDauInputChange = useCallback((e) => {
        setDauInput(e.target.value);
    }, []);

    const handleDuoiInputChange = useCallback((e) => {
        setDuoiInput(e.target.value);
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
                        {/* Row 1: Đầu, Đuôi và Tổng */}
                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label className={styles.inputLabel}>Đầu</label>
                                <input
                                    type="text"
                                    value={dauInput}
                                    onChange={handleDauInputChange}
                                    placeholder="Ví dụ: 1,3,5 hoặc 135"
                                    className={styles.input}
                                    disabled={loading}
                                />
                            </div>

                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label className={styles.inputLabel}>Đuôi</label>
                                <input
                                    type="text"
                                    value={duoiInput}
                                    onChange={handleDuoiInputChange}
                                    placeholder="Ví dụ: 2,4,6 hoặc 246"
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
                                    placeholder="Ví dụ: 8 hoặc 24 hoặc 246"
                                    className={styles.input}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Row 3: Thêm và Bỏ */}
                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label className={styles.inputLabel}>Thêm (tùy chọn)</label>
                                <input
                                    type="text"
                                    value={themInput}
                                    onChange={handleThemInputChange}
                                    placeholder="Ví dụ: 12,34,56"
                                    className={styles.input}
                                    disabled={loading}
                                />
                            </div>

                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label className={styles.inputLabel}>Bỏ (tùy chọn)</label>
                                <input
                                    type="text"
                                    value={boInput}
                                    onChange={handleBoInputChange}
                                    placeholder="Ví dụ: 1 (bỏ số chứa 1)"
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
                                    disabled={isTaoDanDisabled}
                                >
                                    {loading ? 'Đang tạo...' : 'Tạo Dàn'}
                                </button>
                                <button
                                    onClick={handleLayHet}
                                    className={`${styles.button} ${styles.orangeButton}`}
                                    disabled={loading}
                                >
                                    Lấy Hết
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className={`${styles.button} ${styles.secondaryButton}`}
                                    disabled={isCopyDisabled}
                                >
                                    Copy
                                </button>
                                <button
                                    onClick={handleLamLai}
                                    className={`${styles.button} ${styles.dangerButton}`}
                                    disabled={loading}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                        <textarea
                            className={styles.resultsTextarea}
                            value={generateTextareaContent}
                            readOnly
                            placeholder="Kết quả tạo dàn sẽ hiển thị ở đây..."
                            aria-label="Kết quả tạo dàn đầu-đuôi"
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

export default TaoDanDauDuoi;
