import { Router } from "express";
import { makeCreateUserController } from "@/factories/user/CreateUserFactory";
import { adaptMiddleware } from "@/controllers/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/middlewares/AuthMiddlewareFactory";
import { adaptRoute } from "@/adapters";

export default (router: Router): void => {
  const userRouter = Router();

  userRouter.post("/signup", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateUserController()));

  router.use('/user', router);
}
