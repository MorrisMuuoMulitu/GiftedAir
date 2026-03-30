import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Globe, Zap, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import Navigation from '../components/Navigation';
import SEO, { SEOConfig } from '../components/SEO';

export default function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-off-white overflow-x-hidden">
      <SEO {...SEOConfig.home} />
      <Navigation />
      
      {/* Michelin Star - Venture Button */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed top-24 right-4 sm:right-8 z-40 group"
      >
        <button
          onClick={() => navigate('/venture')}
          className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-bronze to-amber-700 rounded-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-2xl flex items-center justify-center border border-white/20"
        >
          <div className="text-2xl sm:text-3xl -rotate-12 group-hover:rotate-0 transition-transform duration-500">📊</div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase tracking-widest text-bronze whitespace-nowrap">Venture View</div>
        </button>
      </motion.div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Breathing Background Elements */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal-deep/20 rounded-full blur-[120px] pointer-events-none"
        />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto max-w-5xl relative z-10 text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-teal-deep/30 border border-teal-deep/50 rounded-full text-teal-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Ritual-Led Decarbonization
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-[0.9]">
            Where Climate Action Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-bronze to-teal-400 bg-[length:200%_auto] animate-gradient">Emotional Connection.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            Transform planetary healing into your personal love language. Send symbolic climate gifts that fund verified restoration projects worldwide.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/compose')}
              className="group relative px-10 py-5 bg-off-white text-slate-950 rounded-2xl text-lg font-black transition-all duration-500 hover:bg-bronze hover:text-off-white overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start the Ritual <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => navigate('/bulk')}
              className="px-10 py-5 bg-slate-900 border border-white/10 text-off-white rounded-2xl text-lg font-black hover:bg-slate-800 transition-all"
            >
              Corporate Gifting
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Featured Projects / Marketplace Preview */}
      <div className="py-32 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Curated Projects</h2>
              <p className="text-lg text-slate-400">Directly funding beVisioneers fellows and local climate champions across Kenya and the globe.</p>
            </div>
            <button 
              onClick={() => navigate('/compose')}
              className="text-teal-400 font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all"
            >
              View Marketplace <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProjectPreviewCard 
              image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
              title="Uplift Her Kenya"
              founder="Faith Wambiya"
              description="Empowering women through agrivoltaics and sustainable farming in rural Kenya."
              impact="10 Mangroves protected"
              tag="Primary Partner"
              website="https://www.upliftherkenya.org/"
            />
            <ProjectPreviewCard 
              image="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80"
              title="Kaiti Greening Champions"
              founder="Community Led"
              description="A massive 5M tree restoration goal to bring back life to the Makueni landscape."
              impact="5M Tree Goal"
              tag="Climate Restoration"
              website="https://kaitigreening.org/"
            />
          </div>
        </div>
      </div>

      {/* Trust & Transparency */}
      <div className="py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            <TrustFeature 
              icon={<ShieldCheck className="w-8 h-8 text-teal-400" />}
              title="Radical Transparency"
              desc="70/30 impact model. 70% goes directly to the field. 30% grows the platform."
            />
            <TrustFeature 
              icon={<Heart className="w-8 h-8 text-bronze" />}
              title="Emotional Impact"
              desc="Climate action isn't just about data; it's about the connection between people."
            />
            <TrustFeature 
              icon={<Zap className="w-8 h-8 text-amber-500" />}
              title="M-Pesa Prioritized"
              desc="Local micro-gifting made seamless for the Kenyan climate movement."
            />
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-32 px-4 relative">
        <div className="container mx-auto max-w-4xl text-center bg-gradient-to-br from-teal-deep to-slate-900 rounded-[3rem] p-16 border border-white/5 shadow-2xl overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-96 h-96 bg-bronze/10 rounded-full blur-[100px]"
          />
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Heal the Earth.<br/>Honor Someone Dear.</h2>
          <button
            onClick={() => navigate('/compose')}
            className="relative z-10 px-12 py-6 bg-off-white text-slate-950 rounded-2xl text-xl font-black hover:bg-bronze hover:text-off-white transition-all duration-500"
          >
            Send a Climate Gift
          </button>
        </div>
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

function ProjectPreviewCard({ image, title, founder, description, impact, tag, website }) {
  return (
    <a 
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-slate-800/50 rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 block"
    >
      <div className="relative h-64 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-6 left-6 px-4 py-1.5 bg-slate-950/80 backdrop-blur text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">
          {tag}
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-black mb-1">{title}</h3>
            <p className="text-teal-400 text-sm font-bold uppercase tracking-widest">Founded by {founder}</p>
          </div>
          <div className="bg-bronze/20 text-bronze px-4 py-2 rounded-xl text-sm font-black">
            {impact}
          </div>
        </div>
        <p className="text-slate-400 leading-relaxed">{description}</p>
      </div>
    </a>
  );
}

function TrustFeature({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
        {icon}
      </div>
      <h3 className="text-xl font-black mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
