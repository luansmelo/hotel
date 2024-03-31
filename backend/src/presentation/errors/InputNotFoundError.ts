export class InputNotFoundError extends Error {
  constructor() {
    super("Insumo não encontrado");
    this.name = "InputNotFoundError";
  }
}
