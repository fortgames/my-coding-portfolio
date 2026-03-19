import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Flame, 
  Clock, 
  TrendingUp, 
  Plus, 
  ChevronRight, 
  Calendar,
  Heart,
  Dumbbell,
  Timer,
  Trophy,
  Target
} from 'lucide-react';

const WORKOUTS = [
  { id: 1, title: 'Morning Run', type: 'Cardio', duration: '45 min', calories: 420, date: 'Today, 6:30 AM', icon: '🏃‍♂️' },
  { id: 2, title: 'Upper Body Strength', type: 'Strength', duration: '60 min', calories: 350, date: 'Yesterday, 5:00 PM', icon: '💪' },
  { id: 3, title: 'Evening Yoga', type: 'Flexibility', duration: '30 min', calories: 120, date: 'Mar 16, 7:00 PM', icon: '🧘‍♂️' },
];

export default function FitnessTrackerDemo() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [steps, setSteps] = useState(8432);
  const [showAddWorkout, setShowAddWorkout] = useState(false);

  return (
    <div className="bg-[#0A0A0B] text-white rounded-3xl overflow-hidden border border-white/10 h-[600px] flex flex-col font-sans relative">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm leading-none tracking-tight">FitPulse</h3>
            <span className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              Tracking Active
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <Calendar size={20} className="text-white/60" />
          </button>
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=George" alt="Avatar" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        {activeTab === 'dashboard' && (
          <>
            {/* Daily Stats */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-between aspect-square"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">{steps.toLocaleString()}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/60">Steps Today</div>
                </div>
                <div className="w-full bg-emerald-500/20 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '84%' }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-3xl bg-orange-500/10 border border-orange-500/20 flex flex-col justify-between aspect-square"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <Flame size={20} />
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">1,240</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-orange-500/60">Calories Burned</div>
                </div>
                <div className="w-full bg-orange-500/20 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '62%' }}
                    className="h-full bg-orange-500"
                  />
                </div>
              </motion.div>
            </div>

            {/* Heart Rate & Sleep */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4">
                <div className="text-red-500">
                  <Heart size={24} fill="currentColor" className="animate-pulse" />
                </div>
                <div>
                  <div className="text-xl font-bold">72</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">BPM</div>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4">
                <div className="text-purple-500">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold">7h 20m</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Sleep</div>
                </div>
              </div>
            </div>

            {/* Recent Workouts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg">Recent Workouts</h4>
                <button 
                  onClick={() => setShowAddWorkout(true)}
                  className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent/90 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="space-y-4">
                {WORKOUTS.map((workout, i) => (
                  <motion.div 
                    key={workout.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
                        {workout.icon}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{workout.title}</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{workout.type} • {workout.duration}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm text-orange-500">{workout.calories} kcal</div>
                      <div className="text-[10px] text-white/40 font-bold">{workout.date}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-8">
            <h4 className="font-bold text-lg">Weekly Progress</h4>
            <div className="h-48 flex items-end justify-between gap-2 px-2">
              {[45, 60, 30, 80, 55, 90, 40].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    className={`w-full rounded-t-lg ${i === 5 ? 'bg-accent' : 'bg-white/10'}`}
                  />
                  <span className="text-[10px] font-bold text-white/40 uppercase">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <div className="font-bold">Weekly Goal</div>
                    <div className="text-xs text-white/40">5 of 7 days active</div>
                  </div>
                </div>
                <div className="text-accent font-bold">71%</div>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Target size={24} />
                  </div>
                  <div>
                    <div className="font-bold">Weight Goal</div>
                    <div className="text-xs text-white/40">2kg to target</div>
                  </div>
                </div>
                <div className="text-blue-500 font-bold">85%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="p-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-around z-20">
        {[
          { id: 'dashboard', icon: <Activity size={20} />, label: 'Activity' },
          { id: 'workouts', icon: <Dumbbell size={20} />, label: 'Workouts' },
          { id: 'stats', icon: <TrendingUp size={20} />, label: 'Stats' },
          { id: 'profile', icon: <Trophy size={20} />, label: 'Goals' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === item.id ? 'text-emerald-500' : 'text-white/40 hover:text-white'}`}
          >
            {item.icon}
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Add Workout Modal Overlay */}
      <AnimatePresence>
        {showAddWorkout && (
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
              <h3 className="text-2xl font-bold mb-6">Log Workout</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-3 hover:border-accent transition-colors">
                    <Dumbbell size={32} className="text-accent" />
                    <span className="text-sm font-bold">Strength</span>
                  </button>
                  <button className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-3 hover:border-accent transition-colors">
                    <Timer size={32} className="text-accent" />
                    <span className="text-sm font-bold">Cardio</span>
                  </button>
                </div>
                <button 
                  onClick={() => setShowAddWorkout(false)}
                  className="w-full py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-colors"
                >
                  Start Session
                </button>
                <button 
                  onClick={() => setShowAddWorkout(false)}
                  className="w-full py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
