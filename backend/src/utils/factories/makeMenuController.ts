import { MenuController } from "../../controllers/menu.controller";
import { MenuRepository } from "../../repositories/menu.repository";
import { MenuService } from "../../services/menu.service";

export function makeMenuController(): MenuController {
  const menuRepository = new MenuRepository();
  const menuService = new MenuService(menuRepository);
  const menuController = new MenuController(menuService);
  return menuController;
}
