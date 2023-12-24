import { Request, Response, Router, NextFunction } from "express";
import { makeGroupController } from "../utils/factories/makeGroupController";
import { validate } from "../middleware/validate";
import { authenticated } from "../middleware/authenticated";
import { GroupInput } from "../dto/group.dto";
import { GroupSchema } from "../validation/group.validation";

const router = Router();
const slug = "/group";

router.post(
  "/create",
  authenticated,
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

export { router, slug };
