import { DeleteMenu } from "@/contracts/menu/DeleteMenuContract";

export class DeleteMenuController {
  constructor(private readonly menu: DeleteMenu) {}

  async deleteById(id: string) {
    return this.menu.deleteById(id);
  }
}
