import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Search, Crown, Medal, Award, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { API_URL } from '../config';

const badgeInfo = {
  gold: {
    icon: '🥇',
    gradient: 'from-yellow-400 to-yellow-600',
    glowColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-400/30',
    textColor: 'text-yellow-400',
    label: 'Gold Champion'
  },
  silver: {
    icon: '🥈',
    gradient: 'from-gray-300 to-gray-500',
    glowColor: 'bg-gray-500/20',
    borderColor: 'border-gray-400/30',
    textColor: 'text-gray-400',
    label: 'Silver Hero'
  },
  bronze: {
    icon: '🥉',
    gradient: 'from-orange-400 to-orange-600',
    glowColor: 'bg-orange-500/20',
    borderColor: 'border-orange-400/30',
    textColor: 'text-orange-400',
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

  const filteredLeaderboard = leaderboard.filter(person =>
    searchQuery === '' ||
    person.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🏆</div>
          <p className="text-xl font-black uppercase tracking-[0.3em] text-teal-400 animate-pulse">Loading Rankings</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-off-white pb-32 overflow-x-hidden">
      <Navigation />

      <div className="container mx-auto px-4 max-w-5xl pt-32">
        {/* Cinematic Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-deep/30 border border-teal-deep/50 rounded-full text-teal-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
            <Trophy className="w-4 h-4" /> Climate Champions
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">
            Leader<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-bronze to-teal-400 bg-[length:200%_auto] animate-gradient">board.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Celebrating the most generous climate champions making real impact!
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-hover:text-bronze transition-colors" />
            <input
              type="text"
              placeholder="Search champions by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl py-6 pl-16 pr-12 text-lg focus:border-bronze outline-none transition-all shadow-2xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-off-white text-xl font-bold transition-colors"
              >
                ✕
              </button>
            )}
          </motion.div>
          {filteredLeaderboard.length > 0 && leaderboard.length > 0 && (
            <p className="text-sm text-slate-500 mt-3 text-center font-black uppercase tracking-widest">
              Showing {filteredLeaderboard.length} of {leaderboard.length} champions
            </p>
          )}
        </div>

        {/* Podium - Top 3 */}
        {leaderboard.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <div className="flex items-end justify-center gap-4">
              {/* 2nd Place */}
              <PodiumCard person={leaderboard[1]} position={2} />

              {/* 1st Place */}
              <PodiumCard person={leaderboard[0]} position={1} />

              {/* 3rd Place */}
              <PodiumCard person={leaderboard[2]} position={3} />
            </div>
          </motion.div>
        )}

        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <Award className="w-6 h-6 text-bronze" />
            <h2 className="text-2xl font-black">
              {searchQuery ? 'Search Results' : 'All Champions'}
            </h2>
          </div>

          {filteredLeaderboard.length === 0 ? (
            <EmptyState
              icon="🏆"
              title={searchQuery ? 'No champions found' : 'No leaderboard yet'}
              description={searchQuery ? `No results for "${searchQuery}"` : 'Be the first climate hero! Send a gift to claim the top spot.'}
              actionLabel="Send Your First Gift"
              actionPath="/compose"
            />
          ) : (
            <div className="space-y-4">
              {filteredLeaderboard.map((person, index) => (
                <LeaderboardRow key={person.name} person={person} index={index} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative group cursor-pointer"
          onClick={() => navigate('/compose')}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-deep to-slate-900 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-slate-900 border border-white/5 rounded-[3rem] p-12 text-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-bronze/5 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="text-6xl mb-6">🌍</div>
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              Want to join the leaderboard?
            </h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Start gifting climate action and see your impact grow!
            </p>
            <button className="px-10 py-5 bg-off-white text-slate-950 rounded-2xl text-lg font-black hover:bg-bronze hover:text-off-white transition-all shadow-2xl flex items-center gap-3 mx-auto">
              Create a Gift <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PodiumCard({ person, position }) {
  const badge = badgeInfo[person.badge] || badgeInfo.bronze;
  const heights = {
    1: 'h-64',
    2: 'h-48',
    3: 'h-40'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.1 }}
      className={`flex flex-col items-center ${position === 1 ? 'w-48' : 'w-40'}`}
    >
      {/* Person Card */}
      <div className={`relative bg-gradient-to-br ${badge.gradient} rounded-2xl p-6 shadow-2xl mb-4 transform ${position === 1 ? 'scale-110' : ''} hover:scale-105 transition-all group`}>
        <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="text-center relative z-10">
          <div className="text-6xl mb-3">{badge.icon}</div>
          <div className="text-white">
            <h3 className="font-black text-xl mb-1 drop-shadow-md">{person.name}</h3>
            {person.location && (
              <p className="text-sm opacity-90 mb-2">📍 {person.location}</p>
            )}
            <div className="bg-white/30 rounded-lg p-2 mt-3 backdrop-blur-sm">
              <p className="text-2xl font-black">{person.totalGifts}</p>
              <p className="text-xs uppercase font-bold">Gifts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Podium Base */}
      <div className={`w-full ${heights[position]} bg-gradient-to-br ${badge.gradient} rounded-t-xl flex items-center justify-center shadow-2xl relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="text-white text-center relative z-10">
          <div className="text-5xl font-black drop-shadow-lg">{position}</div>
          <div className="text-sm font-bold uppercase opacity-90">Place</div>
        </div>
      </div>
    </motion.div>
  );
}

function LeaderboardRow({ person, index }) {
  const badge = person.badge ? badgeInfo[person.badge] : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center gap-6 p-6 rounded-2xl border transition-all hover:shadow-xl hover:scale-[1.02] ${
        badge
          ? `${badge.borderColor} ${badge.glowColor} bg-slate-950/50`
          : 'border-white/5 bg-slate-950/30'
      }`}
    >
      {/* Rank */}
      <div className="text-center w-14">
        {badge ? (
          <div className="text-3xl">{badge.icon}</div>
        ) : (
          <div className="text-2xl font-black text-slate-500">#{person.rank}</div>
        )}
      </div>

      {/* Name & Location */}
      <div className="flex-1">
        <h3 className="text-xl font-black text-off-white">{person.name}</h3>
        {person.location && (
          <p className="text-sm text-slate-500 mt-1">📍 {person.location}</p>
        )}
      </div>

      {/* Stats */}
      <div className="flex gap-8 text-center">
        <div>
          <div className="text-2xl font-black text-teal-400">{person.totalGifts}</div>
          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Gifts</div>
        </div>

        {person.totalTrees > 0 && (
          <div>
            <div className="text-2xl font-black text-emerald-400">{person.totalTrees}</div>
            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Trees</div>
          </div>
        )}

        <div>
          <div className="text-2xl font-black text-bronze">${person.totalValue}</div>
          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Value</div>
        </div>
      </div>
    </motion.div>
  );
}
