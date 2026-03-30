import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, MapPin, Calendar, Heart, Globe, Zap, ShieldCheck, User, Award, LayoutDashboard } from 'lucide-react';
import Navigation from '../components/Navigation';
import EmptyState from '../components/EmptyState';
import { API_URL } from '../config';

export default function Impact() {
  const { name } = useParams();
  const [senderName, setSenderName] = useState(name || '');
  const [stats, setStats] = useState(null);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (targetName) => {
    const searchName = targetName || senderName;
    if (!searchName.trim()) return;

    setLoading(true);
    setNotFound(false);
    
    try {
      const response = await fetch(`${API_URL}/api/gifts/impact/${encodeURIComponent(searchName)}`);
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setGifts(data.gifts || []);
      } else {
        setNotFound(true);
        setStats(null);
        setGifts([]);
      }
    } catch (error) {
      console.error('Error fetching impact:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  // Auto-search if name is in URL
  useEffect(() => {
    if (name) {
      handleSearch(name);
    }
  }, [name]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const getBadge = (score) => {
    if (score >= 10000) return { name: 'Climate Hero', icon: '🦸‍♂️', color: 'from-rose-600 to-orange-600', textColor: 'text-orange-400' };
    if (score >= 5000) return { name: 'Earth Protector', icon: '🛡️', color: 'from-accent-emerald to-emerald-600', textColor: 'text-accent-emerald' };
    if (score >= 2000) return { name: 'Forest Guardian', icon: '🌲', color: 'from-moss to-moss-dark', textColor: 'text-moss-light' };
    if (score >= 500) return { name: 'Sapling', icon: '🌿', color: 'from-sage-light to-moss', textColor: 'text-sage-light' };
    return { name: 'Seedling', icon: '🌱', color: 'from-earth-light to-earth', textColor: 'text-earth-light' };
  };

  return (
    <div className="min-h-screen bg-forest-deep text-off-white pb-32 overflow-x-hidden">
      <Navigation />

      <div className="container mx-auto px-4 max-w-6xl pt-32">
        {/* Cinematic Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/10 rounded-full text-accent-emerald text-xs font-black uppercase tracking-[0.2em] mb-8">
            <LayoutDashboard className="w-4 h-4" /> Personal Impact Rituals
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-display">Your <span className="text-gradient">Impact.</span></h1>
          <p className="text-xl text-sage-light/70 max-w-2xl mx-auto leading-relaxed">Visualize the connection between your generosity and planetary healing.</p>
        </motion.div>

        {/* Search Box Ritual */}
        <div className="max-w-2xl mx-auto mb-16 md:mb-24">
          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={onFormSubmit}
            className="glass-card p-6 md:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-moss/10 rounded-full blur-3xl" />
            <label className="block text-[9px] md:text-xs font-black uppercase tracking-[0.3em] text-sage-light/50 mb-6 text-center">Enter the Name Used in Your Rituals</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g., Morris, Jane Smith..."
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-lg md:text-xl font-black focus:border-accent-emerald outline-none transition-all"
              />
              <button
                type="submit"
                disabled={loading || !senderName.trim()}
                className="bg-gradient-to-br from-off-white to-sage-light text-forest-deep px-8 md:px-10 py-4 md:p-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:shadow-2xl hover:shadow-accent-emerald/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {loading ? 'Searching...' : (
                  <>View Impact <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </div>
            {stats && (
              <button
                type="button"
                onClick={() => {
                  const url = `${window.location.origin}/sender/${encodeURIComponent(stats.name)}`;
                  navigator.clipboard.writeText(url);
                  alert('🔗 Impact profile link copied!');
                }}
                className="mt-6 mx-auto text-accent-emerald font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:text-moss-light transition-colors flex items-center gap-2"
              >
                <Zap className="w-3 h-3" /> Share My Impact Profile
              </button>
            )}
          </motion.form>

          {notFound && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-rose-500/10 border border-rose-500/20 rounded-xl p-6 text-center"
            >
              <p className="text-rose-400 font-black uppercase tracking-widest text-[10px] md:text-xs mb-4">No rituals found for "{senderName}"</p>
              <button
                onClick={() => navigate('/compose')}
                className="text-off-white font-black underline underline-offset-4 hover:text-accent-emerald transition-colors text-sm md:text-base"
              >
                Initiate Your First Ritual
              </button>
            </motion.div>
          )}
        </div>

        {/* Stats Display */}
        <AnimatePresence mode="wait">
          {stats && (
            <motion.div 
              key="stats"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-8 md:space-y-12"
            >
              {/* Earth Guardian Status Card */}
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${getBadge(stats.impact.totalImpactScore).color} opacity-20 blur-[100px] rounded-full`} />
                <div className="relative glass-card-deluxe rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 overflow-hidden shadow-2xl">
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${getBadge(stats.impact.totalImpactScore).color} opacity-50 blur-2xl rounded-full`} />
                      <div className="w-32 h-32 md:w-48 md:h-48 bg-forest-deep rounded-full flex items-center justify-center text-6xl md:text-8xl relative z-10 border border-white/10 shadow-2xl">
                        {getBadge(stats.impact.totalImpactScore).icon}
                      </div>
                    </div>
                    <div className="text-center md:text-left flex-1">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <Award className={`w-5 h-5 md:w-6 md:h-6 ${getBadge(stats.impact.totalImpactScore).textColor}`} />
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-sage-light/50">Guardian Status</span>
                      </div>
                      <h2 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 tracking-tight text-display">
                        {getBadge(stats.impact.totalImpactScore).name}
                      </h2>
                      <p className="text-base md:text-xl text-sage-light/70 leading-relaxed max-w-2xl italic font-serif">
                        "Your rituals have woven a stronger tapestry for our planet, {stats.name}."
                      </p>
                    </div>
                    <div className="text-center md:text-right">
                      <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-sage-light/50 mb-2">Impact Score</div>
                      <div className={`text-4xl md:text-6xl font-black ${getBadge(stats.impact.totalImpactScore).textColor}`}>
                        {stats.impact.totalImpactScore.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Stat Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <StatCard icon="🎁" value={stats.totalGifts} label="Rituals Sent" color="text-accent-emerald" />
                <StatCard icon="💰" value={`$${stats.totalValue}`} label="Ritual Value" color="text-moss" />
                <StatCard icon="🌟" value={stats.impact.totalImpactScore.toLocaleString()} label="Impact Units" color="text-sage-light" />
                <StatCard icon="❤️" value={stats.uniqueRecipients} label="Circles Joined" color="text-rose-400" />
              </div>

              {/* Impact Details Dashboard */}
              <div className="glass-card p-8 md:p-12">
                <h2 className="text-xl md:text-2xl font-black mb-8 md:mb-12 text-center flex items-center justify-center gap-4">
                  <div className="h-px w-8 md:w-12 bg-white/10" />
                  Ritual Manifestations
                  <div className="h-px w-8 md:w-12 bg-white/10" />
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {stats.impact.treesPlanted > 0 && (
                    <ImpactDetail
                      icon="🌳"
                      value={stats.impact.treesPlanted}
                      label="Life Seeds Planted"
                      sublabel={`${stats.impact.co2Absorbed} lbs CO₂ mitigated annually`}
                      color="text-moss-light"
                    />
                  )}

                  {stats.impact.familiesHelped > 0 && (
                    <ImpactDetail
                      icon="🏠"
                      value={stats.impact.familiesHelped}
                      label="Community Resilience"
                      sublabel="Direct empowerment through climate tools"
                      color="text-earth-light"
                    />
                  )}

                  {stats.impact.solarPanels > 0 && (
                    <ImpactDetail
                      icon="☀️"
                      value={stats.impact.solarPanels}
                      label="Clean Energy Units"
                      sublabel={`${stats.impact.solarPanels * 300}W of renewable light`}
                      color="text-moss-light"
                    />
                  )}

                  {stats.impact.plasticRemoved > 0 && (
                    <ImpactDetail
                      icon="🌊"
                      value={`${stats.impact.plasticRemoved}kg`}
                      label="Ocean Restoration"
                      sublabel="Plastic removed from fragile ecosystems"
                      color="text-sky"
                    />
                  )}
                </div>
              </div>

              {/* Recent Rituals Table */}
              <div className="bg-slate-900 border border-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="p-6 md:p-10 border-b border-white/5 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <h2 className="text-xl md:text-2xl font-black">Ritual History</h2>
                  <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Showing {Math.min(5, gifts.length)} of {gifts.length} entries
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[700px] md:min-w-full">
                    <thead>
                      <tr className="bg-slate-950/50">
                        <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Ritual Date</th>
                        <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Recipient</th>
                        <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Impact</th>
                        <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                        <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {gifts.slice(0, 5).map((gift) => (
                        <tr key={gift._id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-6 md:px-10 py-4 md:py-6 font-bold text-slate-400 text-xs md:text-sm">
                            {new Date(gift.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 md:px-10 py-4 md:py-6 font-black text-off-white text-xs md:text-base">
                            {gift.recipientName}
                          </td>
                          <td className="px-6 md:px-10 py-4 md:py-6 font-bold text-teal-400 text-xs md:text-base">
                            {gift.quantity} {gift.type === 'tree' ? 'Seeds' : gift.type === 'ocean' ? 'kg Ocean Sanctuary' : gift.type === 'solar' ? 'Energy Units' : gift.type === 'cookstove' ? 'Toolkits' : 'Impact'}
                          </td>
                          <td className="px-6 md:px-10 py-4 md:py-6">
                            <span className="px-2 py-0.5 md:px-3 md:py-1 bg-white/5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">
                              {gift.status}
                            </span>
                          </td>
                          <td className="px-6 md:px-10 py-4 md:py-6 text-right">
                            <button
                              onClick={() => navigate(`/gift/${gift._id}`)}
                              className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-bronze hover:text-white transition-colors flex items-center gap-2 ml-auto"
                            >
                              Reveal Ritual <ArrowRight className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom CTA Ritual */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center pt-8 md:pt-12"
              >
                <button
                  onClick={() => navigate('/compose')}
                  className="px-8 md:px-12 py-5 md:py-6 bg-bronze text-white rounded-xl md:rounded-2xl text-lg md:text-xl font-black hover:bg-amber-100 transition-all shadow-2xl shadow-bronze/20 flex items-center gap-3 mx-auto group"
                >
                  Initiate New Ritual <Heart className="w-6 h-6 group-hover:fill-current transition-all" />
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="mt-8 text-slate-500 hover:text-off-white font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] transition-colors"
                >
                  ← Return to Sanctuary
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {!stats && !loading && (
          <div className="text-center mt-32">
            <button
              onClick={() => navigate('/')}
              className="text-slate-500 hover:text-off-white font-black uppercase tracking-[0.2em] text-[10px] transition-colors"
            >
              ← Return to Sanctuary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }) {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 text-center hover:border-white/10 transition-all duration-500">
      <div className="text-4xl mb-4">{icon}</div>
      <div className={`text-4xl font-black mb-2 ${color}`}>{value}</div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</div>
    </div>
  );
}

function ImpactDetail({ icon, value, label, sublabel, color }) {
  return (
    <div className="flex items-center gap-6 p-8 bg-slate-950 border border-white/5 rounded-[2.5rem] hover:border-white/10 transition-all group">
      <div className="text-6xl group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <div>
        <div className={`text-4xl font-black mb-1 ${color}`}>{value}</div>
        <div className="text-sm font-black text-off-white uppercase tracking-widest mb-1">{label}</div>
        <div className="text-xs text-slate-500 font-medium italic">{sublabel}</div>
      </div>
    </div>
  );
}

