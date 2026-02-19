import ClientError from "../exceptions/client-error.js";
import response from "../utils/response.js";

const ErrorHandler = (err, req, res, next) => {
    // handle client error
    if (err instanceof ClientError) {
        return response(res, err.statusCode, err.message, null);
    }

    // handler error Joi's schema
    if (err.isJoi) {
        return response(res, 400, err.details[0].message, null);
    }

    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.log("Unhandled error is: ", err);
    return response(res, status, message, null);
};

export default ErrorHandler;