import prisma from "@/config/prisma";
import { FindGroupsController } from "@/controllers/groups/findGroups/findGroupsController";
import { GroupRepository } from "@/repositories/group.repository";
import { FindGroupsUseCase } from "@/useCase/group/findGroups/findGroups";


export function makeFindGroupsController(): FindGroupsController {
  const repo = new GroupRepository(prisma);

  const categories = new FindGroupsUseCase(repo);

  return new FindGroupsController(categories);
}