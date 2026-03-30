import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, User, Shield, LayoutDashboard, Heart } from 'lucide-react';

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

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-4' : 'py-8'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`relative flex items-center justify-between px-6 py-4 rounded-[2rem] transition-all duration-500 border border-white/5 ${
          scrolled ? 'bg-slate-950/80 backdrop-blur-xl shadow-2xl' : 'bg-transparent'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-700 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <span className="text-xl">🌿</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-off-white">Gifted Air</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-2xl border border-white/5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  location.pathname === item.path
                    ? 'bg-off-white text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-off-white hover:bg-white/5'
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
              className="w-11 h-11 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-bronze transition-colors shadow-inner"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/compose"
              className="px-6 py-3 bg-bronze text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-bronze/20"
            >
              Gift Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-11 h-11 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center text-off-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 px-4 md:hidden"
          >
            <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-4 p-5 rounded-2xl text-base font-black uppercase tracking-[0.2em] transition-all ${
                      location.pathname === item.path
                        ? 'bg-off-white text-slate-950'
                        : 'bg-slate-950/50 text-slate-400 hover:text-off-white border border-white/5'
                    }`}
                  >
                    <span className="p-2 bg-slate-950 rounded-xl border border-white/5">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
                <div className="h-px bg-white/5 my-4" />
                <Link
                  to="/compose"
                  className="w-full py-6 bg-bronze text-white rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-bronze/20"
                >
                  <span className="text-xl">🎁</span>
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
