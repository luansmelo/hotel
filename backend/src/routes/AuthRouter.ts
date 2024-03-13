import { adaptRoute } from "@/adapters";

import { makeAuthController } from "@/factories/auth/CreateAuthFactory";
import { validate } from "@/middlewares/validate";
import { UserLoginSchema } from "@/validators/UserValidation";
import { Router } from "express";

const router = Router();
const slug = "/auth";

router.post("/", validate(UserLoginSchema), adaptRoute(makeAuthController()));

export { router, slug };
