import React, { useState, useEffect } from "react";
import { useAsciiWebcam } from "../hooks/useAsciiWebCam";
import { captureSnapshot } from "../utils/capture";
import api from "../libs/axios";

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

  // 2. Auth & UI State
  const [user, setUser] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // 3. Webcam Hook
  const { videoRef, asciiRef } = useAsciiWebcam({
    width: settings.resolution,
    aspectRatio: settings.aspectRatio,
    contrast: settings.contrast,
    brightness: settings.brightness,
    charSet: settings.charSet,
    invert: settings.invert,
  });

  const update = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  // --- EFFECT: Check Session on Mount ---
  useEffect(() => {
    const checkSession = async () => {
      try {
        // The browser automatically sends the HttpOnly cookie
        const { data } = await api.get("/auth/me");
        if (data.success) {
          console.log("Session restored:", data.user.username);
          setUser(data.user);
        }
      } catch (error) {
        // 401/403 means not logged in - stay as Guest
        console.log("Guest mode active");
      }
    };
    checkSession();
  }, []);

  // --- HANDLERS ---

  const handleOpenGallery = () => {
    if (user) {
      setShowGallery(true);
    } else {
      setShowAuth(true);
    }
  };

  // Handles both LOGIN and SIGNUP based on the modal state
  const handleAuthSubmit = async (formData, isLoginMode) => {
    try {
      const endpoint = isLoginMode ? "/auth/login" : "/auth/signup";

      const { data } = await api.post(endpoint, {
        username: formData.username,
        password: formData.password,
      });

      if (data.success) {
        setUser(data.user);
        setShowAuth(false);
        setShowGallery(true);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Connection Failed";

      console.error("Auth Failed:", message);

      throw new Error(message);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setShowGallery(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleCapture = async () => {
    // 1. Visual Flash Effect
    const flash = document.getElementById("flash-overlay");
    if (flash) {
      flash.style.opacity = "1";
      setTimeout(() => (flash.style.opacity = "0"), 100);
    }

    // 2. Get Data
    if (!asciiRef.current) return;
    const asciiText = asciiRef.current.innerText;

    // 3. Local Download (Always do this)
    captureSnapshot(asciiText, settings);

    // 4. Cloud Save (If Logged In)
    if (user) {
      try {
        console.log("Archiving to cloud...");
        await api.post("/capture/save", {
          asciiArt: asciiText,
          settings: settings,
        });
        console.log("Capture archived successfully.");
      } catch (error) {
        console.error("Failed to archive capture:", error);
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-mono text-matrix-green selection:bg-matrix-green selection:text-black">
      {/* Background */}
      <AsciiFeed videoRef={videoRef} asciiRef={asciiRef} />

      {/* HUD */}
      <HudOverlay
        settings={settings}
        user={user}
        onCapture={handleCapture} // Connected to new logic
        onOpenGallery={handleOpenGallery}
      />

      {/* Sidebars */}
      <SettingsSidebar
        settings={settings}
        update={update}
        isOpen={settings.showSettings}
        onToggle={() => update("showSettings", !settings.showSettings)}
      />

      <GallerySidebar
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        user={user}
        onLogout={handleLogout} // Connected to API logout
      />

      {/* Modals */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleAuthSubmit} // Connected to API login/signup
      />
    </div>
  );
}
