import { CreateGroupController } from "@/presentation/controllers/groups/CreateGroupController";

import { makeGroupValidationFactory } from "./GroupValidationFactory";
import { GroupRepository } from "@/infra/db/mysql/group/GroupRepository";
import { CreateGroupUseCase } from "@/data/usecases/group/CreateGroup";

export function makeCreateGroupController(): CreateGroupController {
  const repo = new GroupRepository();

  const createGroup = new CreateGroupUseCase(repo, repo);

  const validator = makeGroupValidationFactory()

  return new CreateGroupController(createGroup, validator);
}
