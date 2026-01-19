import React from "react";

export default function AsciiFeed({ videoRef, asciiRef }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-0 bg-black">
      {/* Hidden Source */}
      <video ref={videoRef} className="hidden" playsInline muted />
      
      {/* The Art */}
      <pre 
        ref={asciiRef} 
        className="
          w-full h-full flex items-center justify-center
          whitespace-pre select-none scale-x-[-1] overflow-hidden
          text-[6px] leading-[6px] 
          md:text-[8px] md:leading-[8px] 
          lg:text-[10px] lg:leading-[10px] 
          xl:text-[12px] xl:leading-[12px]
        "
        style={{ textShadow: "0 0 10px rgba(0, 255, 65, 0.4)" }}
      />
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,#000_120%)] pointer-events-none" />
    </div>
  );
}