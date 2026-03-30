import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Globe, Zap, ArrowRight, ShieldCheck, Heart, Sparkles, Wind } from 'lucide-react';
import Navigation from '../components/Navigation';
import SEO, { SEOConfig } from '../components/SEO';

export default function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-forest-deep text-off-white overflow-x-hidden selection:bg-moss/30 relative">
      <SEO {...SEOConfig.home} />
      <Navigation />
      
      {/* Texture & Noise */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-50 mix-blend-soft-light opacity-20" />
      
      {/* Living Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-forest/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0],
            y: [0, 60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] -right-[5%] w-[50%] h-[50%] bg-moss/10 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -bottom-[10%] left-[20%] w-[70%] h-[60%] bg-accent-emerald/5 rounded-full blur-[150px]"
        />
      </div>

      {/* Floating Action Button (Venture) */}
      <motion.div 
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 12 }}
        whileHover={{ scale: 1.1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed top-24 right-4 sm:right-8 z-40 group"
      >
        <button
          onClick={() => navigate('/venture')}
          className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-moss to-forest-dark rounded-[1.5rem] shadow-2xl flex items-center justify-center border border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-50%] border-t border-white/5 rounded-full"
          />
          <Sparkles className="w-8 h-8 text-sage-light group-hover:scale-110 transition-transform" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase tracking-widest text-sage-light whitespace-nowrap">Venture View</div>
        </button>
      </motion.div>

      {/* Hero Section */}
      <div className="relative pt-32 md:pt-48 pb-24 md:pb-40 px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto max-w-6xl relative z-10 text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.04] backdrop-blur-md border border-white/15 rounded-full text-accent-emerald text-xs font-bold uppercase tracking-[0.25em] mb-8 shadow-lg">
            <Wind className="w-4 h-4 animate-pulse-slow" />
            Ritual-Led Decarbonization
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl md:text-[11rem] font-black mb-10 tracking-tight leading-[0.85] md:leading-[0.8] text-display">
            Where Healing <br/>
            <span className="text-gradient">Feels Like Home.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-3xl text-sage-light/80 max-w-3xl mx-auto mb-14 font-medium leading-relaxed">
            Transform planetary restoration into a personal ritual. Send symbolic climate gifts that fund verified healing projects.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => navigate('/compose')}
              className="btn-primary"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Start the Ritual <ArrowRight className="w-5 h-5" />
              </span>
            </button>
            <button
              onClick={() => navigate('/bulk')}
              className="btn-secondary"
            >
              Corporate Gifting
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Featured Projects / Marketplace Preview */}
      <div className="py-32 md:py-48 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent skew-y-2 -z-10" />
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 md:mb-32 gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black mb-6 text-display">Curated Restoration</h2>
              <p className="text-lg md:text-xl text-sage-light/60">Directly funding beVisioneers fellows and local climate champions across the globe.</p>
            </div>
            <button
              onClick={() => navigate('/compose')}
              className="group px-8 py-5 bg-white/[0.04] backdrop-blur-md hover:bg-white/10 border border-white/15 rounded-2xl text-accent-emerald font-black uppercase tracking-widest text-sm flex items-center gap-3 transition-all duration-500 hover:scale-105"
            >
              View Marketplace <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <ProjectPreviewCard 
              image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
              title="Uplift Her Kenya"
              founder="Faith Wambiya"
              description="Empowering women through agrivoltaics and sustainable farming in rural Kenya."
              impact="10 Mangroves"
              tag="Primary Partner"
              website="https://www.upliftherkenya.org/"
            />
            <ProjectPreviewCard 
              image="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80"
              title="Kaiti Greening"
              founder="Community Led"
              description="A massive 5M tree restoration goal to bring back life to the Makueni landscape."
              impact="5M Tree Goal"
              tag="Restoration"
              website="https://kaitigreening.org/"
            />
          </div>
        </div>
      </div>

      {/* Trust & Transparency */}
      <div className="py-32 md:py-48 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent -z-10" />
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-16 md:gap-24">
            <TrustFeature 
              icon={<ShieldCheck className="w-10 h-10 text-accent-emerald" />}
              title="Radical Transparency"
              desc="70/30 impact model. 70% goes directly to the field. 30% grows the platform."
            />
            <TrustFeature 
              icon={<Heart className="w-10 h-10 text-moss" />}
              title="Emotional Impact"
              desc="Climate action isn't just about data; it's about the connection between people."
            />
            <TrustFeature 
              icon={<Zap className="w-10 h-10 text-earth-light" />}
              title="Seamless Ritual"
              desc="M-Pesa Prioritized. Local micro-gifting made seamless for the global climate movement."
            />
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-32 md:pb-56 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative z-10 text-center glass-card-deluxe rounded-[3rem] md:rounded-[4rem] p-12 md:p-24 overflow-hidden"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[50%] -right-[30%] w-[80%] h-[150%] bg-gradient-to-br from-accent-emerald/20 to-moss/10 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[40%] -left-[20%] w-[70%] h-[140%] bg-gradient-to-tr from-forest/30 to-transparent rounded-full blur-[100px] pointer-events-none"
            />
            <h2 className="text-4xl md:text-8xl font-black mb-10 md:mb-16 relative z-10 leading-[1.05] md:leading-[1] text-display">
              Heal the Earth.<br/>
              <span className="text-gradient">Honor Someone Dear.</span>
            </h2>
            <button
              onClick={() => navigate('/compose')}
              className="btn-primary scale-110 md:scale-125 hover:scale-115 md:hover:scale-135 relative z-10"
            >
              <span className="relative z-10">Send a Climate Gift</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProjectPreviewCard({ image, title, founder, description, impact, tag, website }) {
  return (
    <motion.a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -12 }}
      className="group glass-card-deluxe overflow-hidden block transition-all duration-700"
    >
      <div className="relative h-80 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
        <div className="absolute top-6 left-6 px-6 py-2.5 bg-forest-deep/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full border border-white/15 shadow-xl">
          {tag}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent opacity-80" />
      </div>
      <div className="p-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-3xl font-black mb-3 text-display">{title}</h3>
            <p className="text-accent-emerald text-sm font-bold uppercase tracking-widest">Founded by {founder}</p>
          </div>
          <div className="bg-gradient-to-br from-moss/30 to-forest/40 backdrop-blur-md text-moss-light px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border border-moss/30 shadow-lg">
            {impact}
          </div>
        </div>
        <p className="text-sage-light/70 text-lg leading-relaxed">{description}</p>
      </div>
    </motion.a>
  );
}

function TrustFeature({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <motion.div
        whileHover={{ rotate: 12, scale: 1.1 }}
        className="w-28 h-28 bg-gradient-to-br from-white/10 to-white/[0.03] backdrop-blur-md border border-white/15 rounded-3xl flex items-center justify-center mb-10 shadow-2xl transition-all duration-500 group-hover:bg-white/15 group-hover:border-accent-emerald/30 group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)]"
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-black mb-5 text-display">{title}</h3>
      <p className="text-sage-light/60 text-lg leading-relaxed max-w-sm">{desc}</p>
    </div>
  );
}
