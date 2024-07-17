import { Request } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
	endpoint: process.env.AWS_ENDPOINT as string,
	region: process.env.AWS_REGION as string,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
	},
	forcePathStyle: true
});

export const deleteObject = async (key: string): Promise<void> => {
	const deleteObjectCommand = new DeleteObjectCommand({
		Bucket: process.env.AWS_BUCKET as string,
		Key: key
	});
	await s3.send(deleteObjectCommand);
};

export const storage = multer.diskStorage({
	destination: function (req: Request, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req: Request, file, cb) {
		const ext = file.mimetype.split('/')[1];
		cb(null, uuidv4() + '.' + ext);
	}
});