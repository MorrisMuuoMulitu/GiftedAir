import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowRight, MapPin, Calendar, Heart, Globe, Zap, ShieldCheck, User } from 'lucide-react';
import { API_URL } from '../config';
import Navigation from '../components/Navigation';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import SEO, { SEOConfig } from '../components/SEO';

const giftTypeDetails = {
  tree: { 
    icon: '🌳', 
    color: 'bg-teal-900/30 border-teal-500/30', 
    textColor: 'text-teal-400',
    name: 'Trees',
    gradient: 'from-teal-400 to-emerald-500'
  },
  cookstove: { 
    icon: '🏡', 
    color: 'bg-amber-900/30 border-amber-500/30', 
    textColor: 'text-amber-400',
    name: 'Cookstoves',
    gradient: 'from-amber-400 to-red-500'
  },
  solar: { 
    icon: '☀️', 
    color: 'bg-yellow-900/30 border-yellow-500/30', 
    textColor: 'text-yellow-400',
    name: 'Solar',
    gradient: 'from-yellow-400 to-orange-500'
  },
  ocean: { 
    icon: '🌊', 
    color: 'bg-blue-900/30 border-blue-500/30', 
    textColor: 'text-blue-400',
    name: 'Ocean',
    gradient: 'from-blue-400 to-cyan-500'
  },
  coral: { 
    icon: '🪸', 
    color: 'bg-pink-900/30 border-pink-500/30', 
    textColor: 'text-pink-400',
    name: 'Coral Reef',
    gradient: 'from-pink-400 to-rose-500'
  },
  wildlife: { 
    icon: '🦁', 
    color: 'bg-bronze/20 border-bronze/30', 
    textColor: 'text-bronze',
    name: 'Wildlife',
    gradient: 'from-bronze to-amber-600'
  },
  water: { 
    icon: '💧', 
    color: 'bg-sky-900/30 border-sky-500/30', 
    textColor: 'text-sky-400',
    name: 'Clean Water',
    gradient: 'from-blue-300 to-sky-500'
  },
  rainforest: { 
    icon: '🌴', 
    color: 'bg-emerald-900/30 border-emerald-500/30', 
    textColor: 'text-emerald-400',
    name: 'Rainforest',
    gradient: 'from-green-500 to-emerald-600'
  }
};

export default function Gallery() {
  const navigate = useNavigate();
  const [gifts, setGifts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching gallery data from:', `${API_URL}/api/gifts`);
        const [giftsRes, statsRes] = await Promise.all([
          fetch(`${API_URL}/api/gifts`),
          fetch(`${API_URL}/api/gifts/stats/summary`)
        ]);

        const giftsData = await giftsRes.json();
        const statsData = await statsRes.json();

        console.log('Gifts Data Received:', giftsData);

        // Only show gifts that are pinned to gallery (showInGallery === true)
        const allGifts = giftsData.gifts || [];
        const galleryGifts = allGifts.filter(gift => gift.showInGallery !== false);
        setGifts(galleryGifts);
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-off-white">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-8"
        >
          🌿
        </motion.div>
        <p className="text-xl font-black uppercase tracking-[0.3em] text-teal-400 animate-pulse">Illuminating Gallery</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-off-white pb-32 overflow-x-hidden">
      <Navigation />
      <SEO {...SEOConfig.gallery} />
      
      <div className="container mx-auto px-4 max-w-7xl pt-32">
        {/* Cinematic Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-deep/30 border border-teal-deep/50 rounded-full text-teal-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
            <Globe className="w-4 h-4" /> Global Impact Rituals
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">Gift <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-bronze to-teal-400 bg-[length:200%_auto] animate-gradient">Gallery.</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">Celebrating every act of climate love. A collective ledger of healing and connection.</p>
        </motion.div>

        {/* Impact Stats Dashboard */}
        {stats && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-32 relative"
          >
            <div className="absolute inset-0 bg-teal-deep/10 rounded-[3rem] blur-3xl" />
            
            <div className="relative bg-slate-900/50 border border-white/5 rounded-[3rem] p-12 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-bronze/5 rounded-full blur-[100px]" />
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <ImpactCard icon="🎁" value={stats.totalGifts} label="Rituals Sent" color="text-teal-400" />
                <ImpactCard icon="🌳" value={stats.impact.treesPlanted} label="Seeds Planted" color="text-emerald-400" />
                <ImpactCard icon="💨" value={stats.impact.co2Absorbed.toLocaleString()} label="lbs CO2 Mitigated" color="text-sky-400" />
                <ImpactCard icon="💰" value={`$${stats.totalValue.toLocaleString()}`} label="Climate Value" color="text-bronze" />
              </div>

              {(stats.impact.familiesHelped > 0 || stats.impact.solarPanels > 0 || stats.impact.plasticRemoved > 0) && (
                <div className="flex flex-wrap justify-center gap-8 pt-12 border-t border-white/5">
                  {stats.impact.familiesHelped > 0 && <MiniStat icon="🏠" value={stats.impact.familiesHelped} label="Empowered Families" />}
                  {stats.impact.solarPanels > 0 && <MiniStat icon="☀️" value={stats.impact.solarPanels} label="Clean Energy Units" />}
                  {stats.impact.plasticRemoved > 0 && <MiniStat icon="🌊" value={`${stats.impact.plasticRemoved}kg`} label="Ocean Sanctuary" />}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <div className="mb-24">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-hover:text-bronze transition-colors" />
              <input
                type="text"
                placeholder="Search rituals by sender, recipient, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-lg focus:border-bronze outline-none transition-all shadow-2xl"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <FilterButton 
              active={activeFilter === 'all'} 
              onClick={() => handleFilter('all')}
              label="All Rituals"
              count={gifts.length}
            />
            {Object.entries(giftTypeDetails).map(([key, details]) => {
              const count = gifts.filter(g => g.type === key).length;
              if (count === 0) return null;
              return (
                <FilterButton
                  key={key}
                  active={activeFilter === key}
                  onClick={() => handleFilter(key)}
                  icon={details.icon}
                  label={details.name}
                  count={count}
                />
              );
            })}
          </div>
          
          <AnimatePresence mode="wait">
            {gifts.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState
                  icon="🎁"
                  title="No Rituals Yet"
                  description="Be the first to initiate a climate connection"
                  actionLabel="Start the Ritual"
                  actionPath="/compose"
                />
              </motion.div>
            ) : displayedGifts.length === 0 ? (
              <motion.div 
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState
                  icon="🔍"
                  title="No Matches Found"
                  description={`No rituals match your current filter or search criteria.`}
                  actionLabel="Clear Filters"
                  actionPath="#"
                  onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                />
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {displayedGifts.map((gift, index) => (
                  <GiftCard 
                    key={gift._id} 
                    gift={gift} 
                    onClick={() => navigate(`/gift/${gift._id}`)}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group cursor-pointer"
          onClick={() => navigate('/compose')}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-deep to-slate-900 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-slate-900 border border-white/5 rounded-[3rem] p-16 text-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/5 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="text-6xl mb-8">✨</div>
            <h2 className="text-4xl md:text-6xl font-black mb-8">Initiate Your Own<br/>Climate Ritual.</h2>
            <button className="px-12 py-6 bg-off-white text-slate-950 rounded-2xl text-xl font-black hover:bg-bronze hover:text-off-white transition-all duration-500 shadow-2xl flex items-center gap-3 mx-auto">
              Send a Gift <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
      
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 5s linear infinite;
        }
      `}</style>
    </div>
  );
}

function ImpactCard({ icon, value, label, color }) {
  return (
    <div className="text-center p-6 bg-slate-950/50 rounded-2xl border border-white/5">
      <div className="text-4xl mb-4">{icon}</div>
      <div className={`text-4xl font-black mb-1 ${color}`}>{value}</div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</div>
    </div>
  );
}

function MiniStat({ icon, value, label }) {
  return (
    <div className="flex items-center gap-3 bg-slate-950/50 border border-white/5 px-6 py-3 rounded-xl">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-lg font-black">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</div>
      </div>
    </div>
  );
}

function FilterButton({ icon, label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
        active 
          ? 'bg-off-white text-slate-950 shadow-xl scale-105' 
          : 'bg-slate-900 text-slate-500 border border-white/5 hover:border-white/20'
      }`}
    >
      {icon && <span>{icon}</span>}
      {label}
      <span className={`ml-1 ${active ? 'text-slate-500' : 'text-slate-700'}`}>({count})</span>
    </button>
  );
}

function GiftCard({ gift, onClick, index }) {
  const details = giftTypeDetails[gift.type] || giftTypeDetails.tree;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="group cursor-pointer bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 hover:border-bronze/30 transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/5 rounded-full blur-3xl pointer-events-none group-hover:bg-bronze/10 transition-colors" />
      
      <div className="flex justify-between items-start mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border ${details.color}`}>
          {details.icon}
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-teal-400">{gift.quantity}</div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Impact Units</div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2">
          <User className="w-3 h-3 text-bronze" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">From</span>
          <span className="text-sm font-black text-off-white">{gift.senderName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="w-3 h-3 text-teal-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">To</span>
          <span className="text-sm font-black text-off-white">{gift.recipientName}</span>
        </div>
        {gift.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-slate-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{gift.location}</span>
          </div>
        )}
      </div>

      <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-6 mb-8 min-h-[120px]">
        <p className="text-slate-400 text-sm italic font-serif leading-relaxed line-clamp-4">
          "{gift.message}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 text-slate-500">
          <Calendar className="w-3 h-3" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            {new Date(gift.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="text-xl font-black text-bronze">
          ${gift.totalCost}
        </div>
      </div>

      <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-bronze flex items-center gap-2">
          Reveal Ritual <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}
