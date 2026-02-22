import { nanoid } from "nanoid";
import { Pool } from "pg";

/*
In this repository, we will handle all database operations related to albums, such as creating, retrieving, updating, and deleting albums. We will use the pg library to interact with the PostgreSQL database. In this repository, we will using Pool because often interactions with the database are pooled for performance reasons.
*/

export class AlbumRepositories {
  constructor() {
    this.pool = new Pool();
  }

  // Create album
  async createAlbum({ name, year }) {
    const id = "album-" + nanoid(16);
    const query = {
      text: "INSERT INTO album(id, name, year) VALUES($1, $2, $3) RETURNING id",
      values: [id, name, year],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  // Query for getAlbumById
  async getAlbumById(id) {
    const query = {
      text: "SELECT * FROM album WHERE id = $1",
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  // Query for update album
  async updateAlbum({ id, name, year }) {
    const query = {
      text: "UPDATE album SET name = $1, year = $2 WHERE id = $3 RETURNING id",
      values: [name, year, id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  // Query for delete album
  async deleteAlbumById(id) {
    const query = {
      text: "DELETE FROM album WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows[0].id;
  }
}

export default AlbumRepositories;
