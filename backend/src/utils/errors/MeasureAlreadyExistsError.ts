export class MeasureAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(`${message}`);
    this.name = "MeasureAlreadyExistsError";
  }
}
