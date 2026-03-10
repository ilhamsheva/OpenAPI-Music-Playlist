import { NotFoundError, ClientError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import LikeRepositories from "../repositories/like-repositories.js";
import AlbumRepositories from "../../album/repositories/album-repositories.js";

const likeRepo = new LikeRepositories();
const albumRepo = new AlbumRepositories();

export const addLikeHandler = async (req, res, next) => {
    try {
        const { id: albumId } = req.params;
        const { id: userId } = req.user;

        const album = await albumRepo.getAlbumById(albumId);
        if (!album) {
            return next(new NotFoundError("Album tidak ditemukan"));
        }

        const isLiked = await likeRepo.verifyUserLike({ userId, albumId });
        if (isLiked) {
            return next(new ClientError("Anda sudah menyukai album ini"));
        }

        await likeRepo.addLike({ userId, albumId });
        return response(res, 201, "Berhasil like album");
    } catch (error) {
        next(error);
    }
};

export const getAlbumLikesHandler = async (req, res, next) => {
    try {
        const { id: albumId } = req.params;

        const album = await albumRepo.getAlbumById(albumId);
        if (!album) {
            return next(new NotFoundError("Album tidak ditemukan"));
        }

        const likes = await likeRepo.getAlbumLikes(albumId);
        return response(res, 200, "Berhasil mengambil jumlah likes", { likes: parseInt(likes) });
    } catch (error) {
        next(error);
    }
};

export const deleteAlbumLikesHandler = async (req, res, next) => {
    try {
        const { id: albumId } = req.params;

        const album = await albumRepo.getAlbumById(albumId);
        if (!album) {
            return next(new NotFoundError("Album tidak ditemukan"));
        }

        const unlikeAlbum = await likeRepo.deleteLike({ userId: req.user.id, albumId });
        return response(res, 200, "Berhasil unlike album");
    } catch (error) {
        next(error);
    }
}