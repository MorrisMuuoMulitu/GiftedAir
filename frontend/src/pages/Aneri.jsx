import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO, { SEOConfig } from '../components/SEO';

export default function Aneri() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('idea');
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Timeline with completion status
  const timeline = [
    {
      phase: 'Foundation & MVP',
      period: 'Month 1-2 (COMPLETED)',
      status: 'completed',
      tasks: [
        { name: 'Platform architecture & tech stack setup', done: true },
        { name: 'Gift creation flow (8 gift types)', done: true },
        { name: 'Payment integration (Stripe)', done: true },
        { name: 'Email notifications (Resend)', done: true },
        { name: 'Gift viewing & sharing', done: true },
        { name: 'Public gallery', done: true },
        { name: 'Basic UI/UX design', done: true }
      ]
    },
    {
      phase: 'Growth Features',
      period: 'Month 3 (COMPLETED)',
      status: 'completed',
      tasks: [
        { name: 'Dark mode support', done: true },
        { name: 'Advanced admin dashboard', done: true },
        { name: 'Financial tracking & analytics', done: true },
        { name: 'Bulk gift orders', done: true },
        { name: 'Leaderboard & gamification', done: true },
        { name: 'Referral program', done: true },
        { name: 'Google Analytics integration', done: true },
        { name: 'Keyboard shortcuts', done: true }
      ]
    },
    {
      phase: 'Launch & Scale',
      period: 'Month 4 (IN PROGRESS)',
      status: 'in-progress',
      tasks: [
        { name: 'Production deployment (Vercel)', done: true },
        { name: 'Partner relationship setup', done: false },
        { name: 'Marketing campaign launch', done: false },
        { name: 'User acquisition strategy', done: false },
        { name: 'Content marketing (blog, social)', done: false },
        { name: 'Influencer partnerships', done: false },
        { name: 'First 1000 users milestone', done: false }
      ]
    },
    {
      phase: 'Expansion',
      period: 'Month 5-6',
      status: 'pending',
      tasks: [
        { name: 'Mobile app (React Native)', done: false },
        { name: 'Corporate gifting packages', done: false },
        { name: 'API for third-party integrations', done: false },
        { name: 'Additional gift types (10+)', done: false },
        { name: 'Subscription model for repeat giving', done: false },
        { name: 'Impact tracking dashboard', done: false },
        { name: 'International expansion', done: false }
      ]
    }
  ];

  // Lean Canvas sections
  const leanCanvas = {
    problem: [
      'People want to give meaningful gifts but struggle with physical items',
      'Environmental causes lack emotional gifting opportunities',
      'Traditional charity feels impersonal and transactional',
      'No easy way to share environmental impact with loved ones'
    ],
    solution: [
      'Digital gifts that fund real environmental projects',
      'Personalized gift pages with messages and certificates',
      'Shareable impact stories and visuals',
      'Transparent tracking of where money goes',
      'Gallery of public environmental contributions'
    ],
    uniqueValueProposition: 'Give the gift of environmental impact - plant trees, clean oceans, or protect wildlife in someone\'s name with a beautiful, shareable experience.',
    unfairAdvantage: [
      'Direct partnerships with verified environmental organizations',
      'Beautiful, emotional user experience',
      'Built-in virality through gift sharing',
      'First-to-market in environmental gifting space'
    ],
    customerSegments: [
      'Millennials & Gen Z (eco-conscious)',
      'Corporate gifting departments',
      'Event planners (weddings, birthdays)',
      'Non-profit fundraisers',
      'Remote workers looking for meaningful gifts'
    ],
    keyMetrics: [
      'Monthly Active Users',
      'Gifts sent per month',
      'Average gift value',
      'Referral conversion rate',
      'Partner donation amounts',
      'Gallery engagement',
      'Social shares per gift'
    ],
    channels: [
      'Social media (Instagram, TikTok)',
      'Content marketing (environmental blogs)',
      'Influencer partnerships',
      'Referral program',
      'Corporate partnerships',
      'SEO (environmental gift keywords)',
      'Email marketing'
    ],
    costStructure: [
      'Partner donations (50% of revenue)',
      'Stripe payment processing (2.9% + $0.30)',
      'Hosting & infrastructure (Vercel, MongoDB)',
      'Email service (Resend)',
      'Marketing & advertising',
      'Development & maintenance'
    ],
    revenueStreams: [
      'Transaction fees (~47% of gift value)',
      'Corporate bulk orders',
      'Premium features (future)',
      'Subscription model (future)',
      'API licensing (future)'
    ]
  };

  // Market Research & Validation
  const marketResearch = {
    marketSize: {
      title: 'Total Addressable Market',
      data: [
        { metric: 'Global Gift Market', value: '$475B annually' },
        { metric: 'Digital Gifting Market', value: '$398B by 2027' },
        { metric: 'Environmental Charity Sector', value: '$15B annually' },
        { metric: 'Target Market (Eco-Gifting)', value: '$2-5B potential' }
      ]
    },
    competitors: [
      { name: 'Traditional Gift Cards', weakness: 'No environmental impact, impersonal' },
      { name: 'Direct Charity Donations', weakness: 'Not giftable, no shareable experience' },
      { name: 'Ecosia/Tree Planting Apps', weakness: 'Not designed for gifting' },
      { name: 'Giftly/Wrapp', weakness: 'No environmental focus' }
    ],
    validation: [
      { source: '2023 Consumer Survey', finding: '73% of millennials prefer experiences over physical gifts' },
      { source: 'Environmental Giving Report', finding: '89% of Gen Z wants to support environmental causes' },
      { source: 'Corporate Gifting Trends', finding: '$258B corporate gift market, 45% going digital' },
      { source: 'Social Sharing Study', finding: 'Charitable gifts shared 3x more than regular gifts' }
    ],
    differentiators: [
      'Only platform combining gifting + environmental impact + social sharing',
      'Beautiful, emotional presentation vs transactional charity sites',
      'Built-in virality through gift viewing and sharing',
      'Transparency dashboard showing exact impact',
      'Multiple environmental causes in one platform',
      'Gamification through leaderboards and referrals'
    ]
  };

  return (
    <>
      <SEO {...SEOConfig.aneri} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-emerald-900 dark:to-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="flex flex-col items-center gap-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-12 py-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all">
              <span className="text-6xl animate-float">🌿</span>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight">GIFTED AIR</h1>
              <div className="h-1 w-32 bg-white/50 rounded-full"></div>
              <p className="text-xl md:text-2xl font-medium italic">A Ritual of Climate Love</p>
            </div>
          </div>
          
          {/* Dedication to Aneri */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-3xl mx-auto mb-8 border-l-8 border-emerald-500">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="font-bold text-2xl text-emerald-700 dark:text-emerald-400">For Aneri Pradhan</span>
              <br />
              <span className="text-base text-gray-600 dark:text-gray-400 mt-2 block">
                Venture Coach, BeVisioneers Fellowship @ Do School
              </span>
            </p>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">Document Date</p>
                <p>{currentDate}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">Live Prototype</p>
                <a href="https://gifted-air.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold">
                  gifted-air.vercel.app →
                </a>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-700 dark:text-gray-300 font-medium max-w-4xl mx-auto">
            Concept & Strategy Document
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 mb-8 flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveSection('idea')}
            className={`flex-1 min-w-[150px] px-6 py-3 rounded-xl font-semibold transition-all ${
              activeSection === 'idea'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            💡 The Idea
          </button>
          <button
            onClick={() => setActiveSection('canvas')}
            className={`flex-1 min-w-[150px] px-6 py-3 rounded-xl font-semibold transition-all ${
              activeSection === 'canvas'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            📊 Lean Canvas
          </button>
          <button
            onClick={() => setActiveSection('market')}
            className={`flex-1 min-w-[150px] px-6 py-3 rounded-xl font-semibold transition-all ${
              activeSection === 'market'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            🔍 Market Research
          </button>
          <button
            onClick={() => setActiveSection('timeline')}
            className={`flex-1 min-w-[150px] px-6 py-3 rounded-xl font-semibold transition-all ${
              activeSection === 'timeline'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            🗓️ Timeline
          </button>
        </div>

        {/* The Idea Section */}
        {activeSection === 'idea' && (
          <div className="space-y-8 animate-fade-in">
            {/* Vision Statement */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl shadow-2xl p-12 text-white">
              <h2 className="text-4xl font-black mb-6 flex items-center gap-3">
                <span className="text-5xl">🌍</span>
                Our Vision
              </h2>
              <p className="text-2xl font-medium leading-relaxed mb-6">
                To make environmental impact the world's most popular gift.
              </p>
              <p className="text-lg leading-relaxed opacity-90">
                Gifted Air transforms how people express love and appreciation by connecting 
                personal celebrations with planetary healing. Every gift plants a tree, cleans 
                the ocean, protects wildlife, or supports clean energy - creating a ripple effect 
                of positive environmental change through the simple act of giving.
              </p>
            </div>

            {/* The Problem */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <span className="text-4xl">⚠️</span>
                The Problem We're Solving
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6">
                  <h3 className="font-bold text-lg text-red-800 dark:text-red-300 mb-3">
                    🎁 Gift Fatigue
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    People are tired of meaningless physical gifts that end up in landfills. 
                    73% of millennials prefer experiences over things.
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-6">
                  <h3 className="font-bold text-lg text-orange-800 dark:text-orange-300 mb-3">
                    🌳 Disconnected Charity
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Traditional environmental donations feel impersonal and transactional. 
                    No emotional connection, no sharing, no celebration.
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
                  <h3 className="font-bold text-lg text-yellow-800 dark:text-yellow-300 mb-3">
                    💚 Purpose Seeking
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    89% of Gen Z wants to support environmental causes, but existing platforms 
                    don't make it easy, beautiful, or shareable.
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                  <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-3">
                    📱 Missing Virality
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Environmental actions are rarely shared socially. We miss the opportunity 
                    for impact to inspire more impact.
                  </p>
                </div>
              </div>
            </div>

            {/* The Solution */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <span className="text-4xl">✨</span>
                Our Solution
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800">
                  <span className="text-4xl">🎁</span>
                  <div>
                    <h3 className="font-bold text-xl text-green-800 dark:text-green-300 mb-2">
                      Beautiful Environmental Gifts
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Plant trees, clean oceans, protect wildlife, or install solar panels in someone's name. 
                      Each gift comes with a stunning personalized page, custom message, and downloadable certificate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800">
                  <span className="text-4xl">💎</span>
                  <div>
                    <h3 className="font-bold text-xl text-blue-800 dark:text-blue-300 mb-2">
                      Shareable Impact Stories
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Every gift has a unique URL that recipients can share on social media, 
                      spreading environmental awareness while celebrating their special moment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-800">
                  <span className="text-4xl">🔍</span>
                  <div>
                    <h3 className="font-bold text-xl text-purple-800 dark:text-purple-300 mb-2">
                      Complete Transparency
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Track exactly where your money goes. We show partner organizations, donation amounts, 
                      and real environmental impact with receipts and proof.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-200 dark:border-amber-800">
                  <span className="text-4xl">🏆</span>
                  <div>
                    <h3 className="font-bold text-xl text-amber-800 dark:text-amber-300 mb-2">
                      Gamification & Community
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Leaderboards, public gallery, referral rewards, and impact tracking turn 
                      environmental giving into an engaging, social experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                <span className="text-4xl">⚡</span>
                Platform Features
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: '🌳', title: '8 Gift Types', desc: 'Trees, Ocean, Water, Solar, Cookstoves, Coral, Wildlife, Rainforest' },
                  { icon: '💳', title: 'Stripe Payments', desc: 'Secure, instant processing for all transactions' },
                  { icon: '📧', title: 'Email Notifications', desc: 'Automated beautiful emails to senders & recipients' },
                  { icon: '🎨', title: 'Public Gallery', desc: 'Showcase gifts and inspire others' },
                  { icon: '🏆', title: 'Leaderboard', desc: 'Gamify giving with top contributors' },
                  { icon: '🎯', title: 'Referral Program', desc: 'Earn rewards for spreading impact' },
                  { icon: '💰', title: 'Bulk Orders', desc: 'Corporate & event gifting made easy' },
                  { icon: '📊', title: 'Admin Dashboard', desc: 'Complete analytics & financial tracking' },
                  { icon: '🌙', title: 'Dark Mode', desc: 'Beautiful experience day or night' }
                ].map((feature, idx) => (
                  <div key={idx} className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all hover:shadow-lg">
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-bold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg transform hover:scale-105"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        )}

        {/* Lean Canvas Section */}
        {activeSection === 'canvas' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
                📊 Lean Canvas Business Model
              </h2>
              
              {/* UVP - Full Width */}
              <div className="mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-8">
                <h3 className="font-bold text-2xl mb-4 flex items-center gap-2">
                  <span>💎</span> Unique Value Proposition
                </h3>
                <p className="text-xl leading-relaxed">
                  {leanCanvas.uniqueValueProposition}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Problem */}
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6">
                  <h3 className="font-bold text-xl text-red-800 dark:text-red-300 mb-4 flex items-center gap-2">
                    <span>⚠️</span> Problem
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.problem.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-red-600 dark:text-red-400">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution */}
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-6">
                  <h3 className="font-bold text-xl text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
                    <span>✅</span> Solution
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.solution.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-green-600 dark:text-green-400">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Metrics */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                  <h3 className="font-bold text-xl text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                    <span>📊</span> Key Metrics
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.keyMetrics.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Unfair Advantage */}
                <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-6">
                  <h3 className="font-bold text-xl text-purple-800 dark:text-purple-300 mb-4 flex items-center gap-2">
                    <span>🚀</span> Unfair Advantage
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.unfairAdvantage.map((a, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Customer Segments */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-6">
                  <h3 className="font-bold text-xl text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
                    <span>👥</span> Customer Segments
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.customerSegments.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-amber-600 dark:text-amber-400">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Channels */}
                <div className="bg-cyan-50 dark:bg-cyan-900/20 border-2 border-cyan-200 dark:border-cyan-800 rounded-2xl p-6">
                  <h3 className="font-bold text-xl text-cyan-800 dark:text-cyan-300 mb-4 flex items-center gap-2">
                    <span>📢</span> Channels
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.channels.map((ch, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-cyan-600 dark:text-cyan-400">•</span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cost Structure */}
                <div className="bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 rounded-2xl p-6">
                  <h3 className="font-bold text-xl text-rose-800 dark:text-rose-300 mb-4 flex items-center gap-2">
                    <span>💸</span> Cost Structure
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.costStructure.map((cost, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-rose-600 dark:text-rose-400">•</span>
                        <span>{cost}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Revenue Streams */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
                  <h3 className="font-bold text-xl text-emerald-800 dark:text-emerald-300 mb-4 flex items-center gap-2">
                    <span>💰</span> Revenue Streams
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.revenueStreams.map((rev, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-emerald-600 dark:text-emerald-400">•</span>
                        <span>{rev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-bold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg transform hover:scale-105"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        )}

        {/* Market Research Section */}
        {activeSection === 'market' && (
          <div className="space-y-8 animate-fade-in">
            {/* Market Opportunity - Enhanced */}
            <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-3xl shadow-2xl p-10 text-white mb-8">
              <h2 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                <span className="text-5xl">💰</span>
                The Confluence of Billion-Dollar Markets
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-all">
                  <div className="text-5xl mb-4 text-center">🌍</div>
                  <h3 className="text-2xl font-bold mb-3 text-cyan-300">Voluntary Carbon Market</h3>
                  <p className="text-4xl font-black mb-2">$10-40B</p>
                  <p className="text-white/80">Projected by 2030</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-all">
                  <div className="text-5xl mb-4 text-center">💝</div>
                  <h3 className="text-2xl font-bold mb-3 text-pink-300">Conscious Gifting Economy</h3>
                  <p className="text-4xl font-black mb-2">60%+</p>
                  <p className="text-white/80">Consumers prefer sustainable brands</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6 transform hover:scale-105 transition-all">
                  <div className="text-5xl mb-4 text-center">📱</div>
                  <h3 className="text-2xl font-bold mb-3 text-green-300">Digital Gifting Market</h3>
                  <p className="text-4xl font-black mb-2">$300B+</p>
                  <p className="text-white/80">Industry ripe for innovation</p>
                </div>
              </div>
              <div className="bg-amber-500/30 backdrop-blur-sm border-2 border-amber-300/50 rounded-2xl p-6">
                <p className="text-2xl text-center font-bold">
                  🎯 Our Target: <span className="text-amber-300">$2-5B</span> Eco-Gifting Market Opportunity
                </p>
              </div>
            </div>

            {/* Market Size Details */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                <span className="text-4xl">📈</span>
                {marketResearch.marketSize.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {marketResearch.marketSize.data.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.metric}</div>
                    <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                <span className="text-4xl">🥊</span>
                Competitive Landscape
              </h2>
              <div className="space-y-4">
                {marketResearch.competitors.map((comp, idx) => (
                  <div key={idx} className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl text-gray-800 dark:text-white">{comp.name}</h3>
                      <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold">
                        Their Weakness
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3">{comp.weakness}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Validation */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                <span className="text-4xl">✅</span>
                Market Validation Data
              </h2>
              <div className="space-y-4">
                {marketResearch.validation.map((val, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">📊</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-green-800 dark:text-green-300 mb-2">{val.source}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{val.finding}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Differentiators */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl shadow-2xl p-10 text-white">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="text-4xl">🌟</span>
                Why We'll Win
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {marketResearch.differentiators.map((diff, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <span className="text-2xl">✨</span>
                    <p className="text-lg">{diff}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-bold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg transform hover:scale-105"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        )}

        {/* Timeline Section */}
        {activeSection === 'timeline' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center flex items-center justify-center gap-3">
                <span className="text-4xl">🗓️</span>
                Execution Timeline
              </h2>

              <div className="space-y-8">
                {timeline.map((phase, idx) => (
                  <div key={idx} className={`border-l-4 pl-8 pb-8 ${
                    phase.status === 'completed' 
                      ? 'border-green-500 dark:border-green-600' 
                      : phase.status === 'in-progress'
                      ? 'border-blue-500 dark:border-blue-600'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    <div className="relative -left-10 mb-4">
                      <div className={`w-6 h-6 rounded-full ${
                        phase.status === 'completed'
                          ? 'bg-green-500'
                          : phase.status === 'in-progress'
                          ? 'bg-blue-500 animate-pulse'
                          : 'bg-gray-300'
                      }`}></div>
                    </div>

                    <div className={`rounded-2xl p-6 ${
                      phase.status === 'completed'
                        ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800'
                        : phase.status === 'in-progress'
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800'
                        : 'bg-gray-50 dark:bg-gray-900/20 border-2 border-gray-200 dark:border-gray-700'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                          {phase.phase}
                        </h3>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                          phase.status === 'completed'
                            ? 'bg-green-500 text-white'
                            : phase.status === 'in-progress'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-400 text-white'
                        }`}>
                          {phase.status === 'completed' ? '✅ COMPLETED' : phase.status === 'in-progress' ? '🔄 IN PROGRESS' : '⏳ PENDING'}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-semibold">
                        {phase.period}
                      </p>

                      <div className="space-y-2">
                        {phase.tasks.map((task, taskIdx) => (
                          <div key={taskIdx} className="flex items-start gap-3 bg-white dark:bg-gray-800 rounded-lg p-3">
                            <input
                              type="checkbox"
                              checked={task.done}
                              readOnly
                              className="mt-1 w-5 h-5 text-green-600 rounded"
                            />
                            <span className={`flex-1 ${
                              task.done 
                                ? 'text-gray-600 dark:text-gray-400 line-through' 
                                : 'text-gray-800 dark:text-white font-medium'
                            }`}>
                              {task.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Progress</span>
                          <span className="font-bold text-gray-800 dark:text-white">
                            {phase.tasks.filter(t => t.done).length} / {phase.tasks.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              phase.status === 'completed'
                                ? 'bg-green-500'
                                : phase.status === 'in-progress'
                                ? 'bg-blue-500'
                                : 'bg-gray-400'
                            }`}
                            style={{ 
                              width: `${(phase.tasks.filter(t => t.done).length / phase.tasks.length) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall Progress */}
              <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 text-center">📊 Overall Platform Progress</h3>
                <div className="text-center mb-4">
                  <div className="text-5xl font-black">
                    {Math.round((timeline.reduce((sum, phase) => sum + phase.tasks.filter(t => t.done).length, 0) / 
                      timeline.reduce((sum, phase) => sum + phase.tasks.length, 0)) * 100)}%
                  </div>
                  <div className="text-lg mt-2">
                    {timeline.reduce((sum, phase) => sum + phase.tasks.filter(t => t.done).length, 0)} of{' '}
                    {timeline.reduce((sum, phase) => sum + phase.tasks.length, 0)} tasks completed
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-4">
                  <div
                    className="bg-white h-4 rounded-full transition-all"
                    style={{ 
                      width: `${(timeline.reduce((sum, phase) => sum + phase.tasks.filter(t => t.done).length, 0) / 
                        timeline.reduce((sum, phase) => sum + phase.tasks.length, 0)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-bold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg transform hover:scale-105"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        )}

          {/* The Ask Section - For Aneri */}
          <div className="mt-12 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30 rounded-3xl shadow-2xl p-12 border-4 border-purple-300 dark:border-purple-700">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center gap-3">
              <span className="text-5xl">🙏</span>
              Next Steps & The Ask
            </h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                We have a powerful vision, a validated market, tangible progress with a <span className="font-bold text-emerald-600 dark:text-emerald-400">live prototype</span>, and a clear, actionable plan.
              </p>
              
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6 text-center">
                We are seeking your guidance on:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-t-4 border-emerald-500">
                <div className="text-4xl mb-4 text-center">🤝</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Strategic Introductions</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Connections to legal counsel for structuring our social enterprise and to key players in the Kenyan climate/non-profit space (e.g., Green Belt Movement).
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-t-4 border-blue-500">
                <div className="text-4xl mb-4 text-center">🗺️</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Roadmap Validation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Feedback on our phased launch plan and feature prioritization to ensure we're building the right things in the right order.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-t-4 border-purple-500">
                <div className="text-4xl mb-4 text-center">💰</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Funding Strategy</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Advice on whether to bootstrap this initial phase or seek pre-seed funding to accelerate development and market entry.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 rounded-2xl p-8 text-white text-center">
              <p className="text-2xl font-bold mb-4">
                💚 Thank you for your time and consideration, Aneri.
              </p>
              <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                We are excited to build a platform that doesn't just offset carbon, but creates <span className="font-black text-cyan-300">connection</span>, <span className="font-black text-pink-300">hope</span>, and a new <span className="font-black text-yellow-300">ritual of climate love</span>.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/')}
              className="px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-bold text-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg transform hover:scale-105"
            >
              🏠 Back to Home
            </button>
            <p className="mt-6 text-gray-600 dark:text-gray-400 text-sm">
              Document prepared for Aneri Pradhan | BeVisioneers Fellowship @ Do School
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
