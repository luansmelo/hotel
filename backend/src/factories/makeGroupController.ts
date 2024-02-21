import { GroupController } from "@/controllers/group.controller";
import prisma from "@/config/prisma";
import { GroupRepository } from "@/repositories/group.repository";
import { GroupService } from "@/services/group.service";

export function makeGroupController(): GroupController {
  const repository = new GroupRepository(prisma);
  const service = new GroupService(repository);
  const controller = new GroupController(service);
  return controller;
}
