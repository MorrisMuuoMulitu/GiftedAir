import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Globe, Zap, Heart, Info, ExternalLink, Scale, FileText, CheckCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import { API_URL } from '../config';

export default function Transparency() {
  const [ledgerGifts, setLedgerGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  useEffect(() => {
    const fetchLedgerData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gifts`);
        const data = await response.json();
        if (data.success || data.gifts) {
          const recentGifts = (data.gifts || []).slice(0, 5);
          setLedgerGifts(recentGifts);
        }
      } catch (error) {
        console.error('Error fetching ledger data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLedgerData();
  }, []);

  const mockupItems = [
    { date: 'Oct 2023', project: 'Uplift Her Kenya', amount: '$1,240', split: '70%', status: 'Fulfilled', website: 'https://www.upliftherkenya.org/' },
    { date: 'Oct 2023', project: 'Kaiti Greening', amount: '$850', split: '70%', status: 'Fulfilled', website: 'https://kaitigreening.org/' },
    { date: 'Sep 2023', project: 'Uplift Her Kenya', amount: '$920', split: '70%', status: 'Fulfilled', website: 'https://www.upliftherkenya.org/' },
  ];

  return (
    <div className="min-h-screen bg-forest-deep text-off-white pb-32 overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 pattern-grid opacity-[0.02]" />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-teal-500/5 rounded-full blur-[150px]" />
      </div>

      <Navigation />

      <div className="container mx-auto px-4 max-w-5xl pt-32 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-full group hover:border-emerald-500/40 transition-all duration-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Radical Transparency</span>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight text-display">
            The Impact <span className="text-gradient">Ledger.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-sage-light/70 max-w-3xl mx-auto leading-relaxed">
            We believe that climate action requires absolute honesty. Our 70/30 Fellowship-led model ensures that the majority of your gift directly heals the planet while sustaining the platform that makes it possible.
          </motion.p>
        </motion.div>

        {/* Engineering Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 md:p-8 glass-card-elevated rounded-[2rem] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/15 transition-colors" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-emerald-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                <Zap className="w-3 h-3" /> Engineering Update
              </p>
              <h3 className="text-lg md:text-xl font-black mb-2 text-off-white">Live Ledger Development</h3>
              <p className="text-sage-light/70 text-sm leading-relaxed max-w-xl">
                This Live Impact Ledger is being architected and developed by <a href="https://www.impelweb.studio/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-teal-300 underline underline-offset-4 decoration-emerald-400/30 font-bold transition-all inline-flex items-center gap-1">Impel Web <ExternalLink className="w-3 h-3" /></a>. Real-time blockchain-grade synchronization coming soon.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-300 animate-pulse">
                Status: Beta Sync
              </div>
            </div>
          </div>
        </motion.div>

        {/* 70/30 Split Visualization */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card-elevated p-8 md:p-10 flex flex-col justify-between group hover:border-emerald-500/30 transition-all duration-500"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div className="text-5xl md:text-6xl font-black text-emerald-400">70%</div>
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-4 text-display">Direct Partner Funding</h3>
              <p className="text-sage-light/70 text-base leading-relaxed mb-6">
                The lion's share of every ritual goes directly to our primary partners like Uplift Her Kenya and Kaiti Greening Champions. This funds the physical seeds, the solar panels, and the community labor.
              </p>
            </div>
            <div className="flex items-center gap-3 text-emerald-400/60 font-bold uppercase tracking-widest text-xs">
              <Scale className="w-4 h-4" /> Verified Fellowship Projects
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card-elevated p-8 md:p-10 flex flex-col justify-between group hover:border-moss/30 transition-all duration-500"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-moss to-moss-dark rounded-2xl flex items-center justify-center shadow-lg shadow-moss/20">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="text-5xl md:text-6xl font-black text-moss-light">30%</div>
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-4 text-display">Platform & Poetic UI</h3>
              <p className="text-sage-light/70 text-base leading-relaxed mb-6">
                This portion fuels our growth. It covers high-aesthetic development, M-Pesa integration fees, and the expansion of our ritual-led ecosystem to reach more givers worldwide.
              </p>
            </div>
            <div className="flex items-center gap-3 text-moss-light/60 font-bold uppercase tracking-widest text-xs">
              <Heart className="w-4 h-4" /> Sustainable Growth Engine
            </div>
          </motion.div>
        </div>

        {/* Ledger Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card-elevated overflow-hidden"
        >
          <div className="p-6 md:p-10 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl md:text-2xl font-black text-display flex items-center gap-3">
              <FileText className="w-6 h-6 text-emerald-400" />
              Impact Ledger
            </h2>
            <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              Demo Data Only
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px] md:min-w-full">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="px-6 md:px-10 py-5 text-[10px] font-black uppercase tracking-widest text-sage-light/50">Event Date</th>
                  <th className="px-6 md:px-10 py-5 text-[10px] font-black uppercase tracking-widest text-sage-light/50">Climate Ritual</th>
                  <th className="px-6 md:px-10 py-5 text-[10px] font-black uppercase tracking-widest text-sage-light/50">Contribution</th>
                  <th className="px-6 md:px-10 py-5 text-[10px] font-black uppercase tracking-widest text-sage-light/50">Impact Split</th>
                  <th className="px-6 md:px-10 py-5 text-[10px] font-black uppercase tracking-widest text-sage-light/50">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/08">
                {ledgerGifts.length > 0 ? (
                  ledgerGifts.map((gift, i) => (
                    <tr key={gift._id || i} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="px-6 md:px-10 py-5 font-bold text-sage-light/70 text-sm">
                        {new Date(gift.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}
                      </td>
                      <td className="px-6 md:px-10 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                          <span className="font-black text-off-white text-sm">{gift.type === 'uplift-her' ? 'Uplift Her Kenya' : 'Kaiti Greening'}</span>
                        </div>
                      </td>
                      <td className="px-6 md:px-10 py-5 font-black text-emerald-400 text-sm">${gift.totalCost}</td>
                      <td className="px-6 md:px-10 py-5 font-medium text-sage-light/60 text-sm">70% Partner</td>
                      <td className="px-6 md:px-10 py-5">
                        <span className="px-3 py-1.5 bg-emerald-500/10 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5 w-fit">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  mockupItems.map((item, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 md:px-10 py-5 font-bold text-sm">{item.date}</td>
                      <td className="px-6 md:px-10 py-5">
                        <a 
                          href={item.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-2 hover:text-emerald-400 transition-colors text-sm group-hover:translate-x-1"
                        >
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          {item.project}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </td>
                      <td className="px-6 md:px-10 py-5 font-black text-emerald-400 text-sm">{item.amount}</td>
                      <td className="px-6 md:px-10 py-5 font-medium text-sage-light/60 text-sm">{item.split} Partner</td>
                      <td className="px-6 md:px-10 py-5">
                        <span className="px-3 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-sage-light/60">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-8 bg-gradient-to-r from-forest-deep to-forest-dark/50 text-center border-t border-white/05">
            <p className="text-amber-400/60 text-xs italic font-serif">
              This is demo data. Live ledger coming soon — built by Impel Web for precision tracking.
            </p>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="mt-16 md:mt-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-black mb-10 md:mb-14 text-center text-display"
          >
            Honest Inquiries
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-5 md:gap-8">
            {[
              { question: "How do I know the impact is real?", answer: "We provide monthly impact reports with direct verification from our partners. You can see the physical coordinates of restoration sites in your gift reveal." },
              { question: "Is my gift tax deductible?", answer: "Gifted Air is a for-profit ritual site. We prioritize speed of action and poetic experience over traditional charity structures. Your contribution is a direct investment in planetary healing." },
              { question: "Why the 30% platform fee?", answer: "Building world-class tech requires resources. This 30% ensures we can keep the M-Pesa ritual seamless, the UI cinematic, and our ecosystem growing without relying on intrusive ads or external investors." },
              { question: "How are partners selected?", answer: "We primarily support fellows from the beVisioneers program. These are young, verified climate leaders with proven track records in their local communities." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 md:p-8 glass-card rounded-[2rem] hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all duration-500 group"
              >
                <h3 className="text-base md:text-lg font-black mb-4 flex items-center gap-3 group-hover:text-emerald-300 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform" />
                  {faq.question}
                </h3>
                <p className="text-sage-light/60 leading-relaxed text-sm md:text-base">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


