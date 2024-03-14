import prisma from "@/config/prisma";

import { CreateGroupController } from "@/controllers/groups/CreateGroupController";
import { GroupRepository } from "@/repositories/GroupRepository";
import { CreateGroupUseCase } from "@/useCase/group/CreateGroupUseCase";
import { FindGroupByNameUseCase } from "@/useCase/group/FindGroupByNameUseCase";
import { makeGroupValidationFactory } from "./GroupValidationFactory";

export function makeCreateGroupController(): CreateGroupController {
  const repo = new GroupRepository(prisma);

  const findGroupByName = new FindGroupByNameUseCase(repo);

  const createGroup = new CreateGroupUseCase(repo, findGroupByName);

  const validator = makeGroupValidationFactory()

  return new CreateGroupController(createGroup, validator);
}
