import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  Calendar, 
  Search, 
  Bell, 
  MoreVertical,
  Plus,
  Clock,
  Flag,
  MapPin
} from 'lucide-react';

const tasks = [
  { id: 1, title: 'Review Mombasa Port Logistics', priority: 'High', status: 'In Progress', deadline: 'Today', location: 'Mombasa' },
  { id: 2, title: 'Update Nairobi Vending API', priority: 'Medium', status: 'Pending', deadline: 'Tomorrow', location: 'Nairobi' },
  { id: 3, title: 'Kisumu Team SPRINT Meeting', priority: 'High', status: 'Completed', deadline: 'Done', location: 'Kisumu' },
  { id: 4, title: 'Eldoret Hub DB Optimization', priority: 'Low', status: 'Pending', deadline: 'Friday', location: 'Eldoret' },
  { id: 5, title: 'Nakuru Distribution Audit', priority: 'Medium', status: 'In Progress', deadline: 'Monday', location: 'Nakuru' },
];

const notifications = [
  { id: 1, text: 'New task assigned in Mombasa', time: '2 mins ago' },
  { id: 2, text: 'API response time improved by 15%', time: '1 hour ago' },
  { id: 3, text: 'Nairobi hub report submitted', time: '3 hours ago' },
];

export default function NWPDSimulator() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex h-[600px] bg-[#f8f9fa] rounded-3xl overflow-hidden text-slate-800 shadow-2xl border border-slate-200">
      {/* Sidebar */}
      <div className="w-20 md:w-64 bg-[#1a1a1a] text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-bold text-xl">N</div>
          <span className="hidden md:block font-bold text-lg tracking-tight">NWPD Taifa</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
            { name: 'Tasks', icon: <CheckSquare size={20} /> },
            { name: 'Team', icon: <Users size={20} /> },
            { name: 'Calendar', icon: <Calendar size={20} /> },
          ].map(item => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.name ? 'bg-red-600 text-white' : 'text-white/60 hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="hidden md:block font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500" />
            <div className="hidden md:block">
              <p className="text-xs font-bold">George Mburu</p>
              <p className="text-[10px] text-white/40">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between relative">
          <h2 className="text-xl font-bold text-slate-900">{activeTab}</h2>
          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="bg-slate-100 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 ring-red-600/20 transition-all"
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-400 hover:text-slate-600"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white" />
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 font-bold text-sm">Notifications</div>
                  <div className="divide-y divide-slate-50">
                    {notifications.map(n => (
                      <div key={n.id} className="p-4 hover:bg-slate-50 transition-colors">
                        <p className="text-xs text-slate-800 mb-1">{n.text}</p>
                        <p className="text-[10px] text-slate-400">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Total Tasks', value: '24', color: 'bg-blue-500' },
              { label: 'Completed', value: '18', color: 'bg-emerald-500' },
              { label: 'Pending', value: '6', color: 'bg-amber-500' },
            ].map(stat => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                  <div className={`w-10 h-1 h-1 rounded-full ${stat.color}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Project Progress */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Overall Project Progress</h3>
              <span className="text-sm font-bold text-red-600">75%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                className="h-full bg-red-600"
              />
            </div>
          </div>

          {/* Task List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Recent Tasks</h3>
              <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Plus size={18} />
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {tasks.map(task => (
                <div key={task.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === 'High' ? 'bg-red-500' : 
                      task.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <p className="font-medium text-slate-900">{task.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-[10px] text-slate-400">
                          <Clock size={12} /> {task.deadline}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-slate-400">
                          <MapPin size={12} /> {task.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {task.status}
                    </span>
                    <button className="text-slate-300 hover:text-slate-600">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
