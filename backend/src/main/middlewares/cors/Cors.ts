import { NextFunction, Request, Response } from 'express';

export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
	res.set('access-control-allow-origin', '*');
	res.set('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
	res.set('access-control-allow-methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	res.set('access-control-allow-credentials', 'true');
	next();
};