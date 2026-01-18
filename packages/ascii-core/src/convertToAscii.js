// Define our "Themes"
const CHARSETS = {
  standard: " .:-=+*#%@",
  simple: " .•*#@",
  blocks: " ░▒▓█",
  matrix: " 01",
  edges: " .'/\\|_",
};

export function convertToAscii(pixelData, width, options = {}) {
  const { 
    contrast = 1.2, 
    brightness = 10,
    set = "standard", 
    invert = false    
  } = options;

 
  const chars = CHARSETS[set] || CHARSETS.standard;
  let asciiStr = "";
  const charsLen = chars.length;
  const len = pixelData.length;

  for (let i = 0; i < len; i += 4) {
    const r = pixelData[i];
    const g = pixelData[i + 1];
    const b = pixelData[i + 2];

    
    let grey = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);

   
    grey = ((grey - 128) * contrast) + 128 + brightness;
    grey = Math.max(0, Math.min(255, grey));

    if (invert) grey = 255 - grey;

 
    const charIndex = Math.floor((grey / 255) * (charsLen - 1));
    asciiStr += chars[charIndex];

    if (((i / 4) + 1) % width === 0) {
      asciiStr += "\n";
    }
  }

  return asciiStr;
}