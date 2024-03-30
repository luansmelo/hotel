import { UpdateGroupController } from "@/controllers/groups/UpdateGroupController";
import { GroupRepository } from "@/repositories/GroupRepository";
import { FindGroupByIdUseCase } from "@/useCase/group/FindGroupByIdUseCase";
import { FindGroupByNameUseCase } from "@/useCase/group/FindGroupByNameUseCase";
import { UpdateGroupUseCase } from "@/useCase/group/UpdateGroupUseCase";

export function makeUpdateGroupController(): UpdateGroupController {
  const repo = new GroupRepository();

  const findGroupById = new FindGroupByIdUseCase(repo);

  const findGroupByName = new FindGroupByNameUseCase(repo)

  const updateGroup = new UpdateGroupUseCase(repo, findGroupById, findGroupByName);

  return new UpdateGroupController(updateGroup);
}
