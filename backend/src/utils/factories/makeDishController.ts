import { DishController } from "../../controllers/dish.controller";
import { DishRepository } from "../../repositories/dishs.repository";
import { db } from "../../database";
import { DishService } from "../../services/dish.service";

export function makeDishController(): DishController {
  const dishRepository = new DishRepository(db);
  const dishService = new DishService(dishRepository);
  const dishController = new DishController(dishService);
  return dishController;
}
