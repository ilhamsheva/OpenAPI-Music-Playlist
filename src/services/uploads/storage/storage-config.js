import path from "path";
import multer from "multer";
import fs from "fs";
import ClientError from "../../../exceptions/client-error.js";
import BigLargeImageError from "../../../exceptions/big-large-image-error.js";

export const UPLOAD_FOLDER = path.resolve(
  process.cwd(),
  "src/services/uploads/files/images",
);

if (!fs.existsSync(UPLOAD_FOLDER)) {
  fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_FOLDER),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 512000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new ClientError("File harus berupa gambar"), false);
    }
  },
});

export { upload };