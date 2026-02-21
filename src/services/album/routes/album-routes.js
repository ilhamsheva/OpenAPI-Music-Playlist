import { Router } from "express";
import { addAlbumHandler, deleteAlbumByIdHandler, getAlbumByIdHandler, updateAlbumByIdHandler } from "../controller/album-controller.js";
import validate from "../../../middlewares/validate.js";
import { albumSchema } from "../../validator/schema.js";

const router = Router();

router.post("/albums", validate(albumSchema), addAlbumHandler);
router.get("/albums/:id", validate(albumSchema), getAlbumByIdHandler);
router.put("/albums/:id", validate(albumSchema), updateAlbumByIdHandler);
router.delete("/albums/:id", validate(albumSchema), deleteAlbumByIdHandler);

export default router;