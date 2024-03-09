import prisma from "@/config/prisma";

import { UpdateGroupController } from "@/controllers/groups/updateGroup/updateGroupController";
import { GroupRepository } from "@/repositories/group.repository";
import { FindGroupByIdUseCase } from "@/useCase/group/findGroupById/findGroupById";
import { UpdateGroupUseCase } from "@/useCase/group/updateGroups/updateGroups";

export function makeUpdateGroupController(): UpdateGroupController {
  const repo = new GroupRepository(prisma);

  const findGroupById = new FindGroupByIdUseCase(repo);

  const updateGroup = new UpdateGroupUseCase(repo, findGroupById);

  return new UpdateGroupController(updateGroup);
}
