import response from "../../../utils/response.js";
import CollaborationsRepositories from "../repositories/collab-repositories.js";
import PlaylistRepositories from "../../playlists/repositories/playlist-repositories.js";
import {
  AuthorizationError,
  NotFoundError,
  InvariantError,
} from "../../../exceptions/index.js";
import userRepo from "../../user/repositories/user-repositories.js";

const collabRepo = new CollaborationsRepositories();
const playlistRepo = new PlaylistRepositories();

export const addCollaborationHandler = async (req, res, next) => {
  const { playlistId, userId } = req.validated;
  const { id: owner } = req.user;

  const playlist = await playlistRepo.getPlaylistById(playlistId);
  if (!playlist) {
    return next(new NotFoundError("Playlist tidak ditemukan"));
  }

  const isOwner = await playlistRepo.verifyPlaylistOwner(playlistId, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses playlist ini"),
    );
  }

  const user = await userRepo.getUserById(userId);
  if (!user) {
    return next(new NotFoundError("User tidak ditemukan"));
  }

  // Add collaboration
  const result = await collabRepo.addCollaboration(playlistId, userId);
  if (!result) {
    return next(new InvariantError("Gagal menambahkan kolaborasi"));
  }

  return response(res, 201, "Kolaborasi berhasil ditambahkan", {
    collaborationId: result.id,
  });
};

export const deleteCollaborationHandler = async (req, res, next) => {
  const { playlistId, userId } = req.validated;
  const { id: owner } = req.user;

  const isOwner = await playlistRepo.verifyPlaylistOwner(playlistId, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses playlist ini"),
    );
  }

  const deleted = await collabRepo.deleteCollaboration(playlistId, userId);
  if (deleted === 0) {
    return next(new NotFoundError("Kolaborasi tidak ditemukan"));
  }

  return response(res, 200, "Kolaborasi berhasil dihapus");
};
