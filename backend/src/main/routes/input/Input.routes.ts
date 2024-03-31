import { adaptRoute } from "@/main/adapters/express/ExpressRouteAdapter";
import { adaptMiddleware } from "@/main/adapters/middlewares/ExpressMiddlewareAdapter";
import { makeCreateInputController, makeDeleteInputController, makeFindInputByIdController, makeFindInputsController, makeUpdateInputController } from "@/main/factories";
import { makeAuthAdminMiddleware } from "@/main/factories/middlewares/AuthAdminMiddlewareFactory";
import { makeAuthMiddleware } from "@/main/factories/middlewares/AuthMiddlewareFactory";
import { Router } from "express";


export default (router: Router): void => {
  const inputRouter = Router();

  inputRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindInputsController()));
  inputRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindInputByIdController()));

  // Admin Routes
  inputRouter.post("/create", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateInputController()));
  inputRouter.put("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateInputController()));
  inputRouter.delete("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteInputController()));

  router.use('/input', inputRouter);
}



