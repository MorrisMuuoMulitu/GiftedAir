export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-green-100 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8 relative">
          {/* Pulsing circle background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-forest/20 rounded-full animate-ping"></div>
          </div>
          
          {/* Main icon */}
          <div className="relative text-9xl animate-bounce">
            🌿
          </div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-forest mb-4">
          Gifted Air
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Loading something beautiful...
        </p>

        {/* Loading bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-forest to-green-400 animate-loading-bar"></div>
        </div>

        {/* Fun facts that rotate */}
        <div className="mt-12 max-w-md mx-auto">
          <p className="text-sm text-gray-500 italic animate-fade-in">
            💡 A single tree absorbs up to 48 lbs of CO₂ per year
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
