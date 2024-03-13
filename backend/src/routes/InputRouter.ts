import { Router } from "express";
import { InputSchema } from "@/validators/InputValidation";
import { ROLE } from "@/config/constants";
import { allowed, authenticated, validate } from "@/middlewares";
import {
  makeCreateInputController,
  makeDeleteInputController,
  makeFindInputsController,
  makeUpdateInputController,
  makeFindInputByIdController,
} from "@/factories/input";

import { adaptRoute } from "@/adapters/ExpressRouteAdapter";

const router = Router();
const slug = "/input";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
  validate(InputSchema),
  adaptRoute(makeCreateInputController())
);

router.get(
  "/",
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
  adaptRoute(makeFindInputsController())
);

router.get(
  "/:id",
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
  adaptRoute(makeFindInputByIdController())
);

router.put(
  "/:id",
  authenticated,
  allowed([ROLE.Admin]),
  validate(InputSchema),
  adaptRoute(makeUpdateInputController())
);

router.delete(
  "/:id",
  authenticated,
  allowed([ROLE.Admin]),
  adaptRoute(makeDeleteInputController())
);

export { router, slug };
