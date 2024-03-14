import { HttpResponse } from "../../../controllers/protocols/httpResponse";
import { badRequest, serverError } from "../httpCodesHelper";
import { JsonWebTokenError } from "jsonwebtoken";
import { readdirSync } from "fs";

export async function errorHandler(error: unknown): Promise<HttpResponse> {
  const errors: Error[] = [];
  const files = readdirSync(`${__dirname}/../../errors`);
  for (const file of files) {
    const errorModule = await import(`../../errors/${file}`);
    const errorClass = Object.values(errorModule).find(
      (value) => typeof value === "function" && value.prototype instanceof Error
    );

    if (errorClass) {
      errors.push(errorClass as Error);
    }
  }

  if (error instanceof JsonWebTokenError) {
    return badRequest({
      name: error.name,
      message: "Token expirado ou inválido!",
    });
  }

  if (errors.some((errorItem) => error instanceof (errorItem as never))) {
    return badRequest(error as Error);
  }

  return serverError();
}
