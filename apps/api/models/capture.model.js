import mongoose, { Schema } from "mongoose";

const captureSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    asciiArt: {
      type: String,
      required: true,
    },

    settings: {
      resolution: { type: Number, required: true },
      aspectRatio: { type: Number, default: 0.55 },
      contrast: { type: Number, default: 1.0 },
      brightness: { type: Number, default: 0 },
      charSet: { type: String, default: "standard" },
      invert: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

export const Capture = mongoose.model("Capture", captureSchema);
