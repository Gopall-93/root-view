import React, { useState, useEffect } from "react";
import { useAsciiWebcam } from "../hooks/useAsciiWebCam";
import { captureSnapshot } from "../utils/capture";
import api from "../libs/axios";
import { useGifRecorder } from "../hooks/useGifRecorder";

// Components
import AsciiFeed from "./webcam/AsciiFeed";
import HudOverlay from "./webcam/HudOverlay";
import SettingsSidebar from "./webcam/SettingsSlider";
import GallerySidebar from "./webcam/GallerySidebar";
import AuthModal from "./webcam/AuthModal";


export default function WebcamAscii() {
  // 1. Settings State
  const [settings, setSettings] = useState({
    resolution: 160,
    contrast: 1.2,
    brightness: 20,
    aspectRatio: 0.55,
    charSet: "blocks",
    invert: false,
    showSettings: false,
  });

  const [user, setUser] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // ✅ FIX 1: Add a trigger state for gallery refresh
  const [galleryRefreshTrigger, setGalleryRefreshTrigger] = useState(0);

  // ✅ FIX 2: Add state for "Frozen/Loaded" image
  const [frozenFrame, setFrozenFrame] = useState(null);

  const { isRecording, progress, startRecording } = useGifRecorder();

  const handleRecordGif = () => {
    // Record for 3 seconds
    startRecording(asciiRef, settings, 3000);
  };

  const { videoRef, asciiRef } = useAsciiWebcam({
    width: settings.resolution,
    aspectRatio: settings.aspectRatio,
    contrast: settings.contrast,
    brightness: settings.brightness,
    charSet: settings.charSet,
    invert: settings.invert,
    // Pass frozenFrame so the hook can pause if needed (optional depending on hook impl)
    active: !frozenFrame,
  });

  const update = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  // Session Check
  useEffect(() => {
    api
      .get("/auth/me")
      .then(({ data }) => {
        if (data.success) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  // --- HANDLERS ---

  // ✅ NEW: Handle Loading an Image from Gallery
  const handleLoadImage = (captureItem) => {
    console.log("Loading image...", captureItem._id);

    // 1. Show the image
    setFrozenFrame(captureItem.asciiArt);

    // 2. "Remove" (Close) the Gallery Sidebar
    setShowGallery(false);
  };

  // ✅ NEW: Clear the frozen frame (return to webcam)
  const handleResumeFeed = () => {
    setFrozenFrame(null);
  };

  const handleCapture = async () => {
    // Visual Flash
    const flash = document.getElementById("flash-overlay");
    if (flash) {
      flash.style.opacity = "1";
      setTimeout(() => (flash.style.opacity = "0"), 100);
    }

    // Logic
    if (!asciiRef.current && !frozenFrame) return;

    // Capture what is currently on screen (either live feed or frozen frame)
    const currentAscii = frozenFrame || asciiRef.current.innerText;

    // Local Save
    captureSnapshot(currentAscii, settings);

    // Cloud Save
    if (user) {
      try {
        await api.post("/capture/save", { asciiArt: currentAscii, settings });

        // ✅ FIX 1 APPLIED: Trigger the gallery to reload immediately
        setGalleryRefreshTrigger((prev) => prev + 1);
      } catch (error) {
        console.error("Save failed", error);
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-mono text-matrix-green selection:bg-matrix-green selection:text-black">
      {/* ✅ FIX 2 APPLIED: Render Frozen Frame if it exists, otherwise render AsciiFeed.
          We overlay the Frozen Frame on top of the feed.
      */}
      <AsciiFeed videoRef={videoRef} asciiRef={asciiRef} />

      {/* FROZEN FRAME OVERLAY */}
      {frozenFrame && (
        <div className="absolute inset-0 bg-black z-10 flex items-center justify-center overflow-hidden">
          <pre className="text-[8px] leading-[6px] md:text-[10px] md:leading-[8px] whitespace-pre text-center scale-x-[-1]">
            {frozenFrame}
          </pre>
          {/* "Exit" Button to go back to camera */}
          <button
            onClick={handleResumeFeed}
            className="absolute bottom-10 px-6 py-2 bg-red-500 text-black font-bold uppercase tracking-widest hover:bg-white transition-all animate-bounce"
          >
            RESUME LIVE FEED
          </button>
        </div>
      )}

      {/* HUD */}
      <HudOverlay
        settings={settings}
        user={user}
        onCapture={handleCapture}
        onOpenGallery={() => { if(user) setShowGallery(true); else setShowAuth(true); }}
        isFrozen={!!frozenFrame}
        isRecording={isRecording}
        recordingProgress={progress}
        onRecord={handleRecordGif}
      />

      {/* Sidebar */}
      <SettingsSidebar
        settings={settings}
        update={update}
        isOpen={settings.showSettings}
        onToggle={() => update("showSettings", !settings.showSettings)}
      />

      {/* ✅ FIX 1 & 2 PASSED DOWN: 
         - Pass refreshTrigger so it re-fetches
         - Pass handleLoadImage so "LOAD" button works
      */}
      <GallerySidebar
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        user={user}
        onLogout={async () => {
          await api.post("/auth/logout");
          setUser(null);
          setShowGallery(false);
        }}
        refreshTrigger={galleryRefreshTrigger} // <--- Forces reload
        onLoad={handleLoadImage} // <--- Handles "LOAD" click
      />

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={async (data, isLogin) => {
          // ... (Same login logic as before) ...
          // Just copying the core logic for brevity:
          const ep = isLogin ? "/auth/login" : "/auth/signup";
          const res = await api.post(ep, data);
          if (res.data.success) {
            setUser(res.data.user);
            setShowAuth(false);
            setShowGallery(true);
          }
        }}
      />

      {/* Flash Overlay */}
      <div
        id="flash-overlay"
        className="absolute inset-0 bg-white opacity-0 pointer-events-none transition-opacity duration-100 z-50 mix-blend-difference"
      />
    </div>
  );
}
