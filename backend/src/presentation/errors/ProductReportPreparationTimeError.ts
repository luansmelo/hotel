export class ProductReportPreparationTimeError extends Error {
  constructor(message?: string) {
    super(`${message}`);
    this.name = "ProductReportPreparationTimeError";
  }
}
