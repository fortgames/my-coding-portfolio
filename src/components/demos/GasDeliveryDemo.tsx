import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Truck, 
  MapPin, 
  History, 
  User, 
  Plus, 
  Minus, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  CreditCard,
  Search,
  Navigation,
  ArrowRight
} from 'lucide-react';

const GAS_SIZES = [
  { id: '6kg', size: '6kg', price: 1200, color: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?q=80&w=2070&auto=format&fit=crop' },
  { id: '13kg', size: '13kg', price: 2800, color: 'bg-red-500', image: 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?q=80&w=2070&auto=format&fit=crop' },
  { id: '22kg', size: '22kg', price: 4500, color: 'bg-emerald-500', image: 'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?q=80&w=2070&auto=format&fit=crop' },
];

const ORDERS = [
  { id: '#G-1234', date: 'Today, 10:30 AM', status: 'Delivering', size: '13kg', total: 2800 },
  { id: '#G-1230', date: 'Mar 15, 2:15 PM', status: 'Completed', size: '6kg', total: 1200 },
];

export default function GasDeliveryDemo() {
  const [activeTab, setActiveTab] = useState('shop');
  const [selectedSize, setSelectedSize] = useState<typeof GAS_SIZES[0] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [orderStep, setOrderStep] = useState(0); // 0: Browse, 1: Details, 2: Tracking

  const handleOrder = () => {
    setOrderStep(2);
    setTimeout(() => {
      alert("Order placed successfully! Tracking your delivery...");
    }, 500);
  };

  return (
    <div className="bg-[#0A0A0B] text-white rounded-3xl overflow-hidden border border-white/10 h-[600px] flex flex-col font-sans relative">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
            <Flame size={20} fill="currentColor" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none tracking-tight">GasGo</h3>
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              Express Delivery
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
            <Truck size={20} className="text-white/60" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#0A0A0B]" />
          </button>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=George" alt="Avatar" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        {orderStep === 0 && activeTab === 'shop' && (
          <div className="p-6 space-y-8">
            {/* Promo Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-8 shadow-2xl shadow-orange-500/20">
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <Flame size={120} />
              </div>
              <div className="relative z-10">
                <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2 block">Special Offer</span>
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Free Delivery <br />on 13kg Refills</h2>
                <button className="px-6 py-2 bg-white text-black font-bold rounded-full text-xs uppercase tracking-widest hover:bg-white/90 transition-colors">
                  Claim Now
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-lg mb-4">Select Cylinder Size</h4>
              <div className="grid grid-cols-1 gap-4">
                {GAS_SIZES.map((gas) => (
                  <motion.div 
                    key={gas.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedSize(gas);
                      setOrderStep(1);
                    }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className={`w-16 h-16 rounded-xl ${gas.color}/20 flex items-center justify-center text-white overflow-hidden`}>
                      <img src={gas.image} alt={gas.size} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">{gas.size} Cylinder</div>
                      <div className="text-xs text-white/40">Refill & New Cylinder available</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-500">KES {gas.price}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Refill</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {orderStep === 1 && selectedSize && (
          <div className="p-6 space-y-8">
            <button onClick={() => setOrderStep(0)} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ChevronRight size={20} className="rotate-180" />
              <span className="text-sm font-bold uppercase tracking-widest">Back to Shop</span>
            </button>

            <div className="flex flex-col items-center text-center">
              <div className={`w-48 h-48 rounded-[40px] ${selectedSize.color}/10 flex items-center justify-center mb-8 border border-white/10`}>
                <Flame size={80} className="text-orange-500" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{selectedSize.size} Cylinder Refill</h3>
              <p className="text-white/60 text-sm max-w-xs mx-auto">Standard LPG refill service with free safety check and installation.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/10">
                <div className="text-sm font-bold uppercase tracking-widest text-white/40">Quantity</div>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-2xl font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <MapPin size={20} className="text-orange-500" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Delivery Address</div>
                    <div className="text-sm font-bold">Westlands, Nairobi - Apt 4B</div>
                  </div>
                  <button className="text-xs text-orange-500 font-bold">Edit</button>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <CreditCard size={20} className="text-orange-500" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Payment Method</div>
                    <div className="text-sm font-bold">M-Pesa Express</div>
                  </div>
                  <button className="text-xs text-orange-500 font-bold">Change</button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between mb-6 px-2">
                <span className="text-white/60 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                <span className="text-2xl font-bold text-orange-500">KES {selectedSize.price * quantity}</span>
              </div>
              <button 
                onClick={handleOrder}
                className="w-full py-5 bg-orange-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20"
              >
                Place Order Now
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {orderStep === 2 && (
          <div className="p-6 space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto mb-6 border border-emerald-500/20">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Order Confirmed!</h3>
              <p className="text-white/40 text-sm">Your gas is on the way to Westlands.</p>
            </div>

            {/* Tracking Map Simulation */}
            <div className="relative h-48 rounded-3xl overflow-hidden border border-white/10 bg-[#111]">
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div 
                  animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="relative"
                >
                  <Truck size={32} className="text-orange-500" fill="currentColor" />
                </motion.div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {[
                { label: 'Order Received', time: '10:30 AM', status: 'completed' },
                { label: 'Gas Dispatched', time: '10:35 AM', status: 'completed' },
                { label: 'On the Way', time: 'Estimated 10:50 AM', status: 'active' },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${step.status === 'completed' ? 'bg-emerald-500' : step.status === 'active' ? 'bg-orange-500 animate-pulse' : 'bg-white/10'}`} />
                    {i < 2 && <div className="w-0.5 h-12 bg-white/10" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{step.label}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                setOrderStep(0);
                setActiveTab('history');
              }}
              className="w-full py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors"
            >
              View Order History
            </button>
          </div>
        )}

        {activeTab === 'history' && orderStep === 0 && (
          <div className="p-6 space-y-6">
            <h4 className="font-bold text-lg mb-4">Your Orders</h4>
            <div className="space-y-4">
              {ORDERS.map((order) => (
                <div key={order.id} className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{order.id}</div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'Delivering' ? 'bg-orange-500/10 text-orange-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                      {order.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg">{order.size} Refill</div>
                      <div className="text-xs text-white/40">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">KES {order.total}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">M-Pesa</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="p-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-around z-20">
        {[
          { id: 'shop', icon: <Flame size={20} />, label: 'Shop' },
          { id: 'map', icon: <Search size={20} />, label: 'Find' },
          { id: 'history', icon: <History size={20} />, label: 'Orders' },
          { id: 'profile', icon: <User size={20} />, label: 'Account' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setOrderStep(0);
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === item.id ? 'text-orange-500' : 'text-white/40 hover:text-white'}`}
          >
            {item.icon}
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
