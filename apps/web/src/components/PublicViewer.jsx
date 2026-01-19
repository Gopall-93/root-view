import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../libs/axios";

export default function PublicViewer() {
  const { id } = useParams();
  const [capture, setCapture] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/capture/view/${id}`)
      .then(res => setCapture(res.data.capture))
      .catch(err => setError("ARCHIVE_CORRUPTED_OR_MISSING"));
  }, [id]);

  if (error) return <div className="h-screen bg-black text-red-500 font-mono flex items-center justify-center">{error}</div>;
  if (!capture) return <div className="h-screen bg-black text-matrix-green font-mono flex items-center justify-center animate-pulse">DECRYPTING...</div>;

  return (
    <div className="min-h-screen bg-black text-matrix-green font-mono flex flex-col items-center justify-center p-4">
      <div className="border border-matrix-green/30 p-4 bg-[#050505] shadow-[0_0_50px_rgba(0,255,65,0.1)] max-w-full overflow-auto">
         {/* The ASCII Art Display */}
         <pre className="text-[2px] leading-[2px] whitespace-pre-wrap font-mono scale-x-[-1] select-all">
            {capture.asciiArt}
         </pre>
      </div>

      <div className="mt-8 flex gap-4">
        <Link to="/" className="px-6 py-2 border border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-black transition-all uppercase tracking-widest text-xs">
          Launch Your Own Terminal
        </Link>
      </div>
    </div>
  );
}