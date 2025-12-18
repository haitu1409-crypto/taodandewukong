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
                    display: block; /* ✅ PERFORMANCE: Prevent inline spacing reflow */
                }
                /* ✅ PERFORMANCE: Reserve space for LCP image */
                img[fetchpriority="high"] {
                    content-visibility: auto;
                }
            `}} />
            <Navbar />
            <Component {...pageProps} />
        </>
    );
}

// ✅ Performance: Memoize App component
export default memo(App);

