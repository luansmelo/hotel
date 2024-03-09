import { DeleteMeasure } from "@/contracts";

export class DeleteMeasureController {
  constructor(private readonly deleteMeasure: DeleteMeasure) {}

  async deleteById(id: string) {
    return this.deleteMeasure.deleteById(id);
  }
}
