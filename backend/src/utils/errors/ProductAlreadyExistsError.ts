export class ProductAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(`${message}`);
    this.name = "ProductAlreadyExistsError";
  }
}
