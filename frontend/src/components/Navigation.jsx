import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home', icon: 'fa-solid fa-house' },
    { path: '/about', label: 'About', icon: 'fa-solid fa-circle-info' },
    { path: '/compose', label: 'Create Gift', icon: 'fa-solid fa-gift' },
    { path: '/gallery', label: 'Gallery', icon: 'fa-solid fa-images' },
    { path: '/transparency', label: 'Transparency', icon: 'fa-solid fa-chart-line' },
    { path: '/feedback', label: 'Give Feedback', icon: 'fa-solid fa-comment', highlight: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <div 
        className="hidden md:block fixed left-0 top-0 h-screen z-50 transition-all duration-300"
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
        style={{ width: sidebarExpanded ? '220px' : '80px' }}
      >
        <div className="h-full backdrop-blur-xl bg-white/80 border-r border-gray-200 shadow-sm flex flex-col">
          {/* Navigation Links - Centered Vertically */}
          <div className="flex-1 flex flex-col justify-center space-y-3 px-3">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                  link.highlight
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                    : isActive(link.path)
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
                }`}
              >
                <i className={`${link.icon} text-2xl flex-shrink-0 transition-transform duration-200 group-hover:scale-125`}></i>
                {sidebarExpanded && (
                  <span className="font-semibold text-sm whitespace-nowrap opacity-0 animate-fadeIn">
                    {link.label}
                  </span>
                )}
                {!sidebarExpanded && isActive(link.path) && (
                  <div className="absolute left-0 w-1 h-10 bg-green-600 rounded-r-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-end px-4 h-16">
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
          <div className="md:hidden fixed top-0 left-0 h-screen w-72 z-50 bg-white backdrop-blur-xl shadow-2xl animate-slideInLeft border-r border-gray-200">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-end px-6 h-20 border-b border-gray-100">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 py-6 px-4 space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      navigate(link.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                      link.highlight
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                        : isActive(link.path)
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
                    }`}
                  >
                    <i className={`${link.icon} text-2xl`}></i>
                    <span className="font-semibold">{link.label}</span>
                  </button>
                ))}
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
