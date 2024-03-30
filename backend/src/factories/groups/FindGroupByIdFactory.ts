import { FindGroupByIdController } from "@/controllers/groups/FindGroupByIdController";
import { GroupRepository } from "@/repositories/GroupRepository";
import { FindGroupByIdUseCase } from "@/useCase/group/FindGroupByIdUseCase";

export function makeFindGroupByIdController(): FindGroupByIdController {
  const repo = new GroupRepository();

  const categories = new FindGroupByIdUseCase(repo);

  return new FindGroupByIdController(categories);
}
