import { Router } from "express";

import {
  makeCreateInputController,
  makeDeleteInputController,
  makeFindInputsController,
  makeUpdateInputController,
  makeFindInputByIdController,
} from "@/factories/input";

import { adaptRoute } from "@/adapters/ExpressRouteAdapter";
import { adaptMiddleware } from "@/controllers/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/middlewares/AuthMiddlewareFactory";
import { makeAuthAdminMiddleware } from "@/factories/middlewares/AuthAdminMiddlewareFactory";

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



