import { CreateInputController } from "@/presentation/controllers/ingredient/CreateIngredientController";

import { CreateInputUseCase } from "@/data/usecases/input/CreateInputUseCase";
import { makeInputValidationFactory } from "./InputValidationFactory";
import { GroupRepository } from "@/infra/db/mysql/group/GroupRepository";
import { MeasureRepository } from "@/infra/db/mysql/measure/MeasureRepository";
import { IngredientRepository } from "@/infra/db/mysql/ingredient/IngredientRepository";

export function makeCreateInputController(): CreateInputController {
  const repo = new IngredientRepository();
  const measureRepo = new MeasureRepository();
  const groupRepo = new GroupRepository();

  const createCategory = new CreateInputUseCase(
    repo,
    repo,
    repo,
    measureRepo,
    groupRepo
  );

  const validator = makeInputValidationFactory()

  return new CreateInputController(createCategory, validator);
}
