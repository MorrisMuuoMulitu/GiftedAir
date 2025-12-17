import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import FundraisingTracker from '../components/FundraisingTracker';

export default function BeVisioneersFundraising() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-4">
              🎓 BeVisioneers Fellowship Fundraising
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Supporting changemakers in climate and social innovation
            </p>
          </div>

          {/* Fundraising Tracker */}
          <div className="mb-8">
            <FundraisingTracker />
          </div>

          {/* Fellowship Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">About BeVisioneers Fellowship</h2>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 mb-4">
                The BeVisioneers Fellowship is a transformative program that empowers changemakers to create 
                positive impact in climate and social innovation. We're supporting the next generation of 
                environmental leaders and entrepreneurs.
              </p>
              
              <h3 className="text-xl font-bold text-blue-700 mb-3">Our Mission</h3>
              <p className="text-gray-700 mb-4">
                To create a global network of visionary changemakers who are committed to driving 
                systemic change for a sustainable future. Our fellows work on diverse challenges 
                including climate action, social justice, and sustainable innovation.
              </p>
              
              <h3 className="text-xl font-bold text-blue-700 mb-3">Impact Areas</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Climate Action & Environmental Sustainability</li>
                <li>Social Innovation & Community Building</li>
                <li>Technology for Good & Digital Ethics</li>
                <li>Systems Thinking & Regenerative Design</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-xl">
                <h3 className="text-lg font-bold text-blue-800 mb-3">For Fellows</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Stipend support during fellowship period</li>
                  <li>Access to mentorship and network</li>
                  <li>Professional development resources</li>
                  <li>Community and collaboration opportunities</li>
                </ul>
              </div>
              
              <div className="p-6 bg-indigo-50 rounded-xl">
                <h3 className="text-lg font-bold text-indigo-800 mb-3">For Supporters</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Direct impact on changemaker development</li>
                  <li>Quarterly impact reports</li>
                  <li>Recognition in our community</li>
                  <li>Networking with like-minded supporters</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">How Gifted Air Supports BeVisioneers</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                <div className="text-5xl mb-4">1️⃣</div>
                <h3 className="text-xl font-bold text-forest mb-3">Send a Gift</h3>
                <p className="text-gray-700">
                  When you send a climate gift through Gifted Air, 30% directly funds the BeVisioneers Fellowship
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <div className="text-5xl mb-4">2️⃣</div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">Create Impact</h3>
                <p className="text-gray-700">
                  Your gift supports both environmental action and changemakers in climate innovation
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <div className="text-5xl mb-4">3️⃣</div>
                <h3 className="text-xl font-bold text-purple-800 mb-3">Multiply Good</h3>
                <p className="text-gray-700">
                  Support creates a multiplier effect - funding leaders who create even more positive change
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">Fellow Testimonials</h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                <p className="text-gray-700 italic mb-4">
                  "The BeVisioneers Fellowship gave me the tools, network, and confidence to scale my climate startup. 
                  The support I received was instrumental in achieving our goal of removing 10,000 tons of CO2."
                </p>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">👤</div>
                  <div>
                    <div className="font-bold text-blue-800">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">Climate Tech Fellow, 2023</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-l-4 border-indigo-500">
                <p className="text-gray-700 italic mb-4">
                  "Through the fellowship, I connected with mentors who helped me develop my regenerative agriculture project. 
                  It's now supporting 200+ farmers in sustainable practices across three countries."
                </p>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">👤</div>
                  <div>
                    <div className="font-bold text-indigo-800">Miguel Rodriguez</div>
                    <div className="text-sm text-gray-600">Social Innovation Fellow, 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Join the Movement</h2>
            <p className="text-lg mb-6 opacity-90">
              Every climate gift you send directly supports the next generation of changemakers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/compose" 
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                🎁 Send a Gift Now
              </Link>
              
              <Link 
                to="https://bevisioneers.world" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-all border-2 border-white"
              >
                🌐 Learn More About BeVisioneers
              </Link>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link to="/" className="text-blue-700 hover:underline font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}