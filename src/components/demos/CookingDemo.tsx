import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Clock, 
  Users, 
  Flame, 
  ChevronLeft, 
  Heart, 
  Play, 
  CheckCircle2, 
  Timer,
  ChefHat,
  UtensilsCrossed,
  BookOpen
} from 'lucide-react';

const RECIPES = [
  {
    id: 1,
    title: 'Creamy Garlic Pasta',
    description: 'A quick and easy Italian classic with a rich, velvety sauce.',
    image: 'https://images.unsplash.com/photo-1645112481341-f5623ab278b8?q=80&w=2070&auto=format&fit=crop',
    time: '20 min',
    servings: 2,
    calories: '450 kcal',
    difficulty: 'Easy',
    ingredients: ['200g Pasta', '3 cloves Garlic', '100ml Heavy Cream', '50g Parmesan', 'Fresh Parsley'],
    steps: [
      'Boil pasta in salted water until al dente.',
      'Sauté minced garlic in olive oil until fragrant.',
      'Add cream and parmesan, simmer until thickened.',
      'Toss pasta with sauce and garnish with parsley.'
    ]
  },
  {
    id: 2,
    title: 'Grilled Salmon with Asparagus',
    description: 'Healthy and flavorful Mediterranean-style grilled salmon.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2070&auto=format&fit=crop',
    time: '25 min',
    servings: 1,
    calories: '380 kcal',
    difficulty: 'Medium',
    ingredients: ['1 Salmon Fillet', '1 bunch Asparagus', 'Lemon', 'Olive Oil', 'Herbs'],
    steps: [
      'Season salmon with salt, pepper, and herbs.',
      'Grill salmon for 4-5 minutes per side.',
      'Sauté asparagus with lemon and garlic.',
      'Serve hot with a squeeze of fresh lemon.'
    ]
  },
  {
    id: 3,
    title: 'Avocado Toast with Poached Egg',
    description: 'The ultimate breakfast staple with a perfectly runny egg.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2070&auto=format&fit=crop',
    time: '15 min',
    servings: 1,
    calories: '320 kcal',
    difficulty: 'Easy',
    ingredients: ['Sourdough Bread', '1 Avocado', '1 Egg', 'Chili Flakes', 'Lime'],
    steps: [
      'Toast the sourdough bread until golden.',
      'Mash avocado with lime juice and salt.',
      'Poach the egg in simmering water for 3 minutes.',
      'Spread avocado on toast and top with the egg.'
    ]
  }
];

export default function CookingDemo() {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof RECIPES[0] | null>(null);
  const [isCooking, setIsCooking] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const startTimer = (seconds: number) => {
    setTimeLeft(seconds);
    setIsTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#0F0F10] text-white rounded-3xl overflow-hidden border border-white/10 h-[600px] flex flex-col font-sans relative">
      <AnimatePresence mode="wait">
        {!selectedRecipe ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">What's Cooking?</h3>
                <p className="text-white/40 text-sm">Find your next favorite meal</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <ChefHat size={24} />
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input 
                type="text" 
                placeholder="Search recipes, ingredients..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {['All', 'Breakfast', 'Lunch', 'Dinner', 'Vegan', 'Dessert'].map((cat, i) => (
                <button 
                  key={cat}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${i === 0 ? 'bg-accent text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Recipe List */}
            <div className="space-y-6">
              {RECIPES.map((recipe, i) => (
                <motion.div 
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[16/9]"
                >
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-accent text-[10px] font-bold uppercase tracking-widest">
                        {recipe.difficulty}
                      </span>
                      <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest flex items-center gap-1">
                        <Clock size={10} /> {recipe.time}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-1">{recipe.title}</h4>
                    <p className="text-white/60 text-xs line-clamp-1">{recipe.description}</p>
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent transition-colors">
                    <Heart size={20} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : isCooking ? (
          <motion.div 
            key="cooking"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex-1 flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <button onClick={() => setIsCooking(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <ChevronLeft size={24} />
              </button>
              <div className="text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Step {currentStep + 1} of {selectedRecipe.steps.length}</div>
                <div className="font-bold text-sm">{selectedRecipe.title}</div>
              </div>
              <div className="w-10" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-4"
              >
                <UtensilsCrossed size={40} />
              </motion.div>
              
              <motion.h3 
                key={`step-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold leading-tight px-4"
              >
                {selectedRecipe.steps[currentStep]}
              </motion.h3>

              {currentStep === 0 && (
                <button 
                  onClick={() => startTimer(300)}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-accent font-bold hover:bg-white/10 transition-colors"
                >
                  <Timer size={20} />
                  Start 5m Timer
                </button>
              )}

              {isTimerActive && (
                <div className="text-4xl font-mono font-bold text-accent animate-pulse">
                  {formatTime(timeLeft)}
                </div>
              )}
            </div>

            <div className="mt-auto pt-8 flex gap-4">
              <button 
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl disabled:opacity-20 transition-opacity"
              >
                Previous
              </button>
              <button 
                onClick={() => {
                  if (currentStep < selectedRecipe.steps.length - 1) {
                    setCurrentStep(prev => prev + 1);
                  } else {
                    setIsCooking(false);
                    setSelectedRecipe(null);
                    alert("Bon Appétit! You've finished cooking.");
                  }
                }}
                className="flex-[2] py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
              >
                {currentStep < selectedRecipe.steps.length - 1 ? 'Next Step' : 'Finish Cooking'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="flex-1 flex flex-col"
          >
            <div className="relative h-64">
              <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] to-transparent" />
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-6 left-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-8 custom-scrollbar">
              <div>
                <h3 className="text-3xl font-bold mb-2">{selectedRecipe.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{selectedRecipe.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <Clock size={20} className="mx-auto mb-2 text-accent" />
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Time</div>
                  <div className="font-bold text-xs">{selectedRecipe.time}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <Users size={20} className="mx-auto mb-2 text-accent" />
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Serves</div>
                  <div className="font-bold text-xs">{selectedRecipe.servings}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <Flame size={20} className="mx-auto mb-2 text-accent" />
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Calories</div>
                  <div className="font-bold text-xs">{selectedRecipe.calories}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <UtensilsCrossed size={20} className="text-accent" />
                  Ingredients
                </h4>
                <div className="space-y-3">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-sm">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  setIsCooking(true);
                  setCurrentStep(0);
                }}
                className="w-full py-5 bg-accent text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-accent/90 transition-all shadow-xl shadow-accent/20"
              >
                <Play size={20} fill="currentColor" />
                Start Cooking Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav (Only on List) */}
      {!selectedRecipe && (
        <div className="p-4 border-t border-white/5 bg-white/[0.02] flex items-center justify-around">
          {[
            { id: 'home', icon: <ChefHat size={20} />, label: 'Home' },
            { id: 'discover', icon: <Search size={20} />, label: 'Discover' },
            { id: 'saved', icon: <Heart size={20} />, label: 'Saved' },
            { id: 'book', icon: <BookOpen size={20} />, label: 'My Recipes' },
          ].map((item) => (
            <button 
              key={item.id}
              className={`flex flex-col items-center gap-1 transition-colors ${item.id === 'home' ? 'text-accent' : 'text-white/40 hover:text-white'}`}
            >
              {item.icon}
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
