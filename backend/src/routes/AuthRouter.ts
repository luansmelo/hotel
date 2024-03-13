import { adaptRoute } from "@/adapters";

import { makeLoginController } from "@/factories/user/LoginFactory";
import { validate } from "@/middlewares/validate";
import { UserLoginSchema } from "@/validators/UserValidation";
import { Router } from "express";

export default (app: Router): void => {
    const authRouter = Router();

    authRouter.post("/", validate(UserLoginSchema), adaptRoute(makeLoginController()));

    app.use('/auth', authRouter);
}
