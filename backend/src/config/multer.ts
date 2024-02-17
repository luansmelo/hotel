import { Request } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

export const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req: Request, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, uuidv4() + "." + ext);
  },
});
