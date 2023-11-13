import { Request, Response, Router, NextFunction } from "express";
import { validate } from "../middleware/validate";
import { UserLoginData, UserRegistrationData } from "../dto/user.dto";
import { makeUserController } from "../utils/factories/makeUserController";
import { UserLoginSchema, UserSchema } from "../validation/user.validation";

const router = Router();
const slug = "/user";

router.post(
  "/signup",
  validate(UserSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: UserRegistrationData = UserSchema.parse(
        request.body
      ) as UserRegistrationData;
      const controller = makeUserController();
      const result = await controller.signup(input);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/signin",
  validate(UserLoginSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: UserLoginData = UserLoginSchema.parse(
        request.body
      ) as UserLoginData;
      const controller = makeUserController();
      const result = await controller.signin(input);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
