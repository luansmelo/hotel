import { DeleteGroup } from "@/contracts/group";

export class DeleteGroupController {
  constructor(private readonly group: DeleteGroup) {}

  async deleteById(id: string) {
    return this.group.deleteById(id);
  }
}
