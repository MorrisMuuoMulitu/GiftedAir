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
    if (score >= 10000) return { name: 'Climate Hero', icon: '🦸‍♂️', color: 'from-red-600 to-orange-600', textColor: 'text-orange-400' };
    if (score >= 5000) return { name: 'Earth Protector', icon: '🛡️', color: 'from-blue-600 to-indigo-600', textColor: 'text-blue-400' };
    if (score >= 2000) return { name: 'Forest Guardian', icon: '🌲', color: 'from-green-600 to-emerald-600', textColor: 'text-emerald-400' };
    if (score >= 500) return { name: 'Sapling', icon: '🌿', color: 'from-teal-500 to-cyan-500', textColor: 'text-teal-400' };
    return { name: 'Seedling', icon: '🌱', color: 'from-yellow-400 to-green-500', textColor: 'text-yellow-400' };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-off-white pb-32 overflow-x-hidden">
      <Navigation />
      
      <div className="container mx-auto px-4 max-w-6xl pt-32">
        {/* Cinematic Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-deep/30 border border-teal-deep/50 rounded-full text-teal-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
            <LayoutDashboard className="w-4 h-4" /> Personal Impact Rituals
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">Your <span className="text-bronze">Impact.</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">Visualize the connection between your generosity and planetary healing.</p>
        </motion.div>

        {/* Search Box Ritual */}
        <div className="max-w-2xl mx-auto mb-24">
          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={onFormSubmit} 
            className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-bronze/5 rounded-full blur-3xl" />
            <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-6 text-center">Enter the Name Used in Your Rituals</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g., Morris, Jane Smith..."
                className="flex-1 bg-slate-950 border border-white/10 rounded-2xl p-5 text-xl font-black focus:border-bronze outline-none transition-all"
              />
              <button
                type="submit"
                disabled={loading || !senderName.trim()}
                className="bg-off-white text-slate-950 px-10 py-5 rounded-2xl font-black text-lg hover:bg-bronze hover:text-off-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
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
                className="mt-6 mx-auto text-teal-400 font-black text-[10px] uppercase tracking-widest hover:text-teal-300 transition-colors flex items-center gap-2"
              >
                <Zap className="w-3 h-3" /> Share My Impact Profile
              </button>
            )}
          </motion.form>

          {notFound && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center"
            >
              <p className="text-red-400 font-black uppercase tracking-widest text-xs mb-4">No rituals found for "{senderName}"</p>
              <button
                onClick={() => navigate('/compose')}
                className="text-white font-black underline underline-offset-4 hover:text-bronze transition-colors"
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
              className="space-y-12"
            >
              {/* Earth Guardian Status Card */}
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${getBadge(stats.impact.totalImpactScore).color} opacity-20 blur-[100px] rounded-full`} />
                <div className="relative bg-slate-900 border border-white/5 rounded-[4rem] p-12 overflow-hidden shadow-2xl">
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${getBadge(stats.impact.totalImpactScore).color} opacity-50 blur-2xl rounded-full`} />
                      <div className="w-48 h-48 bg-slate-950 rounded-full flex items-center justify-center text-8xl relative z-10 border border-white/10 shadow-2xl">
                        {getBadge(stats.impact.totalImpactScore).icon}
                      </div>
                    </div>
                    <div className="text-center md:text-left flex-1">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <Award className={`w-6 h-6 ${getBadge(stats.impact.totalImpactScore).textColor}`} />
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Guardian Status</span>
                      </div>
                      <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                        {getBadge(stats.impact.totalImpactScore).name}
                      </h2>
                      <p className="text-xl text-slate-400 leading-relaxed max-w-2xl italic font-serif">
                        "Your rituals have woven a stronger tapestry for our planet, {stats.name}."
                      </p>
                    </div>
                    <div className="text-center md:text-right">
                      <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Impact Score</div>
                      <div className={`text-6xl font-black ${getBadge(stats.impact.totalImpactScore).textColor}`}>
                        {stats.impact.totalImpactScore.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Stat Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatCard icon="🎁" value={stats.totalGifts} label="Rituals Sent" color="text-teal-400" />
                <StatCard icon="💰" value={`$${stats.totalValue}`} label="Ritual Value" color="text-bronze" />
                <StatCard icon="🌟" value={stats.impact.totalImpactScore.toLocaleString()} label="Impact Units" color="text-sky-400" />
                <StatCard icon="❤️" value={stats.uniqueRecipients} label="Circles Joined" color="text-rose-400" />
              </div>

              {/* Impact Details Dashboard */}
              <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-12">
                <h2 className="text-2xl font-black mb-12 text-center flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-white/10" />
                  Ritual Manifestations
                  <div className="h-px w-12 bg-white/10" />
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {stats.impact.treesPlanted > 0 && (
                    <ImpactDetail
                      icon="🌳"
                      value={stats.impact.treesPlanted}
                      label="Life Seeds Planted"
                      sublabel={`${stats.impact.co2Absorbed} lbs CO2 mitigated annually`}
                      color="text-emerald-400"
                    />
                  )}
                  
                  {stats.impact.familiesHelped > 0 && (
                    <ImpactDetail
                      icon="🏠"
                      value={stats.impact.familiesHelped}
                      label="Community Resilience"
                      sublabel="Direct empowerment through climate tools"
                      color="text-amber-400"
                    />
                  )}
                  
                  {stats.impact.solarPanels > 0 && (
                    <ImpactDetail
                      icon="☀️"
                      value={stats.impact.solarPanels}
                      label="Clean Energy Units"
                      sublabel={`${stats.impact.solarPanels * 300}W of renewable light`}
                      color="text-yellow-400"
                    />
                  )}
                  
                  {stats.impact.plasticRemoved > 0 && (
                    <ImpactDetail
                      icon="🌊"
                      value={`${stats.impact.plasticRemoved}kg`}
                      label="Ocean Restoration"
                      sublabel="Plastic removed from fragile ecosystems"
                      color="text-sky-400"
                    />
                  )}
                </div>
              </div>

              {/* Recent Rituals Table */}
              <div className="bg-slate-900 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="p-10 border-b border-white/5 flex justify-between items-center">
                  <h2 className="text-2xl font-black">Ritual History</h2>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    Showing {Math.min(5, gifts.length)} of {gifts.length} entries
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-950/50">
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Ritual Date</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Recipient</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Impact</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {gifts.slice(0, 5).map((gift) => (
                        <tr key={gift._id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-10 py-6 font-bold text-slate-400 text-sm">
                            {new Date(gift.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-10 py-6 font-black text-off-white">
                            {gift.recipientName}
                          </td>
                          <td className="px-10 py-6 font-bold text-teal-400">
                            {gift.quantity} {gift.type === 'tree' ? 'Seeds' : gift.type === 'ocean' ? 'kg Ocean Sanctuary' : gift.type === 'solar' ? 'Energy Units' : gift.type === 'cookstove' ? 'Toolkits' : 'Impact'}
                          </td>
                          <td className="px-10 py-6">
                            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                              {gift.status}
                            </span>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <button
                              onClick={() => navigate(`/gift/${gift._id}`)}
                              className="text-[10px] font-black uppercase tracking-widest text-bronze hover:text-white transition-colors flex items-center gap-2 ml-auto"
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
                className="text-center pt-12"
              >
                <button
                  onClick={() => navigate('/compose')}
                  className="px-12 py-6 bg-bronze text-white rounded-2xl text-xl font-black hover:bg-amber-600 transition-all shadow-2xl shadow-bronze/20 flex items-center gap-3 mx-auto group"
                >
                  Initiate New Ritual <Heart className="w-6 h-6 group-hover:fill-current transition-all" />
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="mt-8 text-slate-500 hover:text-off-white font-black uppercase tracking-[0.2em] text-[10px] transition-colors"
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

