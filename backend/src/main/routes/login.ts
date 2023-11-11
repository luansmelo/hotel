import { Router } from "express";
import { makePostgresAccountController } from "../factories/account";
import { adaptRoute } from "../adapters/express-router";

export default (router: Router): void => {
  router.post("/signup", adaptRoute(makePostgresAccountController()));
};
