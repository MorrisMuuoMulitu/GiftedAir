import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

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
  }
};

export default function Gallery() {
  const navigate = useNavigate();
  const [gifts, setGifts] = useState([]);
  const [filteredGifts, setFilteredGifts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [giftsRes, statsRes] = await Promise.all([
          fetch(`${API_URL}/api/gifts`),
          fetch(`${API_URL}/api/gifts/stats/summary`)
        ]);

        const giftsData = await giftsRes.json();
        const statsData = await statsRes.json();

        const allGifts = giftsData.gifts || [];
        setGifts(allGifts);
        setFilteredGifts(allGifts);
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
    if (type === 'all') {
      setFilteredGifts(gifts);
    } else {
      setFilteredGifts(gifts.filter(gift => gift.type === type));
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-forest mb-4">Gift Gallery</h1>
          <p className="text-xl text-gray-600">Celebrating every act of climate love</p>
        </div>

        {/* Impact Stats Dashboard */}
        {stats && (
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <h2 className="text-4xl font-bold text-forest text-center mb-3">
                🌍 Collective Impact
              </h2>
              <p className="text-center text-gray-600 mb-10">
                Every gift creates real change. Here's what we've achieved together.
              </p>
              
              {/* Main Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  icon="🎁"
                  value={stats.totalGifts}
                  label="Gifts of Love"
                  gradient="from-purple-500 to-pink-500"
                />
                <StatCard
                  icon="🌳"
                  value={stats.impact.treesPlanted}
                  label="Trees Planted"
                  gradient="from-green-500 to-emerald-600"
                />
                <StatCard
                  icon="💨"
                  value={stats.impact.co2Absorbed.toLocaleString()}
                  unit="lbs/year"
                  label="CO₂ Absorbed"
                  gradient="from-sky-500 to-blue-600"
                />
                <StatCard
                  icon="💰"
                  value={`$${stats.totalValue.toLocaleString()}`}
                  label="Climate Value"
                  gradient="from-amber-500 to-orange-600"
                />
              </div>

              {/* Secondary Stats */}
              {(stats.impact.familiesHelped > 0 || stats.impact.solarPanels > 0 || stats.impact.plasticRemoved > 0) && (
                <div className="pt-8 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.impact.familiesHelped > 0 && (
                      <SecondaryStatCard
                        icon="🏠"
                        value={stats.impact.familiesHelped}
                        label="Families with Clean Air"
                      />
                    )}
                    {stats.impact.solarPanels > 0 && (
                      <SecondaryStatCard
                        icon="☀️"
                        value={stats.impact.solarPanels}
                        label="Solar Panels"
                      />
                    )}
                    {stats.impact.plasticRemoved > 0 && (
                      <SecondaryStatCard
                        icon="🌊"
                        value={`${stats.impact.plasticRemoved} kg`}
                        label="Ocean Plastic Removed"
                      />
                    )}
                  </div>
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
              {gifts.length === 0 ? 'Be the first to create a gift!' : `${filteredGifts.length} ${filteredGifts.length === 1 ? 'gift' : 'gifts'} ${activeFilter !== 'all' ? `(${giftTypeDetails[activeFilter].name})` : 'spreading climate love'}`}
            </p>

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
            <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
              <div className="text-8xl mb-6">🎁</div>
              <p className="text-2xl text-gray-700 mb-4 font-semibold">No gifts yet!</p>
              <p className="text-lg text-gray-600 mb-8">Be the first to send a gift of climate love</p>
              <button
                onClick={() => navigate('/compose')}
                className="bg-forest text-white px-12 py-4 rounded-full text-lg font-semibold 
                         hover:bg-green-800 transition-all duration-300 transform hover:scale-105 
                         shadow-lg hover:shadow-xl"
              >
                Create First Gift
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGifts.map((gift, index) => (
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
  );
}

function StatCard({ icon, value, unit, label, gradient }) {
  return (
    <div className={`relative overflow-hidden bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}>
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className="relative flex flex-col items-center">
        <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-black mb-2 text-gray-900 leading-none">
            {value}
          </div>
          {unit && (
            <div className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">
              {unit}
            </div>
          )}
          <div className="text-base md:text-lg font-semibold text-gray-700">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondaryStatCard({ icon, value, label }) {
  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="text-4xl">{icon}</div>
      <div>
        <div className="text-2xl font-bold text-forest">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
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
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-500 text-xs font-medium">From:</span>
          <span className="text-forest text-sm font-bold">{gift.senderName}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-500 text-xs font-medium">To:</span>
          <span className="text-forest text-sm font-bold">{gift.recipientName}</span>
        </div>
        {gift.location && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl">📍</span>
            <span className="text-gray-600 text-xs font-medium">{gift.location}</span>
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
