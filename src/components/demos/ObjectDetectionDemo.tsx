import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { Loader2, Camera, StopCircle, Settings, Clock } from 'lucide-react';

export default function ObjectDetectionDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeDetections, setActiveDetections] = useState(0);
  const [threshold, setThreshold] = useState(0.6);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        // Try to use webgl for performance, fallback to cpu
        try {
          await tf.setBackend('webgl');
        } catch (e) {
          console.warn("WebGL not supported, using CPU");
          await tf.setBackend('cpu');
        }
        const loadedModel = await cocoSsd.load({ base: 'mobilenet_v2' });
        setModel(loadedModel);
        setLoading(false);
      } catch (err) {
        console.error("Error loading model:", err);
        setError("Failed to load AI model. Please check your connection.");
      }
    };
    loadModel();
  }, []);

  const startVideo = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setStreaming(true);
          };
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setError("Could not access camera. Please ensure permissions are granted.");
      }
    }
  };

  useEffect(() => {
    let animationId: number;
    
    const runDetection = async () => {
      if (model && videoRef.current && streaming) {
        if (videoRef.current.readyState >= 2) {
          try {
            // Use user-defined threshold
            const predictions = await model.detect(videoRef.current, 10, threshold);
            setActiveDetections(predictions.length);
            renderPredictions(predictions);
          } catch (err) {
            console.error("Detection error:", err);
          }
        }
        animationId = requestAnimationFrame(runDetection);
      }
    };

    if (streaming) {
      runDetection();
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [streaming, model, threshold]);

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
      setActiveDetections(0);
      
      // Clear canvas
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const renderPredictions = (predictions: cocoSsd.DetectedObject[]) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !videoRef.current || !canvasRef.current) return;

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    
    if (!width || !height) return;

    if (canvasRef.current.width !== width || canvasRef.current.height !== height) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }

    ctx.clearRect(0, 0, width, height);
    
    if (predictions.length === 0) return;

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const w = prediction.bbox[2];
      const h = prediction.bbox[3];

      // Green Glow Effect
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 15;
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, w, h);
      
      // Reset shadow for text
      ctx.shadowBlur = 0;

      // Draw label background
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 14px sans-serif';
      const text = `${prediction.class} ${Math.round(prediction.score * 100)}%`;
      const textWidth = ctx.measureText(text).width;
      ctx.fillRect(x, y - 25, textWidth + 10, 25);

      // Draw text
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, x + 5, y - 7);
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-white/60">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p>Initializing Neural Network...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">AI Object Detection</h3>
          <div className="flex items-center gap-2">
            <p className="text-white/60">Real-time recognition using TensorFlow.js</p>
            {streaming && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-500 rounded-full text-[10px] font-bold uppercase animate-pulse">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                AI Active
              </div>
            )}
          </div>
        </div>
        {!streaming ? (
          <button
            onClick={startVideo}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-white font-bold rounded-2xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
          >
            <Camera size={20} />
            Start Camera
          </button>
        ) : (
          <button
            onClick={stopVideo}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
          >
            <StopCircle size={20} />
            Stop Camera
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
          />
          {!streaming && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <p className="text-white/40">Camera is off</p>
            </div>
          )}
          {streaming && activeDetections > 0 && (
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full z-20 shadow-lg">
              {activeDetections} OBJECTS DETECTED
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-6 glass rounded-3xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Settings</h4>
              <Settings size={16} className="text-white/40" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-white/60">Confidence Filter</label>
                <span className="text-xs font-mono text-emerald-500 font-bold">{Math.round(threshold * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.3" 
                max="0.9" 
                step="0.05" 
                value={threshold} 
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <p className="text-[10px] text-white/40 leading-relaxed">
                Increase to reduce false positives (like confusing a bottle for a phone).
              </p>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                <div className="p-1.5 bg-emerald-500/20 rounded-lg">
                  <Clock size={14} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/80 uppercase mb-1">Calibration Tip</p>
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    Ensure good lighting and hold objects steady for 1-2 seconds for accurate classification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {['Person', 'Phone', 'Bottle', 'Chair'].map(item => (
              <div key={item} className="p-4 glass rounded-2xl text-center border border-white/5">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Detects</p>
                <p className="text-sm font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
