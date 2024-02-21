import { UserController } from "@/controllers/user.controller";
import { UserRepository } from "@/repositories/user.repository";
import { UserService } from "@/services/user.service";
import { EmailValidatorAdapter } from "@/utils/email-validator-adapter";
import prisma from "@/config/prisma";

export function makeUserController(): UserController {
  const emailValidator = new EmailValidatorAdapter();
  const repository = new UserRepository(prisma);
  const service = new UserService(repository, emailValidator);
  const controller = new UserController(service);
  return controller;
}
