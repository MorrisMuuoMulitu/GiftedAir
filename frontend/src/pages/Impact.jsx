import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import EmptyState from '../components/EmptyState';
import { API_URL } from '../config';

export default function Impact() {
  const [senderName, setSenderName] = useState('');
  const [stats, setStats] = useState(null);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!senderName.trim()) return;

    setLoading(true);
    setNotFound(false);
    
    try {
      const response = await fetch(`${API_URL}/api/gifts/impact/${encodeURIComponent(senderName)}`);
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setGifts(data.gifts);
      } else {
        setNotFound(true);
        setStats(null);
      }
    } catch (error) {
      console.error('Error fetching impact:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-forest text-white px-6 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
            📊 YOUR CLIMATE IMPACT
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Personal Impact Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See the real difference you've made through your gifts
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-8">
            <label className="block text-xl font-bold text-forest mb-4">
              Enter Your Name
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g., Morris, Jane Smith..."
                className="flex-1 p-4 border-2 border-gray-300 rounded-xl focus:border-forest focus:outline-none text-lg"
              />
              <button
                type="submit"
                disabled={loading || !senderName.trim()}
                className="bg-forest text-white px-8 py-4 rounded-xl font-bold hover:bg-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'View Impact'}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              💡 Enter the exact name you used when creating gifts
            </p>
          </form>

          {notFound && (
            <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-600 font-bold mb-2">No gifts found for "{senderName}"</p>
              <p className="text-gray-600">Make sure you entered the exact name you used when creating gifts.</p>
              <button
                onClick={() => navigate('/compose')}
                className="mt-4 bg-forest text-white px-6 py-2 rounded-full font-bold hover:bg-green-800 transition-all"
              >
                Create Your First Gift
              </button>
            </div>
          )}
        </div>

        {/* Stats Display */}
        {stats && (
          <div className="space-y-8">
            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                icon="🎁"
                value={stats.totalGifts}
                label="Gifts Sent"
                gradient="from-purple-500 to-pink-600"
              />
              <StatCard
                icon="💰"
                value={`$${stats.totalValue}`}
                label="Climate Value"
                gradient="from-amber-500 to-orange-600"
              />
              <StatCard
                icon="🌟"
                value={stats.impact.totalImpactScore.toLocaleString()}
                label="Impact Score"
                gradient="from-blue-500 to-indigo-600"
              />
              <StatCard
                icon="❤️"
                value={stats.uniqueRecipients}
                label="Recipients"
                gradient="from-red-500 to-pink-600"
              />
            </div>

            {/* Impact Details */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-forest mb-6 text-center">
                🌍 Your Climate Impact
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.impact.treesPlanted > 0 && (
                  <ImpactDetail
                    icon="🌳"
                    value={stats.impact.treesPlanted}
                    label="Trees Planted"
                    sublabel={`${stats.impact.co2Absorbed} lbs CO₂ absorbed/year`}
                    color="text-green-600"
                  />
                )}
                
                {stats.impact.familiesHelped > 0 && (
                  <ImpactDetail
                    icon="🏠"
                    value={stats.impact.familiesHelped}
                    label="Families with Clean Air"
                    sublabel="Lives improved every day"
                    color="text-orange-600"
                  />
                )}
                
                {stats.impact.solarPanels > 0 && (
                  <ImpactDetail
                    icon="☀️"
                    value={stats.impact.solarPanels}
                    label="Solar Panels"
                    sublabel={`${stats.impact.solarPanels * 300}W clean energy`}
                    color="text-yellow-600"
                  />
                )}
                
                {stats.impact.plasticRemoved > 0 && (
                  <ImpactDetail
                    icon="🌊"
                    value={`${stats.impact.plasticRemoved}kg`}
                    label="Ocean Plastic Removed"
                    sublabel="Protecting marine life"
                    color="text-blue-600"
                  />
                )}
              </div>
            </div>

            {/* Gift Breakdown */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-forest mb-6 text-center">
                🎁 Your Gift Breakdown
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(stats.byType).map(([type, data]) => {
                  if (data.count === 0) return null;
                  const typeInfo = {
                    tree: { icon: '🌳', name: 'Trees', color: 'bg-green-100 text-green-800' },
                    cookstove: { icon: '🏡', name: 'Cookstoves', color: 'bg-orange-100 text-orange-800' },
                    solar: { icon: '☀️', name: 'Solar', color: 'bg-yellow-100 text-yellow-800' },
                    ocean: { icon: '🌊', name: 'Ocean', color: 'bg-blue-100 text-blue-800' }
                  };
                  const info = typeInfo[type];
                  
                  return (
                    <div key={type} className={`${info.color} rounded-xl p-4 text-center`}>
                      <div className="text-4xl mb-2">{info.icon}</div>
                      <div className="text-3xl font-black mb-1">{data.quantity}</div>
                      <div className="text-sm font-bold">{info.name}</div>
                      <div className="text-xs opacity-75">{data.count} gifts</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Journey Stats */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center text-forest mb-6">
                📅 Your Climate Journey
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-gray-600 font-bold mb-2">First Gift</div>
                  <div className="text-xl font-black text-forest">
                    {new Date(stats.firstGift).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 font-bold mb-2">Latest Gift</div>
                  <div className="text-xl font-black text-forest">
                    {new Date(stats.lastGift).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 font-bold mb-2">Locations</div>
                  <div className="text-xl font-black text-forest">
                    {stats.locations.length > 0 ? stats.locations.join(', ') : 'Not specified'}
                  </div>
                </div>
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-white rounded-2xl p-8 text-center border-2 border-forest">
              <h3 className="text-2xl font-bold text-forest mb-4">
                🌟 Share Your Impact!
              </h3>
              <p className="text-gray-600 mb-6">
                Inspire others by sharing your climate contributions
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => {
                    const text = `I've sent ${stats.totalGifts} climate gifts through Gifted Air! 🌿\n${stats.impact.treesPlanted > 0 ? `🌳 ${stats.impact.treesPlanted} trees planted\n` : ''}💚 Total impact: ${stats.impact.totalImpactScore.toLocaleString()} points\n\nJoin me in spreading climate love!`;
                    const url = 'https://gifted-air.vercel.app';
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                  }}
                  className="bg-[#1DA1F2] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1a8cd8] transition-all"
                >
                  Share on Twitter
                </button>
                <button
                  onClick={() => navigate('/compose')}
                  className="bg-forest text-white px-6 py-3 rounded-full font-bold hover:bg-green-800 transition-all"
                >
                  Send Another Gift
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, gradient }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-xl text-center transform transition-all hover:scale-105`}>
      <div className="text-5xl mb-3">{icon}</div>
      <div className="text-4xl font-black mb-2">{value}</div>
      <div className="text-sm font-bold uppercase opacity-90">{label}</div>
    </div>
  );
}

function ImpactDetail({ icon, value, label, sublabel, color }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
      <div className="text-5xl">{icon}</div>
      <div>
        <div className={`text-3xl font-black ${color}`}>{value}</div>
        <div className="text-base font-bold text-gray-900">{label}</div>
        <div className="text-sm text-gray-600">{sublabel}</div>
      </div>
    </div>
  );
}
