import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // For Sharing Link
import api from "../../libs/axios";
import HackerAvatar from "../ui/HackerAvatar";

export default function GallerySidebar({ isOpen, onClose, user, onLogout, onLoad, refreshTrigger }) {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ FIX 1: Dependency Array now includes 'refreshTrigger'
  useEffect(() => {
    if (isOpen && user) fetchGallery();
  }, [isOpen, user, refreshTrigger]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/capture/gallery");
      if (data.success) setGallery(data.gallery);
    } catch (error) {
      setGallery([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
        setGallery((prev) => prev.filter((item) => item._id !== id));
        await api.delete(`/capture/${id}`);
    } catch (error) { console.error(error); }
  };

  // ✅ FEATURE: EXPORT PNG
  const handleExportPNG = (e, item) => {
    e.stopPropagation();
    // Create a hidden canvas to draw the text
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // Set approx size
    const lines = item.asciiArt.split("\n");
    canvas.width = 1920; 
    canvas.height = 1080;
    
    // Draw Black Background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw Green Text
    ctx.fillStyle = "#00FF41";
    ctx.font = "12px monospace";
    
    lines.forEach((line, i) => {
        ctx.fillText(line, 20, 20 + (i * 12)); // Simple drawing loop
    });

    // Save
    const link = document.createElement("a");
    link.download = `ROOT_CAM_${item._id.slice(-4)}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // ✅ FEATURE: COPY LINK
  const handleShare = (e, id) => {
    e.stopPropagation();
    const url = `${window.location.origin}/view/${id}`;
    navigator.clipboard.writeText(url);
    alert("ENCRYPTED LINK COPIED TO CLIPBOARD");
  };

  return (
    <div className={`
      absolute top-0 left-0 h-full w-96 z-40
      bg-[#050505]/95 backdrop-blur-xl border-r border-matrix-green/20
      transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
      flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.7)]
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      
      {/* Header */}
      <div className="p-6 border-b border-matrix-green/20 flex justify-between items-end">
        <div className="flex items-center gap-3">
          <HackerAvatar name={user?.username || "GUEST"} size={40} variant="beam" />
          <div>
            <h2 className="text-sm font-bold text-matrix-green tracking-[0.2em]">ARCHIVES</h2>
            <p className="text-[10px] text-matrix-green/50 font-mono mt-1">
              LOGGED_IN: <span className="text-white">{user?.username || "GUEST"}</span>
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-matrix-green/50 hover:text-white text-xs">CLOSE</button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {loading && <div className="text-center py-10 text-xs text-matrix-green animate-pulse">SYNCING DATABANKS...</div>}

        {!loading && gallery.map((item) => (
          <div key={item._id} className="group cursor-pointer mb-6">
            
            {/* Image Container */}
            <div className="aspect-video bg-black border border-matrix-green/20 p-2 overflow-hidden relative flex items-start justify-center group-hover:border-matrix-green transition-all">
              <pre className="text-[2px] leading-[2px] text-matrix-green/70 opacity-60 group-hover:opacity-100 scale-x-[-1] whitespace-pre-wrap break-all font-mono">
                {item.asciiArt}
              </pre>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2 p-4">
                
                <div className="flex gap-2 w-full">
                    {/* LOAD BUTTON */}
                    <button onClick={() => onLoad && onLoad(item)} className="flex-1 py-2 border border-matrix-green text-matrix-green text-[10px] hover:bg-matrix-green hover:text-black font-bold">
                        LOAD TO VIEWER
                    </button>
                    {/* DELETE BUTTON */}
                    <button onClick={(e) => handleDelete(e, item._id)} className="w-10 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black">
                        X
                    </button>
                </div>

                <div className="flex gap-2 w-full mt-2">
                     {/* PNG EXPORT */}
                    <button onClick={(e) => handleExportPNG(e, item)} className="flex-1 py-1 border border-matrix-green/50 text-matrix-green/50 text-[10px] hover:bg-white hover:text-black">
                        DWNLD .PNG
                    </button>
                    {/* SHARE LINK */}
                    <button onClick={(e) => handleShare(e, item._id)} className="flex-1 py-1 border border-matrix-green/50 text-matrix-green/50 text-[10px] hover:bg-white hover:text-black">
                        COPY LINK
                    </button>
                </div>

              </div>
            </div>

            <div className="mt-1 flex justify-between text-[10px] text-matrix-green/40 font-mono">
              <span>ID: {item._id.slice(-4).toUpperCase()}</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-matrix-green/20">
        <button onClick={onLogout} className="w-full py-2 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-black text-[10px] transition-colors">
            TERMINATE SESSION
        </button>
      </div>
    </div>
  );
}