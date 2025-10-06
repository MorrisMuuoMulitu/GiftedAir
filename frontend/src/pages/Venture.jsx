import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO, { SEOConfig } from '../components/SEO';

export default function Venture() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  
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

  // Partner links for easy reference
  const partnerLinks = {
    oneTreePlanted: 'https://onetreeplanted.org/',
    oceanCleanup: 'https://theoceancleanup.com/',
    charityWater: 'https://www.charitywater.org/',
    greenBeltMovement: 'https://www.greenbeltmovement.org/',
    coralRestoration: 'https://www.coralrestoration.org/',
    wwf: 'https://www.worldwildlife.org/',
    rainforestTrust: 'https://www.rainforesttrust.org/',
    solarAid: 'https://solar-aid.org/',
    doSchool: 'https://www.do-school.org/',
    beVisioneers: 'https://www.do-school.org/programs/bevisioneers'
  };

  return (
    <>
      {/* Inject CSS keyframes for animated gradient */}
      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      
      <SEO 
        title="Venture Deck - Gifted Air | Climate Action as a Love Language"
        description="Comprehensive venture strategy for Gifted Air: transforming climate action into meaningful gifts. Market analysis, business model, and roadmap."
        keywords="gifted air venture, climate gifting startup, environmental business plan, sustainable gifting platform"
      />
      <div className="min-h-screen bg-[#1A1A1A] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
        {/* Hero Header - Ultra Modern with ANIMATED Gradient */}
        <div className="relative overflow-hidden rounded-3xl mb-12">
          {/* Animated Shifting Gradient Background */}
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite'
            }}
          ></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTIwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMjAgMjBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTIwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHpNMTYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTIwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          
          <div className="relative z-10 px-8 md:px-16 py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left: Branding */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white/20">
                  <span className="w-2 h-2 bg-[#ADD8E6] rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold">LIVE PROTOTYPE</span>
                </div>
                
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter">
                  GIFTED<br />AIR
                </h1>
                
                <p className="text-2xl md:text-3xl font-light italic mb-8 text-white/90">
                  A Ritual of Climate Love
                </p>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a 
                    href="https://gifted-air.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-[#8A2BE2] px-6 py-3 rounded-xl font-bold hover:bg-[#D8BFD8]/20 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span>🚀</span>
                    <span>View Live Site</span>
                  </a>
                  <a 
                    href={partnerLinks.doSchool}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20"
                  >
                    <span>🎓</span>
                    <span>Do School</span>
                  </a>
                </div>
              </div>
              
              {/* Right: Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all">
                  <div className="text-4xl font-black mb-1">66%</div>
                  <div className="text-sm font-semibold opacity-90">Platform Complete</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all">
                  <div className="text-4xl font-black mb-1">$2-5B</div>
                  <div className="text-sm font-semibold opacity-90">Market Opportunity</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all">
                  <div className="text-4xl font-black mb-1">8</div>
                  <div className="text-sm font-semibold opacity-90">Impact Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all">
                  <div className="text-4xl font-black mb-1">$1-10</div>
                  <div className="text-sm font-semibold opacity-90">Gift Price Range</div>
                </div>
              </div>
            </div>
            
            {/* For Aneri - Sleek Badge */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold mb-1">
                    Prepared for <span className="text-[#ADD8E6]">Aneri Pradhan</span>
                  </p>
                  <p className="text-white/70">
                    Venture Coach, Climate Tech Ecosystem Builder
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/70 mb-1">Document Date</p>
                  <p className="font-semibold">{currentDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Ultra Sleek */}
        <div className="bg-[#1A1A1A] rounded-2xl p-2 mb-12 border border-[#D8BFD8]/30 overflow-x-auto">
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: '⚡' },
              { id: 'idea', label: 'Vision', icon: '💡' },
              { id: 'canvas', label: 'Business Model', icon: '📊' },
              { id: 'market', label: 'Market', icon: '🔍' },
              { id: 'timeline', label: 'Roadmap', icon: '🗓️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex-1 min-w-[140px] px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeSection === tab.id
                    ? 'bg-gradient-to-r from-[#8A2BE2] via-[#00CED1] to-[#ADD8E6] text-white shadow-lg shadow-[#00CED1]/40'
                    : 'text-zinc-400 hover:text-white hover:bg-[#1A1A1A]'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Section - NEW */}
        {activeSection === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Executive Summary */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-12 border border-[#D8BFD8]/30">
              <h2 className="text-4xl font-black mb-8 bg-gradient-to-r from-[#8A2BE2] via-[#00CED1] to-[#ADD8E6] bg-clip-text text-transparent">
                Executive Summary
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">The Concept</h3>
                  <p className="text-zinc-300 leading-relaxed text-lg">
                    Gifted Air transforms <span className="text-[#00CED1] font-semibold">climate action into a love language</span>. We're building a poetic web platform where users gift verified environmental actions—plant trees, clean oceans, provide clean water—with personalized messages and beautiful, shareable pages.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">The Opportunity</h3>
                  <p className="text-zinc-300 leading-relaxed text-lg">
                    We exist at the intersection of three massive markets: the <span className="text-[#ADD8E6] font-semibold">$10-40B voluntary carbon market</span>, the <span className="text-[#D8BFD8] font-semibold">$300B+ digital gifting</span> industry, and the growing conscious consumer movement where <span className="text-[#00CED1] font-semibold">60%+ prefer sustainable brands</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Highlights Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-[#D8BFD8]/20 hover:border-[#8A2BE2]/50 transition-all">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3 text-white">Target Market</h3>
                <p className="text-zinc-300 mb-4">$2-5B eco-gifting opportunity within larger markets</p>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00CED1]">→</span>
                    <span>Climate-conscious Millennials & Gen Z</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00CED1]">→</span>
                    <span>Long-distance relationships & diaspora</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00CED1]">→</span>
                    <span>Corporate gifting & events</span>
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-cyan-500/50 transition-all">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-3 text-white">Current Progress</h3>
                <p className="text-zinc-400 mb-4">Platform 66% complete with live prototype</p>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>8 gift types (Trees, Ocean, Water, Solar, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Stripe payments integrated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Gallery, Leaderboard, Referral program</span>
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-pink-500/50 transition-all">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-3 text-white">Revenue Model</h3>
                <p className="text-zinc-400 mb-4">Multiple revenue streams, immediate profitability</p>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><span className="text-green-400 font-bold">41% margin</span> on every transaction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">→</span>
                    <span>B2B: Corporate gifting & events (higher AOV)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500">→</span>
                    <span>Subscriptions: Recurring monthly giving</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">→</span>
                    <span>Zero CAC with viral loops & referrals</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Target Partner Categories */}
            <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Target Partner Categories</h3>
                <span className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-semibold border border-amber-500/30">
                  Seeking Partners
                </span>
              </div>
              <p className="text-zinc-400 mb-6">
                We're seeking verified organizations in these impact categories to power our gifting platform:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { category: 'Tree Planting', description: 'Reforestation & afforestation orgs', icon: '🌳', color: 'emerald' },
                  { category: 'Ocean Cleanup', description: 'Plastic removal & marine conservation', icon: '🌊', color: 'blue' },
                  { category: 'Clean Water', description: 'Water access & sanitation projects', icon: '💧', color: 'cyan' },
                  { category: 'Mangrove Restoration', description: 'Coastal ecosystem protection', icon: '🌿', color: 'green' },
                  { category: 'Coral Reef Protection', description: 'Marine habitat restoration', icon: '🪸', color: 'pink' },
                  { category: 'Wildlife Conservation', description: 'Species protection & habitat', icon: '🦁', color: 'amber' },
                  { category: 'Rainforest Protection', description: 'Tropical forest preservation', icon: '🌴', color: 'emerald' },
                  { category: 'Solar Energy Access', description: 'Off-grid solar solutions', icon: '☀️', color: 'yellow' },
                  { category: 'Carbon Credits', description: 'Verified offset programs', icon: '🍃', color: 'green' },
                  { category: 'Clean Cookstoves', description: 'Household emissions reduction', icon: '🏡', color: 'orange' },
                  { category: 'Sustainable Agriculture', description: 'Regenerative farming practices', icon: '🌾', color: 'yellow' },
                  { category: 'Ocean Conservation', description: 'Marine protected areas', icon: '🐋', color: 'blue' }
                ].map((partner, idx) => (
                  <div
                    key={idx}
                    className={`p-4 bg-zinc-800 rounded-xl border border-zinc-700 hover:border-${partner.color}-500/50 transition-all`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-3xl">{partner.icon}</span>
                      <div className="flex-1">
                        <div className="font-bold text-white text-sm mb-1">{partner.category}</div>
                        <div className="text-xs text-zinc-400 leading-tight">{partner.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-emerald-900/30 rounded-xl border border-emerald-500/30">
                <p className="text-sm text-emerald-300">
                  <span className="font-bold">Partnership Model:</span> We share 50% of revenue with partners, handle all tech & marketing, and provide transparent impact tracking. Win-win for organizations seeking new funding streams.
                </p>
              </div>
            </div>

            {/* Unit Economics - NEW */}
            <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-2xl p-8 border border-green-500/30">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="text-3xl">💵</span>
                Unit Economics: The Money Machine
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-green-400 mb-4">Per Gift Breakdown ($5 example)</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-lg">
                      <span className="text-zinc-300">Customer Pays</span>
                      <span className="text-2xl font-bold text-white">$5.00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-900/30 rounded-lg border-l-4 border-red-500">
                      <span className="text-zinc-300">Stripe Fee (2.9% + $0.30)</span>
                      <span className="font-bold text-red-400">-$0.45</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded-lg border-l-4 border-blue-500">
                      <span className="text-zinc-300">To Partner (50%)</span>
                      <span className="font-bold text-blue-400">-$2.50</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-900/50 rounded-lg border-2 border-green-500">
                      <span className="text-green-300 font-bold">Platform Revenue</span>
                      <span className="text-3xl font-black text-green-400">$2.05</span>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-emerald-500/20 rounded-lg border border-emerald-500/50">
                    <p className="text-sm text-emerald-300 font-semibold">
                      ✨ 41% margin per transaction | Pure profit after infrastructure costs
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-cyan-400 mb-4">Scale Projection</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900/50 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-zinc-400">1,000 gifts/month @ $5 avg</span>
                        <span className="text-xl font-bold text-white">$5K</span>
                      </div>
                      <div className="text-sm text-emerald-400 font-semibold">
                        Monthly Revenue: $2,050
                      </div>
                    </div>
                    
                    <div className="p-4 bg-zinc-900/50 rounded-xl border-l-4 border-cyan-500">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-zinc-400">10,000 gifts/month @ $5 avg</span>
                        <span className="text-xl font-bold text-white">$50K</span>
                      </div>
                      <div className="text-sm text-cyan-400 font-semibold">
                        Monthly Revenue: $20,500 | $246K/year
                      </div>
                    </div>
                    
                    <div className="p-4 bg-zinc-900/50 rounded-xl border-l-4 border-purple-500">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-zinc-400">100,000 gifts/month @ $5 avg</span>
                        <span className="text-xl font-bold text-white">$500K</span>
                      </div>
                      <div className="text-sm text-purple-400 font-semibold">
                        Monthly Revenue: $205K | $2.46M/year
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-purple-500/20 rounded-lg border border-purple-500/50">
                    <p className="text-sm text-purple-300 font-semibold">
                      🚀 With just 0.02% of $300B digital gifting market = $60M/year
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Engine */}
            <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="text-3xl">📈</span>
                Viral Growth Engine
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-pink-900/30 to-rose-900/30 rounded-xl border border-pink-500/30">
                  <div className="text-4xl mb-3">💝</div>
                  <h4 className="font-bold text-white mb-2">Gift Sharing</h4>
                  <p className="text-sm text-zinc-300 mb-3">Every gift has a unique shareable URL. Recipients post their environmental gifts on social media.</p>
                  <div className="text-xs text-pink-400 font-semibold">K-Factor: 1.5-2.0 (viral loop)</div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-500/30">
                  <div className="text-4xl mb-3">🎯</div>
                  <h4 className="font-bold text-white mb-2">Referral Program</h4>
                  <p className="text-sm text-zinc-300 mb-3">Users earn rewards for referring friends. Built-in incentive for organic growth.</p>
                  <div className="text-xs text-purple-400 font-semibold">Target: 30% of users refer 2+ friends</div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-500/30">
                  <div className="text-4xl mb-3">🔥</div>
                  <h4 className="font-bold text-white mb-2">Emotional Resonance</h4>
                  <p className="text-sm text-zinc-300 mb-3">Gifts for birthdays, anniversaries, holidays create recurring usage patterns.</p>
                  <div className="text-xs text-cyan-400 font-semibold">LTV: 5-7 gifts per user lifetime</div>
                </div>
              </div>
            </div>

            {/* Use Cases - How It Works In Practice */}
            <div className="bg-gradient-to-br from-[#8A2BE2]/15 via-[#D8BFD8]/10 to-[#ADD8E6]/15 rounded-2xl p-8 border border-[#8A2BE2]/30">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                Real-World Use Cases: Inclusive Climate Action at Scale
              </h3>
              <p className="text-white/80 mb-8">
                A systems approach to climate action—making environmental impact accessible, emotional, and viral across every demographic.
              </p>
              
              <div className="space-y-6">
                {/* Use Case 1: Individual Gifting */}
                <div className="bg-[#1A1A1A]/80 rounded-xl p-6 border border-[#D8BFD8]/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D8BFD8] via-[#8A2BE2] to-[#00CED1] flex items-center justify-center flex-shrink-0 text-2xl shadow-lg shadow-[#8A2BE2]/30">
                      💝
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-2">Personal Milestone Gifting</h4>
                      <p className="text-sm text-[#ADD8E6] font-semibold mb-3">Making Climate Action Personal & Shareable</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#1A1A1A]/80 rounded-lg p-4 mb-4">
                    <p className="text-white/80 text-sm leading-relaxed">
                      <span className="font-bold text-white">Scenario:</span> Sarah wants to give her best friend Maya a meaningful 30th birthday gift. Instead of buying something that will collect dust, she plants <span className="text-[#00CED1] font-semibold">10 trees in Maya's name</span> for $10 through Gifted Air.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#00CED1]/20 rounded-lg p-4 border border-[#00CED1]/30">
                      <div className="text-xs text-[#00CED1] font-bold mb-2">THE GIFT</div>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>✓ Personalized message & certificate</li>
                        <li>✓ Beautiful shareable gift page</li>
                        <li>✓ Real environmental impact (verified)</li>
                        <li>✓ Cost: $10 (vs. $30+ physical gift)</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#8A2BE2]/20 rounded-lg p-4 border border-[#8A2BE2]/30">
                      <div className="text-xs text-[#8A2BE2] font-bold mb-2">THE VIRAL LOOP</div>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>→ Maya shares on Instagram (2,000 followers)</li>
                        <li>→ 50 people click the link</li>
                        <li>→ 3 new users sign up</li>
                        <li>→ 2 send gifts within 30 days</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1 bg-[#00CED1]/20 text-[#00CED1] rounded-full font-semibold">CAC: $0</span>
                    <span className="px-3 py-1 bg-[#8A2BE2]/20 text-[#8A2BE2] rounded-full font-semibold">K-Factor: 1.5-2.0</span>
                    <span className="px-3 py-1 bg-[#ADD8E6]/20 text-[#ADD8E6] rounded-full font-semibold">Repeat Usage: 5-7x/lifetime</span>
                  </div>
                </div>

                {/* Use Case 2: Community Fundraising */}
                <div className="bg-black/40 rounded-xl p-6 border border-blue-500/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00CED1] via-[#ADD8E6] to-[#D8BFD8] flex items-center justify-center flex-shrink-0 text-2xl shadow-lg shadow-[#00CED1]/30">
                      🌍
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-2">Community-Led Climate Action</h4>
                      <p className="text-sm text-blue-300 font-semibold mb-3">Grassroots Engagement Without Infrastructure Barriers</p>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-900/50 rounded-lg p-4 mb-4">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      <span className="font-bold text-white">Scenario:</span> A women's collective in rural Kenya wants to fundraise for clean cookstoves. Using Gifted Air, they create a <span className="text-cyan-400 font-semibold">community campaign</span> where global supporters can "gift" clean energy to specific families.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                      <div className="text-xs text-blue-400 font-bold mb-2">IMPACT</div>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>✓ 50 families receive cookstoves ($25 each)</li>
                        <li>✓ Total raised: $1,250</li>
                        <li>✓ Zero platform fees for communities</li>
                        <li>✓ Direct connection: Donor ↔ Recipient</li>
                      </ul>
                    </div>
                    
                    <div className="bg-cyan-900/30 rounded-lg p-4 border border-cyan-500/30">
                      <div className="text-xs text-cyan-400 font-bold mb-2">SYSTEMS THINKING</div>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>→ No payment infrastructure needed</li>
                        <li>→ Bypasses traditional charity middlemen</li>
                        <li>→ Community ownership of impact story</li>
                        <li>→ Enables Global South-North solidarity</li>
                      </ul>
                    </div>
                  </div>
                  

                </div>

                {/* Use Case 3: Corporate B2B */}
                <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8A2BE2] via-[#D8BFD8] to-[#C38B4A] flex items-center justify-center flex-shrink-0 text-2xl shadow-lg shadow-[#8A2BE2]/30">
                      🏢
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-2">Corporate Sustainability Partnerships</h4>
                      <p className="text-sm text-purple-300 font-semibold mb-3">Win-Win: Employee Engagement + Brand Value + Real Impact</p>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-900/50 rounded-lg p-4 mb-4">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      <span className="font-bold text-white">Scenario:</span> A tech startup (150 employees) wants to demonstrate climate commitment. Instead of generic swag, they give each employee a <span className="text-purple-400 font-semibold">$20 Gifted Air credit</span> to fund environmental projects of their choice.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-[#8A2BE2]/20 rounded-lg p-4 border border-[#8A2BE2]/30">
                      <div className="text-xs text-purple-400 font-bold mb-2">COMPANY BENEFITS</div>
                      <ul className="text-sm text-zinc-300 space-y-1 text-xs">
                        <li>✓ Employee engagement</li>
                        <li>✓ ESG reporting data</li>
                        <li>✓ PR story ("150 employees, 3,000 trees")</li>
                        <li>✓ Tax deductible</li>
                      </ul>
                    </div>
                    
                    <div className="bg-pink-900/30 rounded-lg p-4 border border-pink-500/30">
                      <div className="text-xs text-pink-400 font-bold mb-2">FINANCIAL MODEL</div>
                      <ul className="text-sm text-zinc-300 space-y-1 text-xs">
                        <li>→ Order: $3,000 (150 × $20)</li>
                        <li>→ Gifted Air revenue: $1,230 (41%)</li>
                        <li>→ To partners: $1,500 (50%)</li>
                        <li>→ AOV: 10-20x higher than B2C</li>
                      </ul>
                    </div>
                    
                    <div className="bg-cyan-900/30 rounded-lg p-4 border border-cyan-500/30">
                      <div className="text-xs text-cyan-400 font-bold mb-2">VIRAL AMPLIFICATION</div>
                      <ul className="text-sm text-zinc-300 space-y-1 text-xs">
                        <li>→ 150 employees share gifts</li>
                        <li>→ 50,000+ social impressions</li>
                        <li>→ 200+ website visitors</li>
                        <li>→ 10-15 B2C conversions</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full font-semibold">$258B Corporate Market</span>
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full font-semibold">Recurring Annual</span>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full font-semibold">Scalable via API</span>
                  </div>
                </div>

                {/* Use Case 4: Event Partnerships */}
                <div className="bg-black/40 rounded-xl p-6 border border-amber-500/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C38B4A] via-[#00CED1] to-[#8A2BE2] flex items-center justify-center flex-shrink-0 text-2xl shadow-lg shadow-[#C38B4A]/30">
                      🎓
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-2">Event & Conference Ecosystem Building</h4>
                      <p className="text-sm text-amber-300 font-semibold mb-3">Creating Climate Networks Through Shared Experiences</p>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-900/50 rounded-lg p-4 mb-4">
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      <span className="font-bold text-white">Scenario:</span> A climate tech conference (500 attendees) partners with Gifted Air. Each attendee receives a <span className="text-amber-400 font-semibold">"Thank You" gift</span>—a mangrove planted in their name—creating a shared forest and lasting network connection.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-500/30">
                      <div className="text-xs text-amber-400 font-bold mb-2">ECOSYSTEM VALUE</div>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>✓ Tangible shared impact (500-tree conference forest)</li>
                        <li>✓ Network strengthening (shared climate action)</li>
                        <li>✓ Post-event engagement (track forest growth)</li>
                        <li>✓ Conference brand differentiation</li>
                      </ul>
                    </div>
                    
                    <div className="bg-orange-900/30 rounded-lg p-4 border border-orange-500/30">
                      <div className="text-xs text-orange-400 font-bold mb-2">SCALE POTENTIAL</div>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>→ 500 gifts × $5 = $2,500 order</li>
                        <li>→ Platform revenue: $1,025 (41%)</li>
                        <li>→ Partner revenue: $1,250 (50%)</li>
                        <li>→ Template for all climate conferences</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-lg border border-amber-500/30">
                    <p className="text-xs text-amber-300">
                      <span className="font-bold">Target Events:</span> Climate tech accelerators, corporate sustainability summits, environmental conferences, and climate action workshops—turning participants into a connected climate ecosystem.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Insight */}
              <div className="mt-8 p-6 bg-gradient-to-r from-[#00CED1]/25 via-[#8A2BE2]/25 to-[#D8BFD8]/25 rounded-xl border border-[#00CED1]/40">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💡</div>
                  <div>
                    <h4 className="font-bold text-white mb-2 text-lg">Systems Thinking in Action</h4>
                    <p className="text-white/80 leading-relaxed">
                      Each use case demonstrates how Gifted Air creates an <span className="font-bold text-white">enabling environment</span> for climate action—removing barriers (cost, complexity, trust), 
                      enabling agency (personal choice, community ownership), and building network effects (viral sharing, ecosystem building). 
                      From individuals to communities to corporations, we're creating interconnected loops where <span className="font-bold text-[#C38B4A]">everyone wins: givers, receivers, partners, and the planet.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitive Advantages */}
            <div className="bg-gradient-to-br from-[#8A2BE2]/20 via-[#C38B4A]/15 to-[#00CED1]/20 rounded-2xl p-8 border border-[#8A2BE2]/30">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="text-3xl">🛡️</span>
                Why We'll Win: Unfair Advantages
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00CED1] flex items-center justify-center flex-shrink-0 font-bold text-black">1</div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Emotional Connection</h4>
                      <p className="text-sm text-zinc-300">We're the ONLY platform combining gifting psychology with climate action. Not a charity, not a gift card—a new category.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ADD8E6] flex items-center justify-center flex-shrink-0 font-bold text-black">2</div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Built-in Virality</h4>
                      <p className="text-sm text-zinc-300">Every gift creates a beautiful shareable page. Recipients become marketers. Zero CAC at scale.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#8A2BE2] flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Network Effects</h4>
                      <p className="text-sm text-zinc-300">More users = more social proof = more gifts = more visibility. Compounding growth loop.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D8BFD8] flex items-center justify-center flex-shrink-0 font-bold text-black">4</div>
                    <div>
                      <h4 className="font-bold text-white mb-1">First Mover in Category</h4>
                      <p className="text-sm text-zinc-300">Defining "emotional offsetting" before copycats arrive. Brand becomes the category.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C38B4A] flex items-center justify-center flex-shrink-0 font-bold">5</div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Recurring Revenue Model</h4>
                      <p className="text-sm text-zinc-300">Birthdays, anniversaries, holidays repeat yearly. Users come back 5-7 times lifetime.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00CED1] to-[#8A2BE2] flex items-center justify-center flex-shrink-0 font-bold">6</div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Global Scalability</h4>
                      <p className="text-sm text-zinc-300">Digital product, no inventory, low overhead. Launch in 100+ countries day one.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Acquisition Strategy */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#C38B4A]/5 rounded-2xl p-8 border border-[#C38B4A]/30 hover:border-[#C38B4A]/60 hover:shadow-lg hover:shadow-[#C38B4A]/20 transition-all">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                  <span className="text-3xl">🎣</span>
                  Customer Acquisition
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[#C38B4A]/10 rounded-lg border border-[#C38B4A]/20 hover:border-[#C38B4A]/40 transition-all">
                    <span className="text-2xl">📱</span>
                    <div>
                      <div className="font-semibold text-white text-sm">Social Media</div>
                      <div className="text-xs text-zinc-400">TikTok, Instagram Reels (organic viral content)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#C38B4A]/10 rounded-lg border border-[#C38B4A]/20 hover:border-[#C38B4A]/40 transition-all">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <div className="font-semibold text-white text-sm">Influencer Partnerships</div>
                      <div className="text-xs text-zinc-400">Eco-influencers, lifestyle creators (affiliate model)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#C38B4A]/10 rounded-lg border border-[#C38B4A]/20 hover:border-[#C38B4A]/40 transition-all">
                    <span className="text-2xl">💝</span>
                    <div>
                      <div className="font-semibold text-white text-sm">Gift-Based Virality</div>
                      <div className="text-xs text-zinc-400">Every gift creates 2-3 new potential users</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#C38B4A]/10 rounded-lg border border-[#C38B4A]/20 hover:border-[#C38B4A]/40 transition-all">
                    <span className="text-2xl">🔍</span>
                    <div>
                      <div className="font-semibold text-white text-sm">SEO & Content</div>
                      <div className="text-xs text-zinc-400">"Eco-friendly gifts", "sustainable presents"</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#8A2BE2]/5 rounded-2xl p-8 border border-[#8A2BE2]/30 hover:border-[#8A2BE2]/60 hover:shadow-lg hover:shadow-[#8A2BE2]/20 transition-all">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                  <span className="text-3xl">💸</span>
                  Revenue Multipliers
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-[#8A2BE2]/20 to-[#D8BFD8]/20 rounded-lg border border-[#8A2BE2]/30">
                    <div className="font-bold text-white mb-1">Corporate Gifting</div>
                    <p className="text-sm text-zinc-300 mb-2">$258B corporate gift market. 50-500 gifts per order.</p>
                    <div className="text-xs text-[#8A2BE2] font-semibold">AOV: 10-20x higher than B2C</div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-[#00CED1]/20 to-[#ADD8E6]/20 rounded-lg border border-[#00CED1]/30">
                    <div className="font-bold text-white mb-1">Subscription Model</div>
                    <p className="text-sm text-zinc-300 mb-2">Monthly recurring gifts. Stable MRR stream.</p>
                    <div className="text-xs text-[#ADD8E6] font-semibold">Target: 20% of users convert to subscription</div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-[#00CED1]/20 to-[#C38B4A]/20 rounded-lg border border-[#00CED1]/30">
                    <div className="font-bold text-white mb-1">Event Partnerships</div>
                    <p className="text-sm text-zinc-300 mb-2">Weddings, conferences, fundraisers.</p>
                    <div className="text-xs text-[#C38B4A] font-semibold">100-1000+ gifts per event</div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Ask - Quick Summary */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold mb-4 text-white">Seeking Guidance On</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🤝</span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Strategic Introductions</h4>
                    <p className="text-sm text-zinc-300">Legal counsel, global partner network, & strategic advisors in climate/tech space</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🗺️</span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Roadmap Validation</h4>
                    <p className="text-sm text-zinc-300">Feature prioritization, global market entry strategy & launch feedback</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">💰</span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Funding Strategy</h4>
                    <p className="text-sm text-zinc-300">Bootstrap vs. pre-seed funding, investor intros & cap table advice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
