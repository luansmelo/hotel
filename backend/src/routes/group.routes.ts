import { Request, Response, Router, NextFunction } from "express";
import { makeGroupController } from "@/factories/makeGroupController";
import { validate } from "@/middlewares/validate";
import { authenticated } from "@/middlewares/authenticated";
import { GroupInput } from "@/dto/group.dto";
import { GroupSchema } from "@/validators/group.validation";
import { allowed } from "@/middlewares/allowed";
import { ROLE } from "@/config/constants";

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
      const controller = makeGroupController();
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
      const controller = makeGroupController();
      const result = await controller.getById(id);

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
      const controller = makeGroupController();
      const result = await controller.getAll();

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
      const controller = makeGroupController();
      await controller.deleteById(id);
      return response.status(200).send({ message: "sucesso" });
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
      const controller = makeGroupController();
      const result = await controller.updateById(id, input);
      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
