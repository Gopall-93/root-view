import { useState } from "react";
import GIF from "gif.js";
import workerScript from "../utils/gif.worker.js?raw";

export function useGifRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);

  const startRecording = (asciiRef, settings, duration = 3000) => {
    if (isRecording || !asciiRef.current) return;
    
    setIsRecording(true);
    setProgress(0);

    // 1. UPSCALE SETTINGS
    // We upscale by 4x to make the text crisp
    const SCALE = 4; 
    
    // Internal dimensions (Grid size)
    const gridW = settings.resolution;
    const gridH = Math.round(settings.resolution * settings.aspectRatio);

    // Output dimensions (GIF size)
    const outputW = gridW * SCALE;
    const outputH = gridH * SCALE;

    const workerBlob = new Blob([workerScript], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(workerBlob);

    const gif = new GIF({
      workers: 2,
      quality: 1, // ✅ MAX QUALITY (1 is best, 10 is worst)
      workerScript: workerUrl,
      width: outputW,
      height: outputH,
      background: "#000000"
    });

    const frameRate = 15;
    const intervalTime = 1000 / frameRate;
    const totalFrames = (duration / 1000) * frameRate;
    let frameCount = 0;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: false });
    canvas.width = outputW;
    canvas.height = outputH;

    const interval = setInterval(() => {
      if (frameCount >= totalFrames) {
        clearInterval(interval);
        finishRecording();
        return;
      }

      drawFrame(ctx, asciiRef.current.innerText, outputW, outputH, settings.resolution);
      
      gif.addFrame(ctx, { copy: true, delay: intervalTime });
      
      frameCount++;
      setProgress(frameCount / totalFrames);
    }, intervalTime);

    const finishRecording = () => {
      gif.on('finished', (blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `ROOT_CAM_${Date.now()}.gif`;
        link.click();
        
        setIsRecording(false);
        setProgress(0);
        URL.revokeObjectURL(workerUrl);
      });

      gif.render();
    };
  };

  const drawFrame = (ctx, text, w, h, charsPerRow) => {
    // 1. Clean Slate (Solid Black)
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h);

    // 2. Text Setup
    ctx.fillStyle = "#00FF41";
    ctx.textBaseline = "top";

    // ⚡ PIXEL PERFECT SIZING
    // We calculate font size based on WIDTH to ensure it fits perfectly horizontally
    // charsPerRow is usually ~160. 
    // If width is 800px, font size should be 5px.
    // We multiply by 1.6 to account for the fact that monospace chars are taller than they are wide.
    const fontSize = (w / charsPerRow) * 1.65; 
    
    ctx.font = `bold ${fontSize}px monospace`; // Bold makes it clearer

    const lines = text.split("\n");
    // Calculate line height based on the font, not the screen height
    // This removes the "scanlines"
    const lineHeight = fontSize * 0.6; // Compress lines slightly for tighter ASCII

    // Center the block of text vertically
    const totalTextHeight = lines.length * lineHeight;
    const startY = (h - totalTextHeight) / 2;

    lines.forEach((line, i) => {
      ctx.fillText(line, 0, startY + (i * lineHeight));
    });
  };

  return { isRecording, progress, startRecording };
}