import { Router } from "express";
import {
  makeCreateMeasureController,
  makeUpdateMeasureController,
  makeFindMeasuresController,
  makeDeleteMeasureController,
  makeFindMeasureByIdController,
} from "@/main/factories";

import { makeAuthMiddleware } from "@/main/factories/middlewares/AuthMiddlewareFactory";
import { adaptRoute } from "../adapters/express/ExpressRouteAdapter";
import { adaptMiddleware } from "../adapters/middlewares/ExpressMiddlewareAdapter";

import { makeAuthAdminMiddleware } from "@/main/factories/middlewares/AuthAdminMiddlewareFactory";

export default (router: Router): void => {
  const measureRouter = Router();

  measureRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindMeasureByIdController()));
  measureRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindMeasuresController()));

  // Admin Routes
  measureRouter.post("/create", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateMeasureController()));
  measureRouter.delete("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteMeasureController()));
  measureRouter.put("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateMeasureController()));

  router.use('/measure', measureRouter);
}
