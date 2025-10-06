import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import Navigation from '../components/Navigation';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import SEO, { SEOConfig } from '../components/SEO';

const giftTypeDetails = {
  tree: { 
    icon: '🌳', 
    color: 'bg-green-100 border-green-300', 
    textColor: 'text-green-800',
    name: 'Trees',
    gradient: 'from-green-400 to-emerald-500'
  },
  cookstove: { 
    icon: '🏡', 
    color: 'bg-orange-100 border-orange-300', 
    textColor: 'text-orange-800',
    name: 'Cookstoves',
    gradient: 'from-orange-400 to-red-500'
  },
  solar: { 
    icon: '☀️', 
    color: 'bg-yellow-100 border-yellow-300', 
    textColor: 'text-yellow-800',
    name: 'Solar',
    gradient: 'from-yellow-400 to-orange-500'
  },
  ocean: { 
    icon: '🌊', 
    color: 'bg-blue-100 border-blue-300', 
    textColor: 'text-blue-800',
    name: 'Ocean',
    gradient: 'from-blue-400 to-cyan-500'
  },
  coral: { 
    icon: '🪸', 
    color: 'bg-pink-100 border-pink-300', 
    textColor: 'text-pink-800',
    name: 'Coral Reef',
    gradient: 'from-pink-400 to-rose-500'
  },
  wildlife: { 
    icon: '🦁', 
    color: 'bg-amber-100 border-amber-400', 
    textColor: 'text-amber-900',
    name: 'Wildlife',
    gradient: 'from-amber-400 to-yellow-600'
  },
  water: { 
    icon: '💧', 
    color: 'bg-sky-100 border-sky-300', 
    textColor: 'text-sky-800',
    name: 'Clean Water',
    gradient: 'from-blue-300 to-sky-500'
  },
  rainforest: { 
    icon: '🌴', 
    color: 'bg-emerald-100 border-emerald-400', 
    textColor: 'text-emerald-900',
    name: 'Rainforest',
    gradient: 'from-green-500 to-emerald-600'
  }
};

export default function Gallery() {
  const navigate = useNavigate();
  const [gifts, setGifts] = useState([]);
  const [filteredGifts, setFilteredGifts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [giftsRes, statsRes] = await Promise.all([
          fetch(`${API_URL}/api/gifts`),
          fetch(`${API_URL}/api/gifts/stats/summary`)
        ]);

        const giftsData = await giftsRes.json();
        const statsData = await statsRes.json();

        // Only show gifts that are pinned to gallery (showInGallery === true)
        const allGifts = giftsData.gifts || [];
        const galleryGifts = allGifts.filter(gift => gift.showInGallery !== false);
        setGifts(galleryGifts);
        setFilteredGifts(galleryGifts);
        setStats(statsData.stats);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (type) => {
    setActiveFilter(type);
  };

  // Apply both type filter and search filter
  const displayedGifts = gifts
    .filter(gift => activeFilter === 'all' || gift.type === activeFilter)
    .filter(gift => 
      searchQuery === '' ||
      gift.senderName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.recipientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.message?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">🌿</div>
          <p className="text-2xl text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO {...SEOConfig.gallery} />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-forest mb-4">Gift Gallery</h1>
          <p className="text-xl text-gray-600">Celebrating every act of climate love</p>
        </div>

        {/* Impact Stats Dashboard - COMPLETELY REDESIGNED */}
        {stats && (
          <div className="mb-16 relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 rounded-3xl blur-3xl opacity-30"></div>
            
            <div className="relative">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-block bg-forest text-white px-6 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
                  🌍 OUR COLLECTIVE IMPACT
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                  Together We're Making History
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Every gift is a step towards a healthier planet. Here's the real impact we've created.
                </p>
              </div>
              
              {/* Main Stats - Hero Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <ImpactCard
                  icon="🎁"
                  value={stats.totalGifts}
                  label="Gifts Sent"
                  bgColor="bg-gradient-to-br from-purple-500 to-pink-600"
                />
                <ImpactCard
                  icon="🌳"
                  value={stats.impact.treesPlanted}
                  label="Trees Planted"
                  bgColor="bg-gradient-to-br from-green-500 to-emerald-600"
                />
                <ImpactCard
                  icon="💨"
                  value={stats.impact.co2Absorbed.toLocaleString()}
                  label="lbs CO₂/year"
                  bgColor="bg-gradient-to-br from-sky-500 to-blue-600"
                />
                <ImpactCard
                  icon="💰"
                  value={`$${stats.totalValue.toLocaleString()}`}
                  label="Climate Value"
                  bgColor="bg-gradient-to-br from-amber-500 to-orange-600"
                />
              </div>

              {/* Secondary Stats - Clean Inline */}
              {(stats.impact.familiesHelped > 0 || stats.impact.solarPanels > 0 || stats.impact.plasticRemoved > 0) && (
                <div className="flex flex-wrap justify-center gap-6 bg-white/50 backdrop-blur-sm rounded-2xl p-6">
                  {stats.impact.familiesHelped > 0 && (
                    <MiniStat icon="🏠" value={stats.impact.familiesHelped} label="Families Helped" />
                  )}
                  {stats.impact.solarPanels > 0 && (
                    <MiniStat icon="☀️" value={stats.impact.solarPanels} label="Solar Panels" />
                  )}
                  {stats.impact.plasticRemoved > 0 && (
                    <MiniStat icon="🌊" value={`${stats.impact.plasticRemoved}kg`} label="Plastic Removed" />
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gifts Grid */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-forest mb-3">
              💝 Gift Gallery
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {gifts.length === 0 ? 'Be the first to create a gift!' : `${displayedGifts.length} ${displayedGifts.length === 1 ? 'gift' : 'gifts'} ${activeFilter !== 'all' ? `(${giftTypeDetails[activeFilter].name})` : 'spreading climate love'}`}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search by sender, recipient, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-12 border-2 border-gray-200 rounded-xl text-lg focus:border-forest focus:outline-none shadow-sm hover:shadow-md transition-shadow"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Filter Buttons */}
            {gifts.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <FilterButton
                  active={activeFilter === 'all'}
                  onClick={() => handleFilter('all')}
                  count={gifts.length}
                >
                  All Gifts
                </FilterButton>
                {Object.entries(giftTypeDetails).map(([key, details]) => {
                  const count = gifts.filter(g => g.type === key).length;
                  if (count === 0) return null;
                  return (
                    <FilterButton
                      key={key}
                      active={activeFilter === key}
                      onClick={() => handleFilter(key)}
                      icon={details.icon}
                      count={count}
                      gradient={details.gradient}
                    >
                      {details.name}
                    </FilterButton>
                  );
                })}
              </div>
            )}
          </div>
          
          {gifts.length === 0 ? (
            <EmptyState
              icon="🎁"
              title="No gifts yet!"
              description="Be the first to send a gift of climate love"
              actionLabel="Create First Gift"
              actionPath="/compose"
            />
          ) : displayedGifts.length === 0 ? (
            <EmptyState
              icon={searchQuery ? '🔍' : '🎁'}
              title={searchQuery ? 'No gifts found' : `No ${giftTypeDetails[activeFilter]?.name || ''} gifts yet`}
              description={searchQuery ? `No results for "${searchQuery}"` : 'Try a different filter or send the first one!'}
              actionLabel="Send First Gift"
              actionPath="/compose"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedGifts.map((gift, index) => (
                <GiftCard 
                  key={gift._id} 
                  gift={gift} 
                  onClick={() => navigate(`/gift/${gift._id}`)}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-br from-forest to-green-700 rounded-3xl p-12 shadow-2xl text-white">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-3xl font-bold mb-4">
            Ready to Send a Gift?
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Transform your love into climate action. Create a beautiful gift that makes a real difference.
          </p>
          <button
            onClick={() => navigate('/compose')}
            className="bg-white text-forest px-12 py-4 rounded-full text-xl font-bold 
                     hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 
                     shadow-lg hover:shadow-xl"
          >
            Create a Gift Now
          </button>
        </div>

        {/* Back to Home */}
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
    </>
  );
}

function ImpactCard({ icon, value, label, bgColor }) {
  // Special darker blue for CO2 card for better visibility
  const finalBgColor = label.includes('CO₂') 
    ? 'bg-gradient-to-br from-blue-600 to-indigo-700' 
    : bgColor;
    
  return (
    <div className={`${finalBgColor} rounded-2xl p-6 text-white shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2`}>
      <div className="flex flex-col items-center text-center">
        <div className="text-5xl md:text-6xl mb-3 drop-shadow-lg">
          {icon}
        </div>
        <div className="text-3xl md:text-5xl font-black mb-2 drop-shadow-md">
          {value}
        </div>
        <div className="text-sm md:text-base font-bold uppercase tracking-wider opacity-95">
          {label}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon, value, label }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-gray-100">
      <span className="text-4xl">{icon}</span>
      <div>
        <div className="text-2xl font-black text-gray-900">{value}</div>
        <div className="text-sm text-gray-700 font-semibold">{label}</div>
      </div>
    </div>
  );
}

function FilterButton({ children, active, onClick, icon, count, gradient }) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
        active 
          ? 'bg-forest text-white shadow-lg' 
          : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-forest'
      }`}
    >
      {active && gradient && (
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-20`}></div>
      )}
      <span className="relative flex items-center gap-2">
        {icon && <span className="text-xl">{icon}</span>}
        <span>{children}</span>
        <span className={`text-xs ${active ? 'text-white' : 'text-gray-500'} ml-1`}>
          ({count})
        </span>
      </span>
    </button>
  );
}

function GiftCard({ gift, onClick, index }) {
  const details = giftTypeDetails[gift.type];
  const truncateMessage = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 cursor-pointer 
                  transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-forest group
                  animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className={`${details.color} rounded-xl p-3 border-2`}>
          <div className="text-4xl">{details.icon}</div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-forest">{gift.quantity}</div>
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {gift.type === 'tree' && 'trees'}
            {gift.type === 'cookstove' && 'stoves'}
            {gift.type === 'solar' && 'panels'}
            {gift.type === 'ocean' && 'kg plastic'}
          </div>
        </div>
      </div>

      {/* Names and Location */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-500 text-xs font-bold uppercase tracking-wide">From:</span>
          <span className="text-forest text-base font-bold">{gift.senderName}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-500 text-xs font-bold uppercase tracking-wide">To:</span>
          <span className="text-forest text-base font-bold">{gift.recipientName}</span>
        </div>
        {gift.location && (
          <div className="flex items-center gap-2 mt-3 bg-green-50 rounded-lg px-3 py-2 border border-green-200">
            <span className="text-2xl">📍</span>
            <span className="text-gray-700 text-sm font-semibold">{gift.location}</span>
          </div>
        )}
      </div>

      {/* Message Preview */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-4 min-h-[100px] border border-amber-200">
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 italic">
          "{truncateMessage(gift.message)}"
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <span className="text-xs text-gray-500 font-medium">
          {new Date(gift.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <span className="text-lg font-bold text-forest">
          ${gift.totalCost}
        </span>
      </div>

      {/* Hover indicator */}
      <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs text-forest font-semibold">
          Click to view →
        </span>
      </div>
    </div>
  );
}
