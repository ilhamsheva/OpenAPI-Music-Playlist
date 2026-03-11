import "dotenv/config";
import ClientError from "../../../exceptions/client-error.js";
import response from "../../../utils/response.js";
import AlbumRepositories from "../../album/repositories/album-repositories.js";

const albumRepo = new AlbumRepositories();

export const uploadImages = async (req, res, next) => {

  if (!req.file) {
    return next(new ClientError("No file uploaded"));
  }

  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;

  const encodedFilename = encodeURIComponent(req.file.filename);

  const fileLocation = `http://${host}:${port}/uploads/${encodedFilename}`;

  await albumRepo.updateAlbumCover({
    id: req.params.id,
    coverUrl: fileLocation,
  });

  return response(res, 201, "Sampul berhasil diunggah");
};