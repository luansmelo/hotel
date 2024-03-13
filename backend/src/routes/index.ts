import { Router } from "express";
import * as products from "./ProductRouter";
import * as user from "./UserRouter";
import * as s3 from "./S3Router";

const mainRouter = Router();

mainRouter.use(products.slug, products.router);
mainRouter.use(user.slug, user.router);
mainRouter.use(s3.slug, s3.router);


export default mainRouter;
