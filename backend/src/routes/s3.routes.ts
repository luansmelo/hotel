import { Request, Response, Router, NextFunction } from "express";
import { authenticated } from "../middleware/authenticated";
import { allowed } from "../middleware/allowed";
import { ROLE } from "../config/constants";
import MulterAdapter, { config } from "../utils/s3/multer-adapter";

const router = Router();
const slug = "/s3";

const multerConfig: config = {
  allowedMimes: ["image/jpeg", "image/png"],
  notAllowedMessage: "Tipo de arquivo não permitido",
  fileSizeLimit: 2 * 1024 * 1024,
  savePath: "uploads",
};

const multerAdapter = new MulterAdapter(multerConfig);
const uploadMiddleware = multerAdapter.getMiddleware();

router.post(
  "/upload",
  authenticated,
  allowed([ROLE.Admin]),
  uploadMiddleware,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const uploadedFile = request.file;
      response.json({ message: "Upload bem-sucedido", file: uploadedFile });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
