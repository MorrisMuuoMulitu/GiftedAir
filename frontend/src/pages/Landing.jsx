import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import SEO, { SEOConfig } from '../components/SEO';
import FundraisingTracker from '../components/FundraisingTracker';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <SEO {...SEOConfig.home} />
      <Navigation />
      
      {/* Michelin Star - Lean Canvas Button (Top Right) */}
      <div className="michelin-star-container" style={{animation: 'float-up-down 3s ease-in-out infinite'}}>
        <button
          onClick={() => navigate('/venture')}
          className="michelin-star"
          title="View My Lean Canvas"
        >
        </button>
        <div className="star-text">
          <div className="text-base sm:text-xl font-bold text-slate-900 mb-1">📊</div>
          <div className="text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">Lean<br/>Canvas</div>
        </div>
      </div>
      
      {/* Michelin Star Button Styles */}
      <style>{`
        @keyframes star-glow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 215, 0, 1)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.8));
          }
        }
        
        @keyframes star-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .michelin-star {
          position: relative;
          width: 80px;
          height: 80px;
          clip-path: polygon(
            50% 0%, 
            61% 35%, 
            98% 35%, 
            68% 57%, 
            79% 91%, 
            50% 70%, 
            21% 91%, 
            32% 57%, 
            2% 35%, 
            39% 35%
          );
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%);
          animation: star-glow 2s ease-in-out infinite;
          transition: all 0.4s ease;
          cursor: pointer;
        }
        
        .michelin-star:hover {
          animation: star-glow 0.8s ease-in-out infinite;
          transform: scale(1.15) rotate(360deg);
        }
        
        .michelin-star-container {
          position: fixed;
          top: 80px;
          right: 12px;
          z-index: 40;
        }
        
        @media (min-width: 640px) {
          .michelin-star {
            width: 120px;
            height: 120px;
          }
          .michelin-star:hover {
            transform: scale(1.25) rotate(360deg);
          }
          .michelin-star-container {
            top: 100px;
            right: 20px;
          }
        }
        
        .star-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          pointer-events: none;
          z-index: 10;
          transition: all 0.4s ease;
        }
        
        .michelin-star:hover ~ .star-text {
          transform: translate(-50%, -50%) scale(1.25) rotate(360deg);
        }
        
        @keyframes float-up-down {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-sky via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Impact Highlight */}
          <div className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full px-6 py-3 inline-block text-sm font-bold">
            🌍 70% OF PROCEEDS TO CLIMATE ACTION
          </div>

          {/* Animated Icon */}
          <div className="mb-8 flex justify-center">
            <div className="text-9xl animate-float">🌿</div>
          </div>

          {/* Hero Text */}
          <h1 className="text-6xl md:text-7xl font-bold text-forest mb-6 leading-tight">
            Gifted Air
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 italic">
            Where Climate Action Meets Emotional Connection
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Transform climate action into a love language. Send symbolic gifts—plant a tree,
            offset a flight, or protect a reef—in honor of someone you care about while directly
            funding verified environmental projects worldwide.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button
              onClick={() => navigate('/compose')}
              className="group relative px-10 py-5 bg-forest text-white rounded-2xl text-lg font-bold
                         hover:bg-green-800 transition-all duration-300 shadow-2xl hover:shadow-forest/50
                         border-b-4 border-green-900 hover:border-green-950 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <span className="text-2xl">🎁</span>
                <span>Send a Climate Gift</span>
              </span>
            </button>

            <button
              onClick={() => navigate('/bulk')}
              className="group relative px-10 py-5 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500
                         text-white rounded-2xl text-lg font-bold hover:from-amber-600 hover:via-orange-600
                         hover:to-red-600 transition-all duration-300 shadow-2xl hover:shadow-orange-500/50
                         border-b-4 border-orange-700 hover:border-orange-800 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <span>Bulk Orders</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Save 25%</span>
              </span>
            </button>
          </div>

          {/* Impact Highlight */}
          <div className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-5xl">🌍</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-forest mb-2">Maximum Environmental Impact</h3>
                <p className="text-gray-700">
                  70% of every gift goes directly to funding verified environmental projects worldwide,
                  from planting trees to cleaning oceans and protecting endangered habitats.
                </p>
              </div>
              <div className="text-3xl font-bold text-green-700">70% Impact</div>
            </div>
          </div>

          {/* Secondary Navigation */}
          <div className="flex flex-wrap gap-3 justify-center items-center text-sm">
            <button
              onClick={() => navigate('/gallery')}
              className="px-6 py-2.5 bg-white/90 backdrop-blur text-forest rounded-full font-semibold 
                         hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg
                         border border-green-200"
            >
              🎨 Gallery
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="px-6 py-2.5 bg-white/90 backdrop-blur text-forest rounded-full font-semibold 
                         hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg
                         border border-green-200"
            >
              🏆 Leaderboard
            </button>
            <button
              onClick={() => navigate('/impact')}
              className="px-6 py-2.5 bg-white/90 backdrop-blur text-forest rounded-full font-semibold 
                         hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg
                         border border-green-200"
            >
              📊 My Impact
            </button>
            <button
              onClick={() => navigate('/transparency')}
              className="px-6 py-2.5 bg-white/90 backdrop-blur text-forest rounded-full font-semibold 
                         hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg
                         border border-green-200"
            >
              💚 Transparency
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon="🌳"
            title="Plant Trees"
            description="Give the gift of forests and fresh air"
          />
          <FeatureCard
            icon="🏡"
            title="Clean Cookstoves"
            description="Support communities and reduce emissions"
          />
          <FeatureCard
            icon="☀️"
            title="Solar Power"
            description="Bring renewable energy to those who need it"
          />
        </div>

        {/* Poetic Quote */}
        <div className="mt-24 text-center">
          <blockquote className="text-2xl text-gray-600 italic max-w-2xl mx-auto">
            "To love is to act. To gift is to care. To heal the earth is to honor those we hold dear."
          </blockquote>
        </div>

        {/* Call to Action */}
        <div className="mt-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">🌍 Ready to Make an Impact?</h3>
            <p className="text-lg mb-6">
              Join thousands of others in turning symbolic gifts into real-world environmental action.
            </p>
            <button
              onClick={() => navigate('/compose')}
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Gift 🎁
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-forest mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
