export class InputAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(`${message}`);
    this.name = "InputAlreadyExistsError";
  }
}
