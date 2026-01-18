import React from "react";
import Avatar from "boring-avatars";

export default function HackerAvatar({ name, size = 40, variant = "beam" }) {
  // The Root-Cam Color Palette
  const MATRIX_PALETTE = [
    "#000000",
    "#00FF41", 
    "#008F11", 
    "#0D0D0D", 
    "#FFFFFF", 
  ];

  return (
    <div 
      className="relative inline-block overflow-hidden rounded-sm border border-matrix-green/50 shadow-[0_0_10px_rgba(0,255,65,0.2)]"
      style={{ width: size, height: size }}
    >
     
      <Avatar
        size={size}
        name={name}
        variant={variant} 
        colors={MATRIX_PALETTE}
        square={true} 
      />

      {/* Optional: Scanline Overlay for extra glitch effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none" />
      
      {/* Optional: Green Tint Overlay */}
      <div className="absolute inset-0 bg-matrix-green/10 mix-blend-overlay pointer-events-none" />
    </div>
  );
}