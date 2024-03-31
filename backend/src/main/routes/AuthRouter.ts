
import { makeLoginController } from "@/main/factories/user/LoginFactory";
import { Router } from "express";
import { adaptRoute } from "../adapters/express/ExpressRouteAdapter";

export default (app: Router): void => {
    const authRouter = Router();

    authRouter.post("/", adaptRoute(makeLoginController()));

    app.use('/auth', authRouter);
}
