import { Router } from "express";

import {
  makeCreateInputController,
  makeDeleteInputController,
  makeFindInputsController,
  makeUpdateInputController,
  makeFindInputByIdController,
} from "@/factories/input";

import { adaptRoute } from "@/adapters/ExpressRouteAdapter";
import { adaptMiddleware } from "@/adapters/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/authMiddleware/AuthMiddlewareFactory";

export default (router: Router): void => {
  const inputRouter = Router();

  inputRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindInputsController()));
  inputRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindInputByIdController()));

  // Admin Routes
  inputRouter.post("/create", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateInputController()));
  inputRouter.put("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateInputController()));
  inputRouter.delete("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteInputController()));

  router.use('/input', inputRouter);
}



