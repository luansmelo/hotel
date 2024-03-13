import { Request, Response, Router, NextFunction } from "express";
import {
  makeCreateGroupController,
  makeUpdateGroupController,
  makeFindGroupByIdController,
  makeFindGroupsController,
  makeDeleteGroupController,
} from "@/factories";

import { GroupSchema } from "@/validators/GroupValidation";
import { ROLE } from "@/config/constants";
import { allowed, authenticated, validate } from "@/middlewares";
import { CreateGroupModel } from "@/entities/group/createGroup";
import { Sort } from "@/entities/group/FindGroupsParams";

const router = Router();
const slug = "/group";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
  validate(GroupSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: CreateGroupModel = GroupSchema.parse(
        request.body
      ) as CreateGroupModel;
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
      const { order, sort, page } = request.query;

      const controller = makeFindGroupsController();

      const findParams = {
        order: order as "asc" | "desc",
        sort: sort as Sort,
        page: parseInt(page as string, 10),
      };

      const result = await controller.findAll(findParams);

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
