import prisma from "@/config/prisma";

import { FindGroupByIdController } from "@/controllers/groups/findGroupById/findGroupByIdController";
import { GroupRepository } from "@/repositories/group.repository";
import { FindGroupByIdUseCase } from "@/useCase/group/findGroupById/findGroupById";

export function makeFindGroupByIdController(): FindGroupByIdController {
  const repo = new GroupRepository(prisma);

  const categories = new FindGroupByIdUseCase(repo);

  return new FindGroupByIdController(categories);
}
