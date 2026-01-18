import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

userSchema.methods.verifyPassword = async function (receivedPassword) {
  return await bcrypt.compare(receivedPassword, this.password);
};

userSchema.statics.verifyToken = function (receivedToken) {
  try {
    return jwt.verify(receivedToken, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

userSchema.set("toJSON", {
  transform(_, ret) {
    delete ret.password;
    return ret;
  },
});

export const User = mongoose.model("User", userSchema);
