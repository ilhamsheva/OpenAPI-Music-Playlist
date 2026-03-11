import { Router } from "express";
import albums from "../services/album/routes/album-routes.js";
import songs from "../services/songs/routes/song-routes.js";
import users from "../services/user/routes/user-routes.js";
import authentications from "../services/authentications/routes/auth-routes.js";
import playlists from "../services/playlists/routes/playlist-routes.js";
import collaborations from "../services/collaborations/routes/collab-routes.js";
import exports from "../services/exports/routes/export-routes.js";
import uploads from "../services/uploads/routes/upload-routes.js";
import likes from "../services/likes/routes/like-routes.js";

const router = Router();

router.use("/", albums);
router.use("/", songs);
router.use("/", users);
router.use("/", authentications);
router.use("/", playlists);
router.use("/", collaborations);
router.use("/", exports);
router.use("/", uploads);
router.use("/", likes);

export default router;