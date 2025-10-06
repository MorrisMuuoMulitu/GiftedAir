import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/compose', label: 'Create Gift' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/transparency', label: 'Transparency' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Side */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group cursor-pointer"
            title="Go to Home"
          >
            <span className="text-3xl transform group-hover:scale-110 transition-transform duration-200">🌿</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">Gifted Air</span>
          </button>

          {/* Desktop Navigation - Center/Right */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-green-700 text-white shadow-lg shadow-green-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-green-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-5 py-3.5 rounded-xl font-semibold transition-all mb-2 ${
                  isActive(link.path)
                    ? 'bg-green-700 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-green-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
