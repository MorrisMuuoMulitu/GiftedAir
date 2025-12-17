import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Transparency() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-4">
            💚 How Your Gift Makes Real Impact
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Complete transparency on where every dollar goes
          </p>
        </div>

        {/* Money Breakdown */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-forest mb-6">Where Your Money Goes</h2>
          
          <p className="text-gray-700 mb-8 text-sm sm:text-base md:text-lg">
            We believe in complete transparency. Here's the honest breakdown of how your gift funds are used:
          </p>

          <div className="space-y-4 sm:space-y-6">
            {/* BeVisioneers Fellowship */}
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="text-2xl sm:text-3xl md:text-4xl">🎓</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-forest">BeVisioneers Fellowship</h3>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">30%</span>
                </div>
                <p className="text-sm sm:text-base text-gray-700">
                  Funds the BeVisioneers Fellowship program, supporting changemakers in climate and social innovation.
                  This empowers the next generation of environmental leaders and entrepreneurs.
                </p>
              </div>
            </div>

            {/* Climate Action */}
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="text-2xl sm:text-3xl md:text-4xl">🌍</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-forest">Climate Action Partners</h3>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">~40%</span>
                </div>
                <p className="text-sm sm:text-base text-gray-700">
                  Funds actual environmental projects through verified partner organizations.
                  This plants the trees, removes the plastic, provides clean water, and protects wildlife.
                </p>
              </div>
            </div>

            {/* Payment Processing */}
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="text-2xl sm:text-3xl md:text-4xl">💳</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-forest">Payment Processing (Stripe)</h3>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">~21%</span>
                </div>
                <p className="text-sm sm:text-base text-gray-700">
                  Credit card processing fees ($0.30 + 2.9% per transaction).
                  This is industry standard and goes directly to Stripe, not us.
                </p>
              </div>
            </div>

            {/* Platform Operations */}
            <div className="flex items-start gap-4 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
              <div className="text-4xl">🖥️</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-forest">Platform Operations</h3>
                  <span className="text-2xl font-bold text-purple-600">~9%</span>
                </div>
                <p className="text-gray-700">
                  Hosting, email services, database, and technical maintenance to keep the platform running.
                </p>
              </div>
            </div>
          </div>

          {/* Example Breakdown */}
          <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
            <h3 className="text-xl font-bold text-forest mb-4">📊 Example: $1 Tree Gift</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-700">You Pay: <span className="text-green-600 text-lg">$1.00</span></p>
              </div>
              <div className="bg-white p-4 rounded-lg space-y-2">
                <p className="text-gray-700">• To BeVisioneers Fellowship: <span className="font-semibold">$0.30</span></p>
                <p className="text-gray-700">• Stripe Fee: <span className="font-semibold">$0.21</span></p>
                <p className="text-gray-700">• To Tree Planting: <span className="font-semibold text-green-600">$0.40</span></p>
                <p className="text-gray-700">• Platform Costs: <span className="font-semibold">$0.09</span></p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 italic">
              * Your $1 gift funds approximately 0.4 trees and supports the BeVisioneers Fellowship through our partnerships
            </p>
          </div>
        </div>

        {/* Our Partners */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-forest mb-6">🤝 Our Partner Organizations</h2>
          
          <div className="text-center py-12">
            <div className="text-7xl mb-6">🌱</div>
            <h3 className="text-2xl font-bold text-forest mb-4">Partners Coming Soon</h3>
            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
              We're currently onboarding verified environmental organizations to join our platform. 
              Partner organizations will receive 50% of all gift revenue to fund their climate projects.
            </p>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 max-w-xl mx-auto mb-6">
              <h4 className="text-xl font-bold text-forest mb-3">Are you an environmental organization?</h4>
              <p className="text-gray-700 mb-4">
                Join our platform and receive direct funding from climate-conscious gift givers worldwide.
              </p>
              <Link 
                to="/partner-application"
                className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
              >
                🤝 Register Your Organization
              </Link>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl max-w-2xl mx-auto">
              <p className="text-gray-600 text-sm">
                <strong className="text-forest">Current Status:</strong> We're in active discussions with leading climate organizations. 
                In the meantime, we're making monthly bulk donations to established nonprofits on behalf of all gifts sent. 
                Once partnerships are formalized, you'll receive direct impact certificates from our partners.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Tracking */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-forest mb-6">📊 Impact Tracking</h2>
          
          <p className="text-gray-700 mb-6 text-lg">
            We track every gift sent and fulfill our climate commitments monthly through bulk donations to partner organizations.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
              <h3 className="text-xl font-bold text-forest mb-2">Monthly Reports</h3>
              <p className="text-gray-700">
                We publish monthly impact reports showing total gifts, funds raised, and donations made to partners.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
              <h3 className="text-xl font-bold text-forest mb-2">Public Ledger</h3>
              <p className="text-gray-700">
                Coming soon: Real-time public dashboard showing all impact owed and fulfilled.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
              <h3 className="text-xl font-bold text-forest mb-2">Donation Receipts</h3>
              <p className="text-gray-700">
                We share receipts from all partner donations publicly to maintain trust and transparency.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
              <h3 className="text-xl font-bold text-forest mb-2">Impact Verification</h3>
              <p className="text-gray-700">
                Working toward B Corp and Climate Neutral certifications for third-party verification.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-forest mb-6">❓ Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-forest mb-2">How does the BeVisioneers Fellowship funding work?</h3>
              <p className="text-gray-700">
                30% of each gift goes directly to funding the BeVisioneers Fellowship program.
                This supports changemakers in climate and social innovation, creating a multiplier effect
                for positive environmental and social impact.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-forest mb-2">Why are Stripe fees so high?</h3>
              <p className="text-gray-700">
                Stripe charges 2.9% + $0.30 per transaction. For a $1 gift, the $0.30 flat fee is 30% of the total.
                As we grow and average order values increase, this percentage will decrease significantly.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-forest mb-2">How do I know the impact is real?</h3>
              <p className="text-gray-700">
                We provide monthly impact reports with donation receipts from partner organizations.
                You can also check our partners' websites to see their verified impact and certifications.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-lg font-bold text-forest mb-2">Can I get a tax deduction?</h3>
              <p className="text-gray-700">
                Currently, no. Gifted Air is a for-profit platform that funds both environmental impact and the BeVisioneers Fellowship.
                We're exploring nonprofit status for the future, which would enable tax-deductible giving.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-forest mb-2">How can I verify your claims?</h3>
              <p className="text-gray-700">
                We publish monthly reports with donation receipts for both environmental partners and BeVisioneers Fellowship funding.
                You can also email us at hello@giftedair.com for detailed breakdowns or specific impact questions.
                Full transparency is our commitment to you.
              </p>
            </div>
          </div>
        </div>

        {/* Our Commitment */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Our Commitment to You 💚</h2>
          <p className="text-lg mb-6 opacity-90">
            We promise complete transparency, real impact, and honest communication. 
            Every gift sent creates measurable environmental change through verified partners.
          </p>
          <p className="text-xl font-bold mb-6">
            Together, we're turning emotional connections into climate action.
          </p>
          <Link to="/compose" 
                className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-bold 
                         hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg">
            Send Your First Gift 🌍
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link to="/" className="text-forest hover:underline font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
