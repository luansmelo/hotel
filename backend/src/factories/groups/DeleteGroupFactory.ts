import prisma from "@/config/prisma";

import { DeleteGroupController } from "@/controllers/groups/DeleteGroupController";
import { GroupRepository } from "@/repositories/group.repository";
import { DeleteGroupUseCase } from "@/useCase/group/DeleteGroupUseCase";
import { FindGroupByIdUseCase } from "@/useCase/group/FindGroupByIdUseCase";

export function makeDeleteGroupController(): DeleteGroupController {
  const repo = new GroupRepository(prisma);

  const findGroupById = new FindGroupByIdUseCase(repo);

  const deleteGroup = new DeleteGroupUseCase(repo, findGroupById);

  return new DeleteGroupController(deleteGroup);
}
