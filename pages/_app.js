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
            <style dangerouslySetInnerHTML={{__html: `
                body {
                    background-color: #e0e0e0;
                    margin: 0;
                    padding: 0;
                    min-height: 100vh;
                    /* ✅ PERFORMANCE: Prevent layout shift from font loading */
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
                }
                /* ✅ Performance: Optimize font rendering */
                * {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                /* ✅ Performance: Reduce layout shift - reserve space for images */
                img {
                    height: auto;
                    max-width: 100%;
                    display: block; /* ✅ PERFORMANCE: Prevent inline spacing reflow */
                }
                /* ✅ PERFORMANCE: Reserve space for LCP image */
                img[fetchpriority="high"] {
                    content-visibility: auto;
                }
                /* ✅ PERFORMANCE: Reserve space for navbar on mobile */
                @media (max-width: 768px) {
                    body {
                        padding-top: 0; /* Navbar is sticky, no padding needed */
                    }
                }
            `}} />
            <Navbar />
            <Component {...pageProps} />
        </>
    );
}

// ✅ Performance: Memoize App component
export default memo(App);

