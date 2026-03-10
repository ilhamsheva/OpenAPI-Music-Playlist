import { Router } from "express";
import { upload } from "../storage/storage-config.js";
import { uploadImages } from "../controller/upload-controller.js";

const router = Router();

router.post("/albums/:id/covers", upload.single("cover"), uploadImages);

export default router;
