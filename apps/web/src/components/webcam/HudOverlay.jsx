import React from "react";

export default function HudOverlay({
  settings,
  onCapture,
  onOpenGallery,
  user,
  isFrozen,
  isRecording,
  onRecord,
  recordingProgress
}) {
  return (
    <>
      {/* --- TOP LEFT STATUS --- */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <div className="border-l-2 border-matrix-green/50 bg-black/60 backdrop-blur-sm px-4 py-2 inline-flex flex-col gap-1">
          <h1 className="text-xs font-bold tracking-[0.2em] flex items-center gap-2 text-matrix-green">
            <span className={`w-2 h-2 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
            {isRecording 
              ? `REC :: ${Math.round(recordingProgress * 100)}%` 
              : `LIVE :: ${settings.charSet.toUpperCase()}`
            }
          </h1>
          <div className="text-[10px] text-matrix-green/60 font-medium flex gap-3">
            <span>RES: {settings.resolution}</span>
            <span>ISO: {settings.brightness}</span>
          </div>
        </div>
      </div>

      {/* --- SIDEBAR TOGGLE --- */}
      <div className="absolute top-24 left-6 z-20 pointer-events-auto">
        <button
          onClick={onOpenGallery}
          className="border border-matrix-green/30 bg-black/60 backdrop-blur-sm px-4 py-2 text-[10px] font-bold tracking-[0.2em] hover:bg-matrix-green hover:text-black transition-all flex items-center gap-2 uppercase text-matrix-green"
        >
          <span>Archives</span>
          {!user && <span className="text-xs">🔒</span>}
        </button>
      </div>

      {/* --- BOTTOM CONTROL CENTER --- */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-end pointer-events-none">
        
        {/* Only show controls if NOT Frozen and NOT Recording */}
        {!isFrozen && !isRecording && (
          <div className="relative pointer-events-auto flex items-center justify-center">
             
             {/* 1. MAIN CAPTURE BUTTON */}
             <button
              className="group cursor-pointer flex flex-col items-center gap-3 transition-transform active:scale-95"
              onClick={onCapture}
            >
              <div className="w-20 h-20 rounded-full border border-matrix-green/50 flex items-center justify-center group-hover:bg-matrix-green/10 transition-all shadow-[0_0_15px_rgba(0,255,65,0.1)] bg-black/50 backdrop-blur-md">
                <div className="w-16 h-16 bg-white/90 rounded-full shadow-[0_0_10px_white] transition-all group-hover:scale-90" />
              </div>
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/90 shadow-black drop-shadow-md">
                CAPTURE
              </span>
            </button>
            
            {/* 2. REC GIF BUTTON (Fixed Visibility) 
                - Added bg-black to block background text
                - Removed /50 opacity
                - Added Shadow
            */}
            <button 
                onClick={onRecord}
                className="absolute left-24 bottom-6 bg-black border border-red-500 text-red-500 hover:bg-red-500 hover:text-black px-4 py-2 text-[10px] font-bold tracking-widest transition-all uppercase shadow-[0_0_10px_rgba(239,68,68,0.4)] whitespace-nowrap"
            >
                [ REC GIF ]
            </button>
          </div>
        )}

        {/* 3. RECORDING SPINNER */}
        {isRecording && (
           <div className="flex flex-col items-center gap-2 pointer-events-auto bg-black/80 p-4 rounded-xl border border-red-500/30 backdrop-blur-md">
              <div className="w-16 h-16 flex items-center justify-center">
                 <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <span className="text-[10px] text-red-500 animate-pulse tracking-[0.2em] font-bold">
                PROCESSING...
              </span>
           </div>
        )}

      </div>

      <div
        id="flash-overlay"
        className="absolute inset-0 bg-white z-50 opacity-0 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
      />
    </>
  );
}