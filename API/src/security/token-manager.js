import jwt from 'jsonwebtoken';
import { InvariantError } from "../exceptions/index.js";

const TokenManager = {
    generateAccessToken: (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_KEY),
    generateRefreshToken: (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN_KEY),
    verifyAccessToken: (token) => {
        try {
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
            return payload;
        } catch (error) {
            throw new InvariantError("Invalid access token");
        }
    },
    verifyRefreshToken: (token) => {
        try {
            const payload = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
            return payload;
        } catch (error) {
            throw new InvariantError("Invalid refresh token");
        }
    }
}

export default TokenManager;