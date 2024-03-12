import prisma from "@/config/prisma";

import { FindGroupsController } from "@/controllers/groups/FindGroupsController";
import { GroupRepository } from "@/repositories/group.repository";
import { FindGroupsUseCase } from "@/useCase/group/FindGroupsUseCase";

export function makeFindGroupsController(): FindGroupsController {
  const repo = new GroupRepository(prisma);

  const categories = new FindGroupsUseCase(repo);

  return new FindGroupsController(categories);
}
