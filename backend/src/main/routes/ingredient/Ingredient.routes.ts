import { adaptRoute } from "@/main/adapters/express/ExpressRouteAdapter";
import { adaptMiddleware } from "@/main/adapters/middlewares/ExpressMiddlewareAdapter";
import { makeCreateInputController, makeDeleteInputController, makeFindIngredientByIdController, makeFindInputsController, makeUpdateInputController } from "@/main/factories";
import { makeAuthAdminMiddleware } from "@/main/factories/middlewares/AuthAdminMiddlewareFactory";
import { makeAuthMiddleware } from "@/main/factories/middlewares/AuthMiddlewareFactory";
import { Router } from "express";

export default (router: Router): void => {
  const ingredientRouter = Router();

  ingredientRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindInputsController()));
  ingredientRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindIngredientByIdController()));

  // Admin Routes
  ingredientRouter.post("/", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateInputController()));
  ingredientRouter.put("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateInputController()));
  ingredientRouter.delete("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteInputController()));

  router.use('/ingredient', ingredientRouter);
}



