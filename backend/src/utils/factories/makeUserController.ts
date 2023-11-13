import { UserController } from "../../controllers/user.controller";
import prisma from "../../database";
import { UserRepository } from "../../repositories/user.repository";
import { UserService } from "../../services/user.service";

export function makeUserController(): UserController {
  const repository = new UserRepository(prisma);
  const service = new UserService(repository);
  const controller = new UserController(service);
  return controller;
}
