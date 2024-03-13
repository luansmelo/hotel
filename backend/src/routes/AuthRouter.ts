import { adaptRoute } from "@/adapters";

import { makeLoginController } from "@/factories/user/LoginFactory";
import { validate } from "@/middlewares/validate";
import { UserLoginSchema } from "@/validators/UserValidation";
import { Router } from "express";

const router = Router();
const slug = "/auth";

router.post("/", validate(UserLoginSchema), adaptRoute(makeLoginController()));

export { router, slug };
