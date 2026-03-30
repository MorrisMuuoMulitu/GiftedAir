import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, Heart, Zap, Leaf, Users, TrendingUp, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-off-white pb-32 overflow-x-hidden">
      <SEO
        title="About - Gifted Air | Climate Action as a Love Language"
        description="Learn about Gifted Air - transforming climate action into meaningful gifts. Discover our mission, how it works, and why we believe climate love should be shareable."
        path="/about"
      />

      <Navigation />

      <div className="container mx-auto px-4 max-w-5xl pt-32">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-deep/30 border border-teal-deep/50 rounded-full text-teal-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
            <Heart className="w-4 h-4" /> Our Story
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">
            Climate Action as a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-bronze to-teal-400 bg-[length:200%_auto] animate-gradient">Love Language.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            What if the best gift you could give someone was a healthier planet in their name?
          </p>
        </motion.div>

        {/* The Problem */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
            <div className="h-px w-12 bg-white/10" />
            The Problem We're Solving
            <div className="h-px w-12 bg-white/10" />
          </h2>
          <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Meaningful gifting is hard. Traditional gifts often end up unused, physical items create waste,
              and gift cards feel impersonal. Meanwhile, climate action desperately needs funding, but donating
              to environmental causes feels like a chore, not a celebration.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              We asked ourselves: <strong className="text-teal-400">What if we could turn climate action into something joyful, shareable, and deeply personal?</strong>
            </p>
          </div>
        </motion.section>

        {/* What is Gifted Air */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
            <Globe className="w-8 h-8 text-teal-400" />
            What is Gifted Air?
          </h2>
          <div className="bg-gradient-to-br from-slate-900 to-teal-deep/20 border border-white/5 rounded-[2.5rem] p-10">
            <p className="text-xl text-teal-400 font-black mb-6">
              Gifted Air is a platform that transforms climate action into meaningful gifts.
            </p>
            <p className="text-slate-300 leading-relaxed mb-8">
              Instead of buying physical items or generic gift cards, you can give someone trees planted in their name,
              ocean cleanup efforts, clean water projects, solar power installations, and more. Each gift comes with:
            </p>
            <ul className="space-y-4">
              {[
                'A beautiful, personalized gift page with your custom message',
                'A downloadable certificate showing the environmental impact',
                'A shareable link they can post on social media',
                'Complete transparency on where the money goes (funding verified partners)'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-black mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎁',
                title: 'Choose a Gift',
                description: 'Select from 8 environmental causes: trees, ocean cleanup, clean water, solar power, cookstoves, coral restoration, wildlife protection, or rainforest conservation.'
              },
              {
                icon: '💌',
                title: 'Personalize',
                description: "Add the recipient's name, write a heartfelt message, and choose the amount. We create a beautiful gift page just for them."
              },
              {
                icon: '🌍',
                title: 'Share & Impact',
                description: "Send via email or share the link. They receive their gift page, certificate, and can share their impact with friends and family."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 text-center hover:border-teal-400/30 transition-all group"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{step.icon}</div>
                <h3 className="text-xl font-black mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why We Exist */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-deep to-slate-900 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-slate-900 border border-white/5 rounded-[3rem] p-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/5 rounded-full blur-[100px] -mr-48 -mt-48" />
              <h2 className="text-3xl font-black mb-8 text-center">Why We Exist</h2>
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p className="text-lg">
                  Climate action shouldn't feel like homework. It should feel like <strong className="text-teal-400">love</strong>.
                </p>
                <p>
                  We believe people want to support environmental causes, but the experience is often
                  transactional, impersonal, and forgettable. By turning climate action into gifts, we're
                  creating an emotional connection, one that spreads through social networks as recipients
                  share their impact.
                </p>
                <p>
                  Every gift on Gifted Air isn't just funding important environmental work, it's sparking
                  conversations, changing perspectives, and making climate action <strong className="text-teal-400">something worth celebrating</strong>.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* The Impact */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-black mb-12 text-center">The Real Impact</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="w-8 h-8 text-emerald-400" />
                <h3 className="text-2xl font-black">For the Planet</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Your gift directly funds verified environmental organizations',
                  'Complete transparency: see exactly where your money goes',
                  'Measurable impact: trees planted, plastic removed, watts generated'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-emerald-400 text-xl">🌳</span>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-bronze" />
                <h3 className="text-2xl font-black">For People</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Give meaningful gifts that align with your values',
                  'Celebrate loved ones while fighting climate change',
                  'Share your impact and inspire others to take action'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-bronze text-xl">💝</span>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <p className="text-center text-slate-400 italic text-lg">
            When you give a gift on Gifted Air, you're not just planting trees, you're planting the idea that climate action can be joyful, personal, and worth sharing.
          </p>
        </motion.section>

        {/* Our Potential Partners */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <h2 className="text-3xl font-black">Our Potential Partners in Kenya</h2>
            <button
              onClick={() => navigate('/partner-application')}
              className="px-8 py-4 bg-bronze text-white rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-bronze/20 flex items-center justify-center gap-2 group"
            >
              Apply to Partner <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <p className="text-slate-400 mb-8">
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
                className="bg-slate-900 border border-white/5 rounded-2xl p-6 text-center hover:border-teal-400/30 hover:shadow-xl transition-all group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{partner.icon}</div>
                <div className="text-sm font-black text-off-white mb-2">{partner.name}</div>
                <div className="text-xs text-slate-500">{partner.desc}</div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Transparency */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
            <Zap className="w-8 h-8 text-teal-400" />
            Complete Transparency
          </h2>
          <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10">
            <p className="text-slate-300 mb-8">We believe in radical honesty about where your money goes:</p>
            <div className="bg-slate-950 rounded-2xl p-8 border border-white/5">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-teal-500/10 rounded-xl border border-teal-500/20">
                  <span className="font-black">Environmental Partner</span>
                  <span className="text-teal-400 font-black">70% Direct Funding</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-900 rounded-xl border border-white/5">
                  <span className="font-black">Payment Processing</span>
                  <span className="text-slate-400 font-black">Transaction Fee</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-900 rounded-xl border border-white/5">
                  <span className="font-black">Platform Operations & Growth</span>
                  <span className="text-slate-400 font-black">30% Sustainable Automation</span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 mt-8 text-sm leading-relaxed">
              Every gift shows exactly which organization receives the donation, how much they receive,
              and what impact it will create. You can view all gifts in our public gallery and see the
              total impact we've generated together.
            </p>
          </div>
        </motion.section>

        {/* The Vision */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-bronze/20 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gradient-to-r from-teal-deep to-slate-900 border border-white/5 rounded-[3rem] p-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-bronze/5 rounded-full blur-[100px] -mr-48 -mt-48" />
              <h2 className="text-3xl font-black mb-8 text-center">Our Vision</h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-6 text-center">
                We envision a world where <strong className="text-teal-400">climate action is woven into how we celebrate each other</strong>.
              </p>
              <p className="text-slate-400 leading-relaxed text-center max-w-3xl mx-auto">
                Birthdays, weddings, holidays, achievements: every celebration becomes an opportunity to fund
                environmental solutions. Not as a guilt-driven obligation, but as a joyful expression of love
                for the people in our lives and the planet we share.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative group cursor-pointer" onClick={() => navigate('/compose')}>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-deep to-slate-900 rounded-[3rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-slate-900 border border-white/5 rounded-[3rem] p-16 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-bronze/5 rounded-full blur-[100px] -mr-48 -mt-48" />
              <div className="text-6xl mb-8">🎁</div>
              <h2 className="text-4xl md:text-6xl font-black mb-6">Ready to Give Climate Love?</h2>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Turn your next celebration into climate action. Give a gift that makes a real difference.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-12 py-6 bg-off-white text-slate-950 rounded-2xl text-xl font-black hover:bg-bronze hover:text-off-white transition-all shadow-2xl flex items-center gap-3">
                  Send a Gift <ArrowRight className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate('/gallery'); }}
                  className="px-12 py-6 bg-slate-950 border border-white/10 rounded-2xl text-xl font-black hover:border-teal-400/30 transition-all"
                >
                  See All Gifts
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-16"
        >
          <button
            onClick={() => navigate('/')}
            className="text-slate-500 hover:text-teal-400 font-black uppercase tracking-[0.2em] text-[10px] transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            ← Return to Sanctuary
          </button>
        </motion.div>
      </div>
    </div>
  );
}
