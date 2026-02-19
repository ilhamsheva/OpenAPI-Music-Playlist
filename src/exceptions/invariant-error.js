import ClientError from "./client-error";

class InvariantError extends ClientError {
    constructor(message) {
        super(message, 400);
        this.name = "Invariant Error";
    }
}

export default InvariantError;
