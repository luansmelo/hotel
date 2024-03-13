export class MenuAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(`${message}`);
    this.name = "MenuAlreadyExistsError";
  }
}
