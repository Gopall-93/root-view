import { useEffect, useRef } from "react";
import { convertToAscii } from "ascii-core"; 

export function useAsciiWebcam({ 
  width = 100, 
  frameRate = 30,
  aspectRatio = 0.55,
  // New Props
  contrast = 1.2,
  brightness = 10,
  charSet = "standard",
  invert = false
} = {}) {
  const videoRef = useRef(null);
  const asciiRef = useRef(null);
  const isRunningRef = useRef(false);

  // We use a "ref" for options so the loop can read the latest values
  // without needing to restart the stream every time you move a slider.
  const optionsRef = useRef({ contrast, brightness, charSet, invert });

  // Update refs when props change
  useEffect(() => {
    optionsRef.current = { contrast, brightness, charSet, invert };
  }, [contrast, brightness, charSet, invert]);

  useEffect(() => {
    // 1. Setup Camera (Same as before)
    navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          videoRef.current.onloadedmetadata = () => {
            isRunningRef.current = true;
            loop();
          };
        }
      })
      .catch(console.error);

    // 2. The Render Loop
    const loop = () => {
      if (!isRunningRef.current || !videoRef.current || !asciiRef.current) return;

      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if(!ctx) return;

      const videoRatio = video.videoHeight / video.videoWidth;
      const correctedHeight = Math.floor(width * videoRatio * aspectRatio);

      canvas.width = width;
      canvas.height = correctedHeight;

      ctx.drawImage(video, 0, 0, width, correctedHeight);
      const { data } = ctx.getImageData(0, 0, width, correctedHeight);

      // Pass the Ref values here for real-time updates!
      const asciiStr = convertToAscii(data, width, {
        contrast: optionsRef.current.contrast,
        brightness: optionsRef.current.brightness,
        set: optionsRef.current.charSet,
        invert: optionsRef.current.invert
      });

      asciiRef.current.innerText = asciiStr;
      setTimeout(() => requestAnimationFrame(loop), 1000 / frameRate);
    };

    return () => { isRunningRef.current = false; };
  }, [width, frameRate, aspectRatio]); // Only restart if geometry changes

  return { videoRef, asciiRef };
}