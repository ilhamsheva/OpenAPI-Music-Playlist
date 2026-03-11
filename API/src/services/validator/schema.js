import Joi from "joi";

export const albumSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
});

export const songsSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().integer().positive(),
  albumId: Joi.string().optional(),
});

export const songsQuerySchema = Joi.object({
  title: Joi.string(),
  performer: Joi.string(),
});

export const userSchemaPayload = Joi.object({
  username: Joi.string().max(50).required(),
  password: Joi.string().required(),
  fullname: Joi.string().max(100).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().max(50).required(),
  password: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const playlistSchema = Joi.object({
  name: Joi.string().required(),
});

export const songIdSchema = Joi.object({
  songId: Joi.string().required(),
});

export const collaborationSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

export const exportPlaylistSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});