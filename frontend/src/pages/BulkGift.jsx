import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Users, ArrowRight, FileText, Check, Building2, BarChart3 } from 'lucide-react';
import Navigation from '../components/Navigation';

const projects = [
  { id: 'uplift-her', name: 'Uplift Her Kenya', icon: '🌱', price: 10 },
  { id: 'kaiti-greening', name: 'Kaiti Greening', icon: '🌳', price: 2 },
  { id: 'solar-fellows', name: 'Solar Fellows', icon: '☀️', price: 5 }
];

export default function BulkGift() {
  const [view, setView] = useState('landing'); // landing, dashboard, compose
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [recipients, setRecipients] = useState([]);
  const [senderName, setSenderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const discount = quantity >= 100 ? 0.25 : quantity >= 50 ? 0.20 : quantity >= 25 ? 0.15 : 0;
  const basePrice = selectedProject ? selectedProject.price * quantity : 0;
  const totalCost = basePrice * (1 - discount);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Mock parsing
    setRecipients(Array(quantity).fill({ name: 'Employee', email: 'employee@company.com' }));
  };

  const handleDownloadReport = () => {
    alert('Generating ESG Impact Report... Your ESG compliance document will be ready in a moment.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-off-white pb-32 overflow-x-hidden">
      <Navigation />
      
      <div className="container mx-auto px-4 max-w-6xl pt-32">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-bronze/20 border border-bronze/30 rounded-full text-bronze text-xs font-black uppercase tracking-[0.2em] mb-8">
                <Building2 className="w-4 h-4" /> For Visionary Organizations
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-[0.9]">
                Climate Gifting <br/><span className="text-teal-400">at Scale.</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                Transform your corporate ESG commitments into a ritual of appreciation. Send 100+ climate gifts to employees or partners in one click via M-Pesa B2C or Bulk Paybill.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => setView('compose')}
                  className="px-10 py-5 bg-off-white text-slate-950 rounded-2xl text-lg font-black hover:bg-bronze hover:text-off-white transition-all flex items-center gap-3"
                >
                  Start Bulk Order <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setView('dashboard')}
                  className="px-10 py-5 bg-slate-900 border border-white/10 rounded-2xl text-lg font-black hover:bg-slate-800 transition-all flex items-center gap-3"
                >
                  View Corporate Dashboard <BarChart3 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <div className="flex justify-between items-end">
                <div>
                  <button onClick={() => setView('landing')} className="text-slate-500 text-xs font-black uppercase tracking-widest mb-4 hover:text-off-white transition-colors">← Back to Overview</button>
                  <h2 className="text-4xl font-black text-bronze">Corporate Dashboard</h2>
                </div>
                <button 
                  onClick={handleDownloadReport}
                  className="px-6 py-3 bg-teal-deep/30 border border-teal-deep/50 text-teal-400 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:bg-teal-deep/50 transition-all"
                >
                  <Download className="w-4 h-4" /> Download ESG Report
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <StatCard title="Total Impact Units" value="1,240" icon={<Users className="w-6 h-6" />} />
                <StatCard title="Carbon Mitigated" value="42.5 Tons" icon={<FileText className="w-6 h-6" />} />
                <StatCard title="Communities Assisted" value="12" icon={<Building2 className="w-6 h-6" />} />
              </div>

              <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10">
                <h3 className="text-xl font-black mb-8">Recent Bulk Rituals</h3>
                <div className="space-y-6">
                  <RecentOrder company="Global Tech Inc" date="Oct 12, 2023" amount="500 Gifts" status="Verified" />
                  <RecentOrder company="Eco Logistics" date="Sep 28, 2023" amount="250 Gifts" status="Verified" />
                  <RecentOrder company="Future Finance" date="Sep 15, 2023" amount="1,000 Gifts" status="Verified" />
                </div>
              </div>
            </motion.div>
          )}

          {view === 'compose' && (
            <motion.div 
              key="compose"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                <button onClick={() => setView('landing')} className="text-slate-500 text-xs font-black uppercase tracking-widest mb-4 hover:text-off-white transition-colors">← Cancel Ritual</button>
                <h2 className="text-4xl font-black">Bulk Gifting Engine</h2>
                <div className="flex justify-center gap-4 mt-8">
                  {[1, 2, 3].map(step => (
                    <div key={step} className={`h-1 w-12 rounded-full ${currentStep >= step ? 'bg-teal-400' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-12 shadow-2xl">
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-black mb-8">1. Select Climate Project</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {projects.map(p => (
                        <button 
                          key={p.id}
                          onClick={() => setSelectedProjectId(p.id)}
                          className={`p-8 rounded-[2rem] border-2 transition-all text-left ${selectedProjectId === p.id ? 'border-bronze bg-bronze/10' : 'border-white/5 bg-slate-950 hover:border-white/20'}`}
                        >
                          <div className="text-4xl mb-4">{p.icon}</div>
                          <div className="font-black text-lg">{p.name}</div>
                          <div className="text-teal-400 font-bold">${p.price}/unit</div>
                        </button>
                      ))}
                    </div>
                    <div className="pt-8">
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Volume (Minimum 25)</label>
                      <input 
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(25, parseInt(e.target.value) || 25))}
                        className="w-full bg-slate-950 border border-white/5 rounded-2xl p-6 text-3xl font-black text-center focus:border-bronze outline-none transition-all"
                      />
                    </div>
                    <button 
                      onClick={() => setCurrentStep(2)}
                      disabled={!selectedProjectId}
                      className="w-full py-5 bg-off-white text-slate-950 rounded-2xl font-black text-lg hover:bg-bronze hover:text-off-white transition-all disabled:opacity-50"
                    >
                      Continue to Recipients
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-black mb-8">2. Upload Your Circle</h3>
                    <div className="p-12 border-2 border-dashed border-white/10 rounded-[2rem] text-center bg-slate-950/50">
                      <Upload className="w-12 h-12 mx-auto mb-6 text-slate-500" />
                      <p className="text-slate-400 mb-8 leading-relaxed">Upload a CSV with columns: <strong>Name, Email</strong><br/>We support up to 1,000 recipients per ritual.</p>
                      <input 
                        type="file" 
                        id="csv-upload" 
                        hidden 
                        onChange={handleCSVUpload}
                        accept=".csv"
                      />
                      <label 
                        htmlFor="csv-upload"
                        className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all cursor-pointer"
                      >
                        {recipients.length > 0 ? `Re-upload (${recipients.length} Loaded)` : 'Choose CSV File'}
                      </label>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setCurrentStep(1)} className="flex-1 py-5 bg-slate-950 border border-white/10 rounded-2xl font-black text-slate-400 hover:text-off-white transition-all">Back</button>
                      <button 
                        onClick={() => setCurrentStep(3)}
                        disabled={recipients.length === 0}
                        className="flex-[2] py-5 bg-off-white text-slate-950 rounded-2xl font-black text-lg hover:bg-bronze hover:text-off-white transition-all disabled:opacity-50"
                      >
                        Review Order
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-black mb-8">3. Confirm the Impact</h3>
                    <div className="space-y-4 bg-slate-950 p-8 rounded-[2rem] border border-white/5">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Project</span>
                        <span className="font-black text-lg">{selectedProject?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Quantity</span>
                        <span className="font-black text-lg">{quantity} Gifts</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Volume Discount</span>
                        <span className="font-black text-lg text-teal-400">-{discount * 100}%</span>
                      </div>
                      <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Total Contribution</span>
                        <span className="text-4xl font-black text-bronze">${totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-teal-deep/20 border border-teal-deep/30 rounded-2xl">
                      <p className="text-sm text-teal-400 leading-relaxed font-medium">
                        Corporate orders are fulfilled via <strong>M-Pesa B2C</strong> for disbursements or <strong>Bulk Paybill</strong> for direct collection. Our team will contact you within 2 hours to coordinate the transfer.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setCurrentStep(2)} className="flex-1 py-5 bg-slate-950 border border-white/10 rounded-2xl font-black text-slate-400 hover:text-off-white transition-all">Back</button>
                      <button 
                        onClick={() => setIsProcessing(true)}
                        disabled={isProcessing}
                        className="flex-[2] py-5 bg-off-white text-slate-950 rounded-2xl font-black text-lg hover:bg-bronze hover:text-off-white transition-all shadow-2xl shadow-bronze/20"
                      >
                        {isProcessing ? 'Initiating Ritual...' : 'Place Bulk Order'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="p-8 bg-slate-900 border border-white/5 rounded-[2.5rem]">
      <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-teal-400 mb-6 border border-white/5 shadow-xl">
        {icon}
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{title}</div>
      <div className="text-3xl font-black">{value}</div>
    </div>
  );
}

function RecentOrder({ company, date, amount, status }) {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-950 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-bronze/20 rounded-xl flex items-center justify-center text-bronze font-black">
          {company.charAt(0)}
        </div>
        <div>
          <div className="font-black">{company}</div>
          <div className="text-xs text-slate-500 font-medium">{date}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-black text-teal-400">{amount}</div>
        <div className="flex items-center gap-1 justify-end text-[10px] font-black uppercase tracking-widest text-slate-500">
          <Check className="w-3 h-3 text-teal-500" /> {status}
        </div>
      </div>
    </div>
  );
}

