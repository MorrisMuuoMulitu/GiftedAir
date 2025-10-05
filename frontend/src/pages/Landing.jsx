import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Icon */}
          <div className="mb-8 flex justify-center">
            <div className="text-9xl animate-float">🌿</div>
          </div>

          {/* Hero Text */}
          <h1 className="text-6xl md:text-7xl font-bold text-forest mb-6 leading-tight">
            Gifted Air
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 italic">
            A ritual of climate love
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Transform climate action into a love language. Send symbolic gifts—plant a tree, 
            offset a flight, support clean energy—in honor of someone you care about.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/compose')}
              className="bg-forest text-white px-12 py-4 rounded-full text-xl font-semibold 
                         hover:bg-green-800 transition-all duration-300 transform hover:scale-105 
                         shadow-lg hover:shadow-xl"
            >
              Create a Gift
            </button>
            <button
              onClick={() => navigate('/gallery')}
              className="bg-white text-forest border-2 border-forest px-12 py-4 rounded-full text-xl font-semibold 
                         hover:bg-green-50 transition-all duration-300 transform hover:scale-105 
                         shadow-lg hover:shadow-xl"
            >
              View Gallery 🎁
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-12 py-4 rounded-full text-xl font-semibold 
                         hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 
                         shadow-lg hover:shadow-xl"
            >
              🏆 Leaderboard
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
      </div>
    </div>
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
