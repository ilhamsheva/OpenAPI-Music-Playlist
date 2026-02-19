import Joi from "joi";

export const albumSchema = Joi.object({
    name: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
});

export const songsSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    genre: Joi.string().required(),
    performer: Joi.string().required(),
    duration: Joi.number().integer().positive(),
});