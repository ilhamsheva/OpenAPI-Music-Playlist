import response from "../../../utils/response.js";
import ExportService from "../producer/export-service.js";
import PlaylistRepositories from "../../playlists/repositories/playlist-repositories.js";
import {
  NotFoundError,
  AuthorizationError,
} from "../../../exceptions/index.js";

const playlistRepo = new PlaylistRepositories();

export const exportPlaylist = async (req, res, next) => {
  const { id: playlistId } = req.params;
  const { targetEmail } = req.validated;
  const { id: userId } = req.user;

  const playlist = await playlistRepo.getPlaylistById(playlistId);
  if (!playlist) {
    return next(new NotFoundError("Playlist tidak ditemukan"));
  }

  const isOwner = await playlistRepo.verifyPlaylistOwner(playlistId, userId);
  if (!isOwner) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses playlist ini"),
    );
  }

  const message = {
    playlistId,
    targetEmail,
  };

  await ExportService.sendMessage("export:playlists", message);
  return response(res, 201, "Permintaan Anda dalam antrean");
};
