import { nanoid } from "nanoid";
import AlbumRepositories from "../repositories/album-repositories.js";
import response from "../../../utils/response.js";

export const addAlbumHandler = async(req, res, next) => {
    const id = "album-" + nanoid(16);
    const { name, year } = req.validated;

    const album = await AlbumRepositories.createAlbum({ id, name, year });

    if (!album) {
        return next(new InvariantError("Album gagal ditambahkan"));
    }

    return response(res, 201, "Album berhasil ditambahkan", { albumId: id });
}

export const getAlbumByIdHandler = async(req, res, next) => {
    const { id } = req.params;

    const album = await AlbumRepositories.getAlbumById(id);

    if (!album) {
        return next(new NotFoundError("Album tidak ditemukan"));
    }

    return response(res, 200, "Album berhasil diambil", {album: album});
}

export const updateAlbumByIdHandler = async(req, res, next) => {
    const { id } = req.params;
    const { name, year } = req.validated;

    const album = await AlbumRepositories.updateAlbum({id, name, year});

    if (!album) {
        return next(new NotFoundError("Gagal memperbarui album. Id tidak ditemukan"));
    }

    return response(res, 200, "Album berhasil diperbarui");
}

export const deleteAlbumByIdHandler = async(req, res, next) => {
    const { id } = req.params;

    const album = await AlbumRepositories.deleteAlbum(id);

    if (!album) {
        return next(new NotFoundError("Album tidak ditemukan"));
    }

    return response(res, 200, "Album berhasil dihapus");
}