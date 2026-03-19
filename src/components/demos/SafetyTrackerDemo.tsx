import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  MapPin, 
  Phone, 
  Bell, 
  Navigation, 
  User, 
  Settings, 
  AlertTriangle, 
  CheckCircle2, 
  History,
  Heart,
  Plus,
  ChevronRight,
  Zap
} from 'lucide-react';

const CONTACTS = [
  { id: 1, name: 'Sarah (Sister)', phone: '+254 700 123 456', status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 2, name: 'John (Dad)', phone: '+254 711 987 654', status: 'Active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: 3, name: 'Emergency Services', phone: '911', status: 'Ready', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emergency' },
];

const ALERTS = [
  { id: 1, type: 'Check-in', time: '2h ago', location: 'Westlands, Nairobi', status: 'Safe' },
  { id: 2, type: 'SOS Triggered', time: 'Yesterday', location: 'CBD, Nairobi', status: 'Resolved' },
  { id: 3, type: 'Check-in', time: 'Mar 15', location: 'Home', status: 'Safe' },
];

export default function SafetyTrackerDemo() {
  const [isAlerting, setIsAlerting] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isTracking, setIsTracking] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAlerting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsAlerting(false);
      alert("SOS Alert Sent to all emergency contacts!");
      setCountdown(5);
    }
    return () => clearInterval(timer);
  }, [isAlerting, countdown]);

  const handleSOS = () => {
    setIsAlerting(true);
  };

  const cancelSOS = () => {
    setIsAlerting(false);
    setCountdown(5);
  };

  return (
    <div className="bg-[#050505] text-white rounded-3xl overflow-hidden border border-white/10 h-[600px] flex flex-col font-sans relative">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
            <Shield size={20} fill="currentColor" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none tracking-tight">SafeGuard</h3>
            <span className="text-[10px] text-red-500 uppercase tracking-widest font-bold flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
              Live Protection
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
            <Bell size={20} className="text-white/60" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050505]" />
          </button>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=George" alt="Avatar" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        {activeTab === 'home' && (
          <div className="p-6 space-y-8">
            {/* Map Placeholder */}
            <div className="relative h-48 rounded-3xl overflow-hidden border border-white/10 bg-[#111] group">
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {/* Simulated Pulse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 w-12 h-12 bg-red-500/20 rounded-full animate-ping" />
                  <div className="relative w-12 h-12 bg-red-500/40 rounded-full flex items-center justify-center border border-red-500/50">
                    <MapPin size={24} className="text-red-500" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  Nairobi, Kenya
                </div>
                <button 
                  onClick={() => setIsTracking(!isTracking)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${isTracking ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/60'}`}
                >
                  {isTracking ? 'Tracking Active' : 'Start Tracking'}
                </button>
              </div>
            </div>

            {/* SOS Button */}
            <div className="flex flex-col items-center justify-center py-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSOS}
                className="relative w-32 h-32 rounded-full bg-red-600 flex flex-col items-center justify-center shadow-2xl shadow-red-600/40 border-4 border-red-500/50 group"
              >
                <div className="absolute inset-0 rounded-full bg-red-500 animate-pulse opacity-20 group-hover:opacity-40" />
                <Zap size={32} className="text-white mb-1" fill="currentColor" />
                <span className="text-xs font-black uppercase tracking-widest">SOS</span>
              </motion.button>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-6 font-bold">Hold for 3 seconds to trigger</p>
            </div>

            {/* Emergency Contacts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg">Trusted Contacts</h4>
                <button className="text-red-500 text-sm font-bold hover:underline flex items-center gap-1">
                  <Plus size={14} /> Add New
                </button>
              </div>
              <div className="space-y-3">
                {CONTACTS.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 overflow-hidden">
                        <img src={contact.avatar} alt={contact.name} />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{contact.name}</div>
                        <div className="text-[10px] text-white/40">{contact.phone}</div>
                      </div>
                    </div>
                    <button className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white transition-colors">
                      <Phone size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-6 space-y-6">
            <h4 className="font-bold text-lg mb-4">Alert History</h4>
            <div className="space-y-4">
              {ALERTS.map((alert) => (
                <div key={alert.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${alert.type === 'SOS Triggered' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                    {alert.type === 'SOS Triggered' ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{alert.type}</span>
                      <span className="text-[10px] text-white/40">{alert.time}</span>
                    </div>
                    <div className="text-[10px] text-white/60 flex items-center gap-1">
                      <MapPin size={10} /> {alert.location}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-white/20" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="p-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-around z-20">
        {[
          { id: 'home', icon: <Shield size={20} />, label: 'Protect' },
          { id: 'map', icon: <Navigation size={20} />, label: 'Map' },
          { id: 'history', icon: <History size={20} />, label: 'History' },
          { id: 'profile', icon: <User size={20} />, label: 'Profile' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === item.id ? 'text-red-500' : 'text-white/40 hover:text-white'}`}
          >
            {item.icon}
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>

      {/* SOS Countdown Overlay */}
      <AnimatePresence>
        {isAlerting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-red-600 flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-48 h-48 rounded-full border-8 border-white/20 flex items-center justify-center mb-12"
            >
              <span className="text-8xl font-black">{countdown}</span>
            </motion.div>
            
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Sending SOS Alert</h3>
            <p className="text-white/80 text-lg mb-12">Emergency services and trusted contacts will be notified with your live location.</p>
            
            <button 
              onClick={cancelSOS}
              className="w-full py-6 bg-white text-red-600 font-black uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-red-50 transition-colors"
            >
              Cancel Alert
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
