import TokenManager from "../security/token-manager.js";
import response from "../utils/response.js";

const authenticationToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response(res, 401, "Unauthorized", null);
    }

    try {
        const token = authHeader.split('Bearer ')[1];
        const user = TokenManager.verifyAccessToken(token);
        console.log("User decoded: ", user);
        req.user = user;
        return next();
    } catch (error) {
        return response(res, 401, "Unauthorized", null);
    }
}

export default authenticationToken;