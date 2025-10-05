import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import QRCode from 'qrcode';

const giftTypeDetails = {
  tree: {
    icon: '🌳',
    name: 'Tree Planting',
    color: 'from-green-400 to-green-600',
    impact: 'Trees planted',
    bgGradient: 'from-green-50 to-emerald-100'
  },
  cookstove: {
    icon: '🏡',
    name: 'Clean Cookstove',
    color: 'from-amber-500 to-orange-600',
    impact: 'Stoves provided',
    bgGradient: 'from-orange-50 to-amber-100'
  },
  solar: {
    icon: '☀️',
    name: 'Solar Panel',
    color: 'from-yellow-400 to-orange-500',
    impact: 'Panels installed',
    bgGradient: 'from-yellow-50 to-orange-100'
  },
  ocean: {
    icon: '🌊',
    name: 'Ocean Cleanup',
    color: 'from-blue-400 to-cyan-600',
    impact: 'Kg of plastic removed',
    bgGradient: 'from-blue-50 to-cyan-100'
  }
};

export default function GiftView() {
  const { giftId } = useParams();
  const navigate = useNavigate();
  const [gift, setGift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQR, setShowQR] = useState(false);
  const qrCanvasRef = useRef(null);

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gifts/${giftId}`);
        const data = await response.json();
        
        if (response.ok && data.gift) {
          setGift(data.gift);
          setEditedMessage(data.gift.message);
          
          // Generate QR code
          const url = window.location.href;
          const qrDataUrl = await QRCode.toDataURL(url, {
            width: 300,
            margin: 2,
            color: {
              dark: '#2D5016', // forest green
              light: '#FFFFFF'
            }
          });
          setQrCodeUrl(qrDataUrl);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching gift:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGift();
  }, [giftId]);

  const handleEditClick = () => {
    setEditedMessage(gift.message);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedMessage(gift.message);
    setIsEditing(false);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('🔗 Link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy link');
    });
  };

  const handleShareTwitter = () => {
    const url = window.location.href;
    const text = `🌿 I just received a climate gift! ${gift.senderName} sent me ${gift.quantity} ${giftTypeDetails[gift.type].name}. Join the climate love movement!`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const text = `🌿 I just received a climate gift!\n\n${gift.senderName} sent me ${gift.quantity} ${giftTypeDetails[gift.type].name}.\n\nCheck it out: ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareFacebook = () => {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.download = `gifted-air-${gift.recipientName}-qr.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  const handleSaveEdit = async () => {
    if (!editedMessage.trim()) {
      alert('Message cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/gifts/${giftId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: editedMessage })
      });

      const data = await response.json();

      if (data.success) {
        setGift(data.gift);
        setIsEditing(false);
      } else {
        alert('Failed to update message');
      }
    } catch (err) {
      console.error('Error updating gift:', err);
      alert('Failed to update message. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">🌿</div>
          <p className="text-2xl text-gray-600">Loading your gift...</p>
        </div>
      </div>
    );
  }

  if (error || !gift) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-4">Gift not found</p>
          <button
            onClick={() => navigate('/')}
            className="text-forest hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const giftDetails = giftTypeDetails[gift.type];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${giftDetails.bgGradient} py-12`}>
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Gift Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with animated icon */}
          <div className={`bg-gradient-to-r ${giftDetails.color} p-12 text-center`}>
            <div className="text-9xl mb-4 animate-grow">{giftDetails.icon}</div>
            <h1 className="text-4xl font-bold text-white mb-2">
              A Gift of Climate Love
            </h1>
            <p className="text-xl text-white opacity-90">
              {giftDetails.name}
            </p>
          </div>

          {/* Content */}
          <div className="p-12">
            {/* Recipient Greeting */}
            <div className="text-center mb-8">
              <p className="text-3xl text-gray-800 mb-2">
                Dear <span className="font-bold text-forest">{gift.recipientName}</span>,
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">{gift.senderName}</span> has gifted you something special
              </p>
            </div>

            {/* Impact Display */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-8 text-center">
              <div className="text-6xl font-bold text-forest mb-2">
                {gift.quantity}
              </div>
              <div className="text-xl text-gray-700">
                {giftDetails.impact}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Carbon offset value: ${gift.totalCost}
              </div>
            </div>

            {/* Personal Message */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-10 mb-8 border-2 border-amber-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="text-6xl">💌</div>
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="text-sm bg-white text-forest px-4 py-2 rounded-lg border-2 border-forest hover:bg-green-50 transition-all"
                  >
                    ✏️ Edit Message
                  </button>
                )}
              </div>
              
              <div className="max-w-2xl mx-auto">
                {isEditing ? (
                  <>
                    <textarea
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      rows={8}
                      className="w-full p-4 border-2 border-amber-300 rounded-lg focus:border-forest focus:outline-none resize-none font-poetic text-xl leading-relaxed"
                      placeholder="Write your heartfelt message..."
                    />
                    <div className="flex gap-4 mt-6 justify-end">
                      <button
                        onClick={handleCancelEdit}
                        disabled={isSaving}
                        className="px-6 py-2 rounded-lg border-2 border-gray-400 text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        disabled={isSaving}
                        className="px-6 py-2 rounded-lg bg-forest text-white hover:bg-green-800 transition-all disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-left mb-6">
                      <p className="text-xl text-gray-800 font-poetic leading-relaxed whitespace-pre-wrap">
                        {gift.message}
                      </p>
                    </div>
                    <div className="text-right mt-8 pt-4 border-t border-amber-300">
                      <p className="text-lg text-gray-600 font-poetic italic">
                        With love,
                      </p>
                      <p className="text-xl text-forest font-bold mt-1">
                        {gift.senderName}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Impact Details */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-forest mb-4 text-center">
                Real-World Impact
              </h3>
              <div className="space-y-3 text-gray-700">
                {gift.type === 'tree' && (
                  <>
                    <ImpactItem icon="🌍" text={`${gift.quantity * 48} lbs of CO₂ absorbed annually`} />
                    <ImpactItem icon="🦋" text="Creates habitat for wildlife" />
                    <ImpactItem icon="💧" text="Prevents soil erosion and purifies water" />
                  </>
                )}
                {gift.type === 'cookstove' && (
                  <>
                    <ImpactItem icon="🏠" text={`${gift.quantity} families with cleaner air`} />
                    <ImpactItem icon="🌳" text="Reduces deforestation for firewood" />
                    <ImpactItem icon="💚" text="Improves health and saves lives" />
                  </>
                )}
                {gift.type === 'solar' && (
                  <>
                    <ImpactItem icon="⚡" text={`${gift.quantity * 300} watts of clean energy`} />
                    <ImpactItem icon="🏘️" text="Powers homes without fossil fuels" />
                    <ImpactItem icon="📚" text="Enables education and economic opportunity" />
                  </>
                )}
                {gift.type === 'ocean' && (
                  <>
                    <ImpactItem icon="🐠" text={`${gift.quantity} kg of plastic removed`} />
                    <ImpactItem icon="🌊" text="Protects marine ecosystems" />
                    <ImpactItem icon="🐢" text="Saves sea life from pollution" />
                  </>
                )}
              </div>
            </div>

            {/* Footer Quote */}
            <div className="mt-8 text-center">
              <blockquote className="text-lg text-gray-600 italic">
                "Every gift plants a seed of hope for our planet"
              </blockquote>
            </div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="mt-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
          <h3 className="text-2xl font-bold text-center text-forest mb-4">
            📣 Share the Love!
          </h3>
          <p className="text-center text-gray-600 mb-6">
            Inspire others to join the climate movement
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={handleShareTwitter}
              className="flex items-center justify-center gap-2 bg-[#1DA1F2] text-white px-6 py-4 rounded-xl font-semibold 
                       hover:bg-[#1a8cd8] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
              Twitter
            </button>
            
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-xl font-semibold 
                       hover:bg-[#20ba5a] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
              </svg>
              WhatsApp
            </button>
            
            <button
              onClick={handleShareFacebook}
              className="flex items-center justify-center gap-2 bg-[#1877F2] text-white px-6 py-4 rounded-xl font-semibold 
                       hover:bg-[#0d65d9] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
              Facebook
            </button>
            
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 bg-gray-700 text-white px-6 py-4 rounded-xl font-semibold 
                       hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Link
            </button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="mt-8 bg-white rounded-2xl p-8 border-2 border-gray-200 text-center">
          <h3 className="text-2xl font-bold text-forest mb-3">
            📲 Print & Share
          </h3>
          <p className="text-gray-600 mb-6">
            Download this QR code to print on physical cards or share offline!
          </p>
          
          <div className="flex flex-col items-center gap-6">
            {qrCodeUrl && (
              <>
                <div className="bg-white p-4 rounded-xl border-4 border-forest shadow-lg">
                  <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
                </div>
                <button
                  onClick={handleDownloadQR}
                  className="bg-forest text-white px-8 py-3 rounded-full font-bold 
                           hover:bg-green-800 transition-all duration-300 transform hover:scale-105 
                           shadow-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download QR Code
                </button>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/compose')}
            className="bg-forest text-white px-8 py-3 rounded-full font-semibold 
                     hover:bg-green-800 transition-all duration-300 transform hover:scale-105 
                     shadow-lg"
          >
            Send Your Own Gift
          </button>
          <button
            onClick={() => navigate('/gallery')}
            className="bg-white text-forest border-2 border-forest px-8 py-3 rounded-full font-semibold 
                     hover:bg-green-50 transition-all duration-300"
          >
            View Gallery 🎁
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-forest hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

function ImpactItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
