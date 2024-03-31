import { DeleteGroupUseCase } from "@/data/usecases/group/DeleteGroup";
import { GroupRepository } from "@/infra/db/mysql/group/GroupRepository";
import { DeleteGroupController } from "@/presentation/controllers/groups/DeleteGroupController";

export function makeDeleteGroupController(): DeleteGroupController {
  const repo = new GroupRepository();

  const deleteGroup = new DeleteGroupUseCase(repo, repo);

  return new DeleteGroupController(deleteGroup);
}
