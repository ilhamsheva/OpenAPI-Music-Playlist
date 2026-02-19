import { nanoid } from "nanoid";
import { Pool } from "pg";

/*
In this repository, we will handle all database operations related to albums, such as creating, retrieving, updating, and deleting albums. We will use the pg library to interact with the PostgreSQL database. In this repository, we will using Pool because often interactions with the database are pooled for performance reasons.
*/

class SongsRepositories {
    constructor() {
        this.pool = new Pool();
    }

    createSongs({title, year, genre, performer, duration, albumId}) {
        const id = "song-" + nanoid(16);

        const query = {
            text: "INSERT INTO songs(id, title, year, genre, performer, duration, albumId) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id",
            values: [id, title, year, genre, performer, duration, albumId],
        };
        return this.pool.query(query);
    }

    async getAllSongs() {
        const query = {
            text: 'SELECT * FROM songs'
        };

        const result = await this.pool.query(query);
        return result.rows;
    }

    async getSongsById(id) {
        const query = {
            text: 'SELECT * FROM songs WHERE id = $1',
            values: [id]
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    async updateSongById({id, title, year, genre, performer, duration, albumId}) {
        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, albumId = $6 WHERE id = $7',
            values: [title, year, genre, performer, duration, albumId, id]
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    async deleteSong(id) {
        const query = {
            text: 'DELETE FROM songs WHERE id = $1',
            values: [id]
        };

        const result = await this.pool.query(query);
        return result.rows[0].id;
    }
}