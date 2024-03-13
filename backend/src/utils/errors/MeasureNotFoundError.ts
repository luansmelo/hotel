export class MeasureNotFoundError extends Error {
  constructor() {
    super("Unidade de medida não encontrada");
    this.name = "MeasureNotFoundError";
  }
}
