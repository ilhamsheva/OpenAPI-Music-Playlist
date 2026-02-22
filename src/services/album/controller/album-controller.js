import { nanoid } from "nanoid";
import response from "../../../utils/response.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import { AlbumRepositories } from "../repositories/album-repositories.js";

// FIX FOR ALBUM REPOSITORIES
const albumRepository = new AlbumRepositories();

export const addAlbumHandler = async(req, res, next) => {
    const { name, year } = req.validated;

    const album = await albumRepository.createAlbum({ name, year });

    if (!album) {
        return next(new InvariantError("Album gagal ditambahkan"));
    }

    return response(res, 201, "Album berhasil ditambahkan", { albumId: album.id });
}

export const getAlbumByIdHandler = async(req, res, next) => {
    const { id } = req.params;

    const album = await albumRepository.getAlbumWithSongs(id);

    if (!album) {
        return next(new NotFoundError("Album tidak ditemukan"));
    }

    return response(res, 200, "Album berhasil diambil", { album });
}

export const updateAlbumByIdHandler = async(req, res, next) => {
    const { id } = req.params;
    const { name, year } = req.validated;

    const album = await albumRepository.updateAlbum({id, name, year});

    if (!album) {
        return next(new NotFoundError("Gagal memperbarui album. Id tidak ditemukan"));
    }

    return response(res, 200, "Album berhasil diperbarui", { albumId: id });
}

export const deleteAlbumByIdHandler = async(req, res, next) => {
    const { id } = req.params;

    const album = await albumRepository.deleteAlbumById(id);

    if (!album) {
        return next(new NotFoundError("Album tidak ditemukan"));
    }

    return response(res, 200, "Album berhasil dihapus", { albumId: id });
}