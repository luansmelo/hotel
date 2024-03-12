import { CreateAuthModel } from "@/entities/auth/auth";
import { makeAuthController } from "@/factories/auth/CreateAuthFactory";
import { validate } from "@/middlewares/validate";
import { UserLoginSchema } from "@/validators/UserValidation";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();
const slug = "/auth";

router.post(
  "/",
  validate(UserLoginSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: CreateAuthModel = UserLoginSchema.parse(
        request.body
      ) as CreateAuthModel;

      const controller = makeAuthController();

      const result = await controller.authenticate(input);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
