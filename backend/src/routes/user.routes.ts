import { Request, Response, Router, NextFunction } from "express";
import { validate } from "../middlewares/validate";
import { UserLoginInput, UserContractInput } from "../dto/user.dto";
import { makeUserController } from "../factories/makeUserController";
import { UserLoginSchema, UserSchema } from "../validators/user.validation";

const router = Router();
const slug = "/user";

router.post(
  "/signup",
  validate(UserSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: UserContractInput = UserSchema.parse(
        request.body
      ) as UserContractInput;
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
      const input: UserLoginInput = UserLoginSchema.parse(
        request.body
      ) as UserLoginInput;
      const controller = makeUserController();
      const result = await controller.signin(input);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
