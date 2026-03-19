import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  History, 
  Settings, 
  Plus, 
  Search,
  ChevronRight,
  Bell,
  PieChart
} from 'lucide-react';

const TRANSACTIONS = [
  { id: 1, title: 'Apple Store', category: 'Technology', amount: -999.00, date: 'Today', icon: '💻' },
  { id: 2, title: 'Salary Deposit', category: 'Income', amount: 4500.00, date: 'Yesterday', icon: '💰' },
  { id: 3, title: 'Starbucks', category: 'Food & Drink', amount: -12.50, date: 'Yesterday', icon: '☕' },
  { id: 4, title: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, date: 'Mar 15', icon: '🎬' },
  { id: 5, title: 'Amazon Purchase', category: 'Shopping', amount: -124.50, date: 'Mar 14', icon: '📦' },
];

export default function BankingDemo() {
  const [balance, setBalance] = useState(12450.75);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTransfer, setShowTransfer] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
      setBalance(prev => prev - amount);
      setTransferAmount('');
      setRecipient('');
      setShowTransfer(false);
      alert(`Successfully transferred KSh ${amount} to ${recipient}`);
    }
  };

  return (
    <div className="bg-[#0A0A0B] text-white rounded-3xl overflow-hidden border border-white/10 h-[600px] flex flex-col font-sans">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <Wallet size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none">Pesa Mtaani</h3>
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Premium Account</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
            <Bell size={20} className="text-white/60" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-[#0A0A0B]" />
          </button>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=George" alt="Avatar" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {activeTab === 'dashboard' && (
          <>
            {/* Balance Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-[#7C3AED] p-8 shadow-2xl shadow-accent/20"
            >
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <PieChart size={120} />
              </div>
              <div className="relative z-10">
                <span className="text-white/60 text-sm font-medium mb-2 block">Total Balance</span>
                <h2 className="text-4xl font-bold mb-8 tracking-tight">
                  KSh {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setShowTransfer(true)}
                    className="flex-1 py-3 bg-white text-black font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
                  >
                    <Plus size={18} />
                    Transfer
                  </button>
                  <button className="flex-1 py-3 bg-white/20 backdrop-blur-md text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-white/30 transition-colors">
                    <History size={18} />
                    History
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: <ArrowUpRight />, label: 'Send', color: 'bg-blue-500/10 text-blue-500' },
                { icon: <ArrowDownLeft />, label: 'Receive', color: 'bg-emerald-500/10 text-emerald-500' },
                { icon: <CreditCard />, label: 'Cards', color: 'bg-purple-500/10 text-purple-500' },
                { icon: <PieChart />, label: 'Stats', color: 'bg-orange-500/10 text-orange-500' },
              ].map((action, i) => (
                <button key={i} className="flex flex-col items-center gap-2 group">
                  <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Transactions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg">Recent Transactions</h4>
                <button className="text-accent text-sm font-bold hover:underline">See All</button>
              </div>
              <div className="space-y-4">
                {TRANSACTIONS.map((tx, i) => (
                  <motion.div 
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                        {tx.icon}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{tx.title}</div>
                        <div className="text-xs text-white/40">{tx.category} • {tx.date}</div>
                      </div>
                    </div>
                    <div className={`font-bold text-sm ${tx.amount > 0 ? 'text-emerald-500' : 'text-white'}`}>
                      {tx.amount > 0 ? '+' : ''}KSh {Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="p-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-around">
        {[
          { id: 'dashboard', icon: <Wallet size={20} />, label: 'Home' },
          { id: 'cards', icon: <CreditCard size={20} />, label: 'Cards' },
          { id: 'stats', icon: <PieChart size={20} />, label: 'Stats' },
          { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === item.id ? 'text-accent' : 'text-white/40 hover:text-white'}`}
          >
            {item.icon}
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Transfer Modal Overlay */}
      <AnimatePresence>
        {showTransfer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end"
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full bg-[#121214] rounded-t-[40px] p-8 border-t border-white/10"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
              <h3 className="text-2xl font-bold mb-6">Send Money</h3>
              <form onSubmit={handleTransfer} className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 block">Recipient Name</label>
                  <input 
                    type="text" 
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Enter name or username"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2 block">Amount (KSh)</label>
                  <input 
                    type="number" 
                    required
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent transition-colors text-3xl font-bold"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowTransfer(false)}
                    className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
                  >
                    Confirm Transfer
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
