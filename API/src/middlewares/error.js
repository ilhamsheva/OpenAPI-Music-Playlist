import multer from "multer";
import ClientError from "../exceptions/client-error.js";
import BigLargeImageError from "../exceptions/big-large-image-error.js";
import response from "../utils/response.js";

const ErrorHandler = (err, req, res, next) => {
  // handle multer error
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return response(res, 413, "Ukuran file terlalu besar", null);
    }
  }

  // handle BigLargeImageError
  if (err instanceof BigLargeImageError) {
    return response(res, err.statusCode, err.message, null);
  }

  // handle client error
  if (err instanceof ClientError) {
    return response(res, err.statusCode, err.message, null);
  }

  // handle Joi validation error
  if (err.isJoi) {
    return response(res, 400, err.details[0].message, null);
  }

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.log("Unhandled error is:", err);

  return response(res, status, message, null);
};

export default ErrorHandler;