import { HttpRequest } from "./httpRequest";
import { HttpResponse } from "./httpResponse";

export interface Middleware {
    handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}