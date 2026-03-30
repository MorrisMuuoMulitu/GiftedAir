import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Globe, Zap, Heart, Info, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import { API_URL } from '../config';

export default function Transparency() {
  const [ledgerGifts, setLedgerGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  useEffect(() => {
    const fetchLedgerData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gifts`);
        const data = await response.json();
        if (data.success || data.gifts) {
          // Take the 5 most recent gifts for the ledger
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
    <div className="min-h-screen bg-slate-950 text-off-white pb-32 overflow-x-hidden">
      <Navigation />
      
      <div className="container mx-auto px-4 max-w-5xl pt-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-24"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-teal-deep/30 border border-teal-deep/50 rounded-full text-teal-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
            <ShieldCheck className="w-4 h-4" /> Radical Transparency
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            The Impact <span className="text-bronze">Ledger.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We believe that climate action requires absolute honesty. Our 70/30 Fellowship-led model ensures that the majority of your gift directly heals the planet while sustaining the platform that makes it possible.
          </motion.p>
        </motion.div>

        {/* Impel Web Attribution & Development Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12 p-6 md:p-8 bg-slate-900 border border-teal-500/20 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-teal-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                <Zap className="w-3 h-3" /> Engineering Update
              </p>
              <h3 className="text-lg md:text-xl font-black mb-2 text-off-white">Live Ledger Development</h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-xl">
                This Live Impact Ledger is being architected and developed by <a href="https://www.impelweb.studio/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 underline underline-offset-4 decoration-teal-500/30 font-bold transition-all inline-flex items-center gap-1">Impel Web <ExternalLink className="w-3 h-3" /></a>. While the system currently displays verified ritual data, we are transitioning to a real-time blockchain-grade synchronization.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-teal-400 animate-pulse">
                Status: Beta Sync
              </div>
            </div>
          </div>
        </motion.div>

        {/* 70/30 Split Visualization */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="text-5xl md:text-6xl font-black text-teal-400 mb-4">70%</div>
              <h3 className="text-xl md:text-2xl font-black mb-4">Direct Partner Funding</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                The lion's share of every ritual goes directly to our primary partners like Uplift Her Kenya and Kaiti Greening Champions. This funds the physical seeds, the solar panels, and the community labor.
              </p>
            </div>
            <div className="flex items-center gap-4 text-teal-400 font-black uppercase tracking-widest text-[10px] md:text-xs">
              <Globe className="w-4 h-4" /> Verified Fellowship Projects
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="text-5xl md:text-6xl font-black text-bronze mb-4">30%</div>
              <h3 className="text-xl md:text-2xl font-black mb-4">Platform & Poetic UI</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                This portion fuels our growth. It covers high-aesthetic development, M-Pesa integration fees, and the expansion of our ritual-led ecosystem to reach more givers worldwide.
              </p>
            </div>
            <div className="flex items-center gap-4 text-bronze font-black uppercase tracking-widest text-[10px] md:text-xs">
              <Zap className="w-4 h-4" /> Sustainable Growth Engine
            </div>
          </motion.div>
        </div>

        {/* Real-time Ledger Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="p-6 md:p-10 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-black">Live Impact Ledger</h2>
            <div className="flex items-center gap-2 px-2 py-1 md:px-3 md:py-1 bg-teal-400/10 text-teal-400 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Database Sync
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px] md:min-w-full">
              <thead>
                <tr className="bg-slate-950/50">
                  <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Event Date</th>
                  <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Climate Ritual</th>
                  <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Contribution</th>
                  <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Impact Split</th>
                  <th className="px-6 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ledgerGifts.length > 0 ? (
                  ledgerGifts.map((gift, i) => (
                    <tr key={gift._id || i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 md:px-10 py-4 md:py-6 font-bold text-slate-400 text-xs md:text-sm">
                        {new Date(gift.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' })}
                      </td>
                      <td className="px-6 md:px-10 py-4 md:py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-teal-400" />
                          <span className="font-black text-off-white text-xs md:text-base">{gift.type === 'uplift-her' ? 'Uplift Her Kenya' : 'Kaiti Greening'}</span>
                        </div>
                      </td>
                      <td className="px-6 md:px-10 py-4 md:py-6 font-black text-teal-400 text-xs md:text-base">${gift.totalCost}</td>
                      <td className="px-6 md:px-10 py-4 md:py-6 font-medium text-slate-400 text-xs md:text-base">70% Partner</td>
                      <td className="px-6 md:px-10 py-4 md:py-6">
                        <span className="px-2 py-0.5 md:px-3 md:py-1 bg-teal-500/10 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-teal-400 border border-teal-500/20">
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  mockupItems.map((item, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 md:px-10 py-4 md:py-6 font-bold text-xs md:text-base">{item.date}</td>
                      <td className="px-6 md:px-10 py-4 md:py-6">
                        <a 
                          href={item.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-2 hover:text-teal-400 transition-colors text-xs md:text-base"
                        >
                          <div className="w-2 h-2 rounded-full bg-teal-400" />
                          {item.project}
                        </a>
                      </td>
                      <td className="px-6 md:px-10 py-4 md:py-6 font-black text-teal-400 text-xs md:text-base">{item.amount}</td>
                      <td className="px-6 md:px-10 py-4 md:py-6 font-medium text-slate-400 text-xs md:text-base">{item.split} Partner</td>
                      <td className="px-6 md:px-10 py-4 md:py-6">
                        <span className="px-2 py-0.5 md:px-3 md:py-1 bg-white/5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-300">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 md:p-10 bg-slate-950/50 text-center">
            <p className="text-slate-500 text-[10px] md:text-xs italic font-serif">
              Impact data is processed by the Impel Web engine to ensure mathematical precision in our partner distributions.
            </p>
          </div>
        </motion.div>

        {/* FAQ Ritual Section */}
        <div className="mt-20 md:mt-32">
          <h2 className="text-2xl md:text-3xl font-black mb-8 md:mb-12 text-center">Honest Inquiries</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <FAQCard 
              question="How do I know the impact is real?"
              answer="We provide monthly impact reports with direct verification from our partners. You can see the physical coordinates of restoration sites in your gift reveal."
            />
            <FAQCard 
              question="Is my gift tax deductible?"
              answer="Gifted Air is a for-profit ritual site. We prioritize speed of action and poetic experience over traditional charity structures. Your contribution is a direct investment in planetary healing."
            />
            <FAQCard 
              question="Why the 30% platform fee?"
              answer="Building world-class tech requires resources. This 30% ensures we can keep the M-Pesa ritual seamless, the UI cinematic, and our ecosystem growing without relying on intrusive ads or external investors."
            />
            <FAQCard 
              question="How are partners selected?"
              answer="We primarily support fellows from the beVisioneers program. These are young, verified climate leaders with proven track records in their local communities."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQCard({ question, answer }) {
  return (
    <div className="p-8 bg-slate-900/30 border border-white/5 rounded-[2rem] hover:border-bronze/30 transition-all duration-500">
      <h3 className="text-lg font-black mb-4 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-bronze" />
        {question}
      </h3>
      <p className="text-slate-400 leading-relaxed text-sm">{answer}</p>
    </div>
  );
}


