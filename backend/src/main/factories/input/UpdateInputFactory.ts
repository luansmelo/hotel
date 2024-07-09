import { UpdateInputController } from "@/presentation/controllers/ingredient/UpdateIngredientController";
import { UpdateInputUseCase } from "@/data/usecases/input/UpdateInputUseCase";

import { makeInputValidationFactory } from "./InputValidationFactory";
import { GroupRepository } from "@/infra/db/mysql/group/GroupRepository";
import { MeasureRepository } from "@/infra/db/mysql/measure/MeasureRepository";
import { IngredientRepository } from "@/infra/db/mysql/ingredient/IngredientRepository";

export function makeUpdateInputController(): UpdateInputController {
  const repo = new IngredientRepository();
  const measureRepo = new MeasureRepository();
  const groupRepo = new GroupRepository();

  const updateInput = new UpdateInputUseCase(
    repo,
    repo,
    measureRepo,
    groupRepo
  );

  const validator = makeInputValidationFactory()

  return new UpdateInputController(updateInput, validator);
}
