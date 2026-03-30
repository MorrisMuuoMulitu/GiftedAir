import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-forest-deep text-off-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 pattern-grid opacity-[0.02]" />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-teal-500/5 rounded-full blur-[150px]" />
      </div>

      <Navigation />

      <div className="container mx-auto px-4 max-w-4xl pt-32 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <Heart className="w-4 h-4" /> Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-display">
            Climate Action as a <span className="text-gradient">Love Language.</span>
          </h1>
          <p className="text-xl text-sage-light/70 max-w-2xl mx-auto leading-relaxed">
            What if the best gift you could give someone was a healthier planet in their name?
          </p>
        </motion.div>

        {/* What is Gifted Air */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glass-card-elevated p-8 md:p-12">
            <p className="text-2xl md:text-3xl font-black text-display mb-6">
              Gifted Air transforms climate action into meaningful gifts.
            </p>
            <p className="text-lg text-sage-light/70 leading-relaxed mb-8">
              Instead of buying physical items or generic gift cards, you can give someone trees planted in their name, 
              ocean cleanup, clean water projects, solar power, and more. Each gift comes with a personalized page, 
              downloadable certificate, and shareable link.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/compose')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-3"
              >
                Send a Gift <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/gallery')}
                className="px-8 py-4 bg-white/[0.05] text-off-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 hover:border-emerald-500/30 transition-all"
              >
                View Gallery
              </button>
            </div>
          </div>
        </motion.section>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-8"
        >
          <button
            onClick={() => navigate('/')}
            className="text-sage-light/40 hover:text-emerald-400 font-bold uppercase tracking-[0.2em] text-xs transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            ← Return to Sanctuary
          </button>
        </motion.div>
      </div>
    </div>
  );
}