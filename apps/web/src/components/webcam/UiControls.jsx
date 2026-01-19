import React from "react";

export const ControlSlider = ({ label, value, min, max, step, onChange }) => (
  <div className="flex flex-col gap-2 group">
    <div className="flex justify-between items-end">
      <span className="text-[10px] font-medium uppercase tracking-wider text-matrix-green/70 group-hover:text-matrix-green transition-colors">
        {label}
      </span>
      <span className="font-mono text-[10px] text-matrix-green/50">
        {value.toFixed(2)}
      </span>
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-0.5 bg-white/10 rounded-full appearance-none cursor-pointer 
      [&::-webkit-slider-thumb]:appearance-none 
      [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
      [&::-webkit-slider-thumb]:bg-matrix-green 
      [&::-webkit-slider-thumb]:rounded-full 
      [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,255,65,0.5)] 
      hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
    />
  </div>
);

export const Toggle = ({ label, active, onClick }) => (
  <div className="flex items-center justify-between cursor-pointer group py-2" onClick={onClick}>
    <span className="text-[10px] font-medium uppercase tracking-wider text-matrix-green/70 group-hover:text-matrix-green transition-colors">
      {label}
    </span>
    <div className={`w-8 h-4 border border-matrix-green/30 rounded-full relative transition-all ${active ? 'bg-matrix-green/20 border-matrix-green' : 'bg-transparent'}`}>
      <div className={`absolute top-0.5 w-2.5 h-2.5 bg-matrix-green rounded-full shadow-sm transition-all ${active ? 'left-4.5' : 'left-0.5'}`} />
    </div>
  </div>
);