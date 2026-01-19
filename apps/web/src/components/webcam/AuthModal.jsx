import { useState, useEffect } from "react";
import TerminalOutput from "./auth/TerminalOutput";
import TerminalForm from "./auth/TerminalForm";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });
  // ✅ CHANGE 1: Logs now hold objects, not just strings
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ HELPER: Makes adding logs easier
  const addLog = (text, isError = false) => {
    setLogs((prev) => [...prev, { text, isError }]);
  };

  // Reset logs when modal opens
  useEffect(() => {
    if (isOpen) {
      setLogs([]);
      setIsLoading(false);
      const boot = async () => {
        addLog("> ESTABLISHING SECURE CONNECTION...");
        await wait(600);
        addLog("> HANDSHAKE PROTOCOL: INITIATED");
        await wait(400);
        addLog("> AWAITING CREDENTIALS...");
      };
      boot();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading || !formData.username || !formData.password) return;

    setIsLoading(true);
    const action = isLogin ? "AUTHENTICATION" : "REGISTRATION";
    
    // 1. Start sequence using the helper
    addLog(`> INITIATING ${action} FOR USER: ${formData.username}`);
    addLog("> RESOLVING HOST...");
    addLog("> ENCRYPTING PAYLOAD...");
    
    await wait(800);

    try {
      // 2. ACTUAL API CALL
      await onLogin(formData, isLogin);

      // --- SUCCESS PATH ---
      const successSteps = isLogin
        ? [
            "> VERIFYING HASH INTEGRITY... [OK]",
            "> DECRYPTING USER PROFILE... [OK]",
            "> ACCESS GRANTED."
          ]
        : [
            "> ALLOCATING MEMORY SECTOR... [OK]",
            "> GENERATING PRIVATE KEYS... [OK]",
            "> NEW IDENTITY ESTABLISHED."
          ];

      for (const step of successSteps) {
        addLog(step); // Default is green
        await wait(400);
      }

      await wait(500);
      setIsLoading(false);

    } catch (error) {
      // --- ERROR PATH ---
      const errorMsg = error.message || "UNKNOWN_ERROR";
       
      addLog("> VERIFYING HASH INTEGRITY...");
      await wait(400);

      // ✅ CHANGE 2: Pass 'true' to make these red
      addLog(`> [ERROR]: ${errorMsg.toUpperCase()}`, true); 
      await wait(400);
      addLog("> ACCESS DENIED.", true);
      await wait(400);
      addLog("> TERMINATING SESSION...", true);

      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm font-mono text-xs md:text-sm">
      <div className="w-125 border border-matrix-green bg-[#050505] shadow-[0_0_50px_rgba(0,255,65,0.15)] flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="bg-matrix-green/10 border-b border-matrix-green/30 px-4 py-2 flex justify-between items-center select-none">
          <div className="flex gap-2">
            <div
              className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500 cursor-pointer hover:bg-red-500"
              onClick={!isLoading ? onClose : undefined}
            />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500" />
          </div>
          <span className="text-matrix-green/70 tracking-widest text-[10px]">
            root@system:~/auth_protocol
          </span>
        </div>

        {/* Main Terminal Area */}
        <div className="p-6 text-matrix-green flex flex-col h-100">
          {/* We pass the new object-based logs here */}
          <TerminalOutput logs={logs} isLoading={isLoading} />
          
          <TerminalForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        {/* Footer Actions */}
        <div className="border-t border-matrix-green/30 p-4 flex justify-between items-center bg-matrix-green/5">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
                setLogs([]); 
                setIsLogin(!isLogin);
            }}
            className="text-[12px] text-matrix-green/60 hover:text-white hover:underline decoration-dashed uppercase tracking-wider disabled:opacity-30"
          >
            [{isLogin ? "EXECUTE: NEW_USER_SETUP" : "RETURN: LOGIN_PROMPT"}]
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`
              px-4 py-1 border border-matrix-green text-[10px] font-bold uppercase tracking-widest transition-all
              ${
                isLoading
                  ? "bg-matrix-green text-black opacity-50 cursor-wait"
                  : "text-matrix-green hover:bg-matrix-green hover:text-black"
              }
            `}
          >
            {isLoading ? "PROCESSING..." : isLogin ? "INITIALIZE" : "REGISTER"}
          </button>
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-size[100%_4px] pointer-events-none" />
      </div>
    </div>
  );
}