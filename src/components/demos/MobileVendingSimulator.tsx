import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Wifi, 
  Battery, 
  ShoppingBag, 
  CreditCard, 
  MapPin, 
  ChevronLeft,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';

const products = [
  { id: 1, name: 'Bottled Water', price: 50, image: 'https://picsum.photos/seed/water/200/200', desc: 'Pure natural spring water, 500ml.', info: '0 Calories | pH 7.2' },
  { id: 2, name: 'Energy Drink', price: 150, image: 'https://picsum.photos/seed/energy/200/200', desc: 'High caffeine energy boost.', info: '120 Calories | 32mg Caffeine' },
  { id: 3, name: 'Snack Bar', price: 80, image: 'https://picsum.photos/seed/snack/200/200', desc: 'Oat and honey protein bar.', info: '210 Calories | 10g Protein' },
  { id: 4, name: 'Soda', price: 70, image: 'https://picsum.photos/seed/soda/200/200', desc: 'Classic sparkling cola.', info: '150 Calories | 39g Sugar' },
];

export default function MobileVendingSimulator() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [step, setStep] = useState<'browse' | 'details' | 'cart' | 'checkout' | 'stk' | 'dispensing' | 'success'>('browse');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [pin, setPin] = useState('');

  const handlePayment = () => {
    setStep('stk');
  };

  const confirmPin = () => {
    if (pin.length === 4) {
      setStep('dispensing');
      setTimeout(() => {
        setStep('success');
      }, 3000);
    }
  };

  const addToCart = (id: number) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) newCart[id]--;
      else delete newCart[id];
      return newCart;
    });
  };

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === Number(id));
    return sum + (product?.price || 0) * qty;
  }, 0);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="relative w-[320px] h-[640px] bg-black rounded-[50px] border-[8px] border-slate-800 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-12 h-1 bg-black/40 rounded-full" />
        </div>

        {/* Screen Content */}
        <div className="h-full bg-white flex flex-col pt-8">
          {/* Status Bar */}
          <div className="px-8 py-2 flex items-center justify-between text-[10px] font-bold text-slate-900">
            <span>12:45</span>
            <div className="flex items-center gap-1">
              <Wifi size={12} />
              <Battery size={12} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'browse' && (
              <motion.div
                key="browse"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <header className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Vending Go</h2>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <MapPin size={10} /> Nairobi Central Station
                    </p>
                  </div>
                  <button 
                    onClick={() => setStep('cart')}
                    className="relative p-2 bg-slate-100 rounded-full text-slate-900"
                  >
                    <ShoppingBag size={20} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </header>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {products.map(product => (
                      <div 
                        key={product.id} 
                        onClick={() => {
                          setSelectedProduct(product);
                          setStep('details');
                        }}
                        className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex flex-col cursor-pointer hover:border-red-600/20 transition-colors"
                      >
                        <img src={product.image} alt={product.name} className="w-full aspect-square rounded-xl mb-3 object-cover" />
                        <h3 className="text-xs font-bold text-slate-900 mb-1">{product.name}</h3>
                        <p className="text-xs text-slate-500 mb-3 font-mono">KES {product.price}</p>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product.id);
                          }}
                          className="mt-auto w-full py-2 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-slate-800 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {cartCount > 0 && (
                  <div className="p-6 bg-white border-t border-slate-100">
                    <button 
                      onClick={() => setStep('cart')}
                      className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
                    >
                      View Cart ({cartCount})
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {step === 'details' && selectedProduct && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <header className="px-6 py-4 flex items-center gap-4">
                  <button onClick={() => setStep('browse')} className="p-2 bg-slate-100 rounded-full">
                    <ChevronLeft size={20} />
                  </button>
                  <h2 className="text-xl font-bold text-slate-900">Details</h2>
                </header>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full aspect-square rounded-3xl object-cover mb-6 shadow-lg" />
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{selectedProduct.name}</h3>
                      <p className="text-red-600 font-bold text-lg">KES {selectedProduct.price}</p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      In Stock
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">{selectedProduct.desc}</p>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nutritional Info</p>
                    <p className="text-xs font-medium text-slate-700">{selectedProduct.info}</p>
                  </div>
                </div>
                <div className="p-6 bg-white border-t border-slate-100">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct.id);
                      setStep('browse');
                    }}
                    className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'cart' && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <header className="px-6 py-4 flex items-center gap-4">
                  <button onClick={() => setStep('browse')} className="p-2 bg-slate-100 rounded-full">
                    <ChevronLeft size={20} />
                  </button>
                  <h2 className="text-xl font-bold text-slate-900">My Cart</h2>
                </header>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {cartCount === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <ShoppingBag size={48} className="mb-4 opacity-20" />
                      <p className="text-sm">Your cart is empty</p>
                    </div>
                  ) : (
                    Object.entries(cart).map(([id, qty]) => {
                      const product = products.find(p => p.id === Number(id));
                      return (
                        <div key={id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                          <img src={product?.image} alt={product?.name} className="w-16 h-16 rounded-xl object-cover" />
                          <div className="flex-1">
                            <h3 className="text-xs font-bold text-slate-900">{product?.name}</h3>
                            <p className="text-xs text-slate-500">KES {product?.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => removeFromCart(Number(id))} className="p-1 bg-white border border-slate-200 rounded-lg"><Minus size={12} /></button>
                            <span className="text-xs font-bold">{qty}</span>
                            <button onClick={() => addToCart(Number(id))} className="p-1 bg-white border border-slate-200 rounded-lg"><Plus size={12} /></button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {cartCount > 0 && (
                  <div className="p-6 bg-white border-t border-slate-100 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Subtotal</span>
                        <span className="font-bold">KES {total}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Service Fee</span>
                        <span className="font-bold">KES 10</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-100">
                        <span>Total</span>
                        <span className="text-red-600">KES {total + 10}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setStep('checkout')}
                      className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {step === 'checkout' && (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <header className="px-6 py-4 flex items-center gap-4">
                  <button onClick={() => setStep('cart')} className="p-2 bg-slate-100 rounded-full">
                    <ChevronLeft size={20} />
                  </button>
                  <h2 className="text-xl font-bold text-slate-900">Payment</h2>
                </header>

                <div className="flex-1 px-6 py-4 space-y-6">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Payment Method</p>
                    <div className="flex items-center gap-4 p-3 bg-white rounded-xl border-2 border-emerald-500 shadow-sm">
                      <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900">M-Pesa Express</p>
                        <p className="text-[10px] text-slate-400">STK Push to 07xx xxx 456</p>
                      </div>
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Order Summary</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">{cartCount} Items</span>
                        <span className="font-bold">KES {total}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Service Fee</span>
                        <span className="font-bold">KES 10</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white border-t border-slate-100">
                  <button 
                    onClick={handlePayment}
                    className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    <CreditCard size={18} />
                    Pay KES {total + 10}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'stk' && (
              <motion.div
                key="stk"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900/10"
              >
                <div className="w-full max-w-[240px] bg-white rounded-3xl shadow-2xl p-6 border border-slate-200">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">M</div>
                  <h3 className="text-center font-bold text-slate-900 mb-1">M-Pesa</h3>
                  <p className="text-center text-[10px] text-slate-500 mb-6">Do you want to pay KES {total + 10} to Vending Go?</p>
                  
                  <div className="space-y-4">
                    <input 
                      type="password" 
                      placeholder="Enter M-Pesa PIN" 
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="w-full text-center tracking-[1em] py-3 bg-slate-100 rounded-xl outline-none focus:ring-2 ring-emerald-500/20"
                    />
                    <button 
                      onClick={confirmPin}
                      disabled={pin.length < 4}
                      className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl disabled:opacity-50"
                    >
                      Send
                    </button>
                    <button 
                      onClick={() => setStep('checkout')}
                      className="w-full py-2 text-slate-400 text-xs font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'dispensing' && (
              <motion.div
                key="dispensing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="relative w-32 h-32 mb-8">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-slate-100 border-t-red-600 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag size={40} className="text-slate-200" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Dispensing...</h2>
                <p className="text-xs text-slate-500">Please wait while your items are being prepared.</p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Success!</h2>
                <p className="text-sm text-slate-500 mb-8">Your items have been dispensed. Please collect them from the tray.</p>
                <button 
                  onClick={() => {
                    setCart({});
                    setPin('');
                    setStep('browse');
                  }}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl"
                >
                  Back to Store
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
