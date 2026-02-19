import { nanoid } from "nanoid";
import { Pool } from "pg";

/*
In this repository, we will handle all database operations related to albums, such as creating, retrieving, updating, and deleting albums. We will use the pg library to interact with the PostgreSQL database. In this repository, we will using Pool because often interactions with the database are pooled for performance reasons.
*/

class AlbumRepositories {
    constructor() {
        this.pool = new Pool();
    }

    // Create album
    createAlbum({ name, year }) {
        const id = "album-" + nanoid(16);
        const query = {
            text: "INSERT INTO albums(id, name, year) VALUES($1, $2, $3) RETURNING id",
            values: [id, name, year],
        };
        return this.pool.query(query);
    }

    // Query for getAllAlbum
    async getAllAlbum() {
        const query = {
            text: "SELECT * FROM albums",
        };
        const result = await this.pool.query(query);
        return result.rows;
    }

    // Query for getAlbumById
    async getAlbumById(id) {
        const query = {
            text: "SELECT * FROM albums WHERE id = $1",
            values: [id],
        };
        const result = await this.pool.query(query);
        return result.rows[0];
    }

    // Query for update album
    async updateAlbum({id, name, year}) {
        const query = {
            text: "UPDATE albums SET name = $1, year = $2 WHERE id = $3",
            values: [name, year, id],
        };
        const result = await this.pool.query(query);
        return result.rows[0];
    }

    // Query for delete album
    async deleteAlbum(id) {
        const query = {
            text: "DELETE FROM albums WHERE id = $1",
            values: [id],
        };
        const result = await this.pool.query(query);
        // Kembalikan seperti itu karena dihapus :)
        return result.rows[0].id;
    }
}

export default AlbumRepositories;