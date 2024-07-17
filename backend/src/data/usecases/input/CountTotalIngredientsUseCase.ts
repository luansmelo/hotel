import { CountTotalIngredientsRepository } from "@/data/protocols/db/input/CountTotalIngredientsRepository.protocol";
import { CountTotalIngredientsUseCaseContract } from "@/domain/usecases/input/CountTotalIngredient";

export class CountTotalIngredientsUseCase implements CountTotalIngredientsUseCaseContract {
  constructor(private readonly ingredients: CountTotalIngredientsRepository) { }

  async countTotalIngredients(): Promise<number> {
    return this.ingredients.countTotalIngredients();
  }
}
