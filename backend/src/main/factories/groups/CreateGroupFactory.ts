import { CreateGroupController } from "@/presentation/controllers/groups/CreateGroupController";

import { makeGroupValidationFactory } from "./GroupValidationFactory";
import { GroupRepository } from "@/infra/db/mysql/group/GroupRepository";
import { LoadGroupByNameUseCase } from "@/data/usecases/group/LoadGroupByName";
import { CreateGroupUseCase } from "@/data/usecases/group/CreateGroup";

export function makeCreateGroupController(): CreateGroupController {
  const repo = new GroupRepository();

  const findGroupByName = new LoadGroupByNameUseCase(repo);

  const createGroup = new CreateGroupUseCase(repo, findGroupByName);

  const validator = makeGroupValidationFactory()

  return new CreateGroupController(createGroup, validator);
}
