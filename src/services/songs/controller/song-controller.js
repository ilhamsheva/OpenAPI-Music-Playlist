import response from "../../../utils/response.js"
import SongRepositories from "../repositories/song-repositories.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";

const songRepositories = new SongRepositories();

export const addSongHandler = async (req, res, next) => {
    const {title, year, genre, performer, duration, albumId} = req.validated;

    const newSong = await songRepositories.addSong({ title, year, genre, performer, duration, albumId });

    if (!newSong) {
        return next(new InvariantError("Gagal menambahkan lagu"));
    }

    return response(res, 201, "Lagu berhasil ditambahkan", { songId: newSong.id });
}

export const getAllSongsHandler = async (req, res, next) => {
    const { title, performer } = req.query;

    const songs = await songRepositories.getAllSongs({ title, performer });

    if (!songs) {
        return next(new InvariantError("Gagal mendapatkan semua lagu"));
    }

    return response(res, 200, "Berhasil mendapatkan semua lagu", {
        songs
    });
};

export const getSongByIdHandler = async (req, res, next) => {
    const { id } = req.params;

    const song = await songRepositories.getSongById(id);

    if (!song) {
        return next(new NotFoundError("Lagu tidak ditemukan"));
    }

    return response(res, 200, "Berhasil mendapatkan lagu", { song: song });
};

export const editSongByIdHandler = async (req, res, next) => {
    const { id } = req.params;
    const { title, year, genre, performer, duration, albumId } = req.validated;

    const updatedSong = await songRepositories.editSongById(id, { title, year, genre, performer, duration, albumId });

    if (!updatedSong) {
        return next(new NotFoundError("Lagu tidak ditemukan"));
    }

    return response(res, 200, "Lagu berhasil diperbarui", { songId: updatedSong.id });
};

export const deleteSongByIdHandler = async (req, res, next) => {
    const { id } = req.params;

    const deletedSongId = await songRepositories.deleteSongById(id);

    if (!deletedSongId) {
        return next(new NotFoundError("Lagu tidak ditemukan"));
    }

    return response(res, 200, "Lagu berhasil dihapus", { songId: deletedSongId });
};
