import ClientError from "./client-error.js";

class AuthorizationError extends ClientError {
    constructor(message) {
        super(message, 403);
        this.name = "Authorization Error";
    }
}

export default AuthorizationError;