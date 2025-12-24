/**
 * Simple Layout Component
 * Wrapper đơn giản cho pages - chỉ wrap children
 */

export default function Layout({ children, className = '' }) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}




