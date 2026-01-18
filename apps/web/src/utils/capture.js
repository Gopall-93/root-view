export function captureSnapshot(asciiText, settings) {
  const { resolution, charSet } = settings;
  
  // 1. Setup a temporary canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // 2. Calculate dimensions
  // We estimate char dimensions based on the resolution
  const fontSize = 12;
  const lineHeight = 12;
  const lines = asciiText.split("\n");
  const width = lines[0].length * (fontSize * 0.6); // approx char width
  const height = lines.length * lineHeight;

  canvas.width = width + 40; // Add padding
  canvas.height = height + 40;

  // 3. Paint the Background (Matrix Black)
  ctx.fillStyle = "#0D0D0D";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 4. Paint the Text (Matrix Green)
  ctx.font = `${fontSize}px "VT323", monospace`;
  ctx.fillStyle = "#00FF41";
  ctx.textBaseline = "top";

  
  ctx.shadowColor = "#00FF41";
  ctx.shadowBlur = 4;

  lines.forEach((line, i) => {
    
    ctx.fillText(line, 20, 20 + (i * lineHeight));
  });

  const link = document.createElement("a");
  link.download = `phosphor_capture_${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}