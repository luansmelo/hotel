import { HttpRequest } from "./httpRequest";
import { HttpResponse } from "./httpResponse";

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
