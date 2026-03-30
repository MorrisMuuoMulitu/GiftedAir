import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, User, Shield, LayoutDashboard, Heart, Sparkles } from 'lucide-react';

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
      scrolled ? 'py-4' : 'py-8'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`relative flex items-center justify-between px-8 py-4 rounded-[2.5rem] transition-all duration-700 border ${
          scrolled 
            ? 'bg-forest-deep/70 backdrop-blur-2xl border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)]' 
            : 'bg-white/[0.02] backdrop-blur-xl border-white/10'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.8, ease: "anticipate" }}
              className="w-12 h-12 bg-gradient-to-br from-accent-emerald via-moss to-forest rounded-2xl flex items-center justify-center shadow-lg shadow-accent-emerald/20"
            >
              <Sparkles className="w-6 h-6 text-off-white" />
            </motion.div>
            <span className="text-2xl font-black tracking-tighter text-off-white text-display">Gifted Air</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 bg-white/[0.03] p-2 rounded-2xl border border-white/5 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-br from-off-white to-sage-light text-forest-deep shadow-xl scale-105'
                    : 'text-sage-light/60 hover:text-off-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* User / Action */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/admin"
              className="w-12 h-12 bg-white/[0.03] backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center text-sage-light/60 hover:text-accent-emerald transition-all duration-500 hover:scale-110 hover:border-accent-emerald/30"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/compose"
              className="group px-8 py-4 bg-gradient-to-br from-accent-emerald to-emerald-600 text-off-white rounded-2xl text-xs font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-accent-emerald/30 active:scale-95 transition-all duration-500 relative overflow-hidden"
            >
              <span className="relative z-10">Gift Now</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-12 h-12 bg-white/[0.03] backdrop-blur-md border border-white/15 rounded-xl flex items-center justify-center text-off-white hover:bg-white/10 transition-all hover:scale-105"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
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
            <div className="glass-card-deluxe p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-emerald/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="flex flex-col gap-4 relative z-10">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-4 p-6 rounded-2xl text-base font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-br from-off-white to-sage-light text-forest-deep shadow-xl'
                        : 'bg-white/5 text-sage-light/60 hover:text-off-white border border-white/5'
                    }`}
                  >
                    <span className="p-2 bg-forest-deep/80 backdrop-blur-md rounded-xl border border-white/10">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
                <div className="h-px bg-white/10 my-4" />
                <Link
                  to="/compose"
                  className="w-full py-6 bg-gradient-to-br from-accent-emerald to-emerald-600 text-off-white rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-accent-emerald/30 active:scale-95 transition-all duration-500"
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
