import { Router } from "express";
import * as inputs from "./InputRouter";
import * as products from "./ProductRouter";
import * as menus from "./MenuRouter";
import * as category from "./CategoryRouter";
import * as user from "./UserRouter";
import * as group from "./GroupRouter";
import * as measure from "./MeasureRouter";
import * as auth from "./AuthRouter";
import * as s3 from "./S3Router";

const mainRouter = Router();

mainRouter.use(inputs.slug, inputs.router);
mainRouter.use(products.slug, products.router);
mainRouter.use(menus.slug, menus.router);
mainRouter.use(category.slug, category.router);
mainRouter.use(user.slug, user.router);
mainRouter.use(group.slug, group.router);
mainRouter.use(measure.slug, measure.router);
mainRouter.use(s3.slug, s3.router);
mainRouter.use(auth.slug, auth.router);

export default mainRouter;
