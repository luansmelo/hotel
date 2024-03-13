export class MenuNotFoundError extends Error {
  constructor() {
    super("Cardápio não encontrado");
    this.name = "MenuNotFoundError";
  }
}
