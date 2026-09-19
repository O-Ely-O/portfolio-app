import React, { useState } from 'react';
import { FlaskConical, Sliders, Palette, Layers, RefreshCw, Copy, Check } from 'lucide-react';

export const CreativeLabView: React.FC = () => {
  const [blurAmount, setBlurAmount] = useState(16);
  const [opacityAmount, setOpacityAmount] = useState(70);
  const [borderOpacity, setBorderOpacity] = useState(85);
  const [selectedHue, setSelectedHue] = useState('sky');
  const [copiedCode, setCopiedCode] = useState(false);

  const hues = [
    { id: 'sky', label: 'Sky Blue', bg: 'from-sky-400 to-blue-600' },
    { id: 'indigo', label: 'Electric Indigo', bg: 'from-indigo-500 to-purple-600' },
    { id: 'teal', label: 'Ethereal Teal', bg: 'from-teal-400 to-emerald-600' },
    { id: 'amber', label: 'Solar Amber', bg: 'from-amber-400 to-orange-500' }
  ];

  const generatedCss = `background: rgba(255, 255, 255, ${(opacityAmount / 100).toFixed(2)});\nbackdrop-filter: blur(${blurAmount}px);\nborder: 1px solid rgba(255, 255, 255, ${(borderOpacity / 100).toFixed(2)});\nbox-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);`;

  const handleCopyCss = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div id="creative-lab-container" className="space-y-4">
      <div className="pb-2 border-b border-blue-100/60 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-sky-500" />
            Creative Glassmorphism Design Lab
          </h2>
          <p className="text-xs text-slate-500">
            Interactive playground demonstrating dynamic optical refraction, light dispersion, and CSS tokens.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Controls Panel */}
        <div className="lg:col-span-5 glass-subcard rounded-2xl p-4 border border-white/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2">
            <Sliders className="w-3.5 h-3.5 text-blue-500" />
            <span>Optics & Material Parameters</span>
          </div>

          {/* Blur slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Backdrop Blur</span>
              <span className="text-blue-600">{blurAmount}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="32"
              value={blurAmount}
              onChange={(e) => setBlurAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Opacity slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Surface Opacity</span>
              <span className="text-blue-600">{opacityAmount}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={opacityAmount}
              onChange={(e) => setOpacityAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Border Opacity slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Border Refraction</span>
              <span className="text-blue-600">{borderOpacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={borderOpacity}
              onChange={(e) => setBorderOpacity(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Ambient Lighting Background */}
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-sky-500" />
              <span>Backdrop Light Theme</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {hues.map((h) => (
                <button
                  type="button"
                  key={h.id}
                  onClick={() => setSelectedHue(h.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-medium text-left border flex items-center gap-2 cursor-pointer transition-all ${
                    selectedHue === h.id
                      ? 'border-blue-500 bg-white shadow-xs font-semibold text-blue-700'
                      : 'border-slate-200 bg-white/50 text-slate-600 hover:bg-white'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${h.bg}`} />
                  <span className="text-[11px]">{h.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Copy CSS token snippet */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCopyCss}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CSS Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <span>Copy CSS Snippet</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Preview Canvas */}
        <div className="lg:col-span-7 rounded-2xl p-6 relative overflow-hidden border border-white/80 shadow-md min-h-[300px] flex items-center justify-center bg-slate-100">
          {/* Background colorful elements beneath */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-sky-100/60 pointer-events-none" />
          <div
            className={`absolute -top-10 -right-10 w-44 h-44 rounded-full bg-gradient-to-r ${
              hues.find((h) => h.id === selectedHue)?.bg || 'from-sky-400 to-blue-600'
            } opacity-70 blur-xl`}
          />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-amber-300/60 opacity-60 blur-xl" />

          {/* The Refracted Glass Element */}
          <div
            className="relative z-10 w-full max-w-sm p-6 rounded-2xl shadow-xl transition-all duration-300"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${opacityAmount / 100})`,
              backdropFilter: `blur(${blurAmount}px)`,
              WebkitBackdropFilter: `blur(${blurAmount}px)`,
              border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
              boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  Live Glass Surface
                </h4>
                <p className="text-[10px] text-slate-500 font-medium">
                  Refracting real-time CSS parameters
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Notice how the light glows through the edges when you adjust the blur and opacity sliders. Perfect for modern, tactile user interfaces.
            </p>

            <div className="flex items-center justify-between text-[11px] pt-3 border-t border-white/40">
              <span className="font-semibold text-slate-700">Blur: {blurAmount}px</span>
              <span className="font-semibold text-slate-700">Alpha: {opacityAmount}%</span>
              <span className="font-semibold text-blue-600">60 FPS Render</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
