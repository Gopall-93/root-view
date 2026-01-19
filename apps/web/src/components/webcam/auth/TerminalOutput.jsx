import React, { useEffect, useRef } from "react";

export default function TerminalOutput({ logs, isLoading }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom whenever logs change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1 mb-4">
      {logs.map((log, index) => (
        <p
          key={index}
          // ✅ Check the isError flag to decide the color
          className={`${
            log.isError 
                ? "text-red-500 text-shadow-[0_0_5px_rgba(239,68,68,0.5)]" 
                : "text-matrix-green"
          }`}
        >
          {/* Render the text property */}
          {log.text}
        </p>
      ))}

      {/* Blinking Cursor Effect when loading */}
      {isLoading && (
        <p className="text-matrix-green animate-pulse"> `&gt;` <span className="inline-block w-2 h-4 bg-matrix-green ml-1 animate-blink"/>
        </p>
      )}
      <div ref={bottomRef} />
    </div>
  );
}