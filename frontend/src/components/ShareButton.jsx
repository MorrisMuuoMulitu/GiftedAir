import { useState } from 'react';
import { trackShare } from '../utils/analytics';

export default function ShareButton({ 
  url, 
  title = 'Check out Gifted Air!', 
  description = 'Turn pocket change into planet change. Send climate gifts starting at $1.' 
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${shareUrl}`,
  };

  const handleShare = (platform) => {
    trackShare(platform);
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    setShowMenu(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackShare('copy_link');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: shareUrl,
        });
        trackShare('native');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  return (
    <div className="relative inline-block">
      {/* Main Share Button */}
      <button
        onClick={handleNativeShare}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <span>📤</span>
        <span>Share</span>
      </button>

      {/* Share Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          ></div>
          
          {/* Menu */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-4 z-50 min-w-[280px]">
            <div className="text-center mb-3">
              <p className="font-bold text-gray-800">Share via</p>
            </div>
            
            <div className="space-y-2">
              {/* Twitter */}
              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white text-xl">
                  𝕏
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-blue-600">Twitter</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                  f
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-blue-600">Facebook</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => handleShare('linkedin')}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white text-xl">
                  in
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-blue-700">LinkedIn</span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                  💬
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-green-600">WhatsApp</span>
              </button>

              {/* Email */}
              <button
                onClick={() => handleShare('email')}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-xl">
                  ✉️
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-gray-800">Email</span>
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopy}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors group border-t pt-4 mt-2"
              >
                <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center text-white text-xl">
                  {copied ? '✓' : '🔗'}
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-forest">
                  {copied ? 'Copied!' : 'Copy Link'}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
