import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { urlencoded } from "express";
import { authRouter } from "./routes/auth.routes.js";
import { connectDB } from "./config/mongodbConfig.js";
import captureRouter from "./routes/capture.routes.js";

dotenv.config();

const PORT = process.env.PORT || 8080; // Default to 8080 if env is missing
const app = express();

app.use(
  cors({
    
    origin: "https://root-view-web.vercel.app", 
    credentials: true,
  })
);

app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json());

connectDB(); // Good practice to connect before listening

// Routes
app.use("/api/auth", authRouter);
app.use("/api/capture", captureRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});