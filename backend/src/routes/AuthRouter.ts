import { adaptRoute } from "../adapters";

import { makeLoginController } from "@/factories/user/LoginFactory";
import { Router } from "express";

export default (app: Router): void => {
    const authRouter = Router();

    authRouter.post("/", adaptRoute(makeLoginController()));

    app.use('/auth', authRouter);
}
