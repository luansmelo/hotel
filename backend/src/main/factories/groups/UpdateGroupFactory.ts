import { UpdateGroupUseCase } from "@/data/usecases/group/UpdateGroup";
import { GroupRepository } from "@/infra/db/mysql/group/GroupRepository";
import { UpdateGroupController } from "@/presentation/controllers/groups/UpdateGroupController";

export function makeUpdateGroupController(): UpdateGroupController {
  const repo = new GroupRepository();

  const updateGroup = new UpdateGroupUseCase(repo, repo, repo);

  return new UpdateGroupController(updateGroup);
}
