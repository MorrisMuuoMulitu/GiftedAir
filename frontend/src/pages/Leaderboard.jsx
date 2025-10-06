import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { API_URL } from '../config';

const badgeInfo = {
  gold: {
    icon: '🥇',
    color: 'from-yellow-400 to-yellow-600',
    textColor: 'text-yellow-600',
    borderColor: 'border-yellow-400',
    bgColor: 'bg-yellow-50',
    label: 'Gold Champion'
  },
  silver: {
    icon: '🥈',
    color: 'from-gray-300 to-gray-500',
    textColor: 'text-gray-600',
    borderColor: 'border-gray-400',
    bgColor: 'bg-gray-50',
    label: 'Silver Hero'
  },
  bronze: {
    icon: '🥉',
    color: 'from-orange-400 to-orange-600',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-400',
    bgColor: 'bg-orange-50',
    label: 'Bronze Star'
  }
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gifts/leaderboard/top`);
        const data = await response.json();
        setLeaderboard(data.leaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Filter leaderboard by search query
  const filteredLeaderboard = leaderboard.filter(person =>
    searchQuery === '' ||
    person.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🏆</div>
          <p className="text-xl text-gray-600">Loading Leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-forest text-white px-6 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
              🏆 CLIMATE CHAMPIONS
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-4">
              Leaderboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Celebrating the most generous climate champions making real impact!
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-12 border-2 border-gray-200 rounded-xl text-lg focus:border-yellow-500 focus:outline-none shadow-sm hover:shadow-md transition-shadow"
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
              {filteredLeaderboard.length > 0 && leaderboard.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  Showing {filteredLeaderboard.length} of {leaderboard.length} heroes
                </p>
              )}
            </div>
          </div>

        {/* Podium - Top 3 */}
        {leaderboard.length >= 3 && (
          <div className="mb-16">
            <div className="flex items-end justify-center gap-4 mb-8">
              {/* 2nd Place */}
              <PodiumCard person={leaderboard[1]} position={2} />
              
              {/* 1st Place */}
              <PodiumCard person={leaderboard[0]} position={1} />
              
              {/* 3rd Place */}
              <PodiumCard person={leaderboard[2]} position={3} />
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-forest mb-6 text-center">
            {searchQuery ? '🔍 Search Results' : '🌟 All Champions'}
          </h2>
          
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <LoadingSkeleton key={i} type="list" />
              ))}
            </div>
          ) : leaderboard.length === 0 ? (
            <EmptyState
              icon="🏆"
              title="No leaderboard yet"
              description="Be the first climate hero! Send a gift to claim the top spot."
              actionLabel="Send Your First Gift"
              actionPath="/compose"
            />
          ) : filteredLeaderboard.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No heroes found"
              description={`No results for "${searchQuery}"`}
              actionLabel="Send Your First Gift"
              actionPath="/compose"
            />
          ) : (
          <div className="space-y-4">
            {filteredLeaderboard.map((person) => (
              <LeaderboardRow key={person.name} person={person} />
            ))}
          </div>
          )}
            
            {/* {leaderboard.length === 0 && (
              <div className="text-center py-12">
                <p className="text-2xl text-gray-500 mb-4">🌱</p>
                <p className="text-gray-600">No gifts yet. Be the first champion!</p>
                <button
                  onClick={() => navigate('/compose')}
                  className="mt-6 bg-forest text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition-all"
                >
                  Create Your First Gift
                </button>
              </div>
            )} */}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-forest mb-4">
            Want to join the leaderboard?
          </h3>
          <p className="text-gray-700 mb-6">
            Start gifting climate action and see your impact grow!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/compose')}
              className="bg-forest text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Create a Gift
            </button>
            <button
              onClick={() => navigate('/gallery')}
              className="bg-white text-forest border-2 border-forest px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-all"
            >
              View Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PodiumCard({ person, position }) {
  const badge = badgeInfo[person.badge];
  const heights = {
    1: 'h-64',
    2: 'h-48',
    3: 'h-40'
  };
  
  return (
    <div className={`flex flex-col items-center ${position === 1 ? 'w-48' : 'w-40'}`}>
      {/* Person Card */}
      <div className={`bg-gradient-to-br ${badge.color} rounded-2xl p-6 shadow-2xl mb-4 transform ${position === 1 ? 'scale-110' : ''} hover:scale-105 transition-transform`}>
        <div className="text-center">
          <div className="text-6xl mb-3">{badge.icon}</div>
          <div className="text-white">
            <h3 className="font-black text-xl mb-1 drop-shadow-md">{person.name}</h3>
            {person.location && (
              <p className="text-sm opacity-90 mb-2">📍 {person.location}</p>
            )}
            <div className="bg-white/30 rounded-lg p-2 mt-3">
              <p className="text-2xl font-black">{person.totalGifts}</p>
              <p className="text-xs uppercase font-bold">Gifts</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Podium Base */}
      <div className={`w-full ${heights[position]} bg-gradient-to-br ${badge.color} rounded-t-xl flex items-center justify-center`}>
        <div className="text-white text-center">
          <div className="text-5xl font-black drop-shadow-lg">{position}</div>
          <div className="text-sm font-bold uppercase opacity-90">Place</div>
        </div>
      </div>
    </div>
  );
}

function LeaderboardRow({ person }) {
  const badge = person.badge ? badgeInfo[person.badge] : null;
  
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border-2 ${badge ? `${badge.borderColor} ${badge.bgColor}` : 'border-gray-200 bg-gray-50'} hover:shadow-lg transition-all`}>
      {/* Rank */}
      <div className="text-center w-12">
        {badge ? (
          <div className="text-3xl">{badge.icon}</div>
        ) : (
          <div className="text-2xl font-bold text-gray-600">#{person.rank}</div>
        )}
      </div>
      
      {/* Name & Location */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
        {person.location && (
          <p className="text-sm text-gray-600">📍 {person.location}</p>
        )}
      </div>
      
      {/* Stats */}
      <div className="flex gap-6 text-center">
        <div>
          <div className="text-2xl font-black text-forest">{person.totalGifts}</div>
          <div className="text-xs text-gray-600 uppercase font-bold">Gifts</div>
        </div>
        
        {person.totalTrees > 0 && (
          <div>
            <div className="text-2xl font-black text-green-600">{person.totalTrees}</div>
            <div className="text-xs text-gray-600 uppercase font-bold">Trees</div>
          </div>
        )}
        
        <div>
          <div className="text-2xl font-black text-blue-600">${person.totalValue}</div>
          <div className="text-xs text-gray-600 uppercase font-bold">Value</div>
        </div>
      </div>
    </div>
  );
}
