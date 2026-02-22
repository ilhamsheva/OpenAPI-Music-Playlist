import { Router } from "express";
import albums from "../services/album/routes/album-routes.js";
import songs from "../services/songs/routes/song-routes.js";

const router = Router();

router.use("/", albums);
router.use("/", songs);

export default router;