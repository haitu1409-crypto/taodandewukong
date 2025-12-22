import { useState } from 'react';
import styles from '../styles/SocialShareButtons.module.css';

const SocialShareButtons = ({ 
    url, 
    title, 
    description = '', 
    image = '',
    hashtags = [],
    compact = false 
}) => {
    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Encode URL and text for sharing
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    const hashtagsStr = hashtags.join(',');

    // Social sharing functions
    const shareToFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
            'facebook-share',
            'width=600,height=400,toolbar=0,menubar=0,location=0'
        );
    };

    const shareToTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${hashtagsStr ? `&hashtags=${hashtagsStr}` : ''}`;
        window.open(
            twitterUrl,
            'twitter-share',
            'width=600,height=400,toolbar=0,menubar=0,location=0'
        );
    };

    const shareToLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            'linkedin-share',
            'width=600,height=400,toolbar=0,menubar=0,location=0'
        );
    };

    const shareToZalo = () => {
        window.open(
            `https://zalo.me/share?url=${encodedUrl}`,
            'zalo-share',
            'width=600,height=400,toolbar=0,menubar=0,location=0'
        );
    };

    const shareToTelegram = () => {
        window.open(
            `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
            'telegram-share',
            'width=600,height=400,toolbar=0,menubar=0,location=0'
        );
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setShowToast(true);
            
            // Reset after 2 seconds
            setTimeout(() => {
                setCopied(false);
                setShowToast(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setShowToast(true);
                setTimeout(() => {
                    setCopied(false);
                    setShowToast(false);
                }, 2000);
            } catch (err) {
                console.error('Fallback copy failed:', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const shareViaNavigator = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description,
                    url: url,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        }
    };

    // SVG Icons
    const FacebookIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );

    const TwitterIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
    );

    const LinkedInIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );

    const MessageIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
    );

    const SendIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
    );

    const LinkIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
        </svg>
    );

    const CheckIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
    );

    const ShareIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
        </svg>
    );

    const buttons = [
        {
            name: 'Facebook',
            icon: <FacebookIcon />,
            onClick: shareToFacebook,
            className: styles.facebook,
            ariaLabel: 'Chia sẻ lên Facebook'
        },
        {
            name: 'Twitter',
            icon: <TwitterIcon />,
            onClick: shareToTwitter,
            className: styles.twitter,
            ariaLabel: 'Chia sẻ lên Twitter'
        },
        {
            name: 'LinkedIn',
            icon: <LinkedInIcon />,
            onClick: shareToLinkedIn,
            className: styles.linkedin,
            ariaLabel: 'Chia sẻ lên LinkedIn'
        },
        {
            name: 'Zalo',
            icon: <MessageIcon />,
            onClick: shareToZalo,
            className: styles.zalo,
            ariaLabel: 'Chia sẻ lên Zalo'
        },
        {
            name: 'Telegram',
            icon: <SendIcon />,
            onClick: shareToTelegram,
            className: styles.telegram,
            ariaLabel: 'Chia sẻ lên Telegram'
        },
        {
            name: copied ? 'Đã sao chép!' : 'Copy link',
            icon: copied ? <CheckIcon /> : <LinkIcon />,
            onClick: copyLink,
            className: `${styles.copy} ${copied ? styles.copied : ''}`,
            ariaLabel: 'Sao chép liên kết'
        }
    ];

    return (
        <div className={`${styles.socialShare} ${compact ? styles.compact : ''}`}>
            {!compact && <h3 className={styles.shareTitle}>Chia sẻ bài viết:</h3>}
            
            <div className={styles.shareButtons}>
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        className={`${styles.shareButton} ${button.className}`}
                        onClick={button.onClick}
                        aria-label={button.ariaLabel}
                        title={button.ariaLabel}
                    >
                        {button.icon}
                        {!compact && <span>{button.name}</span>}
                    </button>
                ))}
                
                {/* Native Share Button (Mobile) */}
                {typeof navigator !== 'undefined' && navigator.share && (
                    <button
                        className={`${styles.shareButton} ${styles.native}`}
                        onClick={shareViaNavigator}
                        aria-label="Chia sẻ"
                        title="Chia sẻ"
                    >
                        <ShareIcon />
                        {!compact && <span>Chia sẻ</span>}
                    </button>
                )}
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className={styles.toast}>
                    <CheckIcon />
                    <span>Đã sao chép liên kết!</span>
                </div>
            )}
        </div>
    );
};

export default SocialShareButtons;

