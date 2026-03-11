import { Router } from "express";
import authenticationToken from "../../../middlewares/auth.js"

import { exportPlaylistSchema } from "../../validator/schema.js";
import { exportPlaylist } from "../controller/export-controller.js";
import validate from "../../../middlewares/validate.js";

const router = Router();

router.post("/export/playlists/:id", authenticationToken, validate(exportPlaylistSchema), exportPlaylist);

export default router;