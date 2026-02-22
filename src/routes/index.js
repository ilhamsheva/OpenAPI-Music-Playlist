import { Router } from "express";
import albums from "../services/album/routes/album-routes.js";

const router = Router();

router.use("/", albums);

export default router;