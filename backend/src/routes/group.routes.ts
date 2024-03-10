import { Request, Response, Router, NextFunction } from "express";
import {
  makeCreateGroupController,
  makeUpdateGroupController,
  makeFindGroupByIdController,
  makeFindGroupsController,
  makeDeleteGroupController,
} from "@/factories";
import { GroupInput } from "@/dto/group/group.dto";
import { GroupSchema } from "@/validators/group.validation";
import { ROLE } from "@/config/constants";
import { allowed, authenticated, validate } from "@/middlewares";

const router = Router();
const slug = "/group";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
  validate(GroupSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: GroupInput = GroupSchema.parse(request.body) as GroupInput;
      const controller = makeCreateGroupController();

      const result = await controller.create(input);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);
  
router.get(
  "/:id",
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeFindGroupByIdController();

      const result = await controller.findById(id);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const controller = makeFindGroupsController();

      const result = await controller.findAll();

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  authenticated,
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeDeleteGroupController();
      const result = await controller.deleteById(id);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  authenticated,
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const input = request.body;
      const controller = makeUpdateGroupController();

      const result = await controller.updateById(id, input);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
