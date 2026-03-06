import { Router } from "express";
import { addUserHandler } from "../controller/user-controller.js";
import { userSchemaPayload } from "../../validator/schema.js";
import validate from "../../../middlewares/validate.js"

const router = Router();

router.post("/users", validate(userSchemaPayload), addUserHandler);

export default router;