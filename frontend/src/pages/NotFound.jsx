import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { Home, Gift, ArrowRight } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-forest-deep text-off-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 pattern-grid opacity-[0.02]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <Navigation />

      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center relative z-10"
        >
          {/* Large 404 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-[120px] md:text-[180px] lg:text-[220px] font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-teal-500 to-moss leading-none tracking-tighter text-display">
              404
            </h1>
          </motion.div>

          {/* Animated Icon */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-7xl md:text-8xl mb-8"
          >
            🌍
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-display">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-sage-light/70 mb-12 max-w-lg mx-auto leading-relaxed">
              This page seems to have floated away like CO₂ in the wind. 
              Let's get you back to solid ground!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/')}
              className="group px-8 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-3"
            >
              <Home className="w-5 h-5" />
              Go Home
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/compose')}
              className="group px-8 py-5 bg-white/[0.05] text-off-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 hover:border-emerald-500/30 transition-all flex items-center justify-center gap-3"
            >
              <Gift className="w-5 h-5" />
              Send a Gift
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <p className="text-sm text-sage-light/40 mb-6 font-bold uppercase tracking-widest">Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'Gallery', path: '/gallery', icon: '🎨' },
                { label: 'Leaderboard', path: '/leaderboard', icon: '🏆' },
                { label: 'Transparency', path: '/transparency', icon: '💚' },
                { label: 'Bulk Orders', path: '/bulk', icon: '💰' },
                { label: 'Impact', path: '/impact', icon: '📊' },
              ].map((link, i) => (
                <button
                  key={i}
                  onClick={() => navigate(link.path)}
                  className="text-sm text-sage-light/60 hover:text-emerald-400 transition-colors flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/05 hover:border-emerald-500/20"
                >
                  <span>{link.icon}</span>
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Fun fact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-12 glass-card p-6 max-w-md mx-auto"
          >
            <p className="text-sm text-sage-light/70">
              <span className="text-emerald-400 font-black">💡 Did you know?</span>{' '}
              While you're here, trees around the world are absorbing CO₂. 
              You can help plant more for just $5!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}