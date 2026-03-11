import ClientError from "./client-error.js";

class BigLargeImageError extends ClientError {
  constructor(message) {
    super(message, 413);
    this.name = "BigLargeImageError";
  }
}

export default BigLargeImageError;