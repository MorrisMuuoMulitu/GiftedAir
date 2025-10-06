import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: '📖' },
    { path: '/compose', label: 'Create Gift', icon: '🎁' },
    { path: '/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/transparency', label: 'Transparency', icon: '💰' },
    { path: '/feedback', label: 'Give Feedback', icon: '💭', highlight: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <div 
        className="hidden md:block fixed left-0 top-0 h-screen z-50 transition-all duration-300"
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        style={{ width: sidebarExpanded ? '240px' : '80px' }}
      >
        <div className="h-full bg-gradient-to-b from-green-900 via-green-800 to-green-900 shadow-2xl flex flex-col">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center h-20 border-b border-green-700">
            <div className="text-4xl transition-transform duration-300 hover:scale-110">
              🌿
            </div>
            {sidebarExpanded && (
              <span className="ml-3 text-white font-bold text-lg opacity-0 animate-fadeIn">
                Gifted Air
              </span>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-6 space-y-2 px-3">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  link.highlight
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                    : isActive(link.path)
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-green-100 hover:bg-green-700/50 hover:text-white'
                }`}
              >
                <span className="text-2xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                  {link.icon}
                </span>
                {sidebarExpanded && (
                  <span className="font-semibold text-sm whitespace-nowrap opacity-0 animate-fadeIn">
                    {link.label}
                  </span>
                )}
                {!sidebarExpanded && isActive(link.path) && (
                  <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="h-16 border-t border-green-700 flex items-center justify-center">
            {sidebarExpanded ? (
              <div className="text-green-300 text-xs opacity-0 animate-fadeIn">
                v1.0.0
              </div>
            ) : (
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌿</span>
            <span className="font-bold text-green-800 text-lg">Gifted Air</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
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
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Sliding Menu */}
          <div className="md:hidden fixed top-0 left-0 h-screen w-72 z-50 bg-gradient-to-b from-green-900 via-green-800 to-green-900 shadow-2xl animate-slideInLeft">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-20 border-b border-green-700">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🌿</span>
                  <span className="text-white font-bold text-xl">Gifted Air</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-green-700/50 transition-colors text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 py-6 px-4 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      navigate(link.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${
                      link.highlight
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : isActive(link.path)
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-green-100 hover:bg-green-700/50 hover:text-white'
                    }`}
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="font-semibold">{link.label}</span>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="h-16 border-t border-green-700 flex items-center justify-center">
                <div className="text-green-300 text-xs">Version 1.0.0</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Spacer for desktop content */}
      <div className="hidden md:block" style={{ marginLeft: '80px' }}></div>
      
      {/* Spacer for mobile content */}
      <div className="md:hidden h-16"></div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default Navigation;
