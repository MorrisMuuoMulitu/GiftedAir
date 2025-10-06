import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { API_URL } from '../config';

export default function Feedback() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    message: '',
    rating: 0
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'general', label: '💬 General Feedback', icon: '💬' },
    { value: 'feature_request', label: '✨ Feature Request', icon: '✨' },
    { value: 'bug_report', label: '🐛 Bug Report', icon: '🐛' },
    { value: 'business_idea', label: '💡 Business Idea', icon: '💡' },
    { value: 'partnership', label: '🤝 Partnership Inquiry', icon: '🤝' },
    { value: 'other', label: '📝 Other', icon: '📝' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Prepare data with default values for empty fields
    const submissionData = {
      name: formData.name.trim() || 'Anonymous',
      email: formData.email.trim() || 'not-provided@anonymous.user',
      category: formData.category || 'general',
      message: formData.message.trim() || 'No message provided',
      rating: formData.rating || null
    };

    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError(data.message || 'Failed to submit feedback');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error submitting feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (success) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="text-6xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold text-forest mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your feedback has been submitted successfully. We appreciate you taking the time to help us improve Gifted Air!
            </p>
            <div className="animate-spin text-4xl mb-4">🌿</div>
            <p className="text-sm text-gray-500">Redirecting you home...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">💭</div>
            <h1 className="text-5xl font-bold text-forest mb-4">Share Your Thoughts</h1>
            <p className="text-xl text-gray-600">
              We'd love to hear your feedback, ideas, or comments about Gifted Air!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              ✨ All fields are optional - you can submit anonymously!
            </p>
          </div>

          {/* Feedback Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Your Name <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Anonymous (if left blank)"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Your email (optional)"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Category <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.value })}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        formData.category === cat.value
                          ? 'border-green-500 bg-green-50 shadow-md'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{cat.icon}</div>
                      <div className="text-xs font-semibold text-gray-700">
                        {cat.label.replace(/^.*\s/, '')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Rate Your Experience (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setFormData({ ...formData, rating: star });
                        }}
                        className={`text-4xl transition-all duration-200 hover:scale-125 active:scale-95 cursor-pointer p-2 rounded-lg ${
                          formData.rating >= star 
                            ? 'text-green-500 hover:bg-green-50' 
                            : 'text-gray-300 hover:bg-gray-50'
                        }`}
                        aria-label={`Rate ${star} stars`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                  {formData.rating > 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFormData({ ...formData, rating: 0 });
                      }}
                      className="text-sm text-gray-500 hover:text-red-500 underline ml-2"
                    >
                      Clear
                    </button>
                  )}
                </div>
                {formData.rating > 0 && (
                  <p className="text-sm text-green-600 font-semibold mt-2">
                    ✓ You rated: {formData.rating} star{formData.rating > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Your Message <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors resize-none"
                  placeholder="Share your thoughts, ideas, or feedback..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>💭</span>
                    Give Feedback
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Back Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="text-forest hover:underline font-semibold"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
