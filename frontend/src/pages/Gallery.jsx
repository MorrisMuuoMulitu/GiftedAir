import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const giftTypeDetails = {
  tree: { icon: '🌳', color: 'bg-green-100 border-green-300', textColor: 'text-green-800' },
  cookstove: { icon: '🏡', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800' },
  solar: { icon: '☀️', color: 'bg-yellow-100 border-yellow-300', textColor: 'text-yellow-800' },
  ocean: { icon: '🌊', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800' }
};

export default function Gallery() {
  const navigate = useNavigate();
  const [gifts, setGifts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [giftsRes, statsRes] = await Promise.all([
          fetch(`${API_URL}/api/gifts`),
          fetch(`${API_URL}/api/gifts/stats/summary`)
        ]);

        const giftsData = await giftsRes.json();
        const statsData = await statsRes.json();

        setGifts(giftsData.gifts || []);
        setStats(statsData.stats);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-forest text-center mb-8">
              🌍 Collective Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <StatCard
                icon="🎁"
                value={stats.totalGifts}
                label="Gifts Sent"
                color="bg-gradient-to-br from-purple-400 to-purple-600"
              />
              <StatCard
                icon="🌳"
                value={stats.impact.treesPlanted}
                label="Trees Planted"
                color="bg-gradient-to-br from-green-400 to-green-600"
              />
              <StatCard
                icon="💨"
                value={`${stats.impact.co2Absorbed.toLocaleString()} lbs`}
                label="CO₂ Absorbed/Year"
                color="bg-gradient-to-br from-sky-400 to-sky-600"
              />
              <StatCard
                icon="💰"
                value={`$${stats.totalValue}`}
                label="Climate Value"
                color="bg-gradient-to-br from-amber-400 to-amber-600"
              />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {stats.impact.familiesHelped > 0 && (
                <StatCard
                  icon="🏠"
                  value={stats.impact.familiesHelped}
                  label="Families with Clean Air"
                  color="bg-gradient-to-br from-orange-400 to-orange-600"
                  small
                />
              )}
              {stats.impact.solarPanels > 0 && (
                <StatCard
                  icon="☀️"
                  value={stats.impact.solarPanels}
                  label="Solar Panels Installed"
                  color="bg-gradient-to-br from-yellow-400 to-yellow-600"
                  small
                />
              )}
              {stats.impact.plasticRemoved > 0 && (
                <StatCard
                  icon="🌊"
                  value={`${stats.impact.plasticRemoved} kg`}
                  label="Ocean Plastic Removed"
                  color="bg-gradient-to-br from-cyan-400 to-cyan-600"
                  small
                />
              )}
            </div>
          </div>
        )}

        {/* Gifts Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-forest text-center mb-8">
            💝 All Gifts
          </h2>
          
          {gifts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎁</div>
              <p className="text-xl text-gray-600 mb-6">No gifts yet. Be the first to create one!</p>
              <button
                onClick={() => navigate('/compose')}
                className="bg-forest text-white px-8 py-3 rounded-full font-semibold 
                         hover:bg-green-800 transition-all duration-300 transform hover:scale-105 
                         shadow-lg"
              >
                Create First Gift
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gifts.map((gift) => (
                <GiftCard key={gift._id} gift={gift} onClick={() => navigate(`/gift/${gift._id}`)} />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-forest mb-4">
            Ready to Send a Gift?
          </h3>
          <p className="text-gray-600 mb-6">
            Transform your love into climate action
          </p>
          <button
            onClick={() => navigate('/compose')}
            className="bg-forest text-white px-12 py-4 rounded-full text-xl font-semibold 
                     hover:bg-green-800 transition-all duration-300 transform hover:scale-105 
                     shadow-lg hover:shadow-xl"
          >
            Create a Gift
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

function StatCard({ icon, value, label, color, small = false }) {
  return (
    <div className={`${color} rounded-2xl p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105`}>
      <div className={`text-center ${small ? 'text-4xl' : 'text-5xl'} mb-2`}>{icon}</div>
      <div className={`text-center ${small ? 'text-2xl' : 'text-3xl'} font-bold mb-1`}>{value}</div>
      <div className={`text-center ${small ? 'text-sm' : 'text-base'} opacity-90`}>{label}</div>
    </div>
  );
}

function GiftCard({ gift, onClick }) {
  const details = giftTypeDetails[gift.type];
  const truncateMessage = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      onClick={onClick}
      className={`${details.color} border-2 rounded-2xl p-6 cursor-pointer 
                  transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-5xl">{details.icon}</div>
        <div className={`${details.textColor} text-right`}>
          <div className="text-2xl font-bold">{gift.quantity}</div>
          <div className="text-sm opacity-75">
            {gift.type === 'tree' && 'trees'}
            {gift.type === 'cookstove' && 'stoves'}
            {gift.type === 'solar' && 'panels'}
            {gift.type === 'ocean' && 'kg'}
          </div>
        </div>
      </div>

      {/* Names */}
      <div className="mb-4">
        <p className={`${details.textColor} text-sm font-semibold`}>
          From: {gift.senderName}
        </p>
        <p className={`${details.textColor} text-sm font-semibold`}>
          To: {gift.recipientName}
        </p>
      </div>

      {/* Message Preview */}
      <div className="bg-white bg-opacity-50 rounded-lg p-3 mb-4">
        <p className={`${details.textColor} text-sm italic line-clamp-3`}>
          "{truncateMessage(gift.message)}"
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className={`${details.textColor} text-xs opacity-75`}>
          {new Date(gift.createdAt).toLocaleDateString()}
        </span>
        <span className={`${details.textColor} text-sm font-semibold`}>
          ${gift.totalCost}
        </span>
      </div>
    </div>
  );
}
