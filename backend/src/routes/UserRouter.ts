import { Router } from "express";
import { makeCreateUserController } from "@/factories/user/CreateUserFactory";
import { adaptMiddleware } from "@/adapters/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/authMiddleware/AuthMiddlewareFactory";
import { adaptRoute } from "@/adapters";

export default (router: Router): void => {
  const userRouter = Router();

  userRouter.post("/signup", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateUserController()));

  router.use('/user', router);
}
