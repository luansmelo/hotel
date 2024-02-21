import { MenuController } from "@/controllers/menu.controller";
import prisma from "@/config/prisma";
import { MenuRepository } from "@/repositories/menu.repository";
import { MenuService } from "@/services/menu.service";

export function makeMenuController(): MenuController {
  const repository = new MenuRepository(prisma);
  const service = new MenuService(repository);
  const controller = new MenuController(service);
  return controller;
}
