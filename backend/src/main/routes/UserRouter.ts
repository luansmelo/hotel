import { Router } from "express";
import { makeCreateUserController } from "@/main/factories/user/CreateUserFactory";
import { adaptRoute } from "../adapters/express/ExpressRouteAdapter";
import { adaptMiddleware } from "../adapters/middlewares/ExpressMiddlewareAdapter";

import { makeFindUsersFactory } from "@/main/factories/user/FindUsersFactory";
import { makeAuthAdminMiddleware } from "@/main/factories/middlewares/AuthAdminMiddlewareFactory";

export default (router: Router): void => {
  const userRouter = Router();

  userRouter.post("/signup", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateUserController()));
  userRouter.get("/", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeFindUsersFactory()));
  
  router.use('/user', userRouter);
}
