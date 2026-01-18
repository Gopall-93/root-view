import React from "react";
import { ControlSlider, Toggle } from "./UiControls";

export default function SettingsSidebar({ settings, update, isOpen, onToggle }) {
  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className={`
          absolute top-6 right-6 z-40 
          px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase border transition-all
          ${isOpen
            ? 'border-transparent text-white/50 hover:text-white' 
            : 'border-matrix-green/30 bg-black/60 text-matrix-green hover:bg-matrix-green hover:text-black'}
        `}
      >
        {isOpen ? 'CLOSE' : 'SETTINGS'}
      </button>

      {/* The Panel */}
      <div className={`
        absolute top-0 right-0 h-full w-80 z-30
        bg-[#050505]/95 backdrop-blur-xl border-l border-matrix-green/20
        transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        flex flex-col p-6 pt-20 gap-6 shadow-[-20px_0_50px_rgba(0,0,0,0.7)]
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        
        <div className="space-y-8 overflow-y-auto pr-2 scrollbar-hide h-full">
          
          {/* Section: Image */}
          <div className="space-y-5">
            <h3 className="text-[10px] font-bold text-matrix-green/40 uppercase tracking-[0.2em] border-b border-matrix-green/10 pb-2">
              Signal Processing
            </h3>
            <ControlSlider label="Resolution" value={settings.resolution} min={80} max={220} step={5} onChange={v => update('resolution', v)}/>
            <ControlSlider label="Distortion" value={settings.aspectRatio} min={0.3} max={0.8} step={0.01} onChange={v => update('aspectRatio', v)}/>
          </div>

          {/* Section: Light */}
          <div className="space-y-5">
            <h3 className="text-[10px] font-bold text-matrix-green/40 uppercase tracking-[0.2em] border-b border-matrix-green/10 pb-2">
              Exposure
            </h3>
            <ControlSlider label="Contrast" value={settings.contrast} min={0.5} max={3.0} step={0.1} onChange={v => update('contrast', v)}/>
            <ControlSlider label="Brightness" value={settings.brightness} min={-50} max={100} step={5} onChange={v => update('brightness', v)}/>
          </div>

          {/* Section: Style */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-matrix-green/40 uppercase tracking-[0.2em] border-b border-matrix-green/10 pb-2">
              Mode
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {['standard', 'simple', 'blocks', 'matrix', 'edges'].map((set) => (
                <button
                  key={set}
                  onClick={() => update('charSet', set)}
                  className={`
                    py-2 px-2 text-[10px] uppercase tracking-wider border transition-all rounded-sm
                    ${settings.charSet === set 
                      ? 'bg-matrix-green text-black border-matrix-green font-bold' 
                      : 'border-white/10 text-white/50 hover:border-matrix-green/50 hover:text-matrix-green'}
                  `}
                >
                  {set}
                </button>
              ))}
            </div>
          </div>
          
           <div className="pt-2">
             <Toggle label="Invert Signal" active={settings.invert} onClick={() => update('invert', !settings.invert)} />
           </div>

        </div>
      </div>
    </>
  );
}