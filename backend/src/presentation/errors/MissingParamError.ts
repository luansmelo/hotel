export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`${paramName} não foi informado`);
    this.name = "MissingParamError";
  }
}
