import React from "react";

export default function HudOverlay({
  settings,
  onCapture,
  onOpenGallery,
  user,
}) {
  return (
    <>
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <div className="border-l-2 border-matrix-green/50 bg-black/60 backdrop-blur-sm px-4 py-2 inline-flex flex-col gap-1">
          <h1 className="text-xs font-bold tracking-[0.2em] flex items-center gap-2 text-matrix-green">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            REC :: {settings.charSet.toUpperCase()}
          </h1>
          <div className="text-[10px] text-matrix-green/60 font-medium flex gap-3">
            <span>RES: {settings.resolution}</span>
            <span>ISO: {settings.brightness}</span>
          </div>
        </div>
      </div>

      <div className="absolute top-24 left-6 z-20 pointer-events-auto">
        <button
          onClick={onOpenGallery}
          className="
            border border-matrix-green/30 bg-black/60 backdrop-blur-sm 
            px-4 py-2 text-[10px] font-bold tracking-[0.2em] 
            hover:bg-matrix-green hover:text-black transition-all 
            flex items-center gap-2 uppercase text-matrix-green
          "
        >
          <span>Archives</span>
          {/* Lock Icon if not logged in */}
          {!user && <span className="text-xs">🔒</span>}
        </button>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center pointer-events-none">
        <div
          className="pointer-events-auto group cursor-pointer flex flex-col items-center gap-3 transition-transform active:scale-95"
          onClick={onCapture}
        >
          <div className="w-20 h-20 rounded-full border border-matrix-green/50 flex items-center justify-center group-hover:bg-matrix-green/10 transition-all shadow-[0_0_15px_rgba(0,255,65,0.1)]">
            <div className="w-16 h-16 bg-white/90 rounded-full shadow-[0_0_10px_white] transition-all group-hover:scale-90" />
          </div>
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-matrix-green/80">
            Capture
          </span>
        </div>
      </div>

      <div
        id="flash-overlay"
        className="absolute inset-0 bg-white z-50 opacity-0 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
      />
    </>
  );
}
