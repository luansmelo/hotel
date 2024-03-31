import { Router } from "express";

import {
  makeCreateInputController,
  makeDeleteInputController,
  makeFindInputsController,
  makeUpdateInputController,
  makeFindInputByIdController,
} from "@/main/factories/input";
import { adaptRoute } from "../adapters/express/ExpressRouteAdapter";
import { adaptMiddleware } from "../adapters/middlewares/ExpressMiddlewareAdapter";

import { makeAuthMiddleware } from "@/main/factories/middlewares/AuthMiddlewareFactory";
import { makeAuthAdminMiddleware } from "@/main/factories/middlewares/AuthAdminMiddlewareFactory";

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



