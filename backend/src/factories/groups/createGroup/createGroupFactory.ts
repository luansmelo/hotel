import prisma from "@/config/prisma";

import { CreateGroupController } from "@/controllers/groups/createGroup/createGroupController";
import { GroupRepository } from "@/repositories/group.repository";
import { CreateGroupUseCase } from "@/useCase/group/createGroup/createGroup";
import { FindGroupByNameUseCase } from "@/useCase/group/findGroupsByName/findGroupByName";

export function makeCreateGroupController(): CreateGroupController {
  const repo = new GroupRepository(prisma);

  const findGroupByName = new FindGroupByNameUseCase(repo);

  const createGroup = new CreateGroupUseCase(repo, findGroupByName);

  return new CreateGroupController(createGroup);
}
