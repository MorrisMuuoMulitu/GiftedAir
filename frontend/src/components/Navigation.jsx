import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, User, Shield, LayoutDashboard, Heart, Sparkles, ArrowRight } from 'lucide-react';

const navItems = [
  { label: 'Marketplace', path: '/compose', icon: <Globe className="w-4 h-4" /> },
  { label: 'Gallery', path: '/gallery', icon: <Heart className="w-4 h-4" /> },
  { label: 'Impact', path: '/impact', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Transparency', path: '/transparency', icon: <Shield className="w-4 h-4" /> },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? 'py-3' : 'py-5'
    }`}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`relative flex items-center justify-between px-6 md:px-8 py-4 rounded-[2rem] transition-all duration-700 border ${
            scrolled 
              ? 'bg-forest-deep/80 backdrop-blur-2xl border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]' 
              : 'bg-white/[0.03] backdrop-blur-xl border-white/08'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.8, ease: "anticipate" }}
              className="w-11 h-11 bg-gradient-to-br from-emerald-500 via-teal-500 to-moss rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-black tracking-tight text-off-white text-display hidden sm:block">Gifted Air</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2xl border border-white/05 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-sage-light/60 hover:text-off-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* User / Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/admin"
              className="w-11 h-11 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-sage-light/60 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-500 hover:scale-105"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/compose"
              className="group relative px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-95 transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Gift Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-11 h-11 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-off-white hover:bg-white/10 transition-all hover:scale-105"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-4 px-4 md:hidden"
          >
            <div className="glass-card-elevated p-6 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="flex flex-col gap-3 relative z-10">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-4 p-5 rounded-2xl text-sm font-bold uppercase tracking-[0.15em] transition-all duration-500 ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                        : 'bg-white/5 text-sage-light/60 hover:text-off-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    <span className="p-2 bg-forest-deep/50 backdrop-blur-md rounded-lg border border-white/10">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
                <div className="h-px bg-white/10 my-3" />
                <Link
                  to="/compose"
                  className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all duration-500"
                >
                  <Sparkles className="w-5 h-5" />
                  Initiate Ritual
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}