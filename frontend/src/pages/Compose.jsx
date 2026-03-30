import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, TreeDeciduous, Info, Check, ArrowRight, Minus, Plus } from 'lucide-react';
import { API_URL } from '../config';
import Navigation from '../components/Navigation';

const projects = [
  {
    id: 'uplift-her',
    title: 'Uplift Her Kenya',
    founder: 'Faith Wambiya',
    impact: '10 Mangroves protected',
    description: 'Empowering women in rural Kenya through agrivoltaics and sustainable climate farming. Your gift funds infrastructure and training for local women farmers.',
    fullStory: 'Founded by beVisioneers fellow Faith Wambiya, Uplift Her Kenya is transforming how rural communities interact with their land. By combining solar energy (agrivoltaics) with sustainable crop cultivation, they are creating a blueprint for resilience.',
    unit: 'Project Support Unit',
    unitPrice: 10,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    location: 'Coastal Kenya',
    coordinates: { lat: -3.9845, lng: 39.6766 },
    category: 'Women & Energy',
    website: 'https://www.upliftherkenya.org/'
  },
  {
    id: 'kaiti-greening',
    title: 'Kaiti Greening Champions',
    founder: 'Community Led',
    impact: 'Tree Restoration',
    description: 'A grassroots movement with a 5M tree restoration goal. Your gift directly funds the planting and maintenance of indigenous trees in the Makueni landscape.',
    fullStory: 'The Kaiti Greening Champions are restoration experts. They don\'t just plant trees; they nurture them. Their mission is to reclaim the drylands of Makueni through community-led reforestation efforts that ensure survival rates above 90%.',
    unit: 'Indigenous Trees',
    unitPrice: 2,
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
    location: 'Makueni, Kenya',
    coordinates: { lat: -1.7833, lng: 37.6167 },
    category: 'Reforestation',
    website: 'https://kaitigreening.org/'
  }
];

const messageTemplates = [
  { id: 'ritual', name: 'Ritual', text: 'I gift this climate action to you, for our planet. May it grow as our connection grows.' },
  { id: 'apology', name: 'Apology', text: 'Let this new growth be a symbol of healing. I am sorry, and I am committed to doing better for you and for the Earth.' },
  { id: 'legacy', name: 'Legacy', text: 'In honor of your strength, I am supporting this restoration project. Your impact continues to ripple through the world.' }
];

export default function Compose() {
  const navigate = useNavigate();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [location, setLocation] = useState('');
  const [showInGallery, setShowInGallery] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStep, setPaymentStep] = useState('input'); // input, processing, success
  const [createdGiftId, setCreatedGiftId] = useState(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const totalCost = selectedProject ? selectedProject.unitPrice * quantity : 0;

  const initiatePayment = async () => {
    if (!selectedProjectId || !recipientName || !senderName || !message) {
      alert('Please fill in all required fields');
      return;
    }
    setShowMpesaModal(true);
  };

  const handleMpesaPush = async () => {
    if (!phoneNumber.match(/^(?:254|\+254|0)?(7(?:[0-9][0-9])|1(?:[0-9][0-9]))[0-9]{6}$/)) {
      alert('Please enter a valid M-Pesa number');
      return;
    }

    setPaymentStep('processing');
    
    // In a real app, we first create the gift as 'pending'
    const giftData = {
      type: selectedProjectId,
      quantity,
      message,
      recipientName,
      recipientEmail: recipientEmail || '',
      senderName,
      totalCost,
      location: location || '',
      coordinates: selectedProject.coordinates,
      impactImage: selectedProject.image,
      showInGallery,
      status: 'pending'
    };

    try {
      const giftRes = await fetch(`${API_URL}/api/gifts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(giftData)
      });
      const giftResult = await giftRes.json();
      
      if (giftResult.success) {
        setCreatedGiftId(giftResult.gift._id);
        
        // Initiate STK Push
        const mpesaRes = await fetch(`${API_URL}/api/mpesa/stkpush`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumber: phoneNumber.replace('+', '').replace(/^0/, '254'),
            amount: totalCost,
            giftId: giftResult.gift._id
          })
        });

        // SIMULATION: For this demo/ritual experience, we'll simulate success after 5 seconds
        setTimeout(() => {
          setPaymentStep('success');
        }, 5000);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment initiation failed. Please try again.');
      setPaymentStep('input');
    }
  };

  const handleCreateGift = async () => {
    initiatePayment();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-off-white pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 max-w-6xl pt-24">
        {/* Cinematic Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Compose Your Ritual</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Select a project that resonates with your heart. Every unit gifted is a step toward planetary healing.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Marketplace Column */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-bronze mb-8">Project Marketplace</h2>
            
            {projects.map((project) => (
              <ProjectCard 
                key={project.id}
                project={project}
                isSelected={selectedProjectId === project.id}
                onClick={() => setSelectedProjectId(project.id)}
              />
            ))}
          </div>

          {/* Form Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                {selectedProject ? (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-bronze/20 flex items-center justify-center text-2xl">
                        ✨
                      </div>
                      <div>
                        <h3 className="font-black text-xl">The Ritual Details</h3>
                        <p className="text-xs text-slate-500 uppercase font-black tracking-widest">For {selectedProject.title}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Quantity Ritual */}
                      <div className="p-6 bg-slate-950 rounded-2xl border border-white/5">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 text-center">Ritual Intensity (Units)</label>
                        <div className="flex items-center justify-between">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-4xl font-black">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Names */}
                      <div className="grid gap-4">
                        <input 
                          type="text" 
                          placeholder="Sender Name"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 focus:border-bronze outline-none transition-all"
                        />
                        <input 
                          type="text" 
                          placeholder="Recipient Name"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 focus:border-bronze outline-none transition-all"
                        />
                        <input 
                          type="email" 
                          placeholder="Recipient Email (Optional)"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 focus:border-bronze outline-none transition-all"
                        />
                      </div>

                      {/* Poetic Message */}
                      <div className="space-y-4">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Your Connection Message</label>
                        <div className="flex gap-2">
                          {messageTemplates.map(t => (
                            <button 
                              key={t.id}
                              onClick={() => setMessage(t.text)}
                              className="px-3 py-1 bg-slate-950 border border-white/5 rounded-full text-[10px] font-black hover:border-bronze transition-all"
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                        <textarea 
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Write something heartfelt..."
                          className="w-full bg-slate-950 border border-white/5 rounded-xl p-4 focus:border-bronze outline-none transition-all resize-none italic font-serif"
                        />
                      </div>

                      {/* Final Action */}
                      <div className="pt-6 border-t border-white/5">
                        <div className="flex justify-between items-end mb-6">
                          <span className="text-slate-500 font-bold">Planetary Contribution</span>
                          <span className="text-3xl font-black text-teal-400">${totalCost}</span>
                        </div>
                        
                        <button 
                          onClick={handleCreateGift}
                          disabled={loading}
                          className="w-full py-5 bg-off-white text-slate-950 rounded-2xl font-black text-lg hover:bg-bronze hover:text-off-white transition-all shadow-2xl flex items-center justify-center gap-2 group"
                        >
                          {loading ? 'Initiating...' : (
                            <>Confirm the Ritual <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                          )}
                        </button>
                        <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] font-black">M-Pesa Prioritized for Local Micro-Gifting</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-[400px] bg-slate-900/50 border border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center text-3xl mb-6">🌱</div>
                    <h3 className="font-black text-xl mb-2">Select a Project</h3>
                    <p className="text-slate-500 text-sm">Choose where your climate gift will go to start the ritual.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* M-Pesa Ritual Modal */}
      <AnimatePresence>
        {showMpesaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => paymentStep !== 'processing' && setShowMpesaModal(false)}
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-white/5 rounded-[3rem] p-10 shadow-2xl overflow-hidden"
            >
              {paymentStep === 'input' && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-teal-deep rounded-3xl mx-auto flex items-center justify-center text-4xl mb-6">📱</div>
                  <h3 className="text-3xl font-black mb-4">M-Pesa Checkout</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">Enter your M-Pesa number to receive the payment prompt on your phone.</p>
                  
                  <div className="space-y-4">
                    <input 
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g., 0712345678"
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl p-5 text-center text-2xl font-black outline-none focus:border-bronze transition-all"
                    />
                    <button 
                      onClick={handleMpesaPush}
                      className="w-full py-5 bg-teal-deep text-white rounded-2xl font-black text-lg hover:bg-teal-600 transition-all flex items-center justify-center gap-2"
                    >
                      Receive Prompt <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="mt-8 text-[10px] text-slate-500 uppercase tracking-widest font-black">Secured by Daraja STK Push</p>
                </div>
              )}

              {paymentStep === 'processing' && (
                <div className="text-center py-10">
                  <div className="relative w-32 h-32 mx-auto mb-8">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-t-bronze border-r-transparent border-b-teal-400 border-l-transparent rounded-full"
                    />
                    <div className="absolute inset-4 bg-slate-950 rounded-full flex items-center justify-center text-4xl">⏳</div>
                  </div>
                  <h3 className="text-3xl font-black mb-4">Awaiting PIN</h3>
                  <p className="text-slate-400 leading-relaxed animate-pulse">Please check your phone for the M-Pesa prompt and enter your secret PIN to complete the ritual.</p>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="text-center py-6">
                  {/* The Magic Reveal Moment */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-8"
                  >
                    <div className="relative w-48 h-48 mx-auto mb-8">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 bg-teal-400/20 rounded-full blur-3xl"
                      />
                      <motion.div 
                        initial={{ scale: 0.5, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ duration: 2, type: "spring" }}
                        className="text-9xl relative z-10"
                      >
                        {selectedProject.id === 'uplift-her' ? '🌱' : '🌳'}
                      </motion.div>
                    </div>
                    <h3 className="text-4xl font-black mb-2">Ritual Complete!</h3>
                    <p className="text-teal-400 font-black uppercase tracking-widest mb-6">Climate Gift Revealed</p>
                    <p className="text-slate-400 leading-relaxed italic font-serif mb-8">"For {recipientName}, a new seed of hope has been planted."</p>
                    
                    <button 
                      onClick={() => navigate(`/gift/${createdGiftId}`)}
                      className="w-full py-5 bg-bronze text-white rounded-2xl font-black text-lg hover:bg-amber-600 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-bronze/30"
                    >
                      View Your Gift <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, isSelected, onClick }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`group cursor-pointer rounded-[2rem] overflow-hidden border-2 transition-all duration-500 flex flex-col md:flex-row h-full md:h-72 ${
        isSelected ? 'border-bronze bg-slate-900 shadow-2xl shadow-bronze/10' : 'border-white/5 bg-slate-900/50 hover:border-white/20'
      }`}
    >
      <div className="md:w-1/3 relative h-64 md:h-full">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-full border border-white/10">
          <MapPin className="w-3 h-3 text-teal-400" />
          <span className="text-[10px] font-black uppercase tracking-widest">{project.location}</span>
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-1">{project.category}</div>
              <h3 className="text-2xl font-black">{project.title}</h3>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              isSelected ? 'bg-bronze border-bronze text-white' : 'border-white/10'
            }`}>
              {isSelected && <Check className="w-4 h-4" />}
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-black uppercase tracking-widest">{project.founder}</span>
          </div>
          <div className="flex items-center gap-2">
            <TreeDeciduous className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-black uppercase tracking-widest text-teal-400">{project.impact}</span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <span className="text-xs text-slate-500">starts at</span>
            <span className="text-xl font-black">${project.unitPrice}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
