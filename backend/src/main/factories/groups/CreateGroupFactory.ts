import { CreateGroupController } from "@/presentation/controllers/groups/CreateGroupController";
import { GroupRepository } from "@/infra/db/mysql/GroupRepository";
import { CreateGroupUseCase } from "@/data/usecases/group/CreateGroupUseCase";
import { FindGroupByNameUseCase } from "@/data/usecases/group/FindGroupByNameUseCase";
import { makeGroupValidationFactory } from "./GroupValidationFactory";

export function makeCreateGroupController(): CreateGroupController {
  const repo = new GroupRepository();

  const findGroupByName = new FindGroupByNameUseCase(repo);

  const createGroup = new CreateGroupUseCase(repo, findGroupByName);

  const validator = makeGroupValidationFactory()

  return new CreateGroupController(createGroup, validator);
}
