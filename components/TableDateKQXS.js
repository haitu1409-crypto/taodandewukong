import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import styles from '../styles/tableDateKQXS.module.css';

const TARGET_URL = process.env.NEXT_PUBLIC_TARGET_URL || 'https://ketquamn.com';

// ✅ PERFORMANCE: Move stationsSchedule outside component to avoid recreation on every render
const stationsSchedule = {
        north: {
            allDays: [{ name: "Truyền Thống", time: "18:15" }],
        },
        central: {
            "Thứ 2": [
                { name: "Huế", time: "17:15" },
                { name: "Phú Yên", time: "17:15" },
            ],
            "Thứ 3": [
                { name: "Đắk Lắk", time: "17:15" },
                { name: "Quảng Nam", time: "17:15" },
            ],
            "Thứ 4": [
                { name: "Đà Nẵng", time: "17:15" },
                { name: "Khánh Hòa", time: "17:15" },
            ],
            "Thứ 5": [
                { name: "Bình Định", time: "17:15" },
                { name: "Quảng Trị", time: "17:15" },
                { name: "Quảng Bình", time: "17:15" },
            ],
            "Thứ 6": [
                { name: "Gia Lai", time: "17:15" },
                { name: "Ninh Thuận", time: "17:15" },
            ],
            "Thứ 7": [
                { name: "Đà Nẵng", time: "17:15" },
                { name: "Quảng Ngãi", time: "17:15" },
                { name: "Đắk Nông", time: "17:15" },
            ],
            "Chủ nhật": [
                { name: "Kon Tum", time: "17:15" },
                { name: "Khánh Hòa", time: "17:15" },
                { name: "Thừa Thiên Huế", time: "17:15" },
            ],
        },
        south: {
            "Thứ 2": [
                { name: "TP.HCM", time: "16:15" },
                { name: "Đồng Tháp", time: "16:15" },
                { name: "Cà Mau", time: "16:15" },
            ],
            "Thứ 3": [
                { name: "Bến Tre", time: "16:15" },
                { name: "Vũng Tàu", time: "16:15" },
                { name: "Bạc Liêu", time: "16:15" },
            ],
            "Thứ 4": [
                { name: "Đồng Nai", time: "16:15" },
                { name: "Cần Thơ", time: "16:15" },
                { name: "Sóc Trăng", time: "16:15" },
            ],
            "Thứ 5": [
                { name: "Tây Ninh", time: "16:15" },
                { name: "An Giang", time: "16:15" },
                { name: "Bình Thuận", time: "16:15" },
            ],
            "Thứ 6": [
                { name: "Vĩnh Long", time: "16:15" },
                { name: "Bình Dương", time: "16:15" },
                { name: "Trà Vinh", time: "16:15" },
            ],
            "Thứ 7": [
                { name: "TP.HCM", time: "16:15" },
                { name: "Long An", time: "16:15" },
                { name: "Bình Phước", time: "16:15" },
                { name: "Hậu Giang", time: "16:15" },
            ],
            "Chủ nhật": [
                { name: "Tiền Giang", time: "16:15" },
                { name: "Kiên Giang", time: "16:15" },
                { name: "Đà Lạt", time: "16:15" },
            ],
        },
    };

const TableDate = () => {
    // ✅ FIX: Hydration-safe pattern - chỉ render dynamic content sau khi mounted
    const [isMounted, setIsMounted] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [hasBroadcasted, setHasBroadcasted] = useState({ north: false, central: false, south: false });
    const [isApproaching, setIsApproaching] = useState({ north: false, central: false, south: false });
    const [currentStations, setCurrentStations] = useState({ north: [], central: [], south: [] });

    // ✅ FIX: Mark component as mounted để chỉ render dynamic content sau hydration
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // ✅ FIX: Chỉ update khi đã mounted để tránh hydration mismatch
        if (!isMounted) return;

        const updateDateAndStations = () => {
            // Lấy thời gian Việt Nam (UTC+7) - Asia/Ho_Chi_Minh
            const now = new Date();
            
            // Sử dụng Intl để lấy giờ Việt Nam chính xác
            const vietnamFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Ho_Chi_Minh',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            const parts = vietnamFormatter.formatToParts(now);
            const vietnamDate = {
                year: parseInt(parts.find(p => p.type === 'year').value),
                month: parseInt(parts.find(p => p.type === 'month').value) - 1, // Month is 0-indexed
                day: parseInt(parts.find(p => p.type === 'day').value),
                hour: parseInt(parts.find(p => p.type === 'hour').value),
                minute: parseInt(parts.find(p => p.type === 'minute').value),
                second: parseInt(parts.find(p => p.type === 'second').value)
            };

            // Tạo Date object từ giờ Việt Nam để dùng getDay()
            const vietnamDateObj = new Date(vietnamDate.year, vietnamDate.month, vietnamDate.day, vietnamDate.hour, vietnamDate.minute, vietnamDate.second);

            // Định dạng ngày: 20/04/2025
            const formattedDate = `${String(vietnamDate.day).padStart(2, '0')}/${String(vietnamDate.month + 1).padStart(2, '0')}/${vietnamDate.year}`;
            setCurrentDate(formattedDate);

            // Xác định thứ trong tuần
            const daysOfWeek = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
            const dayOfWeek = daysOfWeek[vietnamDateObj.getDay()];
            setDayOfWeek(dayOfWeek);

            // Lấy danh sách đài theo ngày
            const northStations = stationsSchedule.north.allDays;
            const centralStations = stationsSchedule.central[dayOfWeek] || [];
            const southStations = stationsSchedule.south[dayOfWeek] || [];
            setCurrentStations({
                north: northStations,
                central: centralStations,
                south: southStations,
            });

            // ✅ PERFORMANCE: Move constants outside function
            // Kiểm tra trạng thái - sử dụng giờ Việt Nam
            const currentHour = vietnamDate.hour;
            const currentMinute = vietnamDate.minute;
            const currentTime = currentHour * 60 + currentMinute;

            // ✅ PERFORMANCE: Constants đã được move ra ngoài component
            const northStart = 18 * 60 + 15; // 18:15
            const northEnd = 18 * 60 + 45; // 18:45
            const northPrep = northStart - 30; // 17:45 (30 phút trước)

            const centralStart = 17 * 60 + 15; // 17:15
            const centralEnd = 17 * 60 + 45; // 17:45
            const centralPrep = centralStart - 30; // 16:45

            const southStart = 16 * 60 + 15; // 16:15
            const southEnd = 16 * 60 + 45; // 16:45
            const southPrep = southStart - 30; // 15:45

            // Kiểm tra xem đã xổ hay chưa (hiển thị dấu tích nếu đã qua giờ bắt đầu)
            setHasBroadcasted({
                north: currentTime >= northStart,
                central: currentTime >= centralStart,
                south: currentTime >= southStart,
            });

            // Kiểm tra xem có sắp đến giờ xổ hay không (hiển thị thẻ từ 30 phút trước đến khi kết thúc)
            setIsApproaching({
                north: currentTime >= northPrep && currentTime <= northEnd,
                central: currentTime >= centralPrep && currentTime <= centralEnd,
                south: currentTime >= southPrep && currentTime <= southEnd,
            });
        };

        updateDateAndStations();
        const interval = setInterval(updateDateAndStations, 60000); // Cập nhật mỗi phút
        return () => clearInterval(interval);
    }, [isMounted]);

    // ✅ FIX: Xác định miền sắp xổ chỉ khi đã mounted để tránh hydration mismatch
    const approachingRegion = isMounted && isApproaching.south ? "Miền Nam" :
        isMounted && isApproaching.central ? "Miền Trung" :
            isMounted && isApproaching.north ? "Miền Bắc" : null;
    const approachingTime = isMounted && isApproaching.south ? "16h15" :
        isMounted && isApproaching.central ? "17h15" :
            isMounted && isApproaching.north ? "18h15" : "";

    // ✅ FIX: Tính maxRows từ stationsSchedule với useMemo để đảm bảo tính toán an toàn
    // Lấy số hàng tối đa có thể có (thứ 7 miền Nam có 4 tỉnh)
    const maxPossibleRows = useMemo(() => {
        try {
            const centralMax = Math.max(...Object.values(stationsSchedule.central).map(stations => Array.isArray(stations) ? stations.length : 0));
            const southMax = Math.max(...Object.values(stationsSchedule.south).map(stations => Array.isArray(stations) ? stations.length : 0));
            return Math.max(
                stationsSchedule.north.allDays.length,
                centralMax,
                southMax
            );
        } catch (error) {
            // Fallback nếu có lỗi
            console.warn('Error calculating maxPossibleRows:', error);
            return 4; // Default max rows
        }
    }, []); // Empty deps vì stationsSchedule là constant
    
    // ✅ FIX: Luôn render với maxPossibleRows để đảm bảo HTML structure nhất quán giữa server và client
    // Điều này tránh hydration mismatch và layout shift
    const maxRows = maxPossibleRows;

    // ✅ PERFORMANCE: Memoize getRegionUrl với useCallback
    const getRegionUrl = useCallback((region) => {
        if (region === "Miền Nam") {
            return `${TARGET_URL}/ket-qua-xo-so-mien-nam`;
        } else if (region === "Miền Trung") {
            return `${TARGET_URL}/ket-qua-xo-so-mien-trung`;
        } else {
            return `${TARGET_URL}/ket-qua-xo-so-mien-bac`;
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.containerTB}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Xổ Số - Kết quả xổ số 3 Miền - KQXS Hôm nay</h1>
                </div>
                {/* ✅ CLS: Always render group div to prevent layout shift, hide content when not approaching */}
                <div className={styles.group} style={{ visibility: approachingRegion ? 'visible' : 'hidden' }}>
                    {approachingRegion && (
                        <>
                            <p className={styles.desc}>
                                <span className={styles.liveBadge}>LIVE</span> Tường thuật trực tiếp KQXS {approachingRegion} lúc {approachingTime}
                            </p>
                            <a 
                                href={getRegionUrl(approachingRegion)} 
                                className={styles.action}
                                rel="nofollow"
                            >
                                Xem Ngay
                            </a>
                        </>
                    )}
                </div>
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td className={styles.titleTable}>
                                <a 
                                    href={getRegionUrl("Miền Bắc")} 
                                    className={styles.titleLink}
                                    rel="nofollow"
                                >
                                    Miền Bắc
                                </a>
                            </td>
                            <td className={styles.titleTable}>
                                <a 
                                    href={getRegionUrl("Miền Trung")} 
                                    className={styles.titleLink}
                                    rel="nofollow"
                                >
                                    Miền Trung
                                </a>
                            </td>
                            <td className={styles.titleTable}>
                                <a 
                                    href={getRegionUrl("Miền Nam")} 
                                    className={styles.titleLink}
                                    rel="nofollow"
                                >
                                    Miền Nam
                                </a>
                            </td>
                        </tr>
                        {Array.from({ length: maxRows }).map((_, rowIndex) => {
                            // ✅ FIX: Chỉ render data khi đã mounted, trên server render empty cells
                            const northStation = isMounted ? currentStations.north[rowIndex] : null;
                            const centralStation = isMounted ? currentStations.central[rowIndex] : null;
                            const southStation = isMounted ? currentStations.south[rowIndex] : null;
                            
                            return (
                                <tr key={rowIndex}>
                                    {/* Miền Bắc */}
                                    <td>
                                        {northStation ? (
                                            <div className={styles.stationRow}>
                                                <span className={styles.stationName}>{northStation.name}</span>
                                                <div className={styles.timeCheckRow}>
                                                    <span className={styles.time}>{northStation.time}</span>
                                                    {hasBroadcasted.north ? (
                                                        <span className={styles.check}>✅</span>
                                                    ) : isApproaching.north ? (
                                                        <span className={styles.spinner}></span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        ) : null}
                                    </td>
                                    {/* Miền Trung */}
                                    <td>
                                        {centralStation ? (
                                            <div className={styles.stationRow}>
                                                <span className={styles.stationName}>{centralStation.name}</span>
                                                <div className={styles.timeCheckRow}>
                                                    <span className={styles.time}>{centralStation.time}</span>
                                                    {hasBroadcasted.central ? (
                                                        <span className={styles.check}>✅</span>
                                                    ) : isApproaching.central ? (
                                                        <span className={styles.spinner}></span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        ) : null}
                                    </td>
                                    {/* Miền Nam */}
                                    <td>
                                        {southStation ? (
                                            <div className={styles.stationRow}>
                                                <span className={styles.stationName}>{southStation.name}</span>
                                                <div className={styles.timeCheckRow}>
                                                    <span className={styles.time}>{southStation.time}</span>
                                                    {hasBroadcasted.south ? (
                                                        <span className={styles.check}>✅</span>
                                                    ) : isApproaching.south ? (
                                                        <span className={styles.spinner}></span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        ) : null}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ✅ PERFORMANCE: Memoize component to prevent unnecessary re-renders
export default memo(TableDate);

