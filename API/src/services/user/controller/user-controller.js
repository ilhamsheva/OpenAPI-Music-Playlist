import userRepositories from "../repositories/user-repositories.js";
import response from "../../../utils/response.js";
import { InvariantError } from "../../../exceptions/index.js";

export const addUserHandler = async (req, res, next) => {
    const {username, password, fullname} = req.validated;

    const isUsernameExist = await userRepositories.verifyUser(username);
    if (isUsernameExist) {
        return next(new InvariantError("Gagal menambahkan user. username sudah digunakan"));
    }

    const newUser = await userRepositories.createUser({ username, password, fullname });

    if (!newUser) {
        return next(new InvariantError("Gagal menambahkan user"));
    }

    return response(res, 201, "Berhasil menambahkan user", {userId: newUser.id});
}