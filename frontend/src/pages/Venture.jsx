import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO, { SEOConfig } from '../components/SEO';

export default function Venture() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  
  // Format date and time for Nairobi/EAT timezone
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const currentTimeInNairobi = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Africa/Nairobi',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
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

  // beVisioneers Lean Canvas Framework
  const leanCanvas = {
    // 1. Problem (top 1-3 problems)
    problem: [
      'Meaningful gifting is hard: People want to give impactful gifts but physical items feel wasteful or impersonal',
      'Climate action feels disconnected: No emotional way to involve loved ones in environmental causes',
      'Traditional charity is transactional: Donations lack shareable celebration and social recognition'
    ],
    
    // 2. Existing solutions & alternatives
    existingAlternatives: [
      'Physical gift cards (Starbucks, Amazon) - impersonal, no impact, end up unused',
      'Direct charity donations - not giftable, no recipient experience, feels like homework',
      'Tree planting apps (Ecosia) - not designed for gifting, no personalization',
      'Experience gifts (concert tickets) - logistically complex, not always feasible',
      'DIY donations in someone\'s name - manually create certificates, no tracking'
    ],
    
    // 3. Solution (your idea)
    solution: [
      'One-click environmental gifts: Choose from 8 causes, add message, send instantly',
      'Beautiful gift experience: Recipient gets personalized page with certificate and impact details',
      'Built-in sharing: Every gift becomes shareable content (Instagram, gallery, referrals)',
      'Transparent impact: See exactly where money goes (50% to partners, tracked publicly)',
      'Gamified giving: Leaderboards, referral rewards, public gallery for social recognition'
    ],
    
    // 4. Target audience & Early adopters
    targetAudience: {
      broad: [
        'Millennials & Gen Z (25-40 years old, eco-conscious, digitally native)',
        'Corporate HR/CSR departments (need employee gifts, sustainability focus)',
        'Event planners (weddings, birthdays wanting unique favors)',
        'Non-profit fundraisers (need easy peer-to-peer campaign tools)'
      ],
      earlyAdopters: [
        'Climate activists already donating monthly (want to spread impact socially)',
        'Remote workers with global friends (need digital gifts that work anywhere)',
        'Eco-influencers (want shareable climate content with credibility)',
        'Corporate sustainability teams (piloting green employee recognition programs)'
      ]
    },
    
    // 5. Your why (founder motivation)
    yourWhy: [
      'Personal connection: Growing up in Kenya, witnessed firsthand how environmental degradation impacts communities—from water scarcity to deforestation affecting livelihoods',
      'Gap recognition: Saw friends struggle to give meaningful gifts remotely during COVID, while environmental causes desperately needed funding',
      'Systems thinking: Realized gifting is an untapped emotional gateway to climate action—people who wouldn\'t donate directly will fund impact when celebrating loved ones',
      'Founder-problem fit: Combined background in community organizing (grassroots trust-building) with tech skills to create an enabling environment where everyone wins: givers feel generous, receivers feel celebrated, planet gets funded'
    ],
    
    // 6. Your speed bumps (limitations & how to overcome)
    speedBumps: [
      {
        limitation: 'Trust barrier: New platform, users hesitant to send money',
        mitigation: 'Stripe for secure payments, transparent 50/50 split displayed publicly, partner logos (WWF, One Tree Planted), public gallery showing real gifts'
      },
      {
        limitation: 'Partner verification: Need formal partnerships with environmental orgs',
        mitigation: 'Start with established platforms that aggregate verified projects (One Tree Planted, Charity Water), build case studies, then approach larger orgs with traction data'
      },
      {
        limitation: 'Skill gap: Solo founder, no marketing/growth expertise',
        mitigation: 'Lean on advisors (Aneri for strategy), use existing community networks (BeVisioneers, climate tech groups), bootstrap with organic social sharing built into product'
      },
      {
        limitation: 'Time commitment: Balancing full-time work initially',
        mitigation: 'MVP already built and live, automate operations (Stripe, Resend), focus weekends on marketing experiments, seek pre-seed funding to go full-time'
      }
    ],
    
    // 7. Prototype (what needs testing)
    prototype: [
      '✅ TESTED: Core gift flow (8 gift types, payment, email, viewing) - LIVE on giftedair.vercel.app',
      '✅ TESTED: Viral mechanics (public gallery, referral program, social sharing)',
      '🧪 TESTING: B2B corporate bulk orders - feature built, need pilot customers',
      '🧪 TESTING: Pricing elasticity - currently $10-$500 per gift, will test $5 entry point',
      '❓ TO TEST: Subscription model - monthly recurring gifts (30% of Netflix users would gift subscriptions)',
      '❓ TO TEST: Event partnerships - wedding/conference packages need validation with planners',
      '❓ TO TEST: Mobile app - web works well, but does native app increase gifting frequency?'
    ],
    
    // 8. Channels & partnerships
    channels: [
      'Product-led: Built-in virality (recipients become senders via gallery + referrals)',
      'Social media: Instagram/TikTok organic (beautiful gift pages are shareable content)',
      'Influencer partnerships: Eco-influencers get affiliate links, showcase gifts',
      'SEO: "Sustainable gifts", "eco-friendly birthday ideas" (low competition, high intent)',
      'Corporate outreach: LinkedIn cold outreach to HR/CSR teams with case studies',
      'Event partnerships: Wedding planner networks, conference organizers (bulk orders)',
      'Climate community: BeVisioneers, Do School, climate tech Slack groups (warm intros)'
    ],
    
    // 9. Key metrics (numbers that show success)
    keyMetrics: [
      'Gifts sent per month (currently ~50, target 1,000 by month 6)',
      'Referral rate (% of recipients who send gifts - target 15-20%)',
      'Average gift value ($50 current, optimize for frequency vs. value)',
      'K-Factor (viral coefficient - each gift creates how many new gifts?)',
      'Corporate deal size ($500-$5,000 bulk orders)',
      'Gallery engagement (views per gift, shares)',
      'CAC vs. LTV (aim for <$20 CAC, $200+ LTV over 3 years)'
    ],
    
    // 10. Cost structure
    costStructure: [
      'Partner donations: 50% of every gift goes directly to environmental orgs',
      'Stripe fees: 2.9% + $0.30 per transaction (~3% of revenue)',
      'Platform infrastructure: ~$50/month (Vercel hosting, MongoDB, Resend emails)',
      'Marketing: Bootstrap phase (<$500/month on Instagram ads, influencer gifting)',
      'Development: Solo founder time (currently evenings/weekends)',
      'Future costs: Full-time salary, contractor help, premium partnerships'
    ],
    
    // 11. Income streams
    incomeStreams: [
      'Transaction fees: ~47% of gift value (after partner donation + Stripe)',
      'Corporate bulk orders: 20-500 gifts per order ($1,000-$25,000 deals)',
      'Premium features (future): Custom branding for companies, advanced analytics',
      'Subscription model (future): Monthly recurring gifts at discounted rates',
      'API licensing (future): Other platforms integrate gifting (wedding sites, fundraising tools)',
      'Event partnerships: Commission on wedding/conference packages'
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
                    Prepared by <a href="https://www.linkedin.com/in/morrismuuo/" target="_blank" rel="noopener noreferrer" className="text-[#00CED1] hover:text-[#ADD8E6] transition-colors underline">Morris Mulitu</a>
                  </p>
                  <p className="text-white/70">
                    BeVisioneers Fellow, Climate Tech Ecosystem Builder
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/70 mb-1">Document Date & Time (Nairobi)</p>
                  <p className="font-semibold">{currentDate} at {currentTimeInNairobi}</p>
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

            {/* Our Potential Partners in Kenya */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 border border-zinc-700 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-[#8A2BE2] to-[#00CED1] rounded-xl">
                    <h3 className="text-2xl font-black text-white">Our Potential Partners in Kenya</h3>
                  </div>
                  <div className="flex items-center gap-2 text-[#00CED1] font-black text-lg animate-pulse">
                    <span className="text-3xl">→</span>
                    <span>You could be Next</span>
                  </div>
                </div>
                <span className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full text-sm font-bold shadow-lg">
                  Building Partnerships
                </span>
              </div>
              <p className="text-zinc-300 mb-8 text-lg">
                We're building partnerships with verified Kenyan environmental organizations to create real local impact:
              </p>
              
              {/* Enhanced Partner Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  { name: 'Green Belt Movement', description: 'Tree planting & conservation', icon: '🌳', url: 'https://www.greenbeltmovement.org/', color: 'emerald' },
                  { name: 'Eden Reforestation Projects', description: 'Forest restoration', icon: '🌲', url: 'https://www.edenprojects.org/', color: 'green' },
                  { name: 'Sheldrick Wildlife Trust', description: 'Elephant & rhino conservation', icon: '🐘', url: 'https://www.sheldrickwildlifetrust.org/', color: 'amber' },
                  { name: 'Koko Networks', description: 'Clean cooking solutions', icon: '🔥', url: 'https://kokonetworks.com/', color: 'orange' },
                  { name: 'One Acre Fund', description: 'Smallholder farmer support', icon: '🌾', url: 'https://oneacrefund.org/', color: 'yellow' },
                  { name: 'SolarAid', description: 'Solar power access', icon: '☀️', url: 'https://solar-aid.org/', color: 'yellow' },
                  { name: 'Mara Elephant Project', description: 'Elephant protection', icon: '🐘', url: 'https://maraelephantproject.org/', color: 'amber' },
                  { name: 'SOKO', description: 'Artisan empowerment', icon: '💎', url: 'https://shopsoko.com/', color: 'cyan' },
                  { name: 'Giraffe Centre', description: 'Wildlife conservation & education', icon: '🦒', url: 'https://www.giraffecentre.org/', color: 'amber' }
                ].map((partner, idx) => (
                  <a
                    key={idx}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl border border-zinc-700 p-6 hover:shadow-[0_0_30px_-10px_rgba(0,205,209,0.3)] transition-all duration-300 hover:scale-[1.02] group`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8A2BE2] to-[#00CED1] flex items-center justify-center text-3xl shadow-lg group-hover:shadow-[0_0_20px_-5px_rgba(0,205,209,0.5)] transition-all">
                        {partner.icon}
                      </div>
                      <div>
                        <div className="font-bold text-white text-base group-hover:text-[#00CED1] transition-colors">{partner.name}</div>
                        <div className="text-sm text-zinc-400 mt-1">{partner.description}</div>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500 border-t border-zinc-700 pt-3">
                      Learn more →
                    </div>
                  </a>
                ))}
              </div>
              
              {/* Partner Benefits Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 p-4 rounded-xl border border-emerald-500/30">
                  <div className="text-2xl mb-2">💰</div>
                  <h4 className="font-bold text-white mb-1">50% Revenue Share</h4>
                  <p className="text-xs text-emerald-300">Direct funding to environmental impact</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-4 rounded-xl border border-blue-500/30">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-bold text-white mb-1">Tech & Marketing</h4>
                  <p className="text-xs text-blue-300">We handle everything, you focus on impact</p>
                </div>
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-4 rounded-xl border border-purple-500/30">
                  <div className="text-2xl mb-2">📊</div>
                  <h4 className="font-bold text-white mb-1">Transparent Tracking</h4>
                  <p className="text-xs text-purple-300">Real-time impact metrics & reporting</p>
                </div>
              </div>
              
              {/* Partnership Model & CTA */}
              <div className="bg-gradient-to-r from-[#8A2BE2]/20 to-[#00CED1]/20 rounded-2xl p-6 border border-[#8A2BE2]/40">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                      <span className="text-2xl">🤝</span> 
                      Partnership Model
                    </h4>
                    <p className="text-sm text-zinc-300 mb-4">
                      We share 50% of revenue with partners, handle all tech & marketing, and provide transparent impact tracking. 
                      Win-win for Kenyan organizations seeking new funding streams.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs">No Upfront Costs</span>
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">No Tech Requirements</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">Transparent Reporting</span>
                    </div>
                  </div>
                  
                  {/* Call to Action */}
                  <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 min-w-[250px] flex flex-col justify-center items-center text-center hover:shadow-[0_0_30px_-5px_rgba(0,205,209,0.5)] transition-all duration-300">
                    <div className="text-4xl mb-3">🚀</div>
                    <h4 className="font-black text-white text-lg mb-2">Become a Partner</h4>
                    <p className="text-xs text-white/90 mb-4">Join our network of verified environmental partners</p>
                    <a 
                      href="mailto:contact@giftedair.com?subject=Partnership Inquiry&body=I'm interested in becoming a Gifted Air partner to receive 50% of gift revenue for environmental impact in Kenya." 
                      className="w-full bg-white text-[#8A2BE2] font-bold py-3 px-6 rounded-lg text-center hover:bg-zinc-100 transition-colors shadow-lg"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Unit Economics - NEW */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 border border-zinc-700 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                  <span className="text-3xl">💵</span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  Unit Economics: The Money Machine
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-2xl border border-zinc-700">
                  <h4 className="text-xl font-black mb-4 text-[#00CED1] flex items-center gap-2">
                    <span>🧮</span>
                    Per Gift Breakdown ($5 example)
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-zinc-700/50 to-zinc-800/50 rounded-xl border border-zinc-600">
                      <span className="text-zinc-300">Customer Pays</span>
                      <span className="text-2xl font-black text-white">$5.00</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-900/30 to-red-800/30 rounded-xl border-l-4 border-red-500 border-opacity-50">
                      <span className="text-zinc-300">Stripe Fee (2.9% + $0.30)</span>
                      <span className="font-bold text-red-400">-$0.45</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-xl border-l-4 border-blue-500 border-opacity-50">
                      <span className="text-zinc-300">To Partner (50%)</span>
                      <span className="font-bold text-blue-400">-$2.50</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl border-2 border-green-500 border-opacity-50">
                      <span className="text-emerald-300 font-bold">Platform Revenue</span>
                      <span className="text-3xl font-black text-emerald-400">$2.05</span>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 rounded-xl border border-emerald-500/30">
                    <p className="text-sm text-emerald-300 font-bold">
                      ✨ 41% margin per transaction | Pure profit after infrastructure costs
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-2xl border border-zinc-700">
                  <h4 className="text-xl font-black mb-4 text-[#ADD8E6] flex items-center gap-2">
                    <span>📊</span>
                    Scale Projection
                  </h4>
                  <div className="space-y-4">
                    <div className="p-5 bg-gradient-to-r from-zinc-700/50 to-zinc-800/50 rounded-2xl border border-zinc-600">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-zinc-400">1,000 gifts/month @ $5 avg</span>
                        <span className="text-xl font-black text-white">$5K</span>
                      </div>
                      <div className="text-sm text-emerald-400 font-bold">
                        Monthly Revenue: $2,050
                      </div>
                    </div>
                    
                    <div className="p-5 bg-gradient-to-r from-zinc-700/50 to-zinc-800/50 rounded-2xl border-l-4 border-cyan-500 border-opacity-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-zinc-400">10,000 gifts/month @ $5 avg</span>
                        <span className="text-xl font-black text-white">$50K</span>
                      </div>
                      <div className="text-sm text-cyan-400 font-bold">
                        Monthly Revenue: $20,500 | $246K/year
                      </div>
                    </div>
                    
                    <div className="p-5 bg-gradient-to-r from-zinc-700/50 to-zinc-800/50 rounded-2xl border-l-4 border-purple-500 border-opacity-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-zinc-400">100,000 gifts/month @ $5 avg</span>
                        <span className="text-xl font-black text-white">$500K</span>
                      </div>
                      <div className="text-sm text-purple-400 font-bold">
                        Monthly Revenue: $205K | $2.46M/year
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-500/30">
                    <p className="text-sm text-purple-300 font-bold">
                      🚀 With just 0.02% of $300B digital gifting market = $60M/year
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Engine */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 border border-zinc-700 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl">
                  <span className="text-3xl">📈</span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  Viral Growth Engine
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-2xl border border-zinc-700 hover:shadow-[0_0_20px_-8px_rgba(255,20,147,0.3)] transition-all duration-300">
                  <div className="text-4xl mb-3 bg-gradient-to-br from-pink-400 to-rose-500 text-transparent bg-clip-text">💝</div>
                  <h4 className="font-black text-white mb-2 text-lg">Gift Sharing</h4>
                  <p className="text-sm text-zinc-400 mb-3">Every gift has a unique shareable URL. Recipients post their environmental gifts on social media.</p>
                  <div className="text-xs text-pink-400 font-bold">K-Factor: 1.5-2.0 (viral loop)</div>
                </div>
                
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-2xl border border-zinc-700 hover:shadow-[0_0_20px_-8px_rgba(153,102,255,0.3)] transition-all duration-300">
                  <div className="text-4xl mb-3 bg-gradient-to-br from-purple-400 to-indigo-500 text-transparent bg-clip-text">🎯</div>
                  <h4 className="font-black text-white mb-2 text-lg">Referral Program</h4>
                  <p className="text-sm text-zinc-400 mb-3">Users earn rewards for referring friends. Built-in incentive for organic growth.</p>
                  <div className="text-xs text-purple-400 font-bold">Target: 30% of users refer 2+ friends</div>
                </div>
                
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-2xl border border-zinc-700 hover:shadow-[0_0_20px_-8px_rgba(0,205,209,0.3)] transition-all duration-300">
                  <div className="text-4xl mb-3 bg-gradient-to-br from-cyan-400 to-blue-500 text-transparent bg-clip-text">🔥</div>
                  <h4 className="font-black text-white mb-2 text-lg">Emotional Resonance</h4>
                  <p className="text-sm text-zinc-400 mb-3">Gifts for birthdays, anniversaries, holidays create recurring usage patterns.</p>
                  <div className="text-xs text-cyan-400 font-bold">LTV: 5-7 gifts per user lifetime</div>
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
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-zinc-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl">
                  <span className="text-4xl">🌍</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  Our Vision
                </h2>
              </div>
              <p className="text-xl md:text-2xl font-black leading-relaxed mb-6 text-[#00CED1]">
                To make environmental impact the world's most popular gift.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-zinc-300">
                Gifted Air transforms how people express love and appreciation by connecting 
                personal celebrations with planetary healing. Every gift plants a tree, cleans 
                the ocean, protects wildlife, or supports clean energy - creating a ripple effect 
                of positive environmental change through the simple act of giving.
              </p>
            </div>

            {/* The Problem */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-xl p-8 md:p-10 border border-zinc-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  The Problem We're Solving
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🎁</span>
                    <h3 className="font-black text-red-400 text-lg">Gift Fatigue</h3>
                  </div>
                  <p className="text-zinc-400">
                    People are tired of meaningless physical gifts that end up in landfills. 
                    73% of millennials prefer experiences over things.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🌳</span>
                    <h3 className="font-black text-amber-400 text-lg">Disconnected Charity</h3>
                  </div>
                  <p className="text-zinc-400">
                    Traditional environmental donations feel impersonal and transactional. 
                    No emotional connection, no sharing, no celebration.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">💚</span>
                    <h3 className="font-black text-emerald-400 text-lg">Purpose Seeking</h3>
                  </div>
                  <p className="text-zinc-400">
                    89% of Gen Z wants to support environmental causes, but existing platforms 
                    don't make it easy, beautiful, or shareable.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">📱</span>
                    <h3 className="font-black text-cyan-400 text-lg">Missing Virality</h3>
                  </div>
                  <p className="text-zinc-400">
                    Environmental actions are rarely shared socially. We miss the opportunity 
                    for impact to inspire more impact.
                  </p>
                </div>
              </div>
            </div>

            {/* The Solution */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-xl p-8 md:p-10 border border-zinc-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                  <span className="text-3xl">✨</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Our Solution
                </h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <div className="text-4xl bg-gradient-to-br from-emerald-400 to-teal-500 text-transparent bg-clip-text">🎁</div>
                  <div>
                    <h3 className="font-black text-lg md:text-xl text-emerald-400 mb-2">
                      Beautiful Environmental Gifts
                    </h3>
                    <p className="text-zinc-400">
                      Plant trees, clean oceans, protect wildlife, or install solar panels in someone's name. 
                      Each gift comes with a stunning personalized page, custom message, and downloadable certificate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <div className="text-4xl bg-gradient-to-br from-cyan-400 to-blue-500 text-transparent bg-clip-text">💎</div>
                  <div>
                    <h3 className="font-black text-lg md:text-xl text-cyan-400 mb-2">
                      Shareable Impact Stories
                    </h3>
                    <p className="text-zinc-400">
                      Every gift has a unique URL that recipients can share on social media, 
                      spreading environmental awareness while celebrating their special moment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <div className="text-4xl bg-gradient-to-br from-purple-400 to-pink-500 text-transparent bg-clip-text">🔍</div>
                  <div>
                    <h3 className="font-black text-lg md:text-xl text-purple-400 mb-2">
                      Complete Transparency
                    </h3>
                    <p className="text-zinc-400">
                      Track exactly where your money goes. We show partner organizations, donation amounts, 
                      and real environmental impact with receipts and proof.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <div className="text-4xl bg-gradient-to-br from-amber-400 to-orange-500 text-transparent bg-clip-text">🏆</div>
                  <div>
                    <h3 className="font-black text-lg md:text-xl text-amber-400 mb-2">
                      Gamification & Community
                    </h3>
                    <p className="text-zinc-400">
                      Leaderboards, public gallery, referral rewards, and impact tracking turn 
                      environmental giving into an engaging, social experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-xl p-8 md:p-10 border border-zinc-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-yellow-600 to-amber-600 rounded-xl">
                  <span className="text-3xl">⚡</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Platform Features
                </h2>
              </div>
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
                  <div key={idx} className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-5 border border-zinc-700 hover:shadow-[0_0_20px_-8px_rgba(0,205,209,0.3)] transition-all duration-300">
                    <div className="text-4xl mb-3 bg-gradient-to-br from-[#00CED1] to-[#ADD8E6] text-transparent bg-clip-text">{feature.icon}</div>
                    <h3 className="font-black text-white mb-2 text-base md:text-lg">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-zinc-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-black text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg transform hover:scale-105"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        )}

        {/* beVisioneers Lean Canvas Section */}
        {activeSection === 'canvas' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-xl p-8 md:p-10 border border-zinc-700">
              <div className="text-center mb-4">
                <div className="inline-block p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl mb-2">
                  <span className="text-3xl">📊</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                  beVisioneers Lean Canvas
                </h2>
                <p className="text-white/70">Complete business model framework following the beVisioneers Fellowship approach</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* 1. Problem */}
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <h3 className="font-black text-lg text-red-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span> 1. Problem
                  </h3>
                  <ul className="space-y-3">
                    {leanCanvas.problem.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-zinc-300 text-sm">
                        <span className="text-red-400 font-black">{idx + 1}.</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Existing Alternatives */}
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <h3 className="font-black text-lg text-orange-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔄</span> 2. Existing Alternatives
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.existingAlternatives.map((alt, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-zinc-300 text-sm">
                        <span className="text-orange-400">•</span>
                        <span>{alt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Solution */}
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <h3 className="font-black text-lg text-emerald-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl">✅</span> 3. Solution
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.solution.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-zinc-300 text-sm">
                        <span className="text-emerald-400">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Target Audience & Early Adopters */}
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <h3 className="font-black text-lg text-amber-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl">👥</span> 4. Target Audience
                  </h3>
                  <div className="mb-4">
                    <h4 className="font-bold text-amber-300 mb-2 text-sm">Broad Audience:</h4>
                    <ul className="space-y-1">
                      {leanCanvas.targetAudience.broad.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-zinc-300 text-xs">
                          <span className="text-amber-400">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-300 mb-2 text-sm">🎯 Early Adopters:</h4>
                    <ul className="space-y-1">
                      {leanCanvas.targetAudience.earlyAdopters.map((ea, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-zinc-300 text-xs font-bold">
                          <span className="text-amber-400">★</span>
                          <span>{ea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 5. Your Why - Full Width */}
              </div>

              {/* Full Width Sections */}
              <div className="mt-6 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                <h3 className="font-black text-xl text-[#00CED1] mb-4 flex items-center gap-2">
                  <span className="text-2xl">💜</span> 5. Your Why (Founder Motivation)
                </h3>
                <ul className="space-y-3">
                  {leanCanvas.yourWhy.map((why, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-zinc-300">
                      <span className="text-[#00CED1] font-black text-lg">{idx + 1}.</span>
                      <span className="leading-relaxed">{why}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 6. Speed Bumps - Full Width */}
              <div className="mt-6 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                <h3 className="font-black text-xl text-amber-400 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🚧</span> 6. Speed Bumps (Limitations & Mitigation)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {leanCanvas.speedBumps.map((bump, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-xl p-4 border border-zinc-700">
                      <h4 className="font-bold text-red-400 mb-2 text-sm">⚠️ {bump.limitation}</h4>
                      <p className="text-emerald-400 text-sm"><span className="font-bold">✓ Mitigation:</span> {bump.mitigation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Prototype - Full Width */}
              <div className="mt-6 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                <h3 className="font-black text-xl text-cyan-400 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔬</span> 7. Prototype (What Needs Testing)
                </h3>
                <ul className="space-y-2">
                  {leanCanvas.prototype.map((proto, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-zinc-300">
                      <span>{proto}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Grid Sections */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* 8. Channels */}
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <h3 className="font-black text-lg text-cyan-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📢</span> 8. Channels & Partnerships
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.channels.map((ch, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-zinc-300 text-sm">
                        <span className="text-cyan-400">•</span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 9. Key Metrics */}
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <h3 className="font-black text-lg text-blue-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📊</span> 9. Key Metrics
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.keyMetrics.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-zinc-300 text-sm">
                        <span className="text-blue-400">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 10. Cost Structure */}
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <h3 className="font-black text-lg text-rose-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl">💸</span> 10. Cost Structure
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.costStructure.map((cost, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-zinc-300 text-sm">
                        <span className="text-rose-400">•</span>
                        <span>{cost}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 11. Income Streams */}
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                  <h3 className="font-black text-lg text-emerald-400 mb-4 flex items-center gap-2">
                    <span className="text-2xl">💰</span> 11. Income Streams
                  </h3>
                  <ul className="space-y-2">
                    {leanCanvas.incomeStreams.map((rev, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-zinc-300 text-sm">
                        <span className="text-emerald-400">•</span>
                        <span>{rev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Market Research Section */}
        {activeSection === 'market' && (
          <div className="space-y-8 animate-fade-in">
            {/* Market Opportunity - Enhanced */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-2xl p-8 md:p-10 border border-zinc-700 mb-8">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl mb-4">
                  <span className="text-3xl">💰</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
                  The Confluence of Billion-Dollar Markets
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700 hover:shadow-[0_0_20px_-8px_rgba(0,205,209,0.3)] transition-all duration-300">
                  <div className="text-4xl mb-4 text-center bg-gradient-to-br from-cyan-400 to-blue-500 text-transparent bg-clip-text">🌍</div>
                  <h3 className="text-lg md:text-xl font-black mb-3 text-cyan-400">Voluntary Carbon Market</h3>
                  <p className="text-3xl md:text-4xl font-black mb-2 text-white">$10-40B</p>
                  <p className="text-zinc-400 text-sm md:text-base">Projected by 2030</p>
                </div>
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700 hover:shadow-[0_0_20px_-8px_rgba(255,105,180,0.3)] transition-all duration-300">
                  <div className="text-4xl mb-4 text-center bg-gradient-to-br from-pink-400 to-rose-500 text-transparent bg-clip-text">💝</div>
                  <h3 className="text-lg md:text-xl font-black mb-3 text-pink-400">Conscious Gifting Economy</h3>
                  <p className="text-3xl md:text-4xl font-black mb-2 text-white">60%+</p>
                  <p className="text-zinc-400 text-sm md:text-base">Consumers prefer sustainable brands</p>
                </div>
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700 hover:shadow-[0_0_20px_-8px_rgba(0,205,209,0.3)] transition-all duration-300">
                  <div className="text-4xl mb-4 text-center bg-gradient-to-br from-emerald-400 to-teal-500 text-transparent bg-clip-text">📱</div>
                  <h3 className="text-lg md:text-xl font-black mb-3 text-emerald-400">Digital Gifting Market</h3>
                  <p className="text-3xl md:text-4xl font-black mb-2 text-white">$300B+</p>
                  <p className="text-zinc-400 text-sm md:text-base">Industry ripe for innovation</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-2xl p-6 border border-amber-500/30">
                <p className="text-lg md:text-2xl text-center font-black">
                  🎯 Our Target: <span className="text-amber-400">$2-5B</span> Eco-Gifting Market Opportunity
                </p>
              </div>
            </div>

            {/* Market Size Details */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-xl p-8 md:p-10 border border-zinc-700">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl">
                  <span className="text-3xl">📈</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  {marketResearch.marketSize.title}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {marketResearch.marketSize.data.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                    <div className="text-sm text-zinc-400 mb-2">{item.metric}</div>
                    <div className="text-2xl md:text-3xl font-black text-[#00CED1]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive Analysis */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-xl p-8 md:p-10 border border-zinc-700">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl">
                  <span className="text-3xl">🥊</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Competitive Landscape
                </h2>
              </div>
              <div className="space-y-4">
                {marketResearch.competitors.map((comp, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700 hover:shadow-[0_0_20px_-8px_rgba(0,205,209,0.3)] transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-lg md:text-xl text-white">{comp.name}</h3>
                      <span className="px-4 py-2 bg-gradient-to-r from-red-900 to-red-800 text-red-300 rounded-full text-sm font-bold">
                        Their Weakness
                      </span>
                    </div>
                    <p className="text-zinc-400 mt-3">{comp.weakness}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Validation */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-xl p-8 md:p-10 border border-zinc-700">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl">
                  <span className="text-3xl">✅</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Market Validation Data
                </h2>
              </div>
              <div className="space-y-4">
                {marketResearch.validation.map((val, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-700">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl bg-gradient-to-br from-emerald-400 to-teal-500 text-transparent bg-clip-text">📊</span>
                      <div className="flex-1">
                        <h3 className="font-black text-base md:text-lg text-emerald-400 mb-2">{val.source}</h3>
                        <p className="text-zinc-400">{val.finding}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Differentiators */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-2xl p-8 md:p-10 border border-zinc-700">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                  <span className="text-3xl">🌟</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Why We'll Win
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {marketResearch.differentiators.map((diff, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-4 border border-zinc-700">
                    <span className="text-2xl bg-gradient-to-br from-purple-400 to-pink-500 text-transparent bg-clip-text">✨</span>
                    <p className="text-base md:text-lg text-zinc-300">{diff}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-black text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg transform hover:scale-105"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        )}

        {/* Timeline Section */}
        {activeSection === 'timeline' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-xl p-8 md:p-10 border border-zinc-700">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl mb-4">
                  <span className="text-3xl">🗓️</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  Execution Timeline
                </h2>
              </div>

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
              <div className="mt-12 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-8 border border-zinc-700">
                <div className="text-center mb-4">
                  <div className="inline-block p-3 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl mb-2">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white">Overall Platform Progress</h3>
                </div>
                <div className="text-center mb-4">
                  <div className="text-4xl md:text-5xl font-black text-[#00CED1]">
                    {Math.round((timeline.reduce((sum, phase) => sum + phase.tasks.filter(t => t.done).length, 0) / 
                      timeline.reduce((sum, phase) => sum + phase.tasks.length, 0)) * 100)}%
                  </div>
                  <div className="text-base md:text-lg mt-2 text-zinc-300">
                    {timeline.reduce((sum, phase) => sum + phase.tasks.filter(t => t.done).length, 0)} of{' '}
                    {timeline.reduce((sum, phase) => sum + phase.tasks.length, 0)} tasks completed
                  </div>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-4 rounded-full transition-all"
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
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-black text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg transform hover:scale-105"
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
                💚 Thank you for your time and consideration.
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
              Document prepared for <a href="https://www.aneripradhan.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Aneri Pradhan</a>, Venture Coach | BeVisioneers Fellowship @ Do School
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
