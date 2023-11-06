import prisma from "../database";
import { MenuDTO } from "../dto/menu.dto";
import { MenuRepositoryContract } from "../contracts/menu-contract";

export class MenuRepository implements MenuRepositoryContract {
  async save(input: MenuDTO): Promise<void> {
    await prisma.menu.create({
      data: input,
    });
  }

  async getList(): Promise<any> {
    const db = await prisma.menu.findMany();
    return db;
  }
}
