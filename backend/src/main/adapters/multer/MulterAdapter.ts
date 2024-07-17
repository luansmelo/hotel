import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { s3 } from '@/config/multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';
import { S3ServiceException } from '@aws-sdk/client-s3';

export interface config {
	allowedMimes: string[];
	notAllowedMessage: string;
	fileSizeLimit: number;
	savePath: string;
}

class MulterAdapter {
	private upload: multer.Multer;

	constructor(private readonly config: config) {
		this.upload = multer({
			limits: {
				fileSize: this.config.fileSizeLimit,
			},
			fileFilter: (req, file, cb) => {
				if (
					!config.allowedMimes.includes(file.mimetype)
				) {
					return cb(new Error(this.config.notAllowedMessage));
				}
				return cb(null, true);
			},
			storage: multerS3({
				s3,
				bucket: process.env.AWS_BUCKET as string,
				acl: 'public-read',
				metadata: function (req, file, cb) {
					cb(null, { fileName: file.originalname });
				},
				key: function (req, file, cb) {
					const ext = file.mimetype.split('/')[1];
					const fullPath = `${config.savePath}/${uuidv4()}.${ext}`;
					cb(null, fullPath);
				}

			}),
		});
	}

	public getMiddleware() {

		return (
			req: Request,
			res: Response,
			next: NextFunction
		) => {
			this.upload.single('file')(req, res, (err) => {
				if(err instanceof S3ServiceException) {
					return res.status(500).json({error: 'Erro interno no servidor'});
				}
				if (err) {
					return res.status(400).json({
						error: err.message,
					});
				}
				Object.assign(req, { file: req.file });
				next();
			});
		};
	}
}

export default MulterAdapter;