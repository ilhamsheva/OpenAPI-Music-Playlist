import { Router } from "express";
import authenticate from "../../../middlewares/auth.js";
import validate from "../../../middlewares/validate.js";
import { collaborationSchema } from "../../validator/schema.js";
import { addCollaborationHandler, deleteCollaborationHandler } from "../controller/collab-controller.js";

const router = Router();

router.post("/collaborations", authenticate, validate(collaborationSchema), addCollaborationHandler);
router.delete("/collaborations", authenticate, validate(collaborationSchema), deleteCollaborationHandler);

export default router;