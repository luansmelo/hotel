export class ProductReportResourceError extends Error {
  constructor(message?: string) {
    super(`${message}`);
    this.name = "ProductReportResourceError";
  }
}
