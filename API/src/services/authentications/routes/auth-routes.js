import { Router } from "express";
import validate from "../../../middlewares/validate.js";
import { loginSchema, refreshTokenSchema } from "../../validator/schema.js";
import { login, logout, refreshToken } from "../controller/auth-controller.js";

const router = Router();

router.post("/authentications", validate(loginSchema), login);
router.put("/authentications", validate(refreshTokenSchema), refreshToken);
router.delete("/authentications", validate(refreshTokenSchema), logout);

export default router;