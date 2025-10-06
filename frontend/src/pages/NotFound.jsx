import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-forest to-green-600 leading-none">
              404
            </h1>
          </div>

          {/* Animated Icon */}
          <div className="text-8xl mb-8 animate-bounce">
            🌍
          </div>

          {/* Message */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-lg mx-auto">
            This page seems to have floated away like CO₂ in the wind. 
            Let's get you back to solid ground!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-forest text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-green-800 transition-all transform hover:scale-105 shadow-lg"
            >
              🏠 Go Home
            </button>
            <button
              onClick={() => navigate('/compose')}
              className="bg-white text-forest border-2 border-forest px-8 py-4 rounded-full text-lg font-bold hover:bg-green-50 transition-all"
            >
              🎁 Send a Gift
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/gallery')}
                className="text-forest hover:underline text-sm"
              >
                🎨 Gallery
              </button>
              <button
                onClick={() => navigate('/leaderboard')}
                className="text-forest hover:underline text-sm"
              >
                🏆 Leaderboard
              </button>
              <button
                onClick={() => navigate('/transparency')}
                className="text-forest hover:underline text-sm"
              >
                💚 Transparency
              </button>
              <button
                onClick={() => navigate('/bulk')}
                className="text-forest hover:underline text-sm"
              >
                💰 Bulk Orders
              </button>
            </div>
          </div>

          {/* Fun fact */}
          <div className="mt-12 bg-white/50 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-forest">💡 Did you know?</span>{' '}
              While you're here, trees around the world are absorbing CO₂. 
              You can help plant more for just $1!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
