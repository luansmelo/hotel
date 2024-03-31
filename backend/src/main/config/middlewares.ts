import { Express } from 'express';
import { bodyParser } from '../middlewares/bodyParser/BodyParser';
import { corsMiddleware } from '../middlewares/cors/Cors';
import { contentTypeJson } from '../middlewares/contentType/ContentType';


export default (app: Express): void => {
	app.use(bodyParser);
	app.use(corsMiddleware);
	app.use(contentTypeJson);
};