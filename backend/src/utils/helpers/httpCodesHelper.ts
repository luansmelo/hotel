import { HttpResponse } from "../../controllers/protocols/httpResponse";

export function serverError(): HttpResponse {
  return {
    statusCode: 500,
    body: {
      error: "Erro interno do servidor",
    },
  };
}

export function ok(body: unknown): HttpResponse {
  return {
    statusCode: 200,
    body,
  };
}

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: error.message,
    },
  };
}

export function unauthorized(error: Error): HttpResponse {
  return {
    statusCode: 401,
    body: {
      error: error.message,
    },
  };
}

export function forbidden(error: Error): HttpResponse {
  return {
    statusCode: 403,
    body: {
      error: error.message,
    },
  };
}

export function noContent(): HttpResponse {
  return {
    statusCode: 204,
    body: null,
  };
}

export function notFound(error: Error): HttpResponse {
  return {
    statusCode: 404,
    body: {
      error: error.message,
    },
  };
}

export function tooManyRequests(error: Error): HttpResponse {
  return {
    statusCode: 429,
    body: {
      error: error.message,
    },
  };
}
