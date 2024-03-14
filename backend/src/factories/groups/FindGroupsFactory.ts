import prisma from "@/config/prisma";

import { FindGroupsController } from "@/controllers/groups/FindGroupsController";
import { GroupRepository } from "@/repositories/GroupRepository";
import { FindGroupsUseCase } from "@/useCase/group/FindGroupsUseCase";
import { SortGroupValidator } from "@/validators/sort/SortGroupValidator";
import { ValidationComposite } from "@/validators/ValidationComposition";

export function makeFindGroupsController(): FindGroupsController {
  const repo = new GroupRepository(prisma);

  const categories = new FindGroupsUseCase(repo);

  const validation = new SortGroupValidator();

  const composition = new ValidationComposite([validation]);

  return new FindGroupsController(categories, composition);
}
