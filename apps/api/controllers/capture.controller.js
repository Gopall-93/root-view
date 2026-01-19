import { Capture } from "../models/capture.model.js";

export const saveCapture = async (req, res) => {
  try {
    const { asciiArt, settings } = req.body;
    const userId = req.userId;

    if (!asciiArt) {
      return res
        .status(400)
        .json({ success: false, message: "No ASCII data provided" });
    }

    const newCapture = new Capture({
      userId,
      asciiArt,
      settings,
    });

    await newCapture.save();

    return res.status(201).json({
      success: true,
      message: "Capture saved to archives",
      capture: newCapture,
    });
  } catch (error) {
    console.error("Save Capture Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to archive data" });
  }
};

export const getUserGallery = async (req, res) => {
  try {
    const userId = req.userId;

    const gallery = await Capture.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error("Gallery Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve archives" });
  }
};

export const deleteCapture = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deleted = await Capture.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "File not found or access denied" });
    }

    return res
      .status(200)
      .json({ success: true, message: "File purged from system" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
};
export const getPublicCapture = async (req, res) => {
  try {
    const { id } = req.params;
    const capture = await Capture.findById(id);

    if (!capture) {
      return res.status(404).json({ message: "Capture not found or deleted" });
    }

    return res.status(200).json({
      success: true,
      capture: {
        asciiArt: capture.asciiArt,
        createdAt: capture.createdAt,
        settings: capture.settings
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};