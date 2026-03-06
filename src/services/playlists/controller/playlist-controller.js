import response from "../../../utils/response.js";
import PlaylistRepositories from "../repositories/playlist-repositories.js";
import SongRepositories from "../../songs/repositories/song-repositories.js";
import CollaborationsRepositories from "../../collaborations/repositories/collab-repositories.js";
import {
    AuthenticationError,
  AuthorizationError,
  InvariantError,
  NotFoundError,
} from "../../../exceptions/index.js";

const playlistRepo = new PlaylistRepositories();
const songRepo = new SongRepositories();
const collabRepo = new CollaborationsRepositories();

export const addPlaylistHandler = async (req, res, next) => {
  const { name } = req.validated;
  const { id: owner, username } = req.user; 

  const playlist = await playlistRepo.addPlaylist({ name, owner, username });

  if (!playlist) {
    return next(new InvariantError("Gagal menambahkan playlist"));
  }

  return response(res, 201, "Playlist berhasil ditambahkan", {
    playlistId: playlist.id,
  });
};

export const getPlaylistsHandler = async (req, res, next) => {
  const { id: userId } = req.user;

  const playlists = await playlistRepo.getPlaylistsByOwnerOrCollaborator(userId);

  return response(res, 200, "Playlists berhasil diambil", { playlists });
};

export const deletePlaylistHandler = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const isOwner = await playlistRepo.verifyPlaylistOwner(id, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses playlist ini"),
    );
  }

  const deleted = await playlistRepo.deletePlaylist(id);
  if (deleted === 0) {
    return next(new NotFoundError("Playlist tidak ditemukan"));
  }

  return response(res, 200, "Playlist berhasil dihapus", {
    deletedPlaylistId: id,
  });
};

export const addSongToPlaylistHandler = async (req, res, next) => {
  const { id } = req.params;
  const { songId } = req.validated;
  const { id: userId } = req.user;

  const isOwner = await playlistRepo.verifyPlaylistOwner(id, userId);
  const isCollaborator = await collabRepo.verifyCollaborator(id, userId);
  
  if (!isOwner && !isCollaborator) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses playlist ini"),
    );
  }

  const song = await songRepo.getSongById(songId);
  if (!song) {
    return next(new NotFoundError("Lagu tidak ditemukan"));
  }

  const result = await playlistRepo.addSongToPlaylist(id, songId);
  if (!result) {
    return next(new InvariantError("Gagal menambahkan lagu ke playlist"));
  }

  await playlistRepo.logActivity(id, songId, userId, 'add');

  return response(res, 201, "Lagu berhasil ditambahkan ke playlist", {
    playlistId: id,
  });
};

export const getSongsFromPlaylistHandler = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const playlist = await playlistRepo.getPlaylistById(id);
  if (!playlist) {
    return next(new NotFoundError("Playlist tidak ditemukan"));
  }

  const isOwner = await playlistRepo.verifyPlaylistOwner(id, userId);
  const isCollaborator = await collabRepo.verifyCollaborator(id, userId);
  
  if (!isOwner && !isCollaborator) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses playlist ini"),
    );
  }

  const songs = await playlistRepo.getSongsFromPlaylist(id);

  playlist.songs = songs;

  return response(res, 200, "Lagu berhasil diambil", {
    playlist,
  });
};

export const deleteSongFromPlaylistHandler = async (req, res, next) => {
  const { id } = req.params;
  const { songId } = req.validated;
  const { id: userId } = req.user;

  const isOwner = await playlistRepo.verifyPlaylistOwner(id, userId);
  const isCollaborator = await collabRepo.verifyCollaborator(id, userId);
  
  if (!isOwner && !isCollaborator) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses playlist ini"),
    );
  }

  const deleted = await playlistRepo.deleteSongFromPlaylist(id, songId);
  if (deleted === 0) {
    return next(new NotFoundError("Lagu tidak ditemukan di playlist"));
  }

  await playlistRepo.logActivity(id, songId, userId, 'delete');

  return response(res, 200, "Lagu berhasil dihapus dari playlist");
};

export const getPlaylistActivitiesHandler = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const playlist = await playlistRepo.getPlaylistById(id);
  if (!playlist) {
    return next(new NotFoundError("Playlist tidak ditemukan"));
  }

  const isOwner = await playlistRepo.verifyPlaylistOwner(id, userId);
  if (!isOwner) {
    return next(new AuthorizationError("Anda tidak berhak mengakses playlist ini"));
  }

  const activities = await playlistRepo.getActivities(id);

  return response(res, 200, "Aktivitas berhasil diambil", { playlistId: id, activities });
};
