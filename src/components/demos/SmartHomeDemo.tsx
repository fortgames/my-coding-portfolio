import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Lightbulb, 
  Thermometer, 
  Shield, 
  Settings, 
  Power, 
  ChevronRight, 
  Lock, 
  Unlock, 
  Wind, 
  Droplets,
  Video,
  Music,
  Tv,
  Mic,
  Volume2
} from 'lucide-react';

const DEVICES = [
  { id: 1, name: 'Living Room Lights', type: 'light', status: true, val: '80%', icon: <Lightbulb size={24} /> },
  { id: 2, name: 'Kitchen AC', type: 'climate', status: false, val: '22°C', icon: <Wind size={24} /> },
  { id: 3, name: 'Smart TV', type: 'media', status: true, val: 'Netflix', icon: <Tv size={24} /> },
  { id: 4, name: 'Main Door Lock', type: 'security', status: true, val: 'Locked', icon: <Lock size={24} /> },
];

export default function SmartHomeDemo() {
  const [activeTab, setActiveTab] = useState('home');
  const [temp, setTemp] = useState(24);
  const [isLocked, setIsLocked] = useState(true);
  const [devices, setDevices] = useState(DEVICES);

  const toggleDevice = (id: number) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, status: !d.status } : d));
  };

  return (
    <div className="bg-[#0A0A0B] text-white rounded-3xl overflow-hidden border border-white/10 h-[600px] flex flex-col font-sans relative">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
            <Home size={20} fill="currentColor" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none tracking-tight">Kejani IoT</h3>
            <span className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Normal
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Mic size={20} className="text-white/60" />
          </button>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=George" alt="Avatar" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        {activeTab === 'home' && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex flex-col justify-between aspect-square"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <Thermometer size={20} />
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">{temp}°C</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-500/60">Indoor Temp</div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setTemp(prev => prev - 1)} className="flex-1 py-1.5 bg-blue-500/20 rounded-lg text-blue-500 font-bold">-</button>
                  <button onClick={() => setTemp(prev => prev + 1)} className="flex-1 py-1.5 bg-blue-500/20 rounded-lg text-blue-500 font-bold">+</button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-between aspect-square"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <Droplets size={20} />
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">45%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">Humidity</div>
                </div>
                <div className="text-[10px] font-bold text-emerald-500/40 uppercase tracking-widest">Optimal Range</div>
              </motion.div>
            </div>

            {/* Security Status */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isLocked ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                  {isLocked ? <Shield size={24} /> : <Unlock size={24} />}
                </div>
                <div>
                  <div className="font-bold">Security System</div>
                  <div className="text-xs text-white/40">{isLocked ? 'Armed & Locked' : 'System Disarmed'}</div>
                </div>
              </div>
              <button 
                onClick={() => setIsLocked(!isLocked)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${isLocked ? 'bg-white/10 text-white/60 hover:bg-white/20' : 'bg-red-500 text-white'}`}
              >
                {isLocked ? 'Disarm' : 'Arm Now'}
              </button>
            </div>

            {/* Smart Devices */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg">Smart Devices</h4>
                <button className="text-blue-500 text-sm font-bold hover:underline">See All</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {devices.map((device, i) => (
                  <motion.div 
                    key={device.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer ${device.status ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/5 opacity-60'}`}
                    onClick={() => toggleDevice(device.id)}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className={`text-2xl ${device.status ? 'text-blue-500' : 'text-white/20'}`}>
                        {device.icon}
                      </div>
                      <div className={`w-10 h-6 rounded-full relative transition-colors ${device.status ? 'bg-blue-500' : 'bg-white/10'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${device.status ? 'right-1' : 'left-1'}`} />
                      </div>
                    </div>
                    <div className="font-bold text-sm mb-1">{device.name}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{device.val}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'security' && (
          <div className="space-y-8">
            <h4 className="font-bold text-lg">Security Cameras</h4>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'Front Porch', status: 'Live', img: 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?q=80&w=2070&auto=format&fit=crop' },
                { name: 'Backyard', status: 'Live', img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070&auto=format&fit=crop' },
              ].map((camera, i) => (
                <div key={i} className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group">
                  <img src={camera.img} alt={camera.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-[10px] font-bold uppercase tracking-widest text-red-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    {camera.status}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="font-bold text-sm">{camera.name}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Kejani Cam v2.4</div>
                  </div>
                  <button className="absolute bottom-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                    <Video size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="p-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-around z-20">
        {[
          { id: 'home', icon: <Home size={20} />, label: 'Home' },
          { id: 'security', icon: <Shield size={20} />, label: 'Security' },
          { id: 'media', icon: <Music size={20} />, label: 'Media' },
          { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === item.id ? 'text-blue-500' : 'text-white/40 hover:text-white'}`}
          >
            {item.icon}
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
