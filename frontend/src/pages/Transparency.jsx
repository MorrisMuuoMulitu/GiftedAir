import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Globe, Zap, Heart, Info } from 'lucide-react';
import Navigation from '../components/Navigation';

export default function Transparency() {
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

  const ledgerItems = [
    { date: 'Oct 2023', project: 'Uplift Her Kenya', amount: '$1,240', split: '70%', status: 'Fufilled', website: 'https://www.upliftherkenya.org/' },
    { date: 'Oct 2023', project: 'Kaiti Greening', amount: '$850', split: '70%', status: 'Fufilled', website: 'https://kaitigreening.org/' },
    { date: 'Sep 2023', project: 'Uplift Her Kenya', amount: '$920', split: '70%', status: 'Fufilled', website: 'https://www.upliftherkenya.org/' },
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

        {/* Mockup Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-center"
        >
          <p className="text-amber-500 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2">
            <Info className="w-4 h-4" /> Note: This Live Impact Ledger is currently a high-fidelity mockup for ritual demonstration.
          </p>
        </motion.div>

        {/* 70/30 Split Visualization */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 border border-white/5 rounded-[3rem] p-10 flex flex-col justify-between"
          >
            <div>
              <div className="text-6xl font-black text-teal-400 mb-4">70%</div>
              <h3 className="text-2xl font-black mb-4">Direct Partner Funding</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                The lion's share of every ritual goes directly to our primary partners like Uplift Her Kenya and Kaiti Greening Champions. This funds the physical seeds, the solar panels, and the community labor.
              </p>
            </div>
            <div className="flex items-center gap-4 text-teal-400 font-black uppercase tracking-widest text-xs">
              <Globe className="w-4 h-4" /> Verified Fellowship Projects
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 border border-white/5 rounded-[3rem] p-10 flex flex-col justify-between"
          >
            <div>
              <div className="text-6xl font-black text-bronze mb-4">30%</div>
              <h3 className="text-2xl font-black mb-4">Platform & Poetic UI</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                This portion fuels our growth. It covers high-aesthetic development, M-Pesa integration fees, and the expansion of our ritual-led ecosystem to reach more givers worldwide.
              </p>
            </div>
            <div className="flex items-center gap-4 text-bronze font-black uppercase tracking-widest text-xs">
              <Zap className="w-4 h-4" /> Sustainable Growth Engine
            </div>
          </motion.div>
        </div>

        {/* Real-time Ledger Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="p-10 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-2xl font-black">Live Impact Ledger</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-teal-400/10 text-teal-400 rounded-full text-[10px] font-black uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Real-time Sync
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-950/50">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Month</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Fellowship Project</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Contribution</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Impact Split</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ledgerItems.map((item, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-10 py-6 font-bold">{item.date}</td>
                    <td className="px-10 py-6">
                      <a 
                        href={item.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 hover:text-teal-400 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-teal-400" />
                        {item.project}
                      </a>
                    </td>
                    <td className="px-10 py-6 font-black text-teal-400">{item.amount}</td>
                    <td className="px-10 py-6 font-medium text-slate-400">{item.split} Partner</td>
                    <td className="px-10 py-6">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-300">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-10 bg-slate-950/50 text-center">
            <p className="text-slate-500 text-xs italic font-serif">
              Impact reports are updated at the close of every lunar cycle to ensure precision in our partner distributions.
            </p>
          </div>
        </motion.div>

        {/* FAQ Ritual Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-black mb-12 text-center">Honest Inquiries</h2>
          <div className="grid md:grid-cols-2 gap-8">
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

