import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import SEO from '../components/SEO';

export default function PartnerApplication() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    organizationType: '',
    location: '',
    focusArea: '',
    description: '',
    currentFunding: '',
    teamSize: '',
    registrationNumber: '',
    yearsOfOperation: '',
    socialMediaLinks: '',
    whyPartner: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/partner-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/venture');
      }, 3000);
    } catch (err) {
      setError('Failed to submit application. Please try again or email us directly at contact@giftedair.com');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <SEO 
          title="Application Submitted - Gifted Air Partner Program"
          description="Your partner application has been submitted successfully"
        />
        <Navigation />
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
          <div className="max-w-2xl text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Application Submitted!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Thank you for your interest in partnering with Gifted Air. We'll review your application and get back to you within 5-7 business days.
            </p>
            <button
              onClick={() => navigate('/venture')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Back to Venture Page
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Partner Application - Gifted Air"
        description="Apply to become a verified partner organization and receive 50% of gift revenue for environmental impact in Kenya"
        path="/partner-application"
      />
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Partner Application Form
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join our network of verified environmental organizations in Kenya and receive 50% of all gift revenue directed to your cause.
            </p>
          </div>

          {/* Partnership Benefits */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Partnership Benefits</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">50% Revenue Share</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Direct funding for your environmental work</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Zero Marketing Cost</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">We handle all tech, marketing & payments</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Transparent Tracking</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Real-time dashboard of donations & impact</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Increased Visibility</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Featured on our platform & gift pages</p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            {error && (
              <div className="mb-6 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Organization Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  name="organizationName"
                  required
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Green Belt Movement"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  required
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="contact@organization.org"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="+254 700 000000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://www.organization.org"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Organization Type *
                </label>
                <select
                  name="organizationType"
                  required
                  value={formData.organizationType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Type</option>
                  <option value="NGO">NGO</option>
                  <option value="CBO">Community-Based Organization</option>
                  <option value="Social Enterprise">Social Enterprise</option>
                  <option value="Registered Charity">Registered Charity</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Location (County/Region) *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Nairobi, Kenya"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Primary Focus Area *
                </label>
                <select
                  name="focusArea"
                  required
                  value={formData.focusArea}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Focus Area</option>
                  <option value="Reforestation">Reforestation & Tree Planting</option>
                  <option value="Wildlife Conservation">Wildlife Conservation</option>
                  <option value="Clean Energy">Clean Energy & Cookstoves</option>
                  <option value="Water">Clean Water & Sanitation</option>
                  <option value="Agriculture">Sustainable Agriculture</option>
                  <option value="Ocean">Ocean & Marine Conservation</option>
                  <option value="Climate Education">Climate Education</option>
                  <option value="Other">Other Environmental Work</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="NGO/2000/123456"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Years of Operation
                </label>
                <input
                  type="number"
                  name="yearsOfOperation"
                  value={formData.yearsOfOperation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="5"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Team Size
                </label>
                <input
                  type="text"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="10-50 people"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Annual Budget Range
                </label>
                <select
                  name="currentFunding"
                  value={formData.currentFunding}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Range</option>
                  <option value="<100k">Under KES 100,000</option>
                  <option value="100k-500k">KES 100,000 - 500,000</option>
                  <option value="500k-1M">KES 500,000 - 1M</option>
                  <option value="1M-5M">KES 1M - 5M</option>
                  <option value="5M+">Over KES 5M</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Organization Description *
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Tell us about your organization's mission, current projects, and environmental impact..."
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Social Media Links
              </label>
              <input
                type="text"
                name="socialMediaLinks"
                value={formData.socialMediaLinks}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Twitter, Facebook, Instagram links (comma separated)"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Why do you want to partner with Gifted Air? *
              </label>
              <textarea
                name="whyPartner"
                required
                value={formData.whyPartner}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Share your vision for this partnership and how it aligns with your organization's goals..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/venture')}
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Questions? Email us at <a href="mailto:contact@giftedair.com" className="text-blue-600 hover:underline">contact@giftedair.com</a>
          </p>
        </div>
      </div>
    </>
  );
}
