import { Router } from "express";
import validate from "../../../middlewares/validate.js";
import { songsQuerySchema, songsSchema } from "../../validator/schema.js";
import { addSongHandler, deleteSongByIdHandler, editSongByIdHandler, getAllSongsHandler, getSongByIdHandler } from "../controller/song-controller.js";
import validateQuery from "../../../middlewares/validateQuery.js";

const router = Router();

router.post("/songs", validate(songsSchema), addSongHandler);
router.get("/songs", validateQuery(songsQuerySchema), getAllSongsHandler);
router.get("/songs/:id", getSongByIdHandler);
router.put("/songs/:id", validate(songsSchema), editSongByIdHandler);
router.delete("/songs/:id", deleteSongByIdHandler);

export default router;