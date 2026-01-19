export function captureSnapshot(asciiText, settings) {
  const { resolution, charSet } = settings;
  
  
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const fontSize = 12;
  const lineHeight = 12;
  const lines = asciiText.split("\n");
  const width = lines[0].length * (fontSize * 0.6);
  const height = lines.length * lineHeight;

  canvas.width = width + 40; 
  canvas.height = height + 40;

  ctx.fillStyle = "#0D0D0D";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px "VT323", monospace`;
  ctx.fillStyle = "#00FF41";
  ctx.textBaseline = "top";

  
  ctx.shadowColor = "#00FF41";
  ctx.shadowBlur = 4;

  lines.forEach((line, i) => {
    
    ctx.fillText(line, 20, 20 + (i * lineHeight));
  });

  const link = document.createElement("a");
  link.download = `root_view_${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}