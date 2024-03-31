import { DeleteGroupController } from "@/presentation/controllers/groups/DeleteGroupController";
import { GroupRepository } from "@/infra/db/mysql/GroupRepository";
import { DeleteGroupUseCase } from "@/data/usecases/group/DeleteGroupUseCase";
import { FindGroupByIdUseCase } from "@/data/usecases/group/FindGroupByIdUseCase";

export function makeDeleteGroupController(): DeleteGroupController {
  const repo = new GroupRepository();

  const findGroupById = new FindGroupByIdUseCase(repo);

  const deleteGroup = new DeleteGroupUseCase(repo, findGroupById);

  return new DeleteGroupController(deleteGroup);
}
