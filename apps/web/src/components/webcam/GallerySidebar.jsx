import React, { useEffect, useState } from "react";
import api from "../../libs/axios"; // Ensure this path is correct
import HackerAvatar from "../ui/HackerAvatar"; // Re-adding the avatar we made

export default function GallerySidebar({ isOpen, onClose, user, onLogout, onLoad }) {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Fetch Gallery when Sidebar opens
  useEffect(() => {
    if (isOpen && user) {
      fetchGallery();
    }
  }, [isOpen, user]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/capture/gallery");
      if (data.success) {
        setGallery(data.gallery);
      }
    } catch (error) {
      console.error("Failed to load archives:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Delete
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Prevent triggering the "Load" click
    try {
        // Optimistic update: Remove from UI immediately
        setGallery((prev) => prev.filter((item) => item._id !== id));
        await api.delete(`/capture/${id}`);
    } catch (error) {
        console.error("Delete failed:", error);
        // Optional: Re-fetch if it failed
        fetchGallery();
    }
  };

  return (
    <div className={`
      absolute top-0 left-0 h-full w-80 z-40
      bg-[#050505]/95 backdrop-blur-xl border-r border-matrix-green/20
      transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
      flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.7)]
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      
      {/* Header */}
      <div className="p-6 border-b border-matrix-green/20 flex justify-between items-end">
        <div className="flex items-center gap-3">
          {/* Using the HackerAvatar component we made earlier */}
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        
        {/* Loading State */}
        {loading && (
            <div className="text-center py-10 space-y-2">
                <div className="w-8 h-8 border-2 border-matrix-green/30 border-t-matrix-green rounded-full animate-spin mx-auto" />
                <p className="text-[10px] text-matrix-green/50 animate-pulse">SCANNING DATABASE...</p>
            </div>
        )}

        {/* Empty State */}
        {!loading && gallery.length === 0 && (
            <div className="text-center py-10 text-matrix-green/30 text-xs border border-dashed border-matrix-green/20 m-4 rounded">
                NO_ARCHIVES_FOUND
            </div>
        )}

        {/* Gallery Items */}
        {!loading && gallery.map((item) => (
          <div key={item._id} className="group cursor-pointer">
            <div className="aspect-video bg-black border border-matrix-green/20 p-2 overflow-hidden group-hover:border-matrix-green group-hover:shadow-[0_0_15px_rgba(0,255,65,0.1)] transition-all relative">
              
              {/* Mini Preview (We slice the string to prevent DOM overload) */}
              <pre className="text-[3px] leading-0.75 text-matrix-green/70 opacity-50 group-hover:opacity-100 scale-x-[-1] whitespace-pre-wrap break-all overflow-hidden h-full">
                {item.asciiArt} 
              </pre>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                {/* LOAD Button (Optional functionality) */}
                <button 
                    onClick={() => onLoad && onLoad(item)} 
                    className="text-[10px] border border-matrix-green text-matrix-green px-2 py-1 hover:bg-matrix-green hover:text-black uppercase"
                >
                    Load
                </button>
                
                {/* DEL Button */}
                <button 
                    onClick={(e) => handleDelete(e, item._id)} 
                    className="text-[10px] border border-red-500 text-red-500 px-2 py-1 hover:bg-red-500 hover:text-black uppercase"
                >
                    Del
                </button>
              </div>
            </div>

            <div className="mt-1 flex justify-between text-[10px] text-matrix-green/40 font-mono">
              <span>IMG_{item._id.slice(-4).toUpperCase()}</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-matrix-green/20">
        <button 
          onClick={onLogout}
          className="w-full py-2 border border-red-500/50 text-red-500/70 text-[10px] tracking-widest hover:bg-red-500 hover:text-black transition-all"
        >
          TERMINATE SESSION
        </button>
      </div>
    </div>
  );
}