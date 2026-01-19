import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { saveCapture, getUserGallery, deleteCapture,getPublicCapture } from "../controllers/capture.controller.js";

const captureRouter = Router();

captureRouter.use(verifyJWT);

captureRouter.get("/view/:id", getPublicCapture);

captureRouter.post("/save", saveCapture);
captureRouter.get("/gallery", getUserGallery);
captureRouter.delete("/:id", deleteCapture);

export default captureRouter;