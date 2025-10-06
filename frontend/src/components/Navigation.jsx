import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/compose', label: 'Create Gift', icon: '🎁' },
    { path: '/bulk', label: 'Bulk Orders', icon: '💰' },
    { path: '/gallery', label: 'Gallery', icon: '🎨' },
    { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
    { path: '/impact', label: 'My Impact', icon: '📊' },
    { path: '/transparency', label: 'Transparency', icon: '💚' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md border-b border-green-100 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group cursor-pointer"
            title="Go to Home"
          >
            <span className="text-3xl transform group-hover:scale-110 transition-transform">🌿</span>
            <span className="text-2xl font-bold text-forest dark:text-green-400">Gifted Air</span>
          </button>

          {/* Desktop Navigation - Center/Right */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                  isActive(link.path)
                    ? 'bg-forest dark:bg-green-600 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-800 hover:text-forest dark:hover:text-green-400'
                }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
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
          <div className="md:hidden py-4 border-t border-green-100 dark:border-gray-700 animate-fade-in-up">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all mb-1 ${
                  isActive(link.path)
                    ? 'bg-forest dark:bg-green-600 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-800'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
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
