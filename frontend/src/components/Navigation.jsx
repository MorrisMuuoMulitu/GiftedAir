import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/compose', label: 'Create Gift' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/transparency', label: 'Transparency' },
    { path: '/feedback', label: '💭 Give Feedback', highlight: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100">
        <div className="w-full">
          {/* Desktop Navigation - Full Width */}
          <div className="hidden md:flex items-center h-16">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`flex-1 h-full font-semibold text-lg transition-all duration-300 border-b-4 ${
                  link.highlight
                    ? isActive(link.path)
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-600 shadow-lg'
                      : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white border-transparent hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:scale-[1.02] animate-pulse'
                    : isActive(link.path)
                    ? 'bg-gray-100 text-green-700 border-green-600 shadow-md'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700 border-transparent hover:border-green-500 hover:shadow-md hover:scale-[1.02]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-end px-4 h-16">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
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
            <div className="md:hidden py-4 border-t border-gray-100 px-4">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3.5 rounded-xl font-semibold transition-all mb-2 ${
                    link.highlight
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : isActive(link.path)
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

    </>
  );
}

export default Navigation;
