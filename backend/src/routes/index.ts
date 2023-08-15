import { Router } from "express";
import * as inputs from "./input.routes";
import * as dishs from "./dish.routes";
import * as categories from "./category.routes";

const mainRouter = Router();

mainRouter.use(inputs.slug, inputs.router);
mainRouter.use(dishs.slug, dishs.router);
mainRouter.use(categories.slug, categories.router);

export default mainRouter;
