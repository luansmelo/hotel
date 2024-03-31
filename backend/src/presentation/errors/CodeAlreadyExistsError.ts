export class CodeAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(`${message}`);
    this.name = "CodeAlreadyExistsError";
  }
}
