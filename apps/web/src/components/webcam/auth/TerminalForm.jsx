import React from "react";

export default function TerminalForm({ formData, setFormData, onSubmit, isLoading }) {
  
  if (isLoading) return null;

  return (
    <form onSubmit={onSubmit} className="space-y-4 border-t border-matrix-green/20 pt-4">
      
      {/* User ID Input */}
      <div className="flex items-center gap-2 group">
        <span className="text-matrix-green whitespace-nowrap">{">"} USER_ID:</span>
        <input 
          type="text" 
          autoFocus
          className="flex-1 bg-transparent border-none outline-none text-white caret-matrix-green placeholder-matrix-green/30 uppercase font-mono"
          placeholder="ENTER_ID"
          value={formData.username}
          onChange={e => setFormData({...formData, username: e.target.value})}
        />
      </div>

      {/* Password Input */}
      <div className="flex items-center gap-2">
        <span className="text-matrix-green whitespace-nowrap">{">"} PASSCODE:</span>
        <input 
          type="password" 
          className="flex-1 bg-transparent border-none outline-none text-white caret-matrix-green placeholder-matrix-green/30 font-mono"
          placeholder="••••••"
          value={formData.password}
          onChange={e => setFormData({...formData, password: e.target.value})}
        />
      </div>

      {/* Hidden Submit for Enter Key */}
      <button type="submit" className="hidden" />
      
      <div className="pt-2 flex gap-2 text-matrix-green opacity-50 text-[10px]">
        <span>[ STATUS: WAITING_FOR_INPUT ]</span>
        <span className="animate-pulse">_</span>
      </div>
    </form>
  );
}