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
    color: 'bg-accent-emerald/20 border-accent-emerald/30',
    textColor: 'text-accent-emerald',
    name: 'Trees',
    gradient: 'from-accent-emerald to-emerald-600'
  },
  cookstove: {
    icon: '🏡',
    color: 'bg-earth/20 border-earth/30',
    textColor: 'text-earth-light',
    name: 'Cookstoves',
    gradient: 'from-earth-light to-earth'
  },
  solar: {
    icon: '☀️',
    color: 'bg-moss/20 border-moss/30',
    textColor: 'text-moss-light',
    name: 'Solar',
    gradient: 'from-moss-light to-moss'
  },
  ocean: {
    icon: '🌊',
    color: 'bg-sky/20 border-sky/30',
    textColor: 'text-sky',
    name: 'Ocean',
    gradient: 'from-sky to-ocean'
  },
  coral: {
    icon: '🪸',
    color: 'bg-rose-500/20 border-rose-500/30',
    textColor: 'text-rose-400',
    name: 'Coral Reef',
    gradient: 'from-rose-400 to-rose-600'
  },
  wildlife: {
    icon: '🦁',
    color: 'bg-amber-500/20 border-amber-500/30',
    textColor: 'text-amber-400',
    name: 'Wildlife',
    gradient: 'from-amber-400 to-amber-600'
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-forest-deep text-off-white">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-8"
        >
          🌿
        </motion.div>
        <p className="text-xl font-black uppercase tracking-[0.3em] text-accent-emerald animate-pulse">Illuminating Gallery</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-deep text-off-white pb-32 overflow-x-hidden">
      <Navigation />
      <SEO {...SEOConfig.gallery} />

      <div className="container mx-auto px-4 max-w-7xl pt-32">
        {/* Cinematic Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/10 rounded-full text-accent-emerald text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-8">
            <Globe className="w-4 h-4" /> Global Impact Rituals
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-8 tracking-tight text-display">Gift <span className="text-gradient">Gallery.</span></h1>
          <p className="text-lg md:text-xl text-sage-light/70 max-w-2xl mx-auto leading-relaxed px-2">Celebrating every act of climate love. A collective ledger of healing and connection.</p>
        </motion.div>

        {/* Impact Stats Dashboard */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-32 relative"
          >
            <div className="absolute inset-0 bg-accent-emerald/10 rounded-[3rem] blur-3xl" />

            <div className="relative glass-card p-6 md:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-moss/10 rounded-full blur-[100px]" />

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
                <ImpactCard icon="🎁" value={stats.totalGifts} label="Rituals Sent" color="text-accent-emerald" />
                <ImpactCard icon="🌳" value={stats.impact.treesPlanted} label="Seeds Planted" color="text-moss-light" />
                <ImpactCard icon="💨" value={stats.impact.co2Absorbed.toLocaleString()} label="lbs CO₂ Mitigated" color="text-sage-light" />
                <ImpactCard icon="💰" value={`$${stats.totalValue.toLocaleString()}`} label="Climate Value" color="text-moss" />
              </div>

              {(stats.impact.familiesHelped > 0 || stats.impact.solarPanels > 0 || stats.impact.plasticRemoved > 0) && (
                <div className="flex flex-wrap justify-center gap-8 pt-12 border-t border-white/10">
                  {stats.impact.familiesHelped > 0 && <MiniStat icon="🏠" value={stats.impact.familiesHelped} label="Empowered Families" />}
                  {stats.impact.solarPanels > 0 && <MiniStat icon="☀️" value={stats.impact.solarPanels} label="Clean Energy Units" />}
                  {stats.impact.plasticRemoved > 0 && <MiniStat icon="🌊" value={`${stats.impact.plasticRemoved}kg`} label="Ocean Sanctuary" />}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <div className="mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto mb-12 md:mb-16 px-2">
            <div className="relative group">
              <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-sage-light/50 group-hover:text-accent-emerald transition-colors" />
              <input
                type="text"
                placeholder="Search rituals by sender, recipient, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-6 pl-12 md:pl-16 pr-4 md:pr-8 text-base md:text-lg focus:border-accent-emerald outline-none transition-all shadow-2xl"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16 px-2">
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
                className="px-4"
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
                className="px-4"
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
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
          className="relative group cursor-pointer px-2"
          onClick={() => navigate('/compose')}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-emerald/20 to-forest/10 rounded-[2rem] md:rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative glass-card p-8 md:p-16 text-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-accent-emerald/5 rounded-full blur-[100px] -mr-32 md:-mr-48 -mt-32 md:-mt-48" />
            <div className="text-4xl md:text-6xl mb-6 md:mb-8">✨</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-6 md:mb-8 text-display">Initiate Your Own<br/>Climate Ritual.</h2>
            <button className="btn-primary px-8 md:px-12 py-4 md:py-6 text-base md:text-xl mx-auto">
              Send a Gift <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
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
    <div className="text-center p-6 glass-card rounded-2xl">
      <div className="text-4xl mb-4">{icon}</div>
      <div className={`text-4xl font-black mb-1 ${color}`}>{value}</div>
      <div className="text-[10px] font-black uppercase tracking-widest text-sage-light/50">{label}</div>
    </div>
  );
}

function MiniStat({ icon, value, label }) {
  return (
    <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-xl">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-lg font-black">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-widest text-sage-light/50">{label}</div>
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
          ? 'bg-gradient-to-br from-off-white to-sage-light text-forest-deep shadow-xl scale-105'
          : 'bg-white/[0.03] text-sage-light/60 border border-white/5 hover:border-white/20 hover:text-off-white'
      }`}
    >
      {icon && <span>{icon}</span>}
      {label}
      <span className={`ml-1 ${active ? 'text-forest-deep/60' : 'text-sage-light/40'}`}>({count})</span>
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
      className="group cursor-pointer glass-card p-5 md:p-8 hover:border-accent-emerald/30 transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-accent-emerald/5 rounded-full blur-3xl pointer-events-none group-hover:bg-accent-emerald/10 transition-colors" />

      <div className="flex justify-between items-start mb-6 md:mb-8">
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl border ${details.color}`}>
          {details.icon}
        </div>
        <div className="text-right">
          <div className="text-2xl md:text-3xl font-black text-accent-emerald">{gift.quantity}</div>
          <div className="text-[9px] md:text-[10px] font-black text-sage-light/50 uppercase tracking-widest">Impact Units</div>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        <div className="flex items-center gap-2">
          <User className="w-3 h-3 text-accent-emerald" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-sage-light/50">From</span>
          <span className="text-sm font-black text-off-white truncate">{gift.senderName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="w-3 h-3 text-teal-400" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">To</span>
          <span className="text-sm font-black text-off-white truncate">{gift.recipientName}</span>
        </div>
        {gift.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-slate-500" />
            <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{gift.location}</span>
          </div>
        )}
      </div>

      <div className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 min-h-[80px] md:min-h-[120px]">
        <p className="text-sage-light/70 text-xs md:text-sm italic font-serif leading-relaxed line-clamp-3 md:line-clamp-4">
          "{gift.message}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-white/10">
        <div className="flex items-center gap-1 md:gap-2 text-sage-light/50">
          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">
            {new Date(gift.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="text-lg md:text-xl font-black text-emerald-400">
          ${gift.totalCost}
        </div>
      </div>

      <div className="mt-4 md:mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-2">
          Reveal Ritual <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
        </div>
      </div>
    </motion.div>
  );
}
