import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import SEO from '../components/SEO';

const giftTypeDetails = {
  tree: {
    icon: '🌳',
    name: 'Tree Planting',
    color: 'from-green-400 to-green-600',
    impact: 'Trees planted',
    bgGradient: 'from-green-500 to-emerald-700'
  },
  cookstove: {
    icon: '🏡',
    name: 'Clean Cookstove',
    color: 'from-amber-500 to-orange-600',
    impact: 'Stoves provided',
    bgGradient: 'from-orange-500 to-amber-700'
  },
  solar: {
    icon: '☀️',
    name: 'Solar Panel',
    color: 'from-yellow-400 to-orange-500',
    impact: 'Panels installed',
    bgGradient: 'from-yellow-500 to-orange-700'
  },
  ocean: {
    icon: '🌊',
    name: 'Ocean Cleanup',
    color: 'from-blue-400 to-cyan-600',
    impact: 'Kg of plastic removed',
    bgGradient: 'from-blue-500 to-cyan-700'
  },
  coral: {
    icon: '🪸',
    name: 'Coral Reef Restoration',
    color: 'from-pink-400 to-rose-600',
    impact: 'Coral fragments planted',
    bgGradient: 'from-pink-500 to-rose-700'
  },
  wildlife: {
    icon: '🦁',
    name: 'Wildlife Conservation',
    color: 'from-amber-600 to-yellow-700',
    impact: 'Animals protected',
    bgGradient: 'from-amber-600 to-yellow-800'
  },
  water: {
    icon: '💧',
    name: 'Clean Water Access',
    color: 'from-blue-400 to-sky-600',
    impact: 'People with clean water',
    bgGradient: 'from-blue-500 to-sky-700'
  },
  rainforest: {
    icon: '🌴',
    name: 'Rainforest Protection',
    color: 'from-green-600 to-emerald-700',
    impact: 'Acres protected',
    bgGradient: 'from-green-600 to-emerald-800'
  }
};

export default function GiftStory() {
  const { giftId } = useParams();
  const navigate = useNavigate();
  const [gift, setGift] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gifts/${giftId}`);
        const data = await response.json();
        
        if (response.ok && data.gift) {
          setGift(data.gift);
        }
      } catch (err) {
        console.error('Error fetching gift:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGift();
  }, [giftId]);

  if (loading || !gift) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white animate-pulse">🌿 Loading...</div>
      </div>
    );
  }

  const giftDetails = giftTypeDetails[gift.type];

  return (
    <>
      <SEO 
        title={`Climate Gift - ${gift.recipientName}`}
        description={`Check out this environmental gift for ${gift.recipientName}`}
        noIndex={true}
      />
      
      {/* 9:16 Aspect Ratio Container (Portrait) */}
      <div className={`min-h-screen bg-gradient-to-br ${giftDetails.bgGradient} flex flex-col items-center justify-center p-4 md:p-6 text-white relative overflow-hidden`}>
        
        {/* Impact Image Background */}
        {gift.impactImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={gift.impactImage} 
              alt="Impact Location" 
              className="w-full h-full object-cover opacity-30 scale-110 blur-xl"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${giftDetails.bgGradient} mix-blend-multiply opacity-60`}></div>
          </div>
        )}
        
        {/* Floating Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-12 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="relative z-10 w-full max-w-sm md:max-w-md bg-white/10 backdrop-blur-md rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 border border-white/20 shadow-2xl flex flex-col items-center text-center">
          
          {/* Brand Logo */}
          <div className="mb-6 md:mb-8 flex items-center gap-2">
            <span className="text-2xl md:text-3xl">🌿</span>
            <span className="text-lg md:text-xl font-bold tracking-tight">Gifted Air</span>
          </div>

          {/* Animated Icon */}
          <div className="text-8xl md:text-[10rem] mb-8 md:mb-10 drop-shadow-2xl animate-grow">
            {giftDetails.icon}
          </div>

          {/* Impact Text */}
          <div className="mb-8 md:mb-10">
            <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
              {gift.quantity}
            </h1>
            <p className="text-lg md:text-xl font-medium opacity-90 uppercase tracking-widest">
              {giftDetails.impact}
            </p>
          </div>

          {/* Personalization */}
          <div className="mb-8 md:mb-12">
            <p className="text-base md:text-lg opacity-80 mb-1 md:mb-2 italic font-poetic">Gifted to</p>
            <p className="text-3xl md:text-4xl font-black mb-4 md:mb-6">{gift.recipientName}</p>
            
            <div className="w-12 md:w-16 h-1 bg-white/30 mx-auto mb-4 md:mb-6"></div>
            
            <p className="text-base md:text-lg opacity-80 mb-1 md:mb-2 italic font-poetic">from</p>
            <p className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{gift.senderName}</p>

            {gift.location && (
              <div className="flex items-center gap-2 justify-center opacity-80 mt-4 text-[10px] md:text-sm bg-black/20 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                <span>📍</span>
                <span>Climate love from {gift.location}</span>
              </div>
            )}
          </div>

          {/* CTA / Website */}
          <div className="mt-auto">
            <div className="bg-white/10 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-white/10 inline-block mb-3 md:mb-4">
              <span className="font-bold tracking-widest text-[10px] md:text-sm uppercase text-white/90">Join the Movement</span>
            </div>
            <p className="text-sm md:text-base font-medium opacity-60">gifted-air.vercel.app</p>
          </div>
        </div>

        {/* Action Button (Hidden in screenshot) */}
        <div className="fixed bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 transition-opacity">
          <button
            onClick={() => navigate(`/gift/${giftId}`)}
            className="px-6 md:px-8 py-3 md:py-4 bg-white text-emerald-900 rounded-full font-black shadow-xl hover:scale-105 active:scale-95 transition-all text-sm md:text-base"
          >
            ← Back to Gift
          </button>
          <p className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">Screenshot to Share 📸</p>
        </div>

        {/* Floating Animation Styles */}
        <style>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-40px) rotate(5deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-20px) rotate(-3deg); }
          }
          .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-grow { animation: grow 3s ease-in-out infinite; }
          @keyframes grow {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(255,255,255,0)); }
            50% { transform: scale(1.1); filter: drop-shadow(0 0 20px rgba(255,255,255,0.4)); }
          }
        `}</style>
      </div>
    </>
  );
}
