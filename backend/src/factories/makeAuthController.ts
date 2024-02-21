import { UserRepository } from "@/repositories/user.repository";
import { UserService } from "@/services/user.service";
import { EmailValidatorAdapter } from "@/utils/email-validator-adapter";
import prisma from "@/config/prisma";
import { AuthController } from "@/controllers/auth.controller";

export function makeAuthController(): AuthController {
  const emailValidator = new EmailValidatorAdapter();
  const repository = new UserRepository(prisma);
  const service = new UserService(repository, emailValidator);
  const controller = new AuthController(service);
  return controller;
}
