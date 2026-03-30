import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../config';
import QRCode from 'qrcode';
import Navigation from '../components/Navigation';
import { quickCelebrate } from '../components/Confetti';
import { 
  Leaf, Heart, Share2, Download, Mail, Copy, 
  MessageCircle, ExternalLink, Edit3, Save, X, ChevronRight 
} from 'lucide-react';

const TwitterIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
  </svg>
);

const giftTypeDetails = {
  tree: {
    icon: '🌳',
    name: 'Tree Planting',
    color: 'from-green-400 to-emerald-600',
    colorText: 'text-green-400',
    bgGradient: 'from-green-950/30 to-emerald-950/20',
    impact: 'Trees planted',
    co2: 'CO₂ absorbed annually',
    features: ['Creates wildlife habitat', 'Prevents soil erosion', 'Purifies water sources']
  },
  cookstove: {
    icon: '🏡',
    name: 'Clean Cookstove',
    color: 'from-amber-500 to-orange-600',
    colorText: 'text-amber-400',
    bgGradient: 'from-amber-950/30 to-orange-950/20',
    impact: 'Stoves provided',
    co2: 'Carbon emissions reduced',
    features: ['Cleaner indoor air', 'Reduces deforestation', 'Saves families time']
  },
  solar: {
    icon: '☀️',
    name: 'Solar Panel',
    color: 'from-yellow-400 to-orange-500',
    colorText: 'text-yellow-400',
    bgGradient: 'from-yellow-950/30 to-orange-950/20',
    impact: 'Panels installed',
    co2: 'Watts of clean energy',
    features: ['Powers homes sustainably', 'Enables education', 'Economic opportunity']
  },
  ocean: {
    icon: '🌊',
    name: 'Ocean Cleanup',
    color: 'from-blue-400 to-cyan-600',
    colorText: 'text-blue-400',
    bgGradient: 'from-blue-950/30 to-cyan-950/20',
    impact: 'Kg of plastic removed',
    co2: 'Marine ecosystems protected',
    features: ['Protects marine life', 'Cleaner coastlines', 'Sustainable fishing']
  },
  coral: {
    icon: '🪸',
    name: 'Coral Reef Restoration',
    color: 'from-pink-400 to-rose-600',
    colorText: 'text-pink-400',
    bgGradient: 'from-pink-950/30 to-rose-950/20',
    impact: 'Coral fragments planted',
    co2: 'Biodiversity restored',
    features: ['Rebuilds fish habitats', 'Protects coastlines', 'Marine biodiversity']
  },
  wildlife: {
    icon: '🦁',
    name: 'Wildlife Conservation',
    color: 'from-amber-600 to-yellow-700',
    colorText: 'text-amber-500',
    bgGradient: 'from-amber-950/30 to-yellow-950/20',
    impact: 'Animals protected',
    co2: 'Habitats preserved',
    features: ['Preserves critical habitats', 'Protects endangered species', 'Ecosystem balance']
  },
  water: {
    icon: '💧',
    name: 'Clean Water Access',
    color: 'from-blue-400 to-sky-600',
    colorText: 'text-blue-400',
    bgGradient: 'from-blue-950/30 to-sky-950/20',
    impact: 'People with clean water',
    co2: 'Health improved',
    features: ['Reduces waterborne diseases', 'More time for education', 'Improved quality of life']
  },
  rainforest: {
    icon: '🌴',
    name: 'Rainforest Protection',
    color: 'from-green-600 to-emerald-700',
    colorText: 'text-green-500',
    bgGradient: 'from-green-950/30 to-emerald-950/20',
    impact: 'Acres protected',
    co2: 'Oxygen produced',
    features: ['Preserves biodiversity', 'Regulates climate', 'Protects indigenous communities']
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
  const [showThankYou, setShowThankYou] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState('');
  const [thankYouName, setThankYouName] = useState('');
  const [thankYouSent, setThankYouSent] = useState(false);

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gifts/${giftId}`);
        const data = await response.json();
        
        if (response.ok && data.gift) {
          setGift(data.gift);
          setEditedMessage(data.gift.message);
          
          const url = window.location.href;
          const qrDataUrl = await QRCode.toDataURL(url, {
            width: 300,
            margin: 2,
            color: {
              dark: '#10b981',
              light: '#ffffff'
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

  const handleSendThankYou = async () => {
    if (!thankYouMessage.trim() || !thankYouName.trim()) {
      alert('Please enter your name and message');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/gifts/${giftId}/thank-you`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: thankYouMessage,
          recipientName: thankYouName
        })
      });

      const data = await response.json();

      if (data.success) {
        quickCelebrate();
        setThankYouSent(true);
        setShowThankYou(false);
        setTimeout(() => {
          alert('Thank you note sent! 💚');
        }, 100);
      } else {
        alert('Failed to send thank you note');
      }
    } catch (err) {
      console.error('Error sending thank you:', err);
      alert('Failed to send. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-deep flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-6"
          >
            🌱
          </motion.div>
          <p className="text-xl font-bold uppercase tracking-[0.3em] text-emerald-400 animate-pulse">Loading Your Gift...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !gift) {
    return (
      <div className="min-h-screen bg-forest-deep flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">😔</div>
          <p className="text-2xl font-black text-off-white mb-4">Gift not found</p>
          <button
            onClick={() => navigate('/')}
            className="text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-widest text-sm transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const giftDetails = giftTypeDetails[gift.type];

  return (
    <>
      <div className="min-h-screen bg-forest-deep text-off-white pb-20 overflow-hidden relative">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 pattern-grid opacity-[0.02]" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className={`absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b ${giftDetails.bgGradient} to-transparent`}
          />
        </div>

        <Navigation />

        <div className="container mx-auto px-4 max-w-3xl pt-28 relative z-10">
          {/* Gift Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card-elevated overflow-hidden"
          >
            {/* Header */}
            <div className={`relative p-8 md:p-12 text-center overflow-hidden`}>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl"
              />
              
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative z-10"
              >
                <div className="text-7xl md:text-9xl mb-4 drop-shadow-2xl">{giftDetails.icon}</div>
                <h1 className="text-2xl md:text-4xl font-black text-display mb-2">
                  A Gift of Climate Love
                </h1>
                <p className="text-lg md:text-xl text-sage-light/80">
                  {giftDetails.name}
                </p>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10">
              {/* Recipient Greeting */}
              <div className="text-center mb-8">
                <p className="text-2xl md:text-3xl text-off-white mb-2 font-display">
                  Dear <span className="text-emerald-400 font-black">{gift.recipientName}</span>,
                </p>
                <p className="text-base md:text-lg text-sage-light/60">
                  <span className="font-bold text-off-white">{gift.senderName}</span> has gifted you something special
                </p>
              </div>

              {/* Impact Display */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className={`bg-gradient-to-br ${giftDetails.bgGradient} rounded-2xl p-6 md:p-8 mb-8 text-center border border-white/10`}
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-5xl md:text-6xl font-black text-emerald-400 mb-2"
                >
                  {gift.quantity}
                </motion.div>
                <div className="text-lg md:text-xl text-sage-light/80 font-bold uppercase tracking-widest mb-2">
                  {giftDetails.impact}
                </div>
                <div className="text-sm text-sage-light/50">
                  Carbon offset value: <span className="text-emerald-400 font-black">${gift.totalCost}</span>
                </div>
                {gift.coordinates && gift.coordinates.lat && (
                  <div className="mt-4">
                    <a 
                      href={`https://www.google.com/maps?q=${gift.coordinates.lat},${gift.coordinates.lng}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs bg-white/10 px-4 py-2 rounded-full text-emerald-300 hover:bg-white/20 transition-all border border-white/10"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Impact Location: {gift.coordinates.lat.toFixed(4)}, {gift.coordinates.lng.toFixed(4)}
                    </a>
                  </div>
                )}
              </motion.div>

              {/* Personal Message */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/[0.03] rounded-2xl p-6 md:p-8 mb-8 border border-white/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
                  <div className="text-4xl md:text-5xl">💌</div>
                  {!isEditing && (
                    <button
                      onClick={handleEditClick}
                      className="text-xs bg-white/[0.05] text-emerald-400 px-4 py-2 rounded-xl border border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all font-bold flex items-center gap-2"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit Message
                    </button>
                  )}
                </div>
                
                <div className="relative z-10">
                  {isEditing ? (
                    <>
                      <textarea
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                        rows={6}
                        className="w-full p-4 bg-white/[0.03] border border-white/10 rounded-xl text-off-white placeholder:text-sage-light/30 focus:border-emerald-500/50 focus:outline-none resize-none font-display text-base md:text-lg leading-relaxed"
                        placeholder="Write your heartfelt message..."
                      />
                      <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-end">
                        <button
                          onClick={handleCancelEdit}
                          disabled={isSaving}
                          className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-white/20 text-sage-light hover:bg-white/5 transition-all disabled:opacity-50 font-bold flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          disabled={isSaving}
                          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/20 transition-all disabled:opacity-50 font-bold flex items-center justify-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-left mb-6">
                        <p className="text-base md:text-lg text-off-white font-display leading-relaxed whitespace-pre-wrap italic">
                          "{gift.message}"
                        </p>
                      </div>
                      <div className="text-right mt-6 pt-4 border-t border-white/10">
                        <p className="text-sm text-sage-light/60 font-display italic">
                          With love,
                        </p>
                        <p className="text-lg md:text-xl text-emerald-400 font-black mt-1 uppercase tracking-widest">
                          {gift.senderName}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/certificate/${giftId}`)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-bold text-sm md:text-base hover:shadow-lg hover:shadow-violet-500/20 transition-all flex items-center justify-center gap-2"
                >
                  📜 Get Certificate
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/gift/${giftId}/story`)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-bold text-sm md:text-base hover:shadow-lg hover:shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
                >
                  📸 Share to Story
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Impact Details */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-lg md:text-xl font-black mb-6 text-center uppercase tracking-widest text-sage-light/60">
                  Real-World Impact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {giftDetails.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/05"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-sm text-sage-light/70">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer Quote */}
              <div className="mt-8 text-center">
                <blockquote className="text-base text-sage-light/50 italic font-display">
                  "Every gift plants a seed of hope for our planet"
                </blockquote>
              </div>
            </div>
          </motion.div>

          {/* Thank You Note Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 glass-card p-6 md:p-8"
          >
            {!gift.thankYouNote?.message && !thankYouSent ? (
              <div>
                <h3 className="text-xl font-black mb-4 text-center flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 text-rose-400" />
                  Send a Thank You Note
                </h3>
                <p className="text-center text-sage-light/60 mb-6">
                  Let {gift.senderName} know you appreciate their thoughtful gift!
                </p>
                
                {!showThankYou ? (
                  <div className="text-center">
                    <button
                      onClick={() => setShowThankYou(true)}
                      className="bg-gradient-to-r from-violet-500 to-rose-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-violet-500/20 transition-all"
                    >
                      Write Thank You Note ✨
                    </button>
                  </div>
                ) : (
                  <div className="max-w-xl mx-auto animate-fade-in">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-sage-light/70 mb-2">
                          Your Name:
                        </label>
                        <input
                          type="text"
                          value={thankYouName}
                          onChange={(e) => setThankYouName(e.target.value)}
                          placeholder="Your name"
                          className="w-full p-4 bg-white/[0.03] border border-white/10 rounded-xl text-off-white placeholder:text-sage-light/30 focus:border-violet-500/50 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-sage-light/70 mb-2">
                          Your Message:
                        </label>
                        <textarea
                          value={thankYouMessage}
                          onChange={(e) => setThankYouMessage(e.target.value)}
                          placeholder="Thank you so much for this thoughtful gift! It really means a lot to me..."
                          rows={4}
                          className="w-full p-4 bg-white/[0.03] border border-white/10 rounded-xl text-off-white placeholder:text-sage-light/30 focus:border-violet-500/50 focus:outline-none resize-none"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleSendThankYou}
                          className="flex-1 bg-gradient-to-r from-violet-500 to-rose-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                        >
                          Send Thank You 💚
                        </button>
                        <button
                          onClick={() => setShowThankYou(false)}
                          className="px-6 py-3 border border-white/20 rounded-xl font-bold text-sage-light hover:bg-white/5 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-5xl mb-4">💚</div>
                <h3 className="text-xl font-black text-emerald-400 mb-2">
                  Thank You Note Sent!
                </h3>
                <p className="text-sage-light/60">
                  {gift.senderName} has been notified of your appreciation
                </p>
              </div>
            )}
          </motion.div>

          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 glass-card p-6 md:p-8"
          >
            <h3 className="text-xl font-black text-center mb-6 flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5 text-emerald-400" />
              Share the Love!
            </h3>
            <p className="text-center text-sage-light/60 mb-6">
              Inspire others to join the climate movement
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShareTwitter}
                className="flex items-center justify-center gap-2 bg-[#1DA1F2] text-white px-4 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                <TwitterIcon className="w-5 h-5" />
                Twitter
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShareWhatsApp}
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShareFacebook}
                className="flex items-center justify-center gap-2 bg-[#1877F2] text-white px-4 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                <FacebookIcon className="w-5 h-5" />
                Facebook
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-4 rounded-xl font-bold hover:bg-white/20 transition-all border border-white/10"
              >
                <Copy className="w-5 h-5" />
                Copy Link
              </motion.button>
            </div>
          </motion.div>

          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 glass-card p-6 md:p-8 text-center"
          >
            <h3 className="text-xl font-black mb-3 flex items-center justify-center gap-2">
              <Download className="w-5 h-5 text-emerald-400" />
              Print & Share
            </h3>
            <p className="text-sage-light/60 mb-6">
              Download this QR code to print on physical cards or share offline!
            </p>
            
            {qrCodeUrl && (
              <div className="flex flex-col items-center gap-6">
                <div className="bg-white p-4 rounded-2xl border-4 border-emerald-500 shadow-lg shadow-emerald-500/20">
                  <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 md:w-64 md:h-64" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadQR}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download QR Code
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/compose')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Leaf className="w-5 h-5" />
              Send Your Own Gift
            </button>
            <button
              onClick={() => navigate('/gallery')}
              className="px-8 py-4 bg-white/[0.05] text-off-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              🎁 View Gallery
            </button>
          </motion.div>

          {/* Back to Home */}
          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/')}
              className="text-sage-light/40 hover:text-emerald-400 font-bold uppercase tracking-[0.2em] text-xs transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              ← Return to Sanctuary
            </button>
          </div>
        </div>
      </div>
    </>
  );
}