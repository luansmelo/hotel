import { Request, Response, Router, NextFunction } from "express";
import { validate } from "@/middlewares/validate";
import { UserSchema } from "@/validators/user.validation";
import { CreateUserModel } from "@/entities/user/createUser";
import { makeCreateUserController } from "@/factories/user/createUser/createUserFactory";

const router = Router();
const slug = "/user";

router.post(
  "/signup",
  validate(UserSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: CreateUserModel = UserSchema.parse(
        request.body
      ) as CreateUserModel;
      const controller = makeCreateUserController();

      const result = await controller.signup(input);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
