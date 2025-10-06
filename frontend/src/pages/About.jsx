import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="About - Gifted Air | Climate Action as a Love Language"
        description="Learn about Gifted Air - transforming climate action into meaningful gifts. Discover our mission, how it works, and why we believe climate love should be shareable."
        path="/about"
      />
      
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Climate Action as a Love Language
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 leading-relaxed">
              What if the best gift you could give someone was a healthier planet in their name?
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          
          {/* The Problem */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">The Problem We're Solving</h2>
            <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4">
              <p>
                Meaningful gifting is hard. Traditional gifts often end up unused, physical items create waste, 
                and gift cards feel impersonal. Meanwhile, climate action desperately needs funding—but donating 
                to environmental causes feels like a chore, not a celebration.
              </p>
              <p>
                We asked ourselves: <strong>What if we could turn climate action into something joyful, 
                shareable, and deeply personal?</strong>
              </p>
            </div>
          </section>

          {/* What is Gifted Air */}
          <section className="mb-16 bg-blue-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">What is Gifted Air?</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p className="text-lg">
                <strong className="text-blue-600">Gifted Air is a platform that transforms climate action into meaningful gifts.</strong>
              </p>
              <p>
                Instead of buying physical items or generic gift cards, you can give someone trees planted in their name, 
                ocean cleanup efforts, clean water projects, solar power installations, and more. Each gift comes with:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>A beautiful, personalized gift page with your custom message</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>A downloadable certificate showing the environmental impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>A shareable link they can post on social media</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Complete transparency on where the money goes (50% to verified partners)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Choose a Gift</h3>
                <p className="text-slate-600">
                  Select from 8 environmental causes: trees, ocean cleanup, clean water, solar power, 
                  cookstoves, coral restoration, wildlife protection, or rainforest conservation.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="text-4xl mb-4">💌</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Personalize</h3>
                <p className="text-slate-600">
                  Add the recipient's name, write a heartfelt message, and choose the amount. 
                  We create a beautiful gift page just for them.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Share & Impact</h3>
                <p className="text-slate-600">
                  Send via email or share the link. They receive their gift page, certificate, and 
                  can share their impact with friends and family.
                </p>
              </div>
            </div>
          </section>

          {/* Why We Exist */}
          <section className="mb-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why We Exist</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Climate action shouldn't feel like homework. It should feel like <strong>love</strong>.
              </p>
              <p>
                We believe people want to support environmental causes, but the experience is often 
                transactional, impersonal, and forgettable. By turning climate action into gifts, we're 
                creating an emotional connection—one that spreads through social networks as recipients 
                share their impact.
              </p>
              <p>
                Every gift on Gifted Air isn't just funding important environmental work—it's sparking 
                conversations, changing perspectives, and making climate action <strong>something worth 
                celebrating</strong>.
              </p>
            </div>
          </section>

          {/* The Impact */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">The Real Impact</h2>
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">For the Planet</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">🌳</span>
                      <span>50% of every gift goes directly to verified environmental organizations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">🔍</span>
                      <span>Complete transparency—see exactly where your money goes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">📈</span>
                      <span>Measurable impact: trees planted, plastic removed, watts generated</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">For People</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">💝</span>
                      <span>Give meaningful gifts that align with your values</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">🎉</span>
                      <span>Celebrate loved ones while fighting climate change</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">🌍</span>
                      <span>Share your impact and inspire others to take action</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-center text-slate-600 italic">
              When you give a gift on Gifted Air, you're not just planting trees—you're planting the 
              idea that climate action can be joyful, personal, and worth sharing.
            </p>
          </section>

          {/* Our Potential Partners */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-3xl font-bold text-slate-900">Our Potential Partners in Kenya</h2>
              <button
                onClick={() => navigate('/partner-application')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🚀 Apply to Partner
              </button>
            </div>
            <p className="text-slate-700 mb-6">
              We're building partnerships with verified Kenyan environmental organizations to ensure your gifts create real local impact:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Green Belt Movement', icon: '🌳', url: 'https://www.greenbeltmovement.org/', desc: 'Tree planting & conservation' },
                { name: 'Eden Reforestation Projects', icon: '🌲', url: 'https://www.edenprojects.org/', desc: 'Forest restoration' },
                { name: 'Sheldrick Wildlife Trust', icon: '🐘', url: 'https://www.sheldrickwildlifetrust.org/', desc: 'Elephant & rhino conservation' },
                { name: 'Koko Networks', icon: '🔥', url: 'https://kokonetworks.com/', desc: 'Clean cooking solutions' },
                { name: 'One Acre Fund', icon: '🌾', url: 'https://oneacrefund.org/', desc: 'Smallholder farmer support' },
                { name: 'SolarAid', icon: '☀️', url: 'https://solar-aid.org/', desc: 'Solar power access' },
                { name: 'Mara Elephant Project', icon: '🐘', url: 'https://maraelephantproject.org/', desc: 'Elephant protection' },
                { name: 'SOKO', icon: '💎', url: 'https://shopsoko.com/', desc: 'Artisan empowerment' },
                { name: 'Giraffe Centre', icon: '🦒', url: 'https://www.giraffecentre.org/', desc: 'Wildlife conservation & education' }
              ].map((partner, idx) => (
                <a 
                  key={idx} 
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg border border-slate-200 p-4 text-center hover:shadow-lg hover:border-blue-300 transition-all group"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{partner.icon}</div>
                  <div className="text-sm font-bold text-slate-900 mb-1">{partner.name}</div>
                  <div className="text-xs text-slate-600">{partner.desc}</div>
                </a>
              ))}
            </div>
          </section>

          {/* Transparency */}
          <section className="mb-16 bg-slate-100 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Complete Transparency</h2>
            <div className="space-y-4 text-slate-700">
              <p>We believe in radical honesty about where your money goes:</p>
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Environmental Partner</span>
                    <span className="text-green-600 font-bold">50%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Stripe Payment Processing</span>
                    <span className="text-slate-600">~3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Platform Operations & Growth</span>
                    <span className="text-slate-600">~47%</span>
                  </div>
                </div>
              </div>
              <p className="text-sm">
                Every gift shows exactly which organization receives the donation, how much they receive, 
                and what impact it will create. You can view all gifts in our public gallery and see the 
                total impact we've generated together.
              </p>
            </div>
          </section>

          {/* The Vision */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Vision</h2>
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-8">
              <p className="text-xl leading-relaxed mb-4">
                We envision a world where <strong>climate action is woven into how we celebrate each other</strong>.
              </p>
              <p className="text-blue-50 leading-relaxed">
                Birthdays, weddings, holidays, achievements—every celebration becomes an opportunity to fund 
                environmental solutions. Not as a guilt-driven obligation, but as a joyful expression of love 
                for the people in our lives and the planet we share.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Ready to Give Climate Love?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Turn your next celebration into climate action. Give a gift that makes a real difference.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate('/compose')}
                className="bg-blue-600 text-white px-4 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Send a Gift →
              </button>
              <button
                onClick={() => navigate('/gallery')}
                className="bg-white text-blue-600 px-4 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-slate-50 transition-colors border-2 border-blue-600"
              >
                See All Gifts
              </button>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
