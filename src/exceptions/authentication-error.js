import ClientError from "./client-error.js";

class AuthenticationError extends ClientError {
    constructor(message) {
        super(message, 401);
        this.name = "Authentication Error";
    }
}

export default AuthenticationError;