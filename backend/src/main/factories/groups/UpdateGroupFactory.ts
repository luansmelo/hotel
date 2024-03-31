import { UpdateGroupController } from "@/presentation/controllers/groups/UpdateGroupController";
import { GroupRepository } from "@/infra/db/mysql/GroupRepository";
import { FindGroupByIdUseCase } from "@/data/usecases/group/FindGroupByIdUseCase";
import { FindGroupByNameUseCase } from "@/data/usecases/group/FindGroupByNameUseCase";
import { UpdateGroupUseCase } from "@/data/usecases/group/UpdateGroupUseCase";

export function makeUpdateGroupController(): UpdateGroupController {
  const repo = new GroupRepository();

  const findGroupById = new FindGroupByIdUseCase(repo);

  const findGroupByName = new FindGroupByNameUseCase(repo)

  const updateGroup = new UpdateGroupUseCase(repo, findGroupById, findGroupByName);

  return new UpdateGroupController(updateGroup);
}
