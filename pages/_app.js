/**
 * Custom App Component
 * Wraps all pages with Navbar
 * ✅ Performance: Optimized with React.memo
 */

import { memo } from 'react';
import Navbar from '../components/Navbar';

function App({ Component, pageProps }) {
    return (
        <>
            <style jsx global>{`
                /* ✅ Performance: CSS Variables cho DanDeGenerator và toàn bộ app */
                :root {
                    --container-7xl: 1280px;
                    --transition-slow: 0.3s;
                    --transition-slower: 0.5s;
                    --transition-base: 0.2s;
                    --transition-fast: 0.15s;
                    --transition-normal: 0.25s;
                    --text-2xl: 1.5rem;
                    --text-xl: 1.25rem;
                    --text-lg: 1.125rem;
                    --text-base: 1rem;
                    --text-sm: 0.875rem;
                    --text-xs: 0.75rem;
                    --font-bold: 700;
                    --font-semibold: 600;
                    --font-medium: 500;
                    --color-white: #ffffff;
                    --color-gray-50: #f9fafb;
                    --color-gray-100: #f3f4f6;
                    --color-gray-200: #e5e7eb;
                    --color-gray-300: #d1d5db;
                    --color-gray-400: #9ca3af;
                    --color-gray-500: #6b7280;
                    --color-gray-600: #4b5563;
                    --color-gray-700: #374151;
                    --color-gray-800: #1f2937;
                    --color-gray-900: #111827;
                    --color-primary-50: #eff6ff;
                    --color-primary-100: #dbeafe;
                    --color-primary-200: #bfdbfe;
                    --color-primary-400: #60a5fa;
                    --color-primary-500: #3b82f6;
                    --color-primary-600: #2563eb;
                    --color-primary-700: #1d4ed8;
                    --color-error: #dc2626;
                    --spacing-1: 0.25rem;
                    --spacing-2: 0.5rem;
                    --spacing-3: 0.75rem;
                    --spacing-4: 1rem;
                    --spacing-5: 1.25rem;
                    --spacing-6: 1.5rem;
                    --border-radius-sm: 0.25rem;
                    --border-radius-md: 0.375rem;
                    --border-radius-lg: 0.5rem;
                    --line-height-tight: 1.25;
                    --line-height-normal: 1.5;
                    --line-height-relaxed: 1.75;
                    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                }
                
                body {
                    background-color: #e0e0e073;
                    margin: 0;
                    padding: 0;
                    min-height: 100vh;
                }
                /* ✅ Performance: Optimize font rendering */
                * {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                /* ✅ Performance: Reduce layout shift */
                img {
                    height: auto;
                    max-width: 100%;
                }
            `}</style>
            <Navbar />
            <Component {...pageProps} />
        </>
    );
}

// ✅ Performance: Memoize App component
export default memo(App);

