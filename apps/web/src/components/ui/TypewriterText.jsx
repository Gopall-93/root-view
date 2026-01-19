import React, { useState, useEffect } from "react";

export default function TypewriterText({ text, speed = 20, onComplete }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);

    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return (
    <span className="font-mono">
      {displayedText}
      {isTyping && (
        <span className="inline-block w-2 h-4 bg-matrix-green ml-1 animate-pulse align-middle shadow-[0_0_5px_rgba(0,255,65,0.8)]" />
      )}
    </span>
  );
}