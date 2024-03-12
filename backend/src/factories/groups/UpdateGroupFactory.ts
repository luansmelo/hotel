import prisma from "@/config/prisma";

import { UpdateGroupController } from "@/controllers/groups/UpdateGroupController";
import { GroupRepository } from "@/repositories/GroupRepository";
import { FindGroupByIdUseCase } from "@/useCase/group/FindGroupByIdUseCase";
import { UpdateGroupUseCase } from "@/useCase/group/UpdateGroupUseCase";

export function makeUpdateGroupController(): UpdateGroupController {
  const repo = new GroupRepository(prisma);

  const findGroupById = new FindGroupByIdUseCase(repo);

  const updateGroup = new UpdateGroupUseCase(repo, findGroupById);

  return new UpdateGroupController(updateGroup);
}
