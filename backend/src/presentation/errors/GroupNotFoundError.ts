export class GroupNotFoundError extends Error {
  constructor() {
    super("Grupo não encontrado");
    this.name = "GroupNotFoundError";
  }
}
