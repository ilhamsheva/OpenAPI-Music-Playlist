import { Router } from "express";
import {
    addPlaylistHandler,
    getPlaylistsHandler,
    deletePlaylistHandler,
    addSongToPlaylistHandler,
    getSongsFromPlaylistHandler,
    deleteSongFromPlaylistHandler,
    getPlaylistActivitiesHandler
} from "../controller/playlist-controller.js";
import authenticate from "../../../middlewares/auth.js";
import validate from "../../../middlewares/validate.js";
import { playlistSchema, songIdSchema } from "../../validator/schema.js";

const router = Router();

router.post("/playlists", authenticate, validate(playlistSchema), addPlaylistHandler);
router.get("/playlists", authenticate, getPlaylistsHandler);
router.delete("/playlists/:id", authenticate, deletePlaylistHandler);

router.post("/playlists/:id/songs", authenticate, validate(songIdSchema), addSongToPlaylistHandler);
router.get("/playlists/:id/songs", authenticate, getSongsFromPlaylistHandler);
router.delete("/playlists/:id/songs", authenticate, validate(songIdSchema), deleteSongFromPlaylistHandler);

router.get("/playlists/:id/activities", authenticate, getPlaylistActivitiesHandler);

export default router;
