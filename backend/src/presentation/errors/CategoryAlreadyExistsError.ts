export class CategoryAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(`${message}`);
    this.name = "CategoryAlreadyExistsError";
  }
}
