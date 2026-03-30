import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Globe, Zap, ArrowRight, ShieldCheck, Heart, Sparkles, Wind, TreePine, Droplets, Sun, Waves } from 'lucide-react';
import Navigation from '../components/Navigation';
import SEO, { SEOConfig } from '../components/SEO';

export default function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const projects = [
    {
      id: 'uplift-her',
      title: 'Uplift Her Kenya',
      founder: 'Faith Wambiya',
      description: 'Empowering women through agrivoltaics and sustainable farming in rural Kenya.',
      impact: '10 Mangroves',
      tag: 'Primary Partner',
      website: 'https://www.upliftherkenya.org/',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    },
    {
      id: 'kaiti-greening',
      title: 'Kaiti Greening',
      founder: 'Community Led',
      description: 'A massive 5M tree restoration goal to bring back life to the Makueni landscape.',
      impact: '5M Tree Goal',
      tag: 'Restoration',
      website: 'https://kaitigreening.org/',
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
    }
  ];

  const stats = [
    { icon: <TreePine className="w-6 h-6" />, value: '12,500+', label: 'Trees Planted' },
    { icon: <Waves className="w-6 h-6" />, value: '2,400kg', label: 'Ocean Cleaned' },
    { icon: <Droplets className="w-6 h-6" />, value: '850+', label: 'Families Helped' },
    { icon: <Sun className="w-6 h-6" />, value: '150kW', label: 'Clean Energy' },
  ];

  return (
    <div className="min-h-screen bg-forest-deep text-off-white overflow-hidden relative">
      <SEO {...SEOConfig.home} />
      <Navigation />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-30 z-50 mix-blend-soft-light" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 pattern-grid opacity-[0.03]" />
        
        {/* Floating orbs */}
        <motion.div 
          animate={{ 
            x: [0, 80, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] -left-[5%] w-[50vw] h-[50vw] bg-gradient-to-br from-emerald-500/15 via-moss/10 to-transparent rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[15%] -right-[10%] w-[40vw] h-[40vw] bg-gradient-to-bl from-teal-500/10 via-accent-emerald/5 to-transparent rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute -bottom-[10%] left-[15%] w-[60vw] h-[40vw] bg-gradient-to-t from-accent-emerald/10 via-moss/5 to-transparent rounded-full blur-[180px]"
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 10 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            style={{
              left: `${5 + (i * 5) % 90}%`,
              top: `${60 + (i * 2) % 30}%`,
            }}
          />
        ))}
      </div>

      {/* Floating Action Button */}
      <motion.div 
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.5 }}
        className="fixed top-28 right-6 sm:right-10 z-40"
      >
        <button
          onClick={() => navigate('/venture')}
          className="group relative w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-[1.5rem] shadow-[0_0_40px_rgba(16,185,129,0.4),0_20px_40px_-10px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-[3px] border-t-white/20 border-r-transparent border-b-transparent border-l-transparent rounded-[1.5rem]"
          />
          <div className="relative z-10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white group-hover:scale-125 transition-transform duration-500" />
          </div>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:bottom-14 transition-all duration-300 whitespace-nowrap">
            <span className="text-xs font-black uppercase tracking-widest text-white bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">Venture Deck</span>
          </div>
        </button>
      </motion.div>

      {/* Hero Section */}
      <div className="relative pt-36 md:pt-48 pb-20 md:pb-32 px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto max-w-6xl relative z-10"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-full group hover:border-emerald-500/40 transition-all duration-500 cursor-pointer">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Wind className="w-4 h-4 text-emerald-400" />
              </motion.div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Ritual-Led Decarbonization</span>
              <motion.div 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-emerald-400"
              >
                →
              </motion.div>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black mb-8 tracking-tight leading-[0.85] md:leading-[0.8] text-display">
              Where Healing <br/>
              <span className="text-gradient">Feels Like Home.</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-sage-light/80 max-w-3xl mx-auto font-medium leading-relaxed">
              Transform planetary restoration into a personal ritual. Send symbolic climate gifts that fund verified healing projects.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => navigate('/compose')}
              className="btn-primary group"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Start the Ritual 
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </button>
            <button
              onClick={() => navigate('/bulk')}
              className="btn-secondary group"
            >
              <span className="flex items-center justify-center gap-3">
                Corporate Gifting
                <Sparkles className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </span>
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 md:mt-24"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2 mb-2 text-emerald-400 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-sage-light/50">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-forest-deep to-transparent" />
      </div>

      {/* Featured Projects Section */}
      <div className="py-20 md:py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Our Partners</span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-display">
                Curated Restoration
              </h2>
              <p className="text-lg md:text-xl text-sage-light/60">Directly funding beVisioneers fellows and local climate champions across the globe.</p>
            </div>
            <button
              onClick={() => navigate('/compose')}
              className="group px-8 py-5 bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 rounded-2xl text-emerald-400 font-bold uppercase tracking-widest text-sm flex items-center gap-3 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            >
              View Marketplace 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          {/* Project Cards */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {projects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -12 }}
                className="group glass-card-elevated overflow-hidden block transition-all duration-700 hover-lift"
              >
                {/* Image Container */}
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent opacity-90" />
                  
                  {/* Tag */}
                  <div className="absolute top-6 left-6 px-5 py-2.5 bg-emerald-500/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full border border-white/20 shadow-lg">
                    {project.tag}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black mb-3 text-display group-hover:text-emerald-300 transition-colors">{project.title}</h3>
                      <p className="text-emerald-400/80 text-sm font-bold uppercase tracking-widest">Founded by {project.founder}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-md text-emerald-300 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-500/20 shadow-lg">
                      {project.impact}
                    </div>
                  </div>
                  <p className="text-sage-light/70 text-lg leading-relaxed">{project.description}</p>

                  {/* View More Indicator */}
                  <div className="mt-6 flex items-center gap-2 text-emerald-400/60 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2">
                    Visit Website 
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Features Section */}
      <div className="py-20 md:py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/[0.02] via-transparent to-transparent" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Why Gifted Air</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-display">
              Built on Trust
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { 
                icon: <ShieldCheck className="w-10 h-10" />, 
                title: "Radical Transparency", 
                desc: "70/30 impact model. 70% goes directly to the field. 30% grows the platform. Every penny tracked.",
                color: "emerald"
              },
              { 
                icon: <Heart className="w-10 h-10" />, 
                title: "Emotional Impact", 
                desc: "Climate action isn't just data—it's the connection between people who care about each other.",
                color: "rose"
              },
              { 
                icon: <Zap className="w-10 h-10" />, 
                title: "Seamless Ritual", 
                desc: "M-Pesa prioritized. Local micro-gifting made seamless for the global climate movement.",
                color: "amber"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className={`w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 group-hover:border-${feature.color}-500/30 group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)]`}
                >
                  <div className={`text-${feature.color}-400`}>{feature.icon}</div>
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-black mb-5 text-display">{feature.title}</h3>
                <p className="text-sage-light/60 text-lg leading-relaxed max-w-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 md:py-32 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="relative z-10 text-center glass-card-elevated rounded-[3rem] md:rounded-[4rem] p-12 md:p-20 lg:p-24 overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[30%] -right-[20%] w-[60%] h-[120%] bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent rounded-full blur-[150px] pointer-events-none"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[30%] -left-[20%] w-[50%] h-[120%] bg-gradient-to-tr from-moss/30 via-emerald-500/10 to-transparent rounded-full blur-[120px] pointer-events-none"
            />

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-6xl md:text-8xl mb-8"
              >
                🌱
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 md:mb-12 leading-[1.05] md:leading-[1] text-display">
                Heal the Earth.<br/>
                <span className="text-gradient">Honor Someone Dear.</span>
              </h2>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/compose')}
                className="btn-primary text-lg md:text-xl px-12 py-6"
              >
                Send a Climate Gift
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.8 }}
                  className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-moss rounded-xl flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-xl font-black text-display">Gifted Air</span>
              </div>
              <p className="text-sm text-sage-light/50 leading-relaxed">
                Transform planetary restoration into a personal ritual. Climate action as a love language.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-4">Explore</h4>
              <div className="flex flex-col gap-3">
                <a href="/compose" className="text-sm text-sage-light/60 hover:text-emerald-400 transition-colors">Send a Gift</a>
                <a href="/gallery" className="text-sm text-sage-light/60 hover:text-emerald-400 transition-colors">Gallery</a>
                <a href="/leaderboard" className="text-sm text-sage-light/60 hover:text-emerald-400 transition-colors">Leaderboard</a>
                <a href="/impact" className="text-sm text-sage-light/60 hover:text-emerald-400 transition-colors">Your Impact</a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-4">Company</h4>
              <div className="flex flex-col gap-3">
                <a href="/about" className="text-sm text-sage-light/60 hover:text-emerald-400 transition-colors">About Us</a>
                <a href="/transparency" className="text-sm text-sage-light/60 hover:text-emerald-400 transition-colors">Transparency</a>
                <a href="/partner-application" className="text-sm text-sage-light/60 hover:text-emerald-400 transition-colors">Partner With Us</a>
                <a href="/venture" className="text-sm text-sage-light/60 hover:text-emerald-400 transition-colors">Venture Deck</a>
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-4">Support</h4>
              <div className="flex flex-col gap-3">
                <a href="/feedback" className="text-sm text-sage-light/60 hover:text-emerald-400 transition-colors">Feedback</a>
                <a href="/bulk" className="text-sm text-sage-light/60 hover:text-emerald-400 transition-colors">Corporate Gifting</a>
                <a href="mailto:hello@giftedair.com" className="text-sm text-sage-light/60 hover:text-emerald-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-sage-light/40">
              <span>© 2026 Gifted Air. Climate love in action.</span>
              <span className="hidden md:inline">•</span>
              <a href="https://www.impelweb.studio/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                Designed by Impel Web
              </a>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sage-light/40 hover:text-emerald-400 transition-colors text-sm">Privacy</a>
              <a href="#" className="text-sage-light/40 hover:text-emerald-400 transition-colors text-sm">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}