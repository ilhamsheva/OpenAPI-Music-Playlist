import ClientError from "./client-error";

class NotFoundError extends ClientError {
    constructor(message) {
        super(message, 404);
        this.name = "Not Found Error";
    }
}

export default NotFoundError;
