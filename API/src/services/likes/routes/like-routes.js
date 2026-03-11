import express from "express";
import { addLikeHandler, deleteAlbumLikesHandler, getAlbumLikesHandler } from "../controller/like-controller.js";
import authenticationToken from "../../../middlewares/auth.js";

const router = express.Router();

router.post("/albums/:id/likes", authenticationToken, addLikeHandler);
router.get("/albums/:id/likes", getAlbumLikesHandler);
router.delete("/albums/:id/likes", authenticationToken, deleteAlbumLikesHandler);

export default router;
