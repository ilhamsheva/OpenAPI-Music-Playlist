import TokenManager from "../../../security/token-manager.js";
import userRepositories from "../../user/repositories/user-repositories.js";
import authRepositories from "../repositories/auth-repositories.js";
import response from "../../../utils/response.js";
import { AuthenticationError, InvariantError } from "../../../exceptions/index.js";

export const login = async (req, res, next) => {
    const {username, password} = req.validated;

    const userId = await userRepositories.verifyUserCredential(username, password);

    if (!userId) {
        return next(new AuthenticationError("Invalid username or password"));
    }

    const accessToken = TokenManager.generateAccessToken({
        id: userId,
        username: username,
    });

    const refreshToken = TokenManager.generateRefreshToken({
        id: userId,
        username: username,
    });

    await authRepositories.addRefreshToken(refreshToken);

    return response(res, 201, "Authentikasi berhasil", {
        accessToken,
        refreshToken
    });
}

export const refreshToken = async (req, res, next) => {
    const {refreshToken} = req.validated;

    const result = await authRepositories.verifyRefreshToken(refreshToken);

    if (!result) {
        return next(new InvariantError("Invalid refresh token"));
    }

    const { id, username } = TokenManager.verifyRefreshToken(refreshToken);
    const accessToken = TokenManager.generateAccessToken({id, username});

    return response(res, 200, "Access token berhasil diperbarui", {accessToken});
}

export const logout = async (req, res, next) => {
    const {refreshToken} = req.validated;

    const result = await authRepositories.verifyRefreshToken(refreshToken);

    if (!result) {
        return next(new InvariantError("Invalid refresh token"));
    }

    await authRepositories.deleteRefreshToken(refreshToken);

    return response(res, 200, "Logout berhasil");
}